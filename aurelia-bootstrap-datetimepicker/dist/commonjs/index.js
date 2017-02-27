'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbpDatetimePickerCustomElement = undefined;
exports.configure = configure;

var _abpDatetimePicker = require('./abp-datetime-picker');

function configure(aurelia) {
  aurelia.globalResources('./abp-datetime-picker');
}

exports.AbpDatetimePickerCustomElement = _abpDatetimePicker.AbpDatetimePickerCustomElement;