'use strict';

System.register(['./aba-datetime-picker'], function (_export, _context) {
  "use strict";

  var AbaDatetimePickerCustomElement;
  function configure(aurelia) {
    aurelia.globalResources('./aba-datetime-picker');
  }

  _export('configure', configure);

  return {
    setters: [function (_abaDatetimePicker) {
      AbaDatetimePickerCustomElement = _abaDatetimePicker.AbaDatetimePickerCustomElement;
    }],
    execute: function () {
      _export('AbaDatetimePickerCustomElement', AbaDatetimePickerCustomElement);
    }
  };
});