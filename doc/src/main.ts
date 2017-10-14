/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner

import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import 'bootstrap'; // importing bootstrap.js

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'), config => {
    // extra attributes, with config.extra
    config.extra.iconBase = 'glyphicon';
    
    // or even any picker options, with config.options
    config.options.format = 'YYYY-MM-DD';
  });
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-tagsinput'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
