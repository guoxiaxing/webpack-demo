/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./loaders/inline-loader.js!./src/a.js":
/*!*********************************************!*
  !*** ./loaders/inline-loader.js!./src/a.js ***!
  \*********************************************/
/***/ ((module) => {

eval("module.exports = \"loader-test\";\n\n\n//# sourceURL=webpack://webpack-loader/./src/a.js?./loaders/inline-loader.js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*
  !*** ./src/index.js ***!
  \**********************/
eval("// 行内loader\n// -! 不会让文件再通过pre+normal loader再去处理\n// ! 不要normal\n// !! 什么都不要\nconst a = __webpack_require__(/*! !!inline-loader!./a.js */ \"./loaders/inline-loader.js!./src/a.js\");\nconsole.log(\"index\");\nconsole.log(a);\n\n\n//# sourceURL=webpack://webpack-loader/./src/index.js?");
})();

/******/ })()
;