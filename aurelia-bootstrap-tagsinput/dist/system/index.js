'use strict';

System.register(['./abp-tags-input', './picker-config'], function (_export, _context) {
  "use strict";

  var AbpTagsInputCustomElement, PickerConfig;
  function configure(aurelia, callback) {
    aurelia.globalResources('./abp-tags-input');

    var config = new PickerConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_abpTagsInput) {
      AbpTagsInputCustomElement = _abpTagsInput.AbpTagsInputCustomElement;
    }, function (_pickerConfig) {
      PickerConfig = _pickerConfig.PickerConfig;
    }],
    execute: function () {
      _export('AbpTagsInputCustomElement', AbpTagsInputCustomElement);

      _export('PickerConfig', PickerConfig);
    }
  };
});