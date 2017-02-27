export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: 'bootstrap-plugins', name: 'bootstrap-plugins', moduleId: './bootstrap-plugins', nav: true, title: 'Bootstrap Plugins' },
      { route: '', redirect: 'bootstrap-plugins' }
    ]);

    this.router = router;
  }
}
