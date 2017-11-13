/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

// we want font-awesome to load as soon as possible to show the fa-spinner
import './style.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'bootstrap';

import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));

  // local libraries
  aurelia.use.feature(PLATFORM.moduleName('aurelia-bootstrap-select/src/index'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
