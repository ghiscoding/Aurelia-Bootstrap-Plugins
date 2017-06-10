// we want font-awesome to load as soon as possible to show the fa-spinner
import '../static/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'babel-polyfill';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));
  aurelia.use.feature(PLATFORM.moduleName('resources/index'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'), config => {
    // extra attributes, with config.extra
    config.extra.iconBase = 'font-awesome';
    config.extra.withDateIcon = true;

    // or even any picker options, with config.options
    config.options.format = 'YYYY-MM-DD';
    config.options.showTodayButton = true;
  });
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-tagsinput'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
