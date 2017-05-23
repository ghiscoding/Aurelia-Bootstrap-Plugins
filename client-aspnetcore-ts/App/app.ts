import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: PLATFORM.moduleName('bootstrap-plugins'), name: 'bootstrap-plugins', moduleId: './bootstrap-plugins', nav: true, title: 'Bootstrap Plugins' },
      { route: PLATFORM.moduleName('validation-form'), name: 'validation-form', moduleId: './validation-form', nav: true, title: 'Validation Form' },
      { route: '', redirect: 'validation-form' }
    ]);

    this.router = router;
  }
}
