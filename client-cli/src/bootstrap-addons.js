import {bindable, inject} from "aurelia-framework";
import moment from 'moment';

export class Edit {
  @bindable picker;
  @bindable tag;

  pickerOptions = {allowInputToggle: true};
  dateEntered = null;
  bill = {};
  picker;
  tag;
  isEditing = false;
  typeaheadEmptyTemplate = `<div class="empty-message">No matches from Controller.</div>`;
  //typeaheadEmptyTemplateUrl = "src/templates/typeahead-empty-template.html";
  typeaheadRemoteUrl = "./api/yahoo/quote/%QUERY";
  typeaheadTemplateUrl = "src/templates/typeahead-symbol-template.html";
  typeaheadTemplate = `<div>
    <div class="typeahead-ne">e: {{exchDisp}}</div>
    <div class="typeahead-nw">s: {{symbol}}</div>
    <div class="typeahead-sw">n: {{name}}</div>
  </div>
  `;

  constructor() {
  }

  attached() {
    this.bill = {
      dateEntered: moment().format("YYYY-MM-DD")
    };
  }

  cancel() {
    return this._loadCustomer(this.bill.id);
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
    this.bill = {};

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
