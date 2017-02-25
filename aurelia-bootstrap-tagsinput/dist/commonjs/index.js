'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbaTagsInputCustomElement = undefined;
exports.configure = configure;

var _abaTagsInput = require('./aba-tags-input');

function configure(aurelia) {
  aurelia.globalResources('./aba-tags-input');
}

exports.AbaTagsInputCustomElement = _abaTagsInput.AbaTagsInputCustomElement;