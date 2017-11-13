import {AbpSelectCustomElement} from './abp-select';
import {PickerConfig} from './picker-config';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia, callback) {
  aurelia.globalResources([
    PLATFORM.moduleName('./abp-select')
  ]);

  let config = new PickerConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

export {
  AbpSelectCustomElement,
  PickerConfig
};
