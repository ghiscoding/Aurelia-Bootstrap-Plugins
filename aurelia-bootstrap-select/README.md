# Aurelia-Bootstrap-Select

### Introduction
An Aurelia Custom Element for the 3rd party addon [Bootstrap-Select](http://silviomoreto.github.io/bootstrap-select/)

### Demo page
[https://ghiscoding.github.io/aurelia/bootstrap-plugins/bootstrap-select](https://ghiscoding.github.io/#/aurelia/bootstrap-plugins/bootstrap-select)

### Screenshots

Screenshots from the demo app

![Aurelia-Bootstrap-Select](/aurelia-bootstrap-select/printscreen/abp-select.jpg)

### Usage
A quick example of the code in action.

**Note**: We use the `collection.bind` attribute to pass the collection of all select options.

```html
<abp-select collection.bind="allCampingStuff" selected-value.bind="camping" selected-item.bind="campingValue"></abp-select>
```

<a name="attributes"></a>

### Selected-Value vs Selected-Item

For conveniencies, we provide 2 bindable attributes (both are `two-way` binding). The first `selected-value` provides a way to pull the index(es) or (option value), while the second binding `selected-item` is giving us the item(s) or most commonly the object(s) selected.

**Note:** in a collection of strings only, these 2 bindable attributes would have the exact same output and so there isn't much benefit to use both in that particular case.

Example:

Given this collection of objects
```javascript
let myCollection = [
    { id: 1, option: 'Ketchup', company: 'Heinz' },
    { id: 2, option: 'Mustard', company: 'French\'s' }
];
```

```html
<abp-select picker-options.bind="selectOptions" selected-item.bind="condimentItem" selected-value.bind="condimentValue" collection.bind="myCollection" object-key="id"></abp-select>
```

_if the 2nd option is selected, the ouput would be:_

```javascript
selected-item   // output --> { id: 2, option: 'Mustard', company: 'French\'s' }
selected-value  // output --> 2
```

<a name="options"></a>

### Available Options
Every options of `Bootstrap Select` can be called through `picker-options.bind=""`. For the complete list, please visit the official site [Bootstrap Select - Options](http://silviomoreto.github.io/bootstrap-select/options/).

**NOTE:**
The picker options can also be defined globally through `main.js` via a `config.options` configuration, see [Global Options](#globaloption)

Examples

_from the View_
```html
<abp-select picker-options.bind="{ actionsBox: true }" ...></abp-select>
```

_or from the View and ViewModel_
```html
<abp-select picker-options.bind="selectOptions" ...></abp-select>
```
```javascript
export class Example {
    pickerOptions = {
      actionsBox: true,
      dropupAuto: true
    };
}
```

<a name="mapping"></a>

### Mapping Data Structure
A default mapping data structure is used by the tool to apply certain styling or do certain action simply by reading a property pulled from the collection (for example, a property `disabled` in the collection can be used to disabled an option from the select). These mapping were created mainly for all the options that are available only as `data-zzz` (for examle `data-subtext`) that are defined in [Bootstrap-Select Examples](http://silviomoreto.github.io/bootstrap-select/examples/).  The list of the mapping is the following

```javascript
mappingDataStructure: {
  class: 'class',
  content: 'content',
  disabled: 'disabled',
  divider: 'divider',
  groupLabel: 'group',       // used by optgroup
  groupDisabled: 'disabled', // used by optgroup
  icon: 'icon',
  maxOptions: 'maxOptions',  // used by optgroup
  option: 'option',
  subtext: 'subtext',
  style: 'style',
  title: 'title',
  tokens: 'tokens'
}
```

Example

Let say we want to use subtext that is referenced in the collection has `company`, in that case we will want to rename the mapping from `subtext` to `company` (as shown in the example below).

_from the View, use the `data-mapping-structure` attribute_
```html
<abp-select data-mapping-structure.bind="newMapping" collection.bind="allCondiments" ...></abp-select>
```

_in the ViewModel_
```javascript
// redefined the subtext mapping as company
let newMapping = {
  subtext: 'company'
};

// Given this collection of objects
let myCollection = [
    { id: 1, option: 'Ketchup', company: 'Heinz' },
    { id: 2, option: 'Mustard', company: 'French\'s' }
];
```

**NOTE:**
The mapping data structure can also be defined globally through `main.js` via a `config.extra` configuration, see [Global Options](#globaloption)

<a name="methods"></a>

### Available Methods/Functions
Again every single methods which comes with `Bootstrap Select` are available. For the complete list, please visit the official site [Bootstrap Select - Functions](http://silviomoreto.github.io/bootstrap-select/methods/).

To have access to the methods/functions, you will need to expose the element itself through `element.bind` that will then expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_.

Example

_View (exposing the element)_
```html
<abp-select element.bind="picker" ...></abp-select>
```

_ViewModel (calling the method)_
```javascript
export class Example {
  @bindable picker;

  pickerChanged() {
    this.picker.methods.selectAll();
  }
}
```

<a name="extramethods"></a>

### Extra Methods/Functions
To provide more functionality, we added extra methods that are also exposed the same way as mentioned in previous section [Available Methods](#methods). The list of extra methods is the following:
* `disableOptgroupByIndex(index, isDisable = true)`
* `disableOptgroupByLabel(label, isDisable = true)`

Example

_ViewModel (calling the method)_
```javascript
export class Example {
  @bindable picker;

  pickerChanged() {
    // to disable the optgroup 'Breads', we can call
    this.picker.methods.disableOptgroupByLabel('Breads', true);
  }
}
```

<a name="events"></a>

### Available Events
Every events of `Bootstrap Select` are, as no surprises, available as well. For the complete list, please visit the official site [Bootstrap Select - Events](http://silviomoreto.github.io/bootstrap-select/options/#events).

To have access to the `events`, you will need to expose the element itself through `element.bind` to expose the methods _(also note that doing so will also give you access to `events`, `options` and `methods`)_.

**Note**
The events are called with the syntax of `onEvent` which differs from the original syntax. Example, for the `dp.change`, we would use the `onChange` event.

Example

_View (exposing the element)_
```html
<abp-select element.bind="picker" ...></abp-select>
```

_ViewModel (calling the onEvent trigger)_
```javascript
export class Example {
  pickerChanged() {
    this.picker.events.onChanged = (e) => console.log('onChanged');
    this.picker.events.onHide = (e) => console.log('onHide');
    this.picker.events.onHidden = (e) => console.log('onHidden');
    this.picker.events.onLoaded = (e) => console.log('onLoaded');
    this.picker.events.onRendered = (e) => console.log('onRendered');
    this.picker.events.onRefreshed = (e) => console.log('onRefreshed');
    this.picker.events.onShow = (e) => console.log('onShow');
    this.picker.events.onShown = (e) => console.log('onShown');
  }
}
```

### Disabled
There is multiple `disabled` options available. You can disable any of the following:
* option
  * _by a mapping property in your collection (refer to [mapping data structure](#mapping))_
* optgroup
  * _by a [mapping](#mapping) property or a [method](#extramethods)_
* element (the custom element itself)
  * _by adding `disabled` directly on the element_

### Multiple (select)
To make the `Bootstrap Select` be a multi-select, simply add the `multiple="true"` (or just `multiple`) attribute to the element.

_on View_

```html
<abp-select collection.bind="myCollection" multiple="true" ...></abp-select>
```

**Note:** The attribute is used as a boolean attribute, so passing `false` like `multiple="false"` will make the select act as a regular single select.

### Object-Key (attribute)
When using a collection a objects, the tool will use an attribute called `object-key` (by default is set to `id`) to know which property of the object to do comparison

Example:

Given this collection of objects
```javascript
let myCollection = [
    { id: 1, option: 'Ketchup', company: 'Heinz' },
    { id: 2, option: 'Mustard', company: 'French\'s' }
];
```

_on View_

```html
<abp-select collection.bind="myCollection" object-key="id" ...></abp-select>
```

### Optgroup
To have optgroup in your select list, just use the attribute `has-optgroup="true"`. The optgroup will use `group` as the default mapping (if you want to change it, refer to [Mapping Data Structure](#mapping) by changing the `groupLabel` property)


Example:

Given this collection of objects, with a `group` property.
```javascript
let myCollection = [
    { id: 1, option: 'Ketchup', group: 'Condiments' },
    { id: 2, option: 'Mustard', group: 'Condiments' },
    { id: 10, option: 'Steam', group: 'Breads' },
    { id: 12. option: 'Toasted', group: 'Breads' },
];
```

_in View, it will automatically use the `group` property_
```html
<abp-select collection.bind="allCondiments" has-optgroup="true"></abp-select>
```

**Note** The attribute is used as a boolean attribute, so passing `false` as `has-optgroup="false"` will not show the optgroup.

## Installation
You can run the examples or build your own by doing the following.

### Aurelia-CLI / Webpack
```bash
npm install --save aurelia-bootstrap-select
```

<a name="cli"></a>

#### Aurelia-CLI
For `CLI` you will need to add (`bootstrap-select` and `aurelia-bootstrap-select`) to your `aurelia.json` file. The exported class is `abp-select`.
```javascript
{
  "name": "bootstrap-select",
  "main": "dist/js/bootstrap-select.js",
  "path": "../node_modules/bootstrap-select",
  "resources": [
    "dist/css/bootstrap-select.min.css"
  ]
},
{
  "name": "aurelia-bootstrap-select",
  "main": "index",
  "path": "../node_modules/aurelia-bootstrap-select/dist/amd",
  "resources": [
    "**/*.{css,html}"
  ]
},
```

_index.html_
```html
<link rel="stylesheet" type="text/css"
href="../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css">
```

##### Bootstrap 4
An extra custom CSS file was added to address the Bootstrap 4 changes (until `Bootstrap-Select` comes out with version that supports it). If you followed the instruction earlier to modify the `aurelia.json` file then it should work without any modification, if it does not then make sure to have this portion (under the `aurelia-bootstrap-select` package):
 ```json
   "resources": [
     "**/*.{css,html}"
   ]
 ```

<a name="webpack"></a>

#### Aurelia-Webpack
`Bootstrap-Select` and possibly others require to have the same `jQuery` accross the bundle. You will need to modify your `webpack.config.babel.js` for this to work correctly.


```diff
const ENV...
+ const ProvidePlugin = require('webpack/lib/ProvidePlugin')('webpack/lib/ContextReplacementPlugin')
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
Make the plugin available globally in your `main.js` file. Please note the exported class is `abp-select`

#### For WebPack only (main.js)
```javascript
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
```

##### Bootstrap 4 support
An extra custom CSS file was added to address the changes (until `Bootstrap-Select` comes out with version that supports it, open BS4 issue [#1135](https://github.com/silviomoreto/bootstrap-select/issues/1135)), you can import this custom CSS file via:
 ```javascript
 import 'aurelia-bootstrap-select/dist/amd/bootstrap-select-bs4.css';
 ```

#### CLI/WebPack (main.js)
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-select');

  aurelia.start().then(() => aurelia.setRoot());
}
```

**Note on `aurelia-webpack-plugin 2.0`**

If you started using the new `aurelia-webpack-plugin` version `2.0`, which is currently in [RC Pre-Release](https://github.com/aurelia/webpack-plugin/releases) and is already packaged in some of the [Aurelia Skeletons](https://github.com/aurelia/skeleton-navigation) (not all). You will have to use the `PLATFORM.ModuleName` wrapper. The previous code becomes:

```javascript
aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'));
```

<a name="globaloption"></a>

### Global Options
You can change any of the global options directly in the `main.js` through a `config` as shown below:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-select', config => {
      // extra attributes, with config.extra
      config.extra.mappingDataStructure = {
        subtext: 'company'
      };

      // or any picker options, with config.options
      config.options.width = 'fit';
    });

  aurelia.start().then(() => aurelia.setRoot());
}
```

or with `aurelia-webpack-plugin 2.0` :

```javascript
export function configure(aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'), config => {
    // extra attributes, with config.extra
    config.extra.mappingDataStructure = {
      subtext: 'company'
    };

    // or any picker options, with config.options
    config.options.width = 'fit';
  });
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
```

## License
[MIT License](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/LICENSE)

## Contributions/Comments
Contributions are welcome. This plugin was created to help the community (and myself), if you wish to suggest something and/or want to make a PR (Pull Request), please feel free to do so.

## Use it, like it?
You like and use an `Aurelia-Bootstrap-Plugins`, please click on the :star: and spread the word.
