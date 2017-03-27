import { AbpTagsInputCustomElement } from './abp-tags-input';
import { PickerConfig } from './picker-config';

export function configure(aurelia, callback) {
  aurelia.globalResources('./abp-tags-input');

  let config = new PickerConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

export { AbpTagsInputCustomElement, PickerConfig };