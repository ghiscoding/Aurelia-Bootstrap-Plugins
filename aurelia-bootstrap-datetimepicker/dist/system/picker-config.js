'use strict';

System.register(['./picker-global-options'], function (_export, _context) {
  "use strict";

  var globalExtraOptions, globalPickerOptions, PickerConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_pickerGlobalOptions) {
      globalExtraOptions = _pickerGlobalOptions.globalExtraOptions;
      globalPickerOptions = _pickerGlobalOptions.globalPickerOptions;
    }],
    execute: function () {
      _export('PickerConfig', PickerConfig = function PickerConfig() {
        _classCallCheck(this, PickerConfig);

        this.extra = globalExtraOptions;
        this.options = globalPickerOptions;
      });

      _export('PickerConfig', PickerConfig);
    }
  };
});