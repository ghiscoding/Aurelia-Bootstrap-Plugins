# Aurelia-Bootstrap-Plugins

### Introduction
`Aurelia-Bootstrap-Plugins` was coded to bridge with a set of commonly used 3rd party Bootstrap addons. The goal of these Plugins is to support, as much as possible, the full suite of (`options`, `methods` & `events`) from their original 3rd party addons while easily using them in Aurelia.

### Demo page
[https://ghiscoding.github.io/Aurelia-Bootstrap-Plugins/](https://ghiscoding.github.io/Aurelia-Bootstrap-Plugins/)

### Available plugins
* [Aurelia-Bootstrap-Datetimepicker](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/tree/master/aurelia-bootstrap-datetimepicker) on [NPM](https://www.npmjs.com/package/aurelia-bootstrap-datetimepicker) / source [Eonasdan Bootstrap Datepicker](https://eonasdan.github.io/bootstrap-datetimepicker/)
* [Aurelia-Bootstrap-Tagsinput](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/tree/master/aurelia-bootstrap-tagsinput) on [NPM](https://www.npmjs.com/package/aurelia-bootstrap-tagsinput) / source [Bootstrap Tags Input](http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/)
* [Aurelia-Bootstrap-Select](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/tree/master/aurelia-bootstrap-select) on [NPM](https://www.npmjs.com/package/aurelia-bootstrap-select) / source [Bootstrap-Select](http://silviomoreto.github.io/bootstrap-select/)

### Available plugins (separate module)
* [Aurelia-Slickgrid](https://github.com/ghiscoding/aurelia-slickgrid) on [NPM](https://www.npmjs.com/package/aurelia-slickgrid) / source [Slickgrid](https://github.com/mleibman/SlickGrid)

### Planned plugins
* `Aurelia-Bootstrap-Typeahead` / source [Typeahead.js](http://twitter.github.io/typeahead.js/examples/)
  * got no time to work on this, it is **not coming anytime soon**, however I do have a working proof of concept with remote/prefetch, just no time to finish it.


## Samples
A quick Aurelia skeleton for `CLI`, `WebPack` and the all new `ASP.Net Core WebPack 2.x (Jods new version)` were put in place to demonstrate all the currently available plugins usage of `Aurelia-Bootstrap-Plugins`. All samples are configured to run at [http://localhost:9000](http://localhost:9000)

_`npm install` can be replaced by `yarn install` if you prefer `yarn`_

#### Aurelia-CLI
```bash
git clone https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins
cd client-cli
npm install # or: yarn install
au run --watch
```

#### Aurelia-Webpack
Uses `Aurelia-Navigation-Skeleton` which is based on the new [Jods Aurelia-WebPack 2.x base](https://github.com/jods4/aurelia-webpack-build/tree/master/demos)
```bash
git clone https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins
cd client-wp
npm install # or: yarn install
npm start # or: yarn start
```

#### Aurelia ASP.Net Core - WebPack (typescript)
This is based on the new [Jods Aurelia-WebPack 2.x base](https://github.com/jods4/aurelia-webpack-build/tree/master/demos/06-ASPNET), please make sure to read his [Wiki - Getting Started](https://github.com/jods4/aurelia-webpack-build/wiki/Getting-started)
```bash
git clone https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins
cd client-aspnetcore-ts
npm install # or: yarn install
set ASPNETCORE_ENVIRONMENT=Development
dotnet restore
dotnet watch run
```

### License
[MIT License](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/LICENSE)

## Contributions/Comments
Contributions are welcome. This plugin was created to help the community (and myself), if you wish to suggest something and/or want to make a PR (Pull Request), please feel free to do so.

## Use it, like it?
You like and use an `Aurelia-Bootstrap-Plugins`, don't forget to upvote :star: and spread the word.

## Like my work?
If you like my work, you can also support me with caffeine :smile:
[Buy Me a Coffee](https://ko-fi.com/N4N679OT)
