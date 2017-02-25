export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: 'bootstrap-addons', name: 'bootstrap-addons', moduleId: './bootstrap-addons', nav: true, title: 'Bootstrap-Addons' },
      { route: '', redirect: 'bootstrap-addons' }
    ]);

    this.router = router;
  }
}
