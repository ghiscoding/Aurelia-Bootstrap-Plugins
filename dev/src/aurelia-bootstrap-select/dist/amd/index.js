define(['exports', './abp-select', './picker-config'], function (exports, _abpSelect, _pickerConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PickerConfig = exports.AbpSelectCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia, callback) {
    aurelia.globalResources('./abp-select');

    var config = new _pickerConfig.PickerConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  exports.AbpSelectCustomElement = _abpSelect.AbpSelectCustomElement;
  exports.PickerConfig = _pickerConfig.PickerConfig;
});