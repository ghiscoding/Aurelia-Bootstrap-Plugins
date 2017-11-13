'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerConfig = exports.AbpSelectCustomElement = undefined;
exports.configure = configure;

var _abpSelect = require('./abp-select');

var _pickerConfig = require('./picker-config');

function configure(aurelia, callback) {
  aurelia.globalResources('./abp-select');

  var config = new _pickerConfig.PickerConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

exports.AbpSelectCustomElement = _abpSelect.AbpSelectCustomElement;
exports.PickerConfig = _pickerConfig.PickerConfig;