define(['exports', './abp-tags-input', './picker-config'], function (exports, _abpTagsInput, _pickerConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PickerConfig = exports.AbpTagsInputCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia, callback) {
    aurelia.globalResources('./abp-tags-input');

    var config = new _pickerConfig.PickerConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  exports.AbpTagsInputCustomElement = _abpTagsInput.AbpTagsInputCustomElement;
  exports.PickerConfig = _pickerConfig.PickerConfig;
});