jQuery(function ($) {

    var vm = new Vue({

        el: '#js-settings',

        data: window.$data,

        methods: {

            save: function(e) {

                var config = $(':input', e.target).serialize().parse().config;

                this.$http.post('admin/system/settings/save', { config: {}, option: { blog: $.extend(config, this.config) }}, function() {
                    UIkit.notify(vm.$trans('Settings saved.'), '');
                }).error(function(data) {
                    UIkit.notify(data, 'danger');
                });
            }

        }

    });

});
