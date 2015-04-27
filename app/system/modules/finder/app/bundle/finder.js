!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){var r='<div v-cloak="">\n        <div class="pk-toolbar uk-form uk-clearfix">\n            <div v-if="isWritable()" class="uk-float-left">\n\n                <button class="uk-button uk-button-primary uk-form-file">\n                    {{ \'Upload\' | trans }}\n                    <input type="file" name="files[]" multiple="multiple">\n                </button>\n\n                <button class="uk-button" v-on="click: createFolder()">{{ \'Add Folder\' | trans }}</button>\n\n                <button class="uk-button pk-button-danger" v-show="selected.length" v-on="click: remove">{{ \'Delete\' | trans }}</button>\n                <button class="uk-button" v-show="selected.length === 1" v-on="click: rename">{{ \'Rename\' | trans }}</button>\n\n            </div>\n            <div class="uk-float-right uk-hidden-small">\n\n                <input type="text" placeholder="{{ \'Search\' | trans }}" v-model="search">\n\n                <div class="uk-button-group">\n                    <button class="uk-button uk-icon-bars" v-class="\'uk-active\': view == \'table\'" v-on="click: view = \'table\'"></button>\n                    <button class="uk-button uk-icon-th" v-class="\'uk-active\': view == \'thumbnail\'" v-on="click: view = \'thumbnail\'"></button>\n                </div>\n\n            </div>\n        </div>\n\n        <ul class="uk-breadcrumb pk-breadcrumb">\n            <li v-repeat="breadcrumbs" v-class="\'uk-active\': current">\n                <span v-show="current">{{ title }}</span>\n                <a v-show="!current" v-on="click: setPath(path)">{{ title }}</a>\n            </li>\n        </ul>\n\n        <div v-show="upload.running" class="uk-progress uk-progress-striped uk-active">\n            <div class="uk-progress-bar" v-style="width: upload.progress + \'%\'">{{ upload.progress }}%</div>\n        </div>\n\n        <div v-partial="{{ view }}"></div>\n\n        <div v-if="isWritable()" class="uk-placeholder uk-text-center uk-text-muted">\n            <img v-attr="src: $url(\'app/system/assets/images/finder-droparea.svg\', true)" width="22" height="22" alt="{{ \'Droparea\' | trans }}"> {{ \'Drop files here.\' | trans }}\n        </div>\n\n    </div>',a=n(1),i=n(2),s=n(3),o={root:"/",mode:"write",view:"table",path:"/",selected:[],upload:{}},u={replace:!0,template:r,data:function(){return i.util.extend({},o)},ready:function(){this.resource=this.$resource("system/finder/:cmd"),this.load().success(function(){this.$dispatch("ready.finder",this)}.bind(this))},watch:{path:function(){this.load()},selected:function(){this.$dispatch("select.finder",this.getSelected(),this)}},filters:{searched:function(e){var t=this.search;return t?e.filter(function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())}):e}},computed:{breadcrumbs:function(){var e="",t=[{path:"/",title:this.$trans("Home")}].concat(this.path.substr(1).split("/").filter(function(e){return e.length}).map(function(t){return{path:e+="/"+t,title:t}}));return t[t.length-1].current=!0,t}},methods:{setPath:function(e){this.$set("path",e)},getPath:function(){return this.path},getFullPath:function(){return(this.root+this.path).replace(/^\/+|\/+$/g,"")+"/"},getSelected:function(){var e=this.getFullPath();return this.selected.map(function(t){return e+t})},toggleSelect:function(e){if(e.targetVM){if("INPUT"==e.target.tagName||"A"==e.target.tagName)return;e=e.targetVM.$data.name}var t=this.selected.indexOf(e);-1===t?this.selected.push(e):this.selected.splice(t,1)},createFolder:function(){var e=prompt(this.$trans("Folder Name"),"");e&&this.command("createfolder",{name:e})},rename:function(e){if(e.target&&(e=this.selected[0]),e){var t=prompt(this.$trans("New Name"),e);t&&this.command("rename",{oldname:e,newname:t})}},remove:function(e){e.target&&(e=this.selected),e&&confirm(this.$trans("Are you sure?"))&&this.command("removefiles",{names:e})},encodeURI:function(e){return encodeURI(e).replace(/'/g,"%27")},isWritable:function(){return"w"===this.mode||"write"===this.mode},isImage:function(e){return e.match(/\.(?:gif|jpe?g|png|svg)/i)},command:function(e,t){var n=this;return this.resource.save({cmd:e},a.extend({path:this.path,root:this.root},t),function(e){s.notify(e.message,e.error?"danger":"success"),n.load()}).fail(function(e){s.notify(500==e.status?"Unknown error.":e.responseText,"danger")})},load:function(){return this.resource.get({path:this.path,root:this.root},function(e){this.$set("selected",[]),this.$set("folders",e.folders||[]),this.$set("files",e.files||[]),this.$dispatch("path.finder",this.getFullPath(),this)}.bind(this))}},events:{"hook:ready":function(){var e=this,t={action:this.$url("system/finder/upload"),before:function(t){a.extend(t.params,{path:e.path,root:e.root})},loadstart:function(){e.$set("upload.running",!0),e.$set("upload.progress",0)},progress:function(t){e.$set("upload.progress",Math.ceil(t))},allcomplete:function(t){var n=a.parseJSON(t);e.load(),s.notify(n.message,n.error?"danger":"success"),e.$set("upload.progress",100),setTimeout(function(){e.$set("upload.running",!1)},1500)}};s.uploadSelect(this.$el.querySelector(".uk-form-file > input"),t),s.uploadDrop(this.$el,t)}},partials:{table:n(19),thumbnail:n(20)}};i.component("v-finder",i.util.extend({},u));var c=function(e,t){return new i(a.extend(!0,{},u,{el:e,data:a.extend(!0,{},o,t)}))};a(function(){a("[data-finder]").each(function(){new c(this,a(this).data("finder"))})}),window.Finder=window.Finder||c,("function"==typeof e.exports?e.exports.options:e.exports).template=r},1:function(e,t,n){e.exports=jQuery},2:function(e,t,n){e.exports=Vue},3:function(e,t,n){e.exports=UIkit},19:function(e,t,n){e.exports='<div v-if="files || folders" class=uk-overflow-container><table class="uk-table uk-table-hover uk-table-middle pk-finder-table"><thead><th class=pk-table-width-minimum><input type=checkbox v-check-all="selected: input[name=name]"><th colspan=2>{{ \'Name\' | trans }}<th class="pk-table-width-minimum uk-text-center">{{ \'Size\' | trans }}<th class=pk-table-width-minimum>{{ \'Modified\' | trans }}<tbody><tr v-repeat="folders | searched" class=uk-visible-hover v-on="click: toggleSelect"><td><input type=checkbox name=name value="{{ name }}"><td class=pk-table-width-minimum><i class="uk-icon-folder-o pk-finder-icon-folder"></i><td class="pk-table-text-break pk-table-min-width-200"><a v-on="click: setPath(path)">{{ name }}</a><td><td><tr v-repeat="files | searched" class=uk-visible-hover v-on="click: toggleSelect"><td><input type=checkbox name=name value="{{ name }}"><td class=pk-table-width-minimum><i v-if=isImage(url) class="pk-thumbnail-icon pk-finder-icon-file" style="background-image: url(\'{{ encodeURI(url) }}\')"></i> <i v-if=!isImage(url) class="uk-icon-file-o pk-finder-icon-file"></i><td class="pk-table-text-break pk-table-min-width-200">{{ name }}<td class="uk-text-right uk-text-nowrap">{{ size }}<td class=uk-text-nowrap>{{ lastmodified }}</table></div>'},20:function(e,t,n){e.exports='<ul v-if="files || folders" class="uk-grid uk-grid-width-small-1-2 uk-grid-width-large-1-3 uk-grid-width-xlarge-1-4 pk-thumbnail-border-remove" data-uk-grid-margin="" data-uk-grid-match="{ target:\'.uk-panel\' }"><li v-repeat="folders | searched" v-on="click: toggleSelect"><div class="uk-panel uk-panel-box uk-text-center uk-visible-hover"><div class=uk-panel-teaser><div class="pk-thumbnail pk-thumbnail-folder"></div></div><div class=uk-text-truncate><input type=checkbox value="{{ name }}" v-checkbox=selected><a v-on="click: setPath(path, $event)">{{ name }}</a></div></div></li><li v-repeat="files | searched" v-on="click: toggleSelect"><div class="uk-panel uk-panel-box uk-text-center uk-visible-hover"><div class=uk-panel-teaser><div v-if=isImage(url) class=pk-thumbnail style="background-image: url(\'{{ encodeURI(url) }}\')"></div><div v-if=!isImage(url) class="pk-thumbnail pk-thumbnail-file"></div></div><div class="uk-text-nowrap uk-text-truncate"><input type=checkbox value="{{ name }}" v-checkbox=selected>{{ name }}</div></div></li></ul>'}});