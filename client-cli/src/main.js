import 'bootstrap';
import environment from './environment';


//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-bootstrap-datetimepicker', config => {
      // extra attributes, with config.extra
      config.extra.iconBase = 'font-awesome';
      config.extra.withDateIcon = true;

      // or even any picker options, with config.options
      config.options.format = 'YYYY-MM-DD';
      config.options.showTodayButton = true;
    })
    .plugin('aurelia-bootstrap-select')
    .plugin('aurelia-bootstrap-tagsinput');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
