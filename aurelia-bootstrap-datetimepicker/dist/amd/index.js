define(['exports', './abp-datetime-picker'], function (exports, _abpDatetimePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AbpDatetimePickerCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.globalResources('./abp-datetime-picker');
  }

  exports.AbpDatetimePickerCustomElement = _abpDatetimePicker.AbpDatetimePickerCustomElement;
});