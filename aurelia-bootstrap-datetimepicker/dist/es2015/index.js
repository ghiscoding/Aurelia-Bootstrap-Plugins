import { AbpDatetimePickerCustomElement } from './abp-datetime-picker';
import { PickerConfig } from './picker-config';

export function configure(aurelia, callback) {
  aurelia.globalResources('./abp-datetime-picker');

  let config = new PickerConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

export { AbpDatetimePickerCustomElement, PickerConfig };