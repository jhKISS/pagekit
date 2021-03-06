<?php

namespace Pagekit\Widget;

use Pagekit\Application as App;
use Pagekit\Module\Module;
use Pagekit\Util\Arr;
use Pagekit\Widget\Entity\Widget;
use Pagekit\Widget\Model\TypeInterface;

class WidgetModule extends Module
{
    protected $types = [];
    protected $positions = [];
    protected $sections = [];

    /**
     * {@inheritdoc}
     */
    public function main(App $app)
    {
        $app->on('site.sections', function ($event, $site) use ($app) {

            if (!$app['user']->hasAccess('system: manage widgets')) {
                return;
            }

            $site->registerSection('Widgets', function() { return '<div v-component="widgets-index"></div>'; });
        });

        $app->on('before@site', function () use ($app) {

            $app['scripts']->add('widget-index', 'widget:app/index.js', ['site', 'uikit-form-select']);
            $app['scripts']->add('widget-index-tmpl', 'widget:views/admin/index.php', 'widget-index', 'template');

            $app['view']->data('$widgets', [

                'positions' => array_values($this->getPositions()),
                'types' => array_values($this->getTypes('site'))

            ]);

        });

        $app->on('app.site', function($event, $request) use ($app) {

            // register renderer
            foreach ($app['module'] as $module) {

                if (!isset($module->renderer) || !is_array($module->renderer)) {
                    continue;
                }

                foreach ($module->renderer as $id => $renderer) {
                    $app['view']->map('position.'.$id, $renderer);
                }
            }

            $app['view']->map('position.default', 'widget:views/widgets.php');

            // assign widgets
            $active    = (array) $request->attributes->get('_node');
            $user      = $app['user'];
            $positions = $app['view']->position();
            $widgets   = Widget::findAll();

            foreach ($this->config('widget.positions') as $position => $ids) {

                if (!$this->hasPosition($position)) {
                    continue;
                }

                foreach ($ids as $id) {

                    if (!isset($widgets[$id]) or !$widget = $widgets[$id] or !$widget->hasAccess($user) or ($nodes = $widget->getNodes() and !array_intersect($nodes, $active))) {
                        continue;
                    }

                    $widget->mergeSettings($this->getWidgetConfig($widget->getId()));

                    $positions($position, $widget);
                }
            }

        });

        $app->on('widget.create', function($event, $widget) {
            if ($type = $this->getType($widget->getType())) {
                $widget->setDefaults($type->getDefaults());
            }
        });

        $app->on('app.request', function() use ($app) {
            $this->config['widget']['defaults'] = Arr::merge($this->config['widget']['defaults'], $app['theme.site']->config('widget.defaults', []));
        });

        if (!$app['config']->get('system/widget')) {
            $app['config']->set('system/widget', [], true);
        }

    }

    /**
     * @param  string $name
     * @return bool
     */
    public function hasPosition($name)
    {
        $positions = $this->getPositions();

        return isset($positions[$name]);
    }

    /**
     * @return array
     */
    public function getPositions()
    {
        if (!$this->positions) {

            foreach (App::module() as $module) {

                if (!isset($module->positions) || !is_array($module->positions)) {
                    continue;
                }

                foreach ($module->positions as $id => $position) {
                    list($name, $description) = array_merge((array) $position, ['']);
                    $this->registerPosition($id, $name, $description);
                }
            }

            App::trigger('widget.positions', [$this]);
        }

        return $this->positions;
    }

    /**
     * Registers a position.
     *
     * @param string $id
     * @param string $name
     * @param string $description
     */
    public function registerPosition($id, $name, $description = '')
    {
        $this->positions[$id] = compact('id', 'name', 'description');
    }

    /**
     * @param  string $type
     * @return TypeInterface
     */
    public function getType($type)
    {
        $types = $this->getTypes();

        return isset($types[$type]) ? $types[$type] : null;
    }

    /**
     * @return array
     */
    public function getTypes($filter = '')
    {
        if (!$this->types) {

            $this->registerType(new TextWidget());

            App::trigger('widget.types', [$this]);
        }

        return $filter ? array_filter($this->types, function($type) use($filter) { return 0 === strpos($type->getId(), $filter); }) : $this->types;
    }

    /**
     * Registers a type.
     *
     * @param TypeInterface $type
     */
    public function registerType(TypeInterface $type)
    {
        $this->types[$type->getId()] = $type;
    }

    /**
     * @param  string $type
     * @return array
     */
    public function getSections($type = '')
    {
        if (!$this->sections) {

            $this->registerSection('Settings', 'widget:views/admin/settings.php');
            $this->registerSection('Assignment', 'widget:views/admin/assignment.php');
            $this->registerSection('Settings', 'widget:views/widgets/text/edit.php', 'site.text');

            App::trigger('widget.sections', [$this]);
        }

        return array_filter(array_map(function($subsections) use ($type) {
            return array_filter($subsections, function($section) use ($type) { return in_array($section['type'], ['', $type]); });
        }, $this->sections));
    }

    /**
     * Registers a settings section.
     *
     * @param string $name
     * @param string $view
     * @param string $type
     * @param array  $options
     */
    public function registerSection($name, $view, $type = '', array $options = [])
    {
        $this->sections[$name][] = array_merge($options, compact('name', 'view', 'type'));
    }

    /**
     * Gets the widget config.
     *
     * @param  int $id
     * @return array
     */
    public function getWidgetConfig($id = 0)
    {
        return Arr::merge($this->config('widget.defaults'), $this->config('widget.config.'.$id, []), true);
    }
}
