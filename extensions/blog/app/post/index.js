/*global $config, $data*/

jQuery(function ($) {

    var vm = new Vue({

        el: '#js-post',

        data: {
            config: $config,
            data: $data,
            posts: null,
            pages: 0,
            selected: []
        },

        created: function () {

            this.resource = this.$resource('api/blog/post/:id');
            this.config.filter = $.extend({ status: '' }, this.config.filter ? this.config.filter : {});

            this.$watch('config.page', this.load, true, true);
            this.$watch('config.filter', function() { this.load(0); }, true);
        },

        computed: {

            statuses: function() {
                return [{ text: this.$trans('- Status -'), value: '' }].concat(
                    Vue.filter('toArray')($.map(this.data.statuses, function(status, id) { return { text: status, value: id }; }))
                );
            }

        },

        methods: {

            save: function (post) {
                this.resource.save({ id: post.id }, { post: post }, function (data) {
                    vm.load();
                    UIkit.notify(data.message || data.error, data.error ? 'danger' : '');
                });
            },

            status: function(status) {

                var posts = this.getSelected();

                posts.forEach(function(post) {
                    post.status = status;
                });

                this.resource.save({ id: 'bulk' }, { posts: posts }, function (data) {
                    vm.load();
                    UIkit.notify(data.message || data.error, data.error ? 'danger' : '');
                });
            },

            remove: function() {
                this.resource.delete({ id: 'bulk' }, { ids: this.selected }, function (data) {
                    vm.load();
                    UIkit.notify(data.message || data.error, data.error ? 'danger' : '');
                });
            },

            toggleStatus: function (post) {
                post.status = post.status === 2 ? 3 : 2;
                this.save(post);
            },

            copy: function() {

                if (!this.selected.length) {
                    return;
                }

                this.resource.save({ id: 'copy' }, { ids: this.selected }, function (data) {
                    vm.load();
                    UIkit.notify(data.message || data.error, data.error ? 'danger' : '');
                });
            },

            load: function (page) {

                page = page !== undefined ? page : this.config.page;

                this.resource.query({ filter: this.config.filter, page: page }, function (data) {
                    vm.$set('posts', data.posts);
                    vm.$set('pages', data.pages);
                    vm.$set('config.page', page);
                    vm.$set('selected', []);
                });
            },

            getSelected: function() {
                return this.posts.filter(function(post) { return vm.selected.indexOf(post.id.toString()) !== -1; });
            },

            getStatusText: function(post) {
                return this.data.statuses[post.status];
            }

        }

    });

});
