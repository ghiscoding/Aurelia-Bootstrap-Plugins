'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerConfig = exports.AbpTagsInputCustomElement = undefined;
exports.configure = configure;

var _abpTagsInput = require('./abp-tags-input');

var _pickerConfig = require('./picker-config');

function configure(aurelia, callback) {
  aurelia.globalResources('./abp-tags-input');

  var config = new _pickerConfig.PickerConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

exports.AbpTagsInputCustomElement = _abpTagsInput.AbpTagsInputCustomElement;
exports.PickerConfig = _pickerConfig.PickerConfig;