import {FrameworkConfiguration, PLATFORM} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/bootstrap-tooltip'),
    PLATFORM.moduleName('./elements/loading-indicator'),
    PLATFORM.moduleName('./value-converters/date-format'),
    PLATFORM.moduleName('./value-converters/stringify')
  ]);
}
