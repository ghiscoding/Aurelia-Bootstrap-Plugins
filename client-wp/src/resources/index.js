import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/abp-typeahead'),
    PLATFORM.moduleName('./elements/loading-indicator'),
    PLATFORM.moduleName('./value-converters/stringify')
  ]);
}
