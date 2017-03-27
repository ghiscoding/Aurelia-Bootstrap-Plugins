'use strict';

System.register(['./picker-global-options'], function (_export, _context) {
  "use strict";

  var pickerGlobalOptions, PickerConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_pickerGlobalOptions) {
      pickerGlobalOptions = _pickerGlobalOptions.pickerGlobalOptions;
    }],
    execute: function () {
      _export('PickerConfig', PickerConfig = function PickerConfig() {
        _classCallCheck(this, PickerConfig);

        this.options = pickerGlobalOptions;
      });

      _export('PickerConfig', PickerConfig);
    }
  };
});