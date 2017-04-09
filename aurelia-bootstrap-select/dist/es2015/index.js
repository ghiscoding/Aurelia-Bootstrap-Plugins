import { AbpSelectCustomElement } from './abp-select';
import { PickerConfig } from './picker-config';

export function configure(aurelia, callback) {
  aurelia.globalResources('./abp-select');

  let config = new PickerConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

export { AbpSelectCustomElement, PickerConfig };