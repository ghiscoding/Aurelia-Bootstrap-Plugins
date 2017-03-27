define(['exports', './abp-datetime-picker', './picker-config'], function (exports, _abpDatetimePicker, _pickerConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PickerConfig = exports.AbpDatetimePickerCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia, callback) {
    aurelia.globalResources('./abp-datetime-picker');

    var config = new _pickerConfig.PickerConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  exports.AbpDatetimePickerCustomElement = _abpDatetimePicker.AbpDatetimePickerCustomElement;
  exports.PickerConfig = _pickerConfig.PickerConfig;
});