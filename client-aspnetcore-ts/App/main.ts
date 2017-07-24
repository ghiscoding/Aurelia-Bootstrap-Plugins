// we want font-awesome to load as soon as possible to show the fa-spinner
import './style.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'bootstrap';
import {Aurelia, PLATFORM} from "aurelia-framework";
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use.standardConfiguration()                
                .developmentLogging();

  aurelia.use.feature(PLATFORM.moduleName("resources/index"));
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
  aurelia.start()
         .then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}