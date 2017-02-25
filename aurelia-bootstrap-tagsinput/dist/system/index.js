'use strict';

System.register(['./aba-tags-input'], function (_export, _context) {
  "use strict";

  var AbaTagsInputCustomElement;
  function configure(aurelia) {
    aurelia.globalResources('./aba-tags-input');
  }

  _export('configure', configure);

  return {
    setters: [function (_abaTagsInput) {
      AbaTagsInputCustomElement = _abaTagsInput.AbaTagsInputCustomElement;
    }],
    execute: function () {
      _export('AbaTagsInputCustomElement', AbaTagsInputCustomElement);
    }
  };
});