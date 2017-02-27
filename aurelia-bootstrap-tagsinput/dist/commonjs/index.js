'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbpTagsInputCustomElement = undefined;
exports.configure = configure;

var _abpTagsInput = require('./abp-tags-input');

function configure(aurelia) {
  aurelia.globalResources('./abp-tags-input');
}

exports.AbpTagsInputCustomElement = _abpTagsInput.AbpTagsInputCustomElement;