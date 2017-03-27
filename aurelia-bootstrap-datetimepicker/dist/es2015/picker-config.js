import { globalExtraOptions, globalPickerOptions } from './picker-global-options';

export let PickerConfig = class PickerConfig {
  constructor() {
    this.extra = globalExtraOptions;
    this.options = globalPickerOptions;
  }
};