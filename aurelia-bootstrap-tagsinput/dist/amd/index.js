define(['exports', './aba-tags-input'], function (exports, _abaTagsInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AbaTagsInputCustomElement = undefined;
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.globalResources('./aba-tags-input');
  }

  exports.AbaTagsInputCustomElement = _abaTagsInput.AbaTagsInputCustomElement;
});