<?php

namespace Pagekit\Page\Controller;

use Pagekit\Application as App;
use Pagekit\Page\Entity\Page;
use Pagekit\Kernel\Exception\NotFoundException;

class SiteController
{
    /**
     * @Route("/{id}", name="id")
     * @Request({"id" : "int"})
     */
    public function indexAction($id = 0)
    {
        if (!$page = Page::find($id)) {
            throw new NotFoundException(__('Page not found!'));
        }

        $page->setContent(App::content()->applyPlugins($page->getContent(), ['page' => $page, 'markdown' => $page->get('markdown')]));

        return [
            '$view' => [
                'title' => __($page->getTitle()),
                'name'  => 'page:views/index.php'
            ],
            'page' => $page
        ];
    }
}
