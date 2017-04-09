export function configure(config) {
  config.globalResources([
    './elements/bselect',
    './elements/bootstrap-select',
    //'./behaviors/optional.js',
    './value-converters/stringify'
  ]);
}