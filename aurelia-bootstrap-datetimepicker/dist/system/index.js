'use strict';

System.register(['./abp-datetime-picker'], function (_export, _context) {
  "use strict";

  var AbpDatetimePickerCustomElement;
  function configure(aurelia) {
    aurelia.globalResources('./abp-datetime-picker');
  }

  _export('configure', configure);

  return {
    setters: [function (_abpDatetimePicker) {
      AbpDatetimePickerCustomElement = _abpDatetimePicker.AbpDatetimePickerCustomElement;
    }],
    execute: function () {
      _export('AbpDatetimePickerCustomElement', AbpDatetimePickerCustomElement);
    }
  };
});