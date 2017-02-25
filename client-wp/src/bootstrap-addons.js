import {bindable, inject} from "aurelia-framework";
import moment from 'moment';

export class Edit {
  @bindable picker;
  @bindable tag;

  pickerOptions = {allowInputToggle: true};
  dateEntered = null;
  post = {};
  picker;
  tag;
  isEditing = false;

  constructor() {
  }

  attached() {
    this.post = {
      dateEntered: moment().format("YYYY-MM-DD")
    };
  }

  cancel() {
    return this._loadCustomer(this.post.id);
  }

  onBeforeItemRemove(e) {
    e.cancel = true;
  }

  pickerChanged() {
    this.picker.events.onChange = (e) => console.log('onChange');
    this.picker.events.onUpdate = (e) => console.log('onUpdate');
    this.picker.methods.daysOfWeekDisabled([0,6]); // disable Sunday & Saturday
  }

  tagChanged() {
    this.tag.events.onBeforeItemAdd = (e) => console.log('onBeforeItemAdd');
    this.tag.events.onBeforeItemRemove = (e) => console.log('onBeforeItemRemove');
    this.tag.events.onItemAdded = (e) => console.log('onItemAdded');
    this.tag.events.onItemAddedOnInit = (e) => console.log('onItemAddedOnInit');
    this.tag.events.onItemRemoved = (e) => console.log('onItemRemoved');
  }

  activate(params) {
    this.original = {};
    this.post = {};

    if (params.id) {
      this.isEditing = true;
      return this._loadCustomer(params.id);
    }
  }

  addTag() {
    //console.log(this.tag[0].$element);
    //this.tag[0].tagsinput('add', "wouf");
    this.tag.methods.add(this.tagValue);
    this.tagValue = "";
  }

  removeAllTag() {
    this.tag.methods.add('added');
    this.tag.methods.remove('jjj');
    setTimeout(() => this.tag.methods.removeAll(), 3000);
  }

  areEqual(obj1, obj2) {
    return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
  }
}
