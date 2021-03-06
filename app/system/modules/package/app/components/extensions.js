var $ = require('jquery');
var data = window.$extensions;

module.exports = {

    mixins: [
        require('./package')
    ],

    data: $.extend(data, {
        updates: null,
        search: '',
        status: ''
    }),

    ready: function () {
        this.load();
    },

    methods: {

        icon: function (pkg) {

            var img;

            if (pkg.extra.image) {
                img = this.$url.static('extensions/:name/:image', {name: pkg.name, image: pkg.extra.image});
            } else {
                img = this.$url.static('app/system/assets/images/placeholder-icon.svg');
            }

            return img;
        },

        load: function () {

            var vm = this;

            this.$set('status', 'loading');

            this.queryUpdates(this.api, this.packages).done(function (data) {
                vm.$set('updates', data.packages.length ? data.packages : null);
                vm.$set('status', '');
            }).fail(function () {
                vm.$set('status', 'error');
            });
        },

        enable: function (pkg) {
            this.enablePackage(pkg).success(function (data) {
                UIkit.notify(data.message);
            }).error(function (data) {
                UIkit.notify(data, 'danger');
            });
        },

        disable: function (pkg) {
            this.disablePackage(pkg).success(function (data) {
                UIkit.notify(data.message);
            }).error(function (data) {
                UIkit.notify(data, 'danger');
            });
        },

        uninstall: function (pkg) {
            this.uninstallPackage(pkg, this.packages).success(function (data) {
                UIkit.notify(data.message);
            }).error(function (data) {
                UIkit.notify(data, 'danger');
            });
        }

    }

};