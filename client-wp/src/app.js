import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: 'bootstrap-plugins', name: 'bootstrap-plugins', moduleId: PLATFORM.moduleName('./bootstrap-plugins'), nav: true, title: 'Bootstrap Plugins' },
      { route: 'validation-form', name: 'validation-form', moduleId: PLATFORM.moduleName('./validation-form'), nav: true, title: 'Validation Form' },
      { route: '', redirect: 'bootstrap-plugins' }
    ]);

    this.router = router;
  }
}
