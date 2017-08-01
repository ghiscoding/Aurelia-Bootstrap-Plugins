import {globalExtraOptions, globalBloodhoundOptions, globalTypeaheadOptions} from './global-options';

export class Config {
  constructor() {
    this.elementOptions = globalElementOptions;
    this.bloodhoundOptions = globalBloodhoundOptions;
    this.typeaheadOptions = globalTypeaheadOptions;
  }
}
