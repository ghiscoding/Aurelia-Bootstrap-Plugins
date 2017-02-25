define(['exports', './aba-datetime-picker'], function (exports, _abaDatetimePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AbaDatetimePickerCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.globalResources('./aba-datetime-picker');
  }

  exports.AbaDatetimePickerCustomElement = _abaDatetimePicker.AbaDatetimePickerCustomElement;
});