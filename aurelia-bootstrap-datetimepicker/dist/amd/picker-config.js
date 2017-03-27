define(['exports', './picker-global-options'], function (exports, _pickerGlobalOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PickerConfig = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PickerConfig = exports.PickerConfig = function PickerConfig() {
    _classCallCheck(this, PickerConfig);

    this.extra = _pickerGlobalOptions.globalExtraOptions;
    this.options = _pickerGlobalOptions.globalPickerOptions;
  };
});