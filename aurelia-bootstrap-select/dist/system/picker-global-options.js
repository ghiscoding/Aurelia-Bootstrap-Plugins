'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var globalExtraOptions, globalPickerOptions;
  return {
    setters: [],
    execute: function () {
      _export('globalExtraOptions', globalExtraOptions = {
        mappingDataStructure: {
          class: 'class',
          content: 'content',
          disabled: 'disabled',
          divider: 'divider',
          groupLabel: 'group',
          groupDisabled: 'disabled',
          icon: 'icon',
          maxOptions: 'maxOptions',
          option: 'option',
          subtext: 'subtext',
          style: 'style',
          title: 'title',
          tokens: 'tokens'
        }
      });

      _export('globalExtraOptions', globalExtraOptions);

      _export('globalPickerOptions', globalPickerOptions = {
        dropupAuto: true,
        showTick: true,
        width: 'auto'
      });

      _export('globalPickerOptions', globalPickerOptions);
    }
  };
});