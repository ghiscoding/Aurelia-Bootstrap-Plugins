'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var globalExtraOptions, globalPickerOptions;
  return {
    setters: [],
    execute: function () {
      _export('globalExtraOptions', globalExtraOptions = {
        buttonClass: 'btn btn-outline-secondary',
        bootstrapVersion: 3,
        iconBase: 'glyphicon',
        withDateIcon: true
      });

      _export('globalExtraOptions', globalExtraOptions);

      _export('globalPickerOptions', globalPickerOptions = {
        allowInputToggle: true
      });

      _export('globalPickerOptions', globalPickerOptions);
    }
  };
});