define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var UtilService = exports.UtilService = function () {
    function UtilService() {
      _classCallCheck(this, UtilService);
    }

    UtilService.prototype.isArrayEqual = function isArrayEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };

    UtilService.prototype.isEqual = function isEqual(a, b) {
      if (Array.isArray(a)) {
        return this.isArrayEqual(a, b);
      }
      return a === b;
    };

    UtilService.prototype.isObjectArray = function isObjectArray(inputArrray) {
      return Array.isArray(inputArrray) && inputArrray.length > 0 && _typeof(inputArrray[0]) === 'object';
    };

    UtilService.prototype.isObject = function isObject(arg) {
      return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object';
    };

    UtilService.prototype.isString = function isString(arg) {
      return typeof arg === 'string' || arg instanceof String;
    };

    UtilService.prototype.isStringArray = function isStringArray(inputArrray) {
      return Array.isArray(inputArrray) && inputArrray.length > 0 && typeof inputArrray[0] === 'string';
    };

    UtilService.prototype.parseBool = function parseBool(value) {
      return (/^(true|1)$/i.test(value)
      );
    };

    UtilService.prototype.parseBoolOrTrueOnEmpty = function parseBoolOrTrueOnEmpty(value) {
      return value === undefined || value === '' ? true : this.parseBool(value);
    };

    return UtilService;
  }();
});