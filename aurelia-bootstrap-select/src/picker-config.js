import {globalExtraOptions, globalPickerOptions} from './picker-global-options';

export class PickerConfig {
  constructor() {
    this.extra = globalExtraOptions;
    this.options = globalPickerOptions;
  }
}
