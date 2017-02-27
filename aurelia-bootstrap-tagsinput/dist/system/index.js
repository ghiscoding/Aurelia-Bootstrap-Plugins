'use strict';

System.register(['./abp-tags-input'], function (_export, _context) {
  "use strict";

  var AbpTagsInputCustomElement;
  function configure(aurelia) {
    aurelia.globalResources('./abp-tags-input');
  }

  _export('configure', configure);

  return {
    setters: [function (_abpTagsInput) {
      AbpTagsInputCustomElement = _abpTagsInput.AbpTagsInputCustomElement;
    }],
    execute: function () {
      _export('AbpTagsInputCustomElement', AbpTagsInputCustomElement);
    }
  };
});