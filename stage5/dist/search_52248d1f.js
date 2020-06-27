/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "_" + {"2":"fd0c53fb"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "common", function() { return common; });
function common() {
  return 'this is common';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(0);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = library_3f565260;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(2))(4);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/image-webpack-loader/index.js):\nError: 'E:\\web\\jkwebpack\\stage5\\node_modules\\pngquant-bin\\vendor\\pngquant.exe' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���\r\n���������ļ���\r\n\n    at _errnoException (util.js:1022:11)\n    at WriteWrap.afterWrite [as oncomplete] (net.js:880:14)");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/image-webpack-loader/index.js):\nError: 'E:\\web\\jkwebpack\\stage5\\node_modules\\pngquant-bin\\vendor\\pngquant.exe' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���\r\n���������ļ���\r\n\n    at _errnoException (util.js:1022:11)\n    at WriteWrap.afterWrite [as oncomplete] (net.js:880:14)");

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: delegated ./node_modules/react/index.js from dll-reference library_3f565260
var reactfrom_dll_reference_library_3f565260 = __webpack_require__(1);
var reactfrom_dll_reference_library_3f565260_default = /*#__PURE__*/__webpack_require__.n(reactfrom_dll_reference_library_3f565260);

// EXTERNAL MODULE: delegated ./node_modules/react-dom/index.js from dll-reference library_3f565260
var react_domfrom_dll_reference_library_3f565260 = __webpack_require__(3);
var react_domfrom_dll_reference_library_3f565260_default = /*#__PURE__*/__webpack_require__.n(react_domfrom_dll_reference_library_3f565260);

// EXTERNAL MODULE: ./src/search/search.less
var search = __webpack_require__(4);

// EXTERNAL MODULE: ./src/search/img/hash.png
var hash = __webpack_require__(5);
var hash_default = /*#__PURE__*/__webpack_require__.n(hash);

// EXTERNAL MODULE: ./src/search/img/seat.png
var seat = __webpack_require__(6);
var seat_default = /*#__PURE__*/__webpack_require__.n(seat);

// EXTERNAL MODULE: ./src/common/util.js
var util = __webpack_require__(0);

// CONCATENATED MODULE: ./src/search/tree-shaking.js
function _templateObject() {
  var data = _taggedTemplateLiteral(["\u53BB\u9664\u6253\u5305\u540E__webpack_require__\u8FD9\u6837\u7684\u95ED\u5305\u6253\u5305\u6A21\u5757\u65B9\u5F0F\uFF0C\u9759\u6001\u89E3\u6790\u6A21\u5757\u4F9D\u8D56\u5F15\u7528\u987A\u5E8F\uFF0C\n    \u6253\u5305\u51FA\u987A\u5E8F\u4F9D\u8D56\u6A21\u5757\uFF0Ccommonjs\u7684\u52A8\u6001\u5F15\u5165\u673A\u5236\u4E0D\u9002\u7528\uFF0Cwebpack4\u4E2Dmode\u4E3Aproduction\u81EA\u52A8\u4F1AscopeHoisting\uFF0C"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function treeShaking() {
  return "\u6447\u6811\u4F18\u5316\uFF0C\u5982\u679C\u6A21\u5757\u7684\u65B9\u6CD5\u6CA1\u6709\u7528\u5230\uFF0C\n    \u5219\u64E6\u9664\u8FD9\u6837\u65B9\u6CD5,webpack4\u4E2Dmode\u4E3Aproduction\u81EA\u52A8\u4F1AtreeShaking";
}
function scopeHoisting() {
  retutn(_templateObject());
}
// CONCATENATED MODULE: ./src/search/index.js


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var search_Search = /*#__PURE__*/function (_React$Component) {
  _inherits(Search, _React$Component);

  var _super = _createSuper(Search);

  function Search() {
    var _this;

    _classCallCheck(this, Search);

    _this = _super.apply(this, arguments);
    _this.state = {
      Text: null
    };
    return _this;
  }

  _createClass(Search, [{
    key: "loadJs",
    value: function loadJs() {
      var _this2 = this;

      __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, 7)).then(function (Text) {
        _this2.setState({
          Text: Text["default"]
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var Text = this.state.Text;
      return /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement("div", null, Text ? /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement(Text, null) : null, /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement("div", {
        className: "search"
      }, "ejs\u8BED\u6CD5\u7684\u4F7F\u7528"), /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement("div", null, treeShaking()), /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement("img", {
        src: hash_default.a
      }), /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement("img", {
        src: seat_default.a
      }), /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement("button", {
        onClick: this.loadJs.bind(this)
      }, "\u52A8\u6001\u52A0\u8F7Djs"));
    }
  }]);

  return Search;
}(reactfrom_dll_reference_library_3f565260_default.a.Component);

react_domfrom_dll_reference_library_3f565260_default.a.render( /*#__PURE__*/reactfrom_dll_reference_library_3f565260_default.a.createElement(search_Search, null), document.getElementById('root'));

/***/ })
/******/ ]);