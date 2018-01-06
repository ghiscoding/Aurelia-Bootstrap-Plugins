# Aurelia-Bootstrap-Datetimepicker

### Introduction
An Aurelia Custom Element for the 3rd party addon [Eonasdan Bootstrap Datepicker](https://eonasdan.github.io/bootstrap-datetimepicker/)

### Demo page
[https://ghiscoding.github.io/Aurelia-Bootstrap-Plugins/#/aurelia/bootstrap-plugins/datetime-picker](https://ghiscoding.github.io/Aurelia-Bootstrap-Plugins/#/aurelia/bootstrap-plugins/datetime-picker)

### Screenshots

Screenshots from the demo app

![Aurelia-Bootstrap-Datetimepicker](/aurelia-bootstrap-datetimepicker/printscreen/abp-datetimepicker.jpg)

### Usage
A quick example of the code in action. Note that the value is available under the `value.bind`.
```html
<abp-datetime-picker value.bind="post.dateEntered" options.bind="{ format: 'YYYY-MM-DD' }"></abp-datetime-picker>
```

<a name="date"></a>

### Formatted Date / Date Object
For conveniencies, we provide 2 bindable attributes (both are also `two-way` binding as well). The first is for the formatted date which is available through `value.bind`, while the second binding is called via `model.bind` to deal with a standard Date Object.

**Note:** since both attributes (`value.bind`,`model.bind`) are two-way binding, it also means that both can affect the picker.

Example:

```html
<abp-datetime-picker value.bind="dateEntered" model.bind="dateObject" options.bind="{ format:'YYYY-MM-DD hh:mm' }"></abp-datetime-picker>
```

_if we use the date string '2005-05-05 10:00', the output will be (also note that I'm on the Eastern Timezone):_

```javascript
value.bind="dateEntered" // output --> 2005-05-05 10:00
model.bind="dateObject"  // output --> Thu May 05 2005 10:00:00 GMT-0400 (Eastern Daylight Time)
```

<a name="options"></a>

### Available Options
Every options of `Bootstrap Datepicker` can be call through `options.bind=""`. For the complete list, please visit the official site [Bootstrap Datepicker - Options](http://eonasdan.github.io/bootstrap-datetimepicker/Options/).

**NOTE:**
The picker options can also be defined globally through `main.js` via a `config.options` configuration, see [Global Options](#globaloption)

Examples

_from the View_
```html
<abp-datetime-picker options.bind="{ format: 'YYYY-MM-DD' }"></abp-datetime-picker>
```

_from the ViewModel_
```html
<abp-datetime-picker options.bind="pickerOptions"></abp-datetime-picker>
```
```javascript
export class Example {
    pickerOptions = {
      format: 'YYYY-MM-DD'
    };
}
```

<a name="extra"></a>

### Extra Attributes (bindable)
Some extra bindable attributes were added to the Custom Element to add extra flexibility. The way to call them is through an attribute call in the View. The list of these extras is the following
* iconBase: provide different set of icons (`font-awesome` or `glyphicon`), (default: `'glyphicon'`)
* withDateIcon: add a Bootstrap `input group` with a Calendar icon on the right of the input (default: `true`)

Example

_from the View_
```html
<abp-datetime-picker icon-base="font-awesome" with-date-icon="false"></abp-datetime-picker>
```

**NOTE:**
The extra attributes can also be defined globally through `main.js` via a `config.extra` configuration, see [Global Options](#globaloption). To know which Global Options are available take a look at the [Global Options file](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/aurelia-bootstrap-datetimepicker/src/picker-global-options.js)

<a name="methods"></a>

### Available Methods/Functions
Again every single methods which comes with `Bootstrap Datepicker` are available. For the complete list, please visit the official site [Bootstrap Datepicker - Functions](http://eonasdan.github.io/bootstrap-datetimepicker/Functions/).

To have access to the methods/functions, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_.

Example

_View (exposing the element)_
```html
<abp-datetime-picker element.bind="picker" value.bind="user.birthdate"></abp-datetime-picker>
```

_ViewModel (calling the method)_
```javascript
export class Example {
  @bindable picker;

  pickerChanged() {
    // disable Sunday & Saturday
    this.picker.methods.daysOfWeekDisabled([0,6]);
  }
}
```

<a name="events"></a>

### Available Events
Every events of `Bootstrap Datepicker` are, as no surprises, available as well. For the complete list, please visit the official site [Bootstrap Datepicker - Events](http://eonasdan.github.io/bootstrap-datetimepicker/Events/).

To have access to the `events`, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_.

**Note**
The events are called with the syntax of `onEvent` which differs from the original syntax. Example, for the `dp.change`, we would use the `onChange` event.

Example

_View (exposing the element)_
```html
<abp-datetime-picker element.bind="picker" value.bind="user.birthdate"></abp-datetime-picker>
```

_ViewModel (calling the onEvent trigger)_
```javascript
export class Example {
  @bindable picker;

  pickerChanged() {
    this.picker.events.onHide = (e) => console.log('onHide');
    this.picker.events.onShow = (e) => console.log('onShow');
    this.picker.events.onChange = (e) => console.log('onChange');
    this.picker.events.onError = (e) => console.log('onError');
    this.picker.events.onUpdate = (e) => console.log('onUpdate');
  }
}
```
In this example the element is exposed via the `picker` property (you can chose any name for this property) and the event call back is set up using the Aurelia Changed callback whose name is the property name (`picker`) prepending the word Changed (`pickerChanged()`). This function is only called once at binding and allows us to set the element events callbacks.


## Installation
You can run the examples or build your own by doing the following.

### Aurelia-CLI / Webpack
```bash
npm install --save aurelia-bootstrap-datetimepicker
```

<a name="cli"></a>

#### Aurelia-CLI
For `CLI` you will need to add (`eonasdan-bootstrap-datetimepicker` and `aurelia-bootstrap-datetimepicker`) to your `aurelia.json` file. The exported class is `abp-datetime-picker`.

```javascript
"moment",
{
  "name": "eonasdan-bootstrap-datetimepicker",
  "path": "../node_modules/eonasdan-bootstrap-datetimepicker/build",
  "main": "js/bootstrap-datetimepicker.min",
  "resources": [
    "css/bootstrap-datetimepicker.min.css"
  ]
},
{
  "name": "aurelia-bootstrap-datetimepicker",
  "path": "../node_modules/aurelia-bootstrap-datetimepicker/dist/amd",
  "main": "index",
  "resources": [
    "**/*.{css,html}"
  ]
},
```

**Note** for `moment.js` locales, if you wish to include all locales, you can include them as shown below with `min/moment-with-locales`.
```javascript
{
  "name": "moment",
  "path": "../node_modules/moment",
  "main": "min/moment-with-locales"
}
```

_index.html_
```html
<link rel="stylesheet" type="text/css"
href="../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css">
```

##### Bootstrap 4
An extra custom CSS file was added to address the Bootstrap 4 changes (until `Bootstrap-Datetimepicker` comes out with version that supports it). If you followed the instruction earlier to modify the `aurelia.json` file then it should work without any modification, if it does not then make sure to have this portion (under the `aurelia-bootstrap-datetimepicker` package):
```json
  "resources": [
    "**/*.{css,html}"
  ]
```

<a name="webpack"></a>

#### Aurelia-Webpack
`Bootstrap-Datetimepicker` and possibly others require to have the same `jQuery` accross the bundle. You will need to modify your `webpack.config.babel.js` for this to work correctly.


```diff
const ENV...
+ const ProvidePlugin = require('webpack/lib/ProvidePlugin')
+ const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
let config = generateConfig(
{
  entry: {
    'app': ['./src/main' /* this is filled by the aurelia-webpack-plugin */],
    'aurelia-bootstrap': coreBundles.bootstrap,
    'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1)
  },
  output: {
    path: outDir
  },
+  plugins: [
+   // choose the moment.js locale that you want to add, in this example here, we are adding 'en', 'fr'
+   new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
+   new ProvidePlugin({
+     $: "jquery",
+     jQuery: "jquery",
+     'window.jQuery': 'jquery',
+     'window.Tether': 'tether',
+     Tether: 'tether'
+   })
+  ],
+  resolve: {
+     alias: {
+         // Force all modules to use the same jquery version.
+         'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
+     }
+  }
},
```

<a name="mainjs"></a>

### Aurelia (main.js)
Make the plugin available globally in your `main.js` file. Please note the exported class is `abp-datetime-picker`

#### For WebPack only (main.js)
```javascript
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
```

#### CLI/WebPack (main.js)
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-datetimepicker');

  aurelia.start().then(() => aurelia.setRoot());
}
```

##### Bootstrap 4 support
An extra custom CSS file was added to address the changes (until `Bootstrap-Datetimepicker` comes out with version that supports it), you can import this custom CSS file via:
```javascript
import 'aurelia-bootstrap-datetimepicker/dist/amd/bootstrap-datetimepicker-bs4.css';

// in the main.js file change the bootstrapVersion
aurelia.use.plugin('aurelia-bootstrap-datetimepicker', config => {
  config.extra.bootstrapVersion = 4;

  // you can also change the button class, default is shown below
  config.extra.buttonClass = 'btn btn-outline-secondary';
});
```

**Note on `aurelia-webpack-plugin 2.0`**

If you started using the new `aurelia-webpack-plugin` version `2.0`, which is currently in [RC Pre-Release](https://github.com/aurelia/webpack-plugin/releases) and is already packaged in some of the [Aurelia Skeletons](https://github.com/aurelia/skeleton-navigation) (not all). You will have to use the `PLATFORM.ModuleName` wrapper. The previous code becomes:

```javascript
aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'));
```

<a name="globaloption"></a>

### Global Options
You can change any of the global options directly in the `main.js` through a `config` as shown below:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-datetimepicker', config => {
      // extra attributes, with config.extra
      config.extra.iconBase = 'glyphicon';
      config.extra.withDateIcon = true;

      // or any picker options, with config.options
      config.options.allowInputToggle = true;

      // if you use Bootstrap 4 Beta 3
      config.extra.bootstrapVersion = 4;

      // you can also change the Bootstrap 4 button class, default is shown below
      config.extra.buttonClass = 'btn btn-outline-secondary';
    });

  aurelia.start().then(() => aurelia.setRoot());
}
```

or with `aurelia-webpack-plugin 2.0` :

```javascript
export function configure(aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'), config => {
    // extra attributes, with config.extra
    config.extra.iconBase = 'font-awesome';
    config.extra.withDateIcon = true;

    // or even any picker options, with config.options
    config.options.format = 'YYYY-MM-DD';
    config.options.showTodayButton = true;
  });
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
```

To know which Global Options are available take a look at the [Global Options file](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/aurelia-bootstrap-datetimepicker/src/picker-global-options.js)

## License
[MIT License](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/LICENSE)

## Contributions/Comments
Contributions are welcome. This plugin was created to help the community (and myself), if you wish to suggest something and/or want to make a PR (Pull Request), please feel free to do so.

## Use it, like it?
You like and use an `Aurelia-Bootstrap-Plugins`, please click on the :star: and spread the word.
