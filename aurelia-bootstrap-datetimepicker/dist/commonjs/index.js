'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbaDatetimePickerCustomElement = undefined;
exports.configure = configure;

var _abaDatetimePicker = require('./aba-datetime-picker');

function configure(aurelia) {
  aurelia.globalResources('./aba-datetime-picker');
}

exports.AbaDatetimePickerCustomElement = _abaDatetimePicker.AbaDatetimePickerCustomElement;