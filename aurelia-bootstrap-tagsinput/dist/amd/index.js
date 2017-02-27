define(['exports', './abp-tags-input'], function (exports, _abpTagsInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AbpTagsInputCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.globalResources('./abp-tags-input');
  }

  exports.AbpTagsInputCustomElement = _abpTagsInput.AbpTagsInputCustomElement;
});