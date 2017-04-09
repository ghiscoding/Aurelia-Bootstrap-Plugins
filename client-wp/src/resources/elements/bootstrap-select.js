import {inject, bindable, bindingMode, observable} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap-select';

@inject(Element)
export class BootstrapSelect {
  @bindable items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedItem;
  @bindable options = {};
  @observable selectedIndex = 0;
  
  constructor(element) {
    this.element = element;
  }
  
  
  selectedIndexChanged(newValue, oldValue) {
    console.log("selectedIndexChanged");
    console.log(newValue);
    console.log(this.items);
    this.value = this.items[this.selectedIndex];
    $(this.element.firstElementChild).selectpicker('refresh');
    console.log(this.value);
  }
  
  valueChanged(newValue, oldValue) {
    console.log("valueChanged");
    console.log(newValue);
    console.log("oldValue");
    console.log(oldValue);
    this.selectedIndex = this.items.indexOf(this.value);
    if(this.selectedIndex >= 0) {
      this.selectedItem = this.value;
      //$(this.element.firstElementChild).selectpicker('val', this.selectedIndex);
    }
    console.log("value & index");
    console.log(this.value);
    console.log(this.selectedIndex);
    $(this.element.firstElementChild).selectpicker('refresh');
  }
  
  optionsChanged(newValue, oldValue) {
    console.log("optionsChanged");
  }
  
  itemsChanged(newValue, oldValue) {
    $(this.element.firstElementChild).selectpicker('refresh');
  }
  
  bind() {
    
  }
  
  attached() {
    $(this.element.firstElementChild).selectpicker(this.options)
      .on('changed.bs.select', event => {
        let selectedOptions = event.target.selectedOptions;
        this.value = selectedOptions[0].model;
        console.log(this.value);
      })
      .on('loaded.bs.select', (e) => {
        $(this.element.firstElementChild).selectpicker('val', "2");
      });
    
  }
  
  detached() {
    $(this.element.firstElementChild).selectpicker('destroy');
  }
}

export class NumberToStringValueConverter {
  toView(value) {
    return value.toString(10);
  }
  
  fromView(value) {
    return +value;
  }
}