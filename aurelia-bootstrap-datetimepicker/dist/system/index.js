'use strict';

System.register(['./abp-datetime-picker', './picker-config'], function (_export, _context) {
  "use strict";

  var AbpDatetimePickerCustomElement, PickerConfig;
  function configure(aurelia, callback) {
    aurelia.globalResources('./abp-datetime-picker');

    var config = new PickerConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_abpDatetimePicker) {
      AbpDatetimePickerCustomElement = _abpDatetimePicker.AbpDatetimePickerCustomElement;
    }, function (_pickerConfig) {
      PickerConfig = _pickerConfig.PickerConfig;
    }],
    execute: function () {
      _export('AbpDatetimePickerCustomElement', AbpDatetimePickerCustomElement);

      _export('PickerConfig', PickerConfig);
    }
  };
});