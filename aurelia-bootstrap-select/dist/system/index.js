'use strict';

System.register(['./abp-select', './picker-config'], function (_export, _context) {
  "use strict";

  var AbpSelectCustomElement, PickerConfig;
  function configure(aurelia, callback) {
    aurelia.globalResources('./abp-select');

    var config = new PickerConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_abpSelect) {
      AbpSelectCustomElement = _abpSelect.AbpSelectCustomElement;
    }, function (_pickerConfig) {
      PickerConfig = _pickerConfig.PickerConfig;
    }],
    execute: function () {
      _export('AbpSelectCustomElement', AbpSelectCustomElement);

      _export('PickerConfig', PickerConfig);
    }
  };
});