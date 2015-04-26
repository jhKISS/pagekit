!function t(n,e,a){function s(r,d){if(!e[r]){if(!n[r]){var i="function"==typeof require&&require;if(!d&&i)return i(r,!0);if(o)return o(r,!0);var p=new Error("Cannot find module '"+r+"'");throw p.code="MODULE_NOT_FOUND",p}var l=e[r]={exports:{}};n[r][0].call(l.exports,function(t){var e=n[r][1][t];return s(e?e:t)},l,l.exports,t,n,e,a)}return e[r].exports}for(var o="function"==typeof require&&require,r=0;r<a.length;r++)s(a[r]);return s}({1:[function(t,n,e){jQuery(function(n){n("body").append('<div id="profiler"></div>');{var e=t("./debugbar.vue");new Vue(e).$mount("#profiler")}})},{"./debugbar.vue":10}],2:[function(t,n,e){var a='<div v-el="navbar" style="display: none">\n\n        <a title="User"><div class="pf-icon pf-icon-auth" v-class="pf-parent: user"></div> {{ label }}</a>\n\n        <div class="pf-dropdown" v-show="user">\n\n            <table class="pf-table pf-table-dropdown">\n                <tbody>\n                    <tr>\n                        <td>Username</td>\n                        <td>{{ user }}</td>\n                    </tr>\n                    <tr>\n                        <td>Roles</td>\n                        <td>{{ roles | json }}</td>\n                    </tr>\n                    <tr>\n                        <td>Authenticated</td>\n                        <td>{{ authenticated ? \'yes\' : \'no\' }}</td>\n                    </tr>\n                    <tr>\n                        <td>Class</td>\n                        <td>{{ user_class }}</td>\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n\n    </div>';n.exports={ready:function(){this.$parent.add(this,$(this.$$.navbar).html())},computed:{label:function(){return this.user?this.user:this.enabled?"You are not authenticated.":"Authentication is disabled."}}},("function"==typeof n.exports?n.exports.options:n.exports).template=a},{}],3:[function(t,n,e){var a='<h1>Queries</h1>\n\n    <p v-show="!nb_statements">\n        <em>No queries.</em>\n    </p>\n\n    <div v-repeat="statements">\n\n        <pre><code>{{ sql }}</code></pre>\n\n        <p class="pf-submenu">\n            <span>{{ duration_str }}</span>\n            <span>{{ params | json }}</span>\n        </p>\n\n    </div>\n\n    <div v-el="navbar" style="display: none">\n\n        <a title="Database" class="pf-parent">\n            <div class="pf-icon pf-icon-database"></div> {{ nb_statements }}\n        </a>\n\n        <div class="pf-dropdown">\n\n            <table class="pf-table pf-table-dropdown">\n                <tbody>\n                    <tr>\n                        <td>Queries</td>\n                        <td>{{ nb_statements }}</td>\n                    </tr>\n                    <tr>\n                        <td>Time</td>\n                        <td>{{ accumulated_duration_str }}</td>\n                    </tr>\n                    <tr>\n                        <td>Driver</td>\n                        <td>{{ driver }}</td>\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n\n    </div>';n.exports={ready:function(){this.$parent.add(this,$(this.$$.navbar).html(),"database")}},("function"==typeof n.exports?n.exports.options:n.exports).template=a},{}],4:[function(t,n,e){n.exports={ready:function(){this.$parent.add(this,'<a title="Events"><div class="pf-icon pf-icon-events"></div> Events</a>')}}},{}],5:[function(t,n,e){n.exports={ready:function(){this.$parent.add(this,'<a title="Memory"><div class="pf-icon pf-icon-memory"></div> {{ peak_usage_str }}</a>')}}},{}],6:[function(t,n,e){n.exports={ready:function(){this.$parent.add(this,'<a title="Request"><div class="pf-icon pf-icon-request"></div> <span class="pf-badge">200</span> @test</a>')}}},{}],7:[function(t,n,e){var a='<h1>Routes</h1>\n\n    <table class="pf-table">\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Pattern</th>\n                <th>Controller</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr v-repeat="routes">\n                <td>{{ name }}</td>\n                <td>{{ pattern }} {{ methods | str }}</td>\n                <td><abbr title="{{ controller }}">{{ controller | short }}</abbr></td>\n            </tr>\n        </tbody>\n    </table>';n.exports={ready:function(){this.$parent.add(this,'<a title="Routes"><div class="pf-icon pf-icon-routes"></div> Routes</a>',"routes")},filters:{str:function(t){return t.length?"("+t+")":""},"short":function(t){return t.split("\\").pop()}}},("function"==typeof n.exports?n.exports.options:n.exports).template=a},{}],8:[function(t,n,e){var a='<h1>Information</h1>\n\n    <h2>System</h2>\n    <table class="pf-table pf-table-dropdown">\n        <tbody>\n            <tr>\n                <td>Pagekit</td>\n                <td>{{ version }}</td>\n            </tr>\n            <tr>\n                <td>Server</td>\n                <td>{{ server }}</td>\n            </tr>\n            <tr>\n                <td>Useragent</td>\n                <td>{{ useragent }}</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <h2>PHP</h2>\n    <table class="pf-table pf-table-dropdown">\n        <tbody>\n            <tr>\n                <td>PHP</td>\n                <td>{{ phpversion }}</td>\n            </tr>\n            <tr>\n                <td>PHP SAPI</td>\n                <td>{{ sapi_name }}</td>\n            </tr>\n            <tr>\n                <td>System</td>\n                <td>{{ php }}</td>\n            </tr>\n            <tr>\n                <td>Extensions</td>\n                <td>{{ extensions }}</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <h2>Database</h2>\n    <table class="pf-table pf-table-dropdown">\n        <tbody>\n            <tr>\n                <td>Driver</td>\n                <td>{{ dbdriver }}</td>\n            </tr>\n            <tr>\n                <td>Version</td>\n                <td>{{ dbversion }}</td>\n            </tr>\n            <tr>\n                <td>Client</td>\n                <td>{{ dbclient }}</td>\n            </tr>\n        </tbody>\n    </table>';n.exports={ready:function(){this.$parent.add(this,'<a title="System Information"><div class="pf-icon-large pf-icon-pagekit"></div></a>',"system")}},("function"==typeof n.exports?n.exports.options:n.exports).template=a},{}],9:[function(t,n,e){n.exports={ready:function(){this.$parent.add(this,'<a title="Time"><div class="pf-icon pf-icon-time"></div> {{ duration_str }}</a>')}}},{}],10:[function(t,n,e){var a='<div id="pk-profiler" class="pf-profiler">\n\n        <div class="pf-navbar">\n\n            <ul class="pf-navbar-nav" v-repeat="navbar">\n                <li v-html="html" v-on="click: open(panel)"></li>\n            </ul>\n\n            <a class="pf-close" v-on="click: close"></a>\n\n        </div>\n\n        <div v-repeat="panels">\n            <div class="pf-profiler-panel" data-panel="{{ $value }}" v-component="{{ $value }}" v-with="data[$value]"></div>\n        </div>\n\n    </div>',s=window.jQuery,o=window.$debugbar,r={system:t("./components/system.vue"),routes:t("./components/routes.vue"),events:t("./components/events.vue"),time:t("./components/time.vue"),memory:t("./components/memory.vue"),database:t("./components/database.vue"),request:t("./components/request.vue"),auth:t("./components/auth.vue")};n.exports={data:{data:{},navbar:[],panels:[]},created:function(){var t=this;s.getJSON(o.url,function(n){t.$set("data",n),s.each(r,function(e){n[e]&&t.panels.push(e)})})},methods:{add:function(t,n,e){this.navbar.push({panel:e,html:t.$interpolate(n||"")})},open:function(t){t&&s("[data-panel]",this.$el).each(function(){var n=s(this).attr("style",null);n.data("panel")==t&&n.css({display:"block",height:Math.ceil(window.innerHeight/2)})})},close:function(){s("[data-panel]",this.$el).attr("style",null)}},components:r},("function"==typeof n.exports?n.exports.options:n.exports).template=a},{"./components/auth.vue":2,"./components/database.vue":3,"./components/events.vue":4,"./components/memory.vue":5,"./components/request.vue":6,"./components/routes.vue":7,"./components/system.vue":8,"./components/time.vue":9}]},{},[1]);