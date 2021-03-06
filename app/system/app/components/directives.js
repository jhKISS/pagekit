/**
 * Vue Directives
 */

var $ = require('jquery');
var Vue = require('vue');

Vue.directive('gravatar', {

    update: function(value) {

        var el = $(this.el), options = { size: (el.attr('height') || 50) * 2, backup: 'mm', rating: 'g' };

        el.attr('src', gravatar(value || '', options));
    }

});

Vue.directive('check-all', {

    isLiteral: true,

    bind: function() {

        var self = this, vm = this.vm, el = $(this.el), keypath = this.arg, selector = this.expression;

        el.on('change.check-all', function() {
            $(selector, vm.$el).prop('checked', $(this).prop('checked'));
            vm.$set(keypath, self.checked());
        });

        $(vm.$el).on('change.check-all', selector, function() {
            vm.$set(keypath, self.state());
        });

        this.unbindWatcher = vm.$watch(keypath, function(selected) {

            $(selector, vm.$el).prop('checked', function() {
                return selected.indexOf($(this).val()) !== -1;
            });

            self.state();
        });

    },

    unbind: function() {

        $(this.el).off('.check-all');
        $(this.vm.$el).off('.check-all');

        if (this.unbindWatcher) {
            this.unbindWatcher();
        }
    },

    state: function() {

        var el = $(this.el), checked = this.checked();

        if (checked.length === 0) {
            el.prop('checked', false).prop('indeterminate', false);
        } else if (checked.length == $(this.expression, this.vm.$el).length) {
            el.prop('checked', true).prop('indeterminate', false);
        } else {
            el.prop('indeterminate', true);
        }

        return checked;
    },

    checked: function() {

        var checked = [];

        $(this.expression, this.vm.$el).each(function() {
            if ($(this).prop('checked')) {
                checked.push($(this).val());
            }
        });

        return checked;
    }

});

Vue.directive('checkbox', {

    twoWay: true,

    bind: function() {

        var vm = this.vm, expression = this.expression, el = $(this.el);

        el.on('change.checkbox', function() {

            var model = vm.$get(expression), contains = model.indexOf(el.val());

            if (el.prop('checked')) {
                if (-1 === contains) {
                    model.push(el.val());
                }
            } else if (-1 !== contains) {
                model.splice(contains, 1);
            }
        });

    },

    update: function(value) {

        if (undefined === value) {
            this.set([]);
            return;
        }

        $(this.el).prop('checked', -1 !== value.indexOf(this.el.value));
    },

    unbind: function() {
        $(this.el).off('.checkbox');
    }

});
