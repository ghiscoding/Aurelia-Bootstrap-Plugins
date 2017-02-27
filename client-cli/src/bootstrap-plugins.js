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
    this.post = {
      categories: 'News,Javascript',
      dateEntered: moment().format("YYYY-MM-DD")
    }
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

  addTag() {
    this.tag.methods.add('Tag1');
  }

  removeAllTag() {
    setTimeout(() => this.tag.methods.removeAll(), 1000);
  }

  removeTag(tagName) {
    this.tag.methods.remove(tagName);
  }
}
