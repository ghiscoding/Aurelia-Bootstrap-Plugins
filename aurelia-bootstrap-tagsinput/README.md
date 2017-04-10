# Aurelia-Bootstrap-Tagsinput

### Introduction
An Aurelia Custom Element for the 3rd party addon [Bootstrap Tags Input](https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/)

### Screenshots
Screenshots from the demo app

![Aurelia-Bootstrap-Tagsinput](/aurelia-bootstrap-tagsinput/printscreen/abp-tagsinput.jpg)

### Usage
A quick example of the code in action. Note that the value is available under the `value.bind`.

```html
<abp-tags-input element.bind="tag" value.bind="post.categories"></abp-tags-input>
```

### Available Options
Every options of `Bootstrap Tags Input` can be called through `options.bind=""`. For the complete list, please visit the official site [Bootstrap Tags Input - Options](http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/#options).

**NOTE:** 
The picker options can also be defined globally through `main.js` via a `config.options` configuration, see [Global Options](#globaloption)

Examples

_regular attribute (View)_

```html
<abp-tags-input item-value="id" options.bind="{ itemText: 'label' }"></abp-tags-input>
```

_from the ViewModel_

```html
<abp-tags-input options.bind="pickerOptions"></abp-tags-input>
```

```javascript
export class Example {
  pickerOptions = {
    itemText: 'label'
  }
}
```

<a name="methods"></a>

### Available Methods/Functions
Again every single methods which comes with `Bootstrap Tags Input` are available. For the complete list, please visit the official site [Bootstrap Tags Input - Functions](http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/#methods). 

To have access to the methods/functions, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_. 

Example

_View (exposing the element)_

```html
<abp-tags-input element.bind="tag" value.bind="post.categories"></abp-tags-input>
```

_ViewModel (calling the method)_

```javascript
export class Example {
  @bindable tag;

  tagChanged() {
    this.tag.methods.add('tag1');
  }
}
```

<a name="events"></a>

### Available Events
Every events of `Bootstrap Tags Input` are, as no surprises, available as well. For the complete list, please visit the official site [Bootstrap Tags Input - Events](http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/#events). 

To have access to the `events`, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_. 

**Note**
The events are called with the syntax of `onEvent` which differs from the original syntax. Example, for the `beforeItemAdd`, we would use the `onBeforeItemAdd` event.

Example

_View (exposing the element)_

```html
<abp-tags-input element.bind="tag" value.bind="post.categories"></abp-tags-input>
```

_ViewModel (calling the onEvent trigger)_

```javascript
export class Example {
  tagChanged() {
    this.tag.events.onBeforeItemAdd = (e) => console.log('onBeforeItemAdd');
    this.tag.events.onBeforeItemRemove = (e) => console.log('onBeforeItemRemove');
    this.tag.events.onItemAdded = (e) => console.log('onItemAdded');
    this.tag.events.onItemAddedOnInit = (e) => console.log('onItemAddedOnInit');
    this.tag.events.onItemRemoved = (e) => console.log('onItemRemoved');
  }
}
```

### Bootstrap 4
Since `Bootstrap` is in the middle of updating to version 4, we might as well support it. To give flexibility, an extra option (`bootstrapVersion`) was added to the config. The default is set to version 3, for more detail see [Global Options](#globaloption)

Example
```javascript
.plugin('aurelia-bootstrap-tagsinput', config => { config.extra.bootstrapVersion = 4; });
```

## Installation
You can run the examples or build your own by doing the following.

### Aurelia-CLI / Webpack

```bash
npm install --save aurelia-bootstrap-tagsinput
```

<a name="cli"></a>

#### Aurelia-CLI
For `CLI` you will need to add (`bootstrap-tagsinput` and `aurelia-bootstrap-tagsinput`) to your `aurelia.json` file.
```javascript
{
  "name": "bootstrap-tagsinput",
  "path": "../node_modules/bootstrap-tagsinput",
  "main": "dist/bootstrap-tagsinput.min",
  "resources": [
    "dist/bootstrap-tagsinput.css"
  ]
},
{
  "name": "aurelia-bootstrap-tagsinput",
  "path": "../node_modules/aurelia-bootstrap-tagsinput/dist/amd",
  "main": "index",
  "resources": [
    "**/*.{css,html}"
  ]
},
```

_index.html_
```html
<link rel="stylesheet" type="text/css" href="../node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.css">
```

<a name="mainjs"></a>

#### Aurelia (main.js)
Make the plugin available globally in your `main.js` file. Please note the exported class is `abp-tags-input`.

#### For WebPack only (main.js)

```javascript
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
```

#### CLI/WebPack (main.js)

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-tagsinput')
    .feature('resources');

  aurelia.start().then(() => aurelia.setRoot());
}
```

<a name="globaloption"></a>

### Global Options
You can change any of the global options directly in the `main.js` through a `config` as shown below:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-tagsinput', config => {
      // extra attributes, with config.extra
      config.extra.bootstrapVersion = 4;

      // or any picker options, with config.options
      config.options.tagConfirmKeys = [13, 44]
    });

  aurelia.start().then(() => aurelia.setRoot());
}
```

## License
[MIT License](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/LICENSE)

## Contributions/Comments
Contributions are welcome. This plugin was created to help the community (and myself), if you wish to suggest something and/or want to make a PR (Pull Request), please feel free to do so.

## Use it, like it? 
You like and use an Aurelia-Bootstrap-Plugin, please click on the :star: and spead the word.