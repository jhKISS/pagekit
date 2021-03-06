/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_template__ = "<div class=\"uk-placeholder uk-text-center uk-text-muted\" v-el=\"drop\">\n        <img v-attr=\"src: $url.static('app/system/assets/images/finder-droparea.svg')\" width=\"22\" height=\"22\" alt=\"{{ 'Droparea' | trans }}\"> {{ 'Drop files here or' | trans }} <a class=\"uk-form-file\">{{ 'select one' | trans }}<input type=\"file\" name=\"file\" v-el=\"select\"></a>\n    </div>\n\n    <div class=\"uk-progress\" v-show=\"progress\">\n        <div class=\"uk-progress-bar\" v-style=\"width: progress\">{{ progress }}</div>\n    </div>\n\n    <div class=\"uk-modal\" v-el=\"modal\">\n        <div class=\"uk-modal-dialog\">\n\n            <div class=\"uk-alert uk-alert-danger uk-hidden\" data-msg=\"checksum-mismatch\">\n                {{ 'The checksum of the uploaded package does not match the one from the marketplace. The file might be manipulated.' | trans }}\n            </div>\n\n            <div class=\"uk-alert uk-alert-success uk-hidden\" data-msg=\"update-available\">\n                {{ 'There is an update available for the uploaded package. Please consider installing it instead.' | trans }}\n            </div>\n\n            <div class=\"uk-grid\">\n                <div class=\"uk-width-1-1\">\n                    <img class=\"uk-align-left uk-margin-bottom-remove\" width=\"50\" height=\"50\" alt=\"{{ pkg.title }}\" v-attr=\"src: pkg.extra.image\">\n                    <h1 class=\"uk-h2 uk-margin-remove\">{{ pkg.title }}</h1>\n                    <ul class=\"uk-subnav uk-subnav-line uk-margin-top-remove\">\n                        <li>{{ pkg.author.name }}</li>\n                        <li>{{ 'Version' | trans }} {{ pkg.version }}</li>\n                    </ul>\n                </div>\n            </div>\n\n            <hr class=\"uk-grid-divider\">\n\n            <div class=\"uk-grid\">\n                <div class=\"uk-width-1-2\">\n                    <div>{{ pkg.description }}</div>\n                    <ul>\n                        <li>{{ 'Path:' | trans }} {{ pkg.name }}</li>\n                        <li>{{ 'Type:' | trans }} {{ pkg.type }}</li>\n                    </ul>\n                </div>\n            </div>\n\n            <p>\n                <button class=\"uk-button uk-button-primary\">{{ 'Install' | trans }}</button>\n                <button class=\"uk-button uk-modal-close\">{{ 'Cancel' | trans }}</button>\n            </p>\n\n        </div>\n    </div>";
	var $ = __webpack_require__(1);
	    var Vue = __webpack_require__(3);

	    module.exports = {

	        replace: true,

	        template: __vue_template__,

	        data: function () {
	            return {
	                pkg: {},
	                action: '',
	                progress: ''
	            };
	        },

	        ready: function () {

	            var settings = {
	                action: this.action,
	                type: 'json',
	                param: 'file',
	                loadstart: this.onStart,
	                progress: this.onProgress,
	                allcomplete: this.onComplete
	            };

	            UIkit.uploadSelect(this.$$.select, settings);
	            UIkit.uploadDrop(this.$$.drop, settings);

	            this.modal = UIkit.modal(this.$$.modal);
	        },

	        methods: {

	            onStart: function () {
	                this.progress = '1%';
	            },

	            onProgress: function (percent) {
	                this.progress = Math.ceil(percent) + '%';
	            },

	            onComplete: function (data) {

	                var self = this;

	                this.progress = '100%';

	                setTimeout(function (){
	                    self.progress = '';
	                }, 250);

	                if (data.error) {
	                    UIkit.notify(data.error, 'danger');
	                    return;
	                }

	                // $.post(params.api + '/package/' + data.package.name, function (info) {

	                //     var version = info.versions[data.package.version];

	                //     if (version && version.dist.shasum != data.package.shasum) {
	                //         show('checksum-mismatch', upload);
	                //     }

	                // }, 'jsonp');

	                this.modal.show();
	            }

	        }

	    };

	    Vue.component('v-upload', module.exports);
	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = jQuery;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Vue;

/***/ }
/******/ ]);