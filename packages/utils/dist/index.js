/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   aheadDaysToFormatterString: () => (/* reexport safe */ _src_time__WEBPACK_IMPORTED_MODULE_0__.aheadDaysToFormatterString),\n/* harmony export */   getCurrentTimeStamp: () => (/* reexport safe */ _src_time__WEBPACK_IMPORTED_MODULE_0__.getCurrentTimeStamp)\n/* harmony export */ });\n/* harmony import */ var _src_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/time */ \"./src/time.js\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://@cz-js/utils/./index.js?");

/***/ }),

/***/ "./src/time.js":
/*!*********************!*\
  !*** ./src/time.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   aheadDaysToDate: () => (/* binding */ aheadDaysToDate),\n/* harmony export */   aheadDaysToFormatterString: () => (/* binding */ aheadDaysToFormatterString),\n/* harmony export */   aheadMonthsToFormatterString: () => (/* binding */ aheadMonthsToFormatterString),\n/* harmony export */   aheadTimeToDate: () => (/* binding */ aheadTimeToDate),\n/* harmony export */   aheadTimeToFormatterString: () => (/* binding */ aheadTimeToFormatterString),\n/* harmony export */   formatterToString: () => (/* binding */ formatterToString),\n/* harmony export */   getCurrentTimeStamp: () => (/* binding */ getCurrentTimeStamp),\n/* harmony export */   getCurrentTimeString: () => (/* binding */ getCurrentTimeString),\n/* harmony export */   transformTimeStringToDate: () => (/* binding */ transformTimeStringToDate),\n/* harmony export */   transformTimeStringToTimeStamp: () => (/* binding */ transformTimeStringToTimeStamp)\n/* harmony export */ });\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n/**\r\n * 获取当前时间戳，默认毫秒\r\n * @param {Number} type  1.毫秒 2.秒\r\n * @returns\r\n */\r\nconst getCurrentTimeStamp = (type = 1) => {\r\n  const time = new Date().getTime()\r\n  return type === 1 ? time : parseInt(time / 1000)\r\n}\r\n\r\n/**\r\n * 获取当前时间字符串，默认格式：yyyy-MM-DD HH:mm:ss\r\n * @param {*} formatter 要转换的格式，默认：yyyy-MM-DD HH:mm:ss\r\n * @returns\r\n */\r\nconst getCurrentTimeString = (formatter = 'yyyy-MM-DD HH:mm:ss') => {\r\n  return moment__WEBPACK_IMPORTED_MODULE_0___default()().format(formatter)\r\n}\r\n\r\n/**\r\n * date/timeStamp(毫秒)转指定字符串格式\r\n * @param {*} value 要转换的值\r\n * @param {*} formatter 要转换的格式，默认：yyyy-MM-DD HH:mm:ss\r\n * @returns\r\n */\r\nconst formatterToString = (value, formatter = 'yyyy-MM-DD HH:mm:ss') => {\r\n  return moment__WEBPACK_IMPORTED_MODULE_0___default()(value).format(formatter)\r\n}\r\n\r\n/**\r\n * 时间字符串转时间戳(秒)\r\n * @param {String} timeString 要转换的时间字符串\r\n * @returns\r\n */\r\nconst transformTimeStringToTimeStamp = (timeString = '') => {\r\n  return timeString ? moment__WEBPACK_IMPORTED_MODULE_0___default()(timeString).unix() : 0\r\n}\r\n\r\n/**\r\n * 时间字符串转日期\r\n * @param {String} timeString 要转换的时间字符串\r\n * @returns\r\n */\r\nconst transformTimeStringToDate = (timeString = '') => {\r\n  return timeString ? new Date(timeString) : null\r\n}\r\n\r\n/**\r\n * 获取N(年、月、日、星期、小时、分钟、秒)前的时间字符串\r\n * @param {Number} times N(年 - 1、月 - 2、日 - 3、星期 - 4、小时 - 5、分钟 - 6、秒 - 7)前，默认天\r\n * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起\r\n * @param {} type: 年-1、月-2、日-3、星期-4、小时-5、分钟-6、秒-7；\r\n * @returns\r\n */\r\nconst aheadTimeToFormatterString = function (\r\n  times,\r\n  fromZero = 1,\r\n  { type = 3, formatter = 'yyyy-MM-DD HH:mm:ss', isFormatter = true } = {}\r\n) {\r\n  let timesType = 'days'\r\n  switch (type) {\r\n    case 1:\r\n      timesType = 'years'\r\n      break\r\n    case 2:\r\n      timesType = 'months'\r\n      break\r\n    case 3:\r\n      timesType = 'days'\r\n      break\r\n    case 4:\r\n      timesType = 'weeks'\r\n      break\r\n    case 5:\r\n      timesType = 'hours'\r\n      break\r\n    case 6:\r\n      timesType = 'minutes'\r\n      break\r\n    case 7:\r\n      timesType = 'seconds'\r\n      break\r\n    default:\r\n      break\r\n  }\r\n  if (fromZero === 1) {\r\n    if (isFormatter) {\r\n      return moment__WEBPACK_IMPORTED_MODULE_0___default()()\r\n        .startOf('day')\r\n        .subtract(times, timesType)\r\n        .format(formatter)\r\n    } else return moment__WEBPACK_IMPORTED_MODULE_0___default()().startOf('day').subtract(times, timesType)\r\n  } else if (fromZero === 2) {\r\n    if (isFormatter) {\r\n      return moment__WEBPACK_IMPORTED_MODULE_0___default()().endOf('day').subtract(times, timesType).format(formatter)\r\n    } else return moment__WEBPACK_IMPORTED_MODULE_0___default()().endOf('day').subtract(times, timesType)\r\n  } else {\r\n    if (isFormatter) {\r\n      return moment__WEBPACK_IMPORTED_MODULE_0___default()().subtract(times, timesType).format(formatter)\r\n    } else return moment__WEBPACK_IMPORTED_MODULE_0___default()().subtract(times, timesType)\r\n  }\r\n}\r\n\r\n/**\r\n * 获取N(年、月、日、星期、小时、分钟、秒)前的时间对象\r\n * @param {Number} times N(年 - 1、月 - 2、日 - 3、星期 - 4、小时 - 5、分钟 - 6、秒 - 7)前，默认天\r\n * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起\r\n * @returns\r\n */\r\nconst aheadTimeToDate = function (times, fromZero = 1, { type = 3 } = {}) {\r\n  return aheadTimeToFormatterString(times, fromZero, {\r\n    isFormatter: false,\r\n    type\r\n  })\r\n}\r\n\r\n/**\r\n * 获取N月前的时间字符串\r\n * @param {Number} months N月前\r\n * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起\r\n * @param {String} formatter 要转换的字符串格式，默认 yyyy-MM-DD HH:mm:ss\r\n * @returns\r\n */\r\nconst aheadMonthsToFormatterString = function (\r\n  months,\r\n  fromZero = 1,\r\n  formatter = 'yyyy-MM-DD HH:mm:ss'\r\n) {\r\n  return aheadTimeToFormatterString(months, fromZero, { formatter, type: 2 })\r\n}\r\n\r\n/**\r\n * 获取N天前的时间字符串\r\n * @param {Number} days N天前\r\n * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起\r\n * @param {String} formatter 要转换的字符串格式，默认 yyyy-MM-DD HH:mm:ss\r\n * @returns\r\n */\r\nconst aheadDaysToFormatterString = function (\r\n  days,\r\n  fromZero = 1,\r\n  formatter = 'yyyy-MM-DD HH:mm:ss'\r\n) {\r\n  return aheadTimeToFormatterString(days, fromZero, { formatter, type: 3 })\r\n}\r\n\r\n/**\r\n * 获取N天前的时间字符串\r\n * @param {Number} days N天前\r\n * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起\r\n * @param {String} formatter 要转换的字符串格式，默认 yyyy-MM-DD HH:mm:ss\r\n * @returns\r\n */\r\nconst aheadDaysToDate = function (days, fromZero = 1) {\r\n  return aheadTimeToDate(days, fromZero, { type: 3 })\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://@cz-js/utils/./src/time.js?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = moment;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;