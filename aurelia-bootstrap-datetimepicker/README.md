# Aurelia-Bootstrap-Datetimepicker

### Introduction
An Aurelia Custom Element for the 3rd party addon [Eonasdan Bootstrap Datepicker](https://eonasdan.github.io/bootstrap-datetimepicker/)

### Usage
A quick example of the code in action. Note that the value is available under the `value.bind`.
```html
<aba-datetime-picker value.bind="post.dateEntered" format="YYYY-MM-DD"></aba-datetime-picker>
```

### Available Attributes/Options
Every single options that are part of `Bootstrap Datepicker` are available as bindable or as regular attributes. For the complete list, please visit the official site [Bootstrap Datepicker - Options](http://eonasdan.github.io/bootstrap-datetimepicker/Options/).
There is 2 ways to call options (with a `bind` attribute or as a regular attribute).

Example

_regular attribute (View)_
```html
<aba-datetime-picker format="YYYY-MM-DD"></aba-datetime-picker>
```

_bind attribute (View + ViewModel)_
```html
<aba-datetime-picker format.bind="pickerFormat"></aba-datetime-picker>
```
```javascript
export class Example {
    pickerFormat = "YYYY-MM-DD";
}
```

### Available Methods/Functions
Again every single methods which comes with `Bootstrap Datepicker` are available. For the complete list, please visit the official site [Bootstrap Datepicker - Functions](http://eonasdan.github.io/bootstrap-datetimepicker/Functions/). 

To have access to the methods/functions, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_. 

Example

_View (exposing the element)_
```html
<aba-datetime-picker element.bind="picker" value.bind="user.birthdate" format="YYYY-MM-DD"></aba-datetime-picker>
```

_ViewModel (calling the method)_
```javascript
export class Example {
  pickerChanged() {
    // disable Sunday & Saturday
    this.picker.methods.daysOfWeekDisabled([0,6]);
  }
}
```

### Available Events
Every events of `Bootstrap Datepicker` are, as no surprises, available as well. For the complete list, please visit the official site [Bootstrap Datepicker - Events](http://eonasdan.github.io/bootstrap-datetimepicker/Events/). 

To have access to the `events`, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_. 

**Note**
The events are called with the syntax of `onEvent` which differs from the original syntax. Example, for the `dp.change`, we would use the `onChange` event.

Example

_View (exposing the element)_
```html
<aba-datetime-picker element.bind="picker" value.bind="user.birthdate" format="YYYY-MM-DD"></aba-datetime-picker>
```

_ViewModel (calling the onEvent trigger)_
```javascript
export class Example {
  pickerChanged() {
    this.picker.events.onHide = (e) => console.log('onHide');
    this.picker.events.onShow = (e) => console.log('onShow');
    this.picker.events.onChange = (e) => console.log('onChange');
    this.picker.events.onError = (e) => console.log('onError');
    this.picker.events.onUpdate = (e) => console.log('onUpdate');
  }
}
```

## Installation
You can run the examples or build your own by doing the following.

### Aurelia-CLI / Webpack
```bash
npm install --save aurelia-bootstrap-datetimepicker
```
#### Aurelia-CLI
For `CLI` you will need to add (`aurelia-bootstrap-datetimepicker`) to your `aurelia.json` file. The exported class is `aba-datetime-picker`.
```javascript
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
  "resources": ["**/*.{css,html}"]
},
```

_index.html_
```html
<link rel="stylesheet" type="text/css" 
href="../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css">
```

#### Aurelia-Webpack
`Bootstrap-Datetimepicker` and possibly others require to have the same `jQuery` accross the bundle. You will need to modify your `webpack.config.babel.js` for this to work correctly.


```javascript
const ENV...
// add the following 
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')

...
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
  // ADD THE FOLLOWING (start)
  plugins: [
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery',
      'window.Tether': 'tether',
      Tether: 'tether'
    })
  ],
  resolve: {
      alias: {
          // Force all modules to use the same jquery version.
          'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
      }
  }
  // ADD THE FOLLOWING (end)
},
```

#### Aurelia (main)
Make the plugin available globally in your `main.js` file. Please note the exported class is `aba-tags-input` (`aba` stands for `Aurelia-Bootstrap-Addon`)

```javascript
// for WebPack only, also import CSS 
// import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-datetimepicker')
    .feature('resources');

  aurelia.start().then(() => aurelia.setRoot());
}
```

### License
[MIT License](https://github.com/ghiscoding/Aurelia-Bootstrap-Addons/blob/master/LICENSE)