import {globalExtraOptions, globalPickerOptions} from './picker-global-options';

export class PickerConfig {
  extra: any;
  options: any;

  constructor() {
    this.extra = globalExtraOptions;
    this.options = globalPickerOptions;
  }
}
