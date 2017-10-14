import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;
  
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'bootstrap-plugins/intro'], name: 'bootstrap-plugins/intro', title: 'Aurelia-Bootstrap-Plugins Intro', moduleId: PLATFORM.moduleName('./bootstrap-plugins/intro')},
      { route: 'bootstrap-plugins/bootstrap-select', name: 'bootstrap-plugins/bootstrap-select', title: 'Bootstrap-Select', moduleId: PLATFORM.moduleName('./bootstrap-plugins/bootstrap-select'), nav: true, settings: { childOf: 'bootstrap-plugins' }},
      { route: 'bootstrap-plugins/datetime-picker', name: 'bootstrap-plugins/datetime-picker', title: 'DateTime Picker', moduleId: PLATFORM.moduleName('./bootstrap-plugins/datetime-picker'), nav: true, settings: { childOf: 'bootstrap-plugins' }},
      { route: 'bootstrap-plugins/tags-input', name: 'bootstrap-plugins/tags-input', title: 'Tags-Input', moduleId: PLATFORM.moduleName('./bootstrap-plugins/tags-input'), nav: true, settings: { childOf: 'bootstrap-plugins' }},
      { route: 'validation-form', name: 'validation-form', title: 'Validation Form', moduleId: PLATFORM.moduleName('./bootstrap-plugins/validation-form'), nav: false }
    ]);
    // config.options.pushState = true;
    config.fallbackRoute('bootstrap-plugins/intro');

    this.router = router;
  }
}
