# Aurelia ASP.Net Core - WebPack (typescript)
This is based on the new [Jods Aurelia-WebPack 2.x base](https://github.com/jods4/aurelia-webpack-build/tree/master/demos/06-ASPNET), please make sure to read his [Wiki - Getting Started](https://github.com/jods4/aurelia-webpack-build/wiki/Getting-started)

```bash
git clone https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins
cd client-aspnetcore-ts
npm install # or: yarn install
set ASPNETCORE_ENVIRONMENT=Development
dotnet restore
dotnet watch run
```


## Plugin examples

### Aurelia-Bootstrap-Tagsinput

#### Usage
A quick example of the code in action. Note that the value is available under the `value.bind`.
```html
<abp-tags-input element.bind="tag" value.bind="post.categories"></abp-tags-input>
```

### Aurelia-Bootstrap-Datetimepicker

#### Usage
A quick example of the code in action. Note that the value is available under the `value.bind`.
```html
<abp-datetime-picker value.bind="post.dateEntered" format="YYYY-MM-DD"></abp-datetime-picker>
```

### Aurelia-Bootstrap-Select

#### Usage
A quick example of the code in action. 

**Note**: We use the `collection.bind` attribute to pass the collection of all select options and the selection is available from `selected-value` (value) and `selected-item` (string/object)

```html
<abp-select collection.bind="allCampingStuff" selected-value.bind="camping" selected-item.bind="campingValue"></abp-select>
```