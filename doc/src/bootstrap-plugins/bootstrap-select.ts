export interface Task {
  dueDate: Date;
}

import {bindable, inject} from 'aurelia-framework';
import * as Moment from 'moment';

@inject()
export class SelectEdit {
  @bindable picker;
  @bindable selectCamping;
  @bindable selectCondiment;
  @bindable selectStyledCondiment;
  @bindable selectPicnic;
  @bindable tag;
  @bindable firstPicker;
  task: Task = { dueDate: undefined};
  activeDate: Date;
  dueDate: string = '30.06.2017';
  myDateObject: Date;
  myDateObject2: Date;
  camping: string = '';
  picnic: any = [];
  picnicValue: Array<number>;
  condiment: any;
  condimentStyled: any;

  // Change selection by value (id)
  campingValue: string;
  condimentValue: number;
  condimentStyledValue: number;

  post: any = {};
  isEditing = false;
  isOptgroupBreadDisabled = false;
  selectMappingStructure = {
    subtext: 'company'
  };
  allCampingStuff = ['Tent', 'Flashlight', 'Sleeping Bag'];
  allSelectionWithGroups = [
    { id: 1, option: 'Relish', company: 'Sweet', group: 'Condiments' },
    { id: 12, option: 'Steam', group: 'Breads' },
    { id: 11, option: 'Plain', disabled: false, group: 'Breads' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', group: 'Condiments' },
    { id: 3, option: 'Ketchup',  company: 'Heinz', group: 'Condiments' },
    { id: 2, option: 'Mustard',  company: 'French\'s', group: 'Condiments' },
    { id: 13, option: 'Toasted', group: 'Breads', disabled: true }
  ];
  allCondiments = [
    { id: 1, option: 'Ketchup', company: 'Heinz' },
    { id: 2, option: 'Mustard', company: 'French\'s' },
    { id: 3, option: 'Relish', company: 'Sweet', style: 'background: #5cb85c; color: #fff;', title: 'Alternate Title' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', icon: 'glyphicon-heart' }
  ];
  allStyledCondiments = [
    { id: 1, option: 'Mustard', company: 'French\'s', content: '<span class="label label-warning">Mustard</span>' },
    { id: 2, option: 'Ketchup', company: 'Heinz', content: '<span class="label label-danger">Ketchup</span>' },
    { id: 3, option: 'Relish', company: 'Sweet', content: '<span class="label label-success">Relish</span>' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', disabled: true, content: '<span class="label label-info">Mayonnaise</span>' }
  ];
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3'
  };

  constructor() {
    this.post = {
      categories: ['Javascript' , 'C#']
    };
    this.myDateObject = new Date(2017, 1, 1, 14, 28);
    this.myDateObject2 = Moment().toDate();
    this.camping = 'Flashlight';
    // this.picnic = [{ id: 2}, {id: 4 }];
    // this.condiment = { id: 4 };
    // this.campingValue = 'Sleeping Bag';
    this.picnicValue = [1, 2];
    // this.condimentValue = 3;
  }

  changeSelectCollection() {
    // change collection of a select
    this.allCampingStuff = ['Heater', 'Marshmallow'];
    
    this.allSelectionWithGroups = [
      { id: 1, option: 'Cheedar', company: 'Kraft', group: 'Cheese' },
      { id: 12, option: 'Steam', group: 'Breads' },
      { id: 11, option: 'Plain', disabled: false, group: 'Breads' },
      { id: 4, option: 'Cream Cheese', company: 'Philadelphia', group: 'Condiments' },
      { id: 13, option: 'Grilled', group: 'Breads', disabled: true }
    ];
    
    this.allCondiments = [
      { id: 1, option: 'Cheedar', company: 'Krafty' },
      { id: 2, option: 'Cream Cheese', company: 'Philadelphia' }
    ];
    this.allStyledCondiments = [
      { id: 1, option: 'Cheedar', company: 'Kraft', content: '<span class="label label-warning">Cheedar</span>' },
      { id: 2, option: 'Cream Cheese', company: 'Philadelphia', content: '<span class="label label-info">Cream Cheese</span>' }
    ];
    
  }

  firstPickerChanged() {
    this.firstPicker.events.onChange = (e) => console.log('onChange');
    this.firstPicker.events.onUpdate = (e) => console.log('onUpdate');
    this.firstPicker.events.onRefreshed = (e) => console.log('onRefreshed');
  }

  pickerChanged() {
    this.picker.events.onChange = (e) => console.log('onChange');
    this.picker.events.onUpdate = (e) => console.log('onUpdate');
    this.picker.methods.daysOfWeekDisabled([0, 6]); // disable Sunday & Saturday
  }

  selectPicnicChanged() {
    this.selectPicnic.events.onChanged = (e) => console.log('onChanged');
  }

  toggleOptgroupBreads() {
    this.isOptgroupBreadDisabled = !this.isOptgroupBreadDisabled;
    this.selectPicnic.methods.disableOptgroupByLabel('Breads', this.isOptgroupBreadDisabled);
  }

  preSelectFirstOptions() {
    // Change selection by item (object/string)
    this.camping = 'Tent';
    this.picnic = [ { 'id': 2, 'option': 'Mustard', 'company': 'French\'s' } ];
    this.condiment = { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', icon: 'glyphicon-heart' };
    this.condimentStyled = { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', disabled: true, content: '<span class="label label-info">Mayonnaise</span>' };
  }
  preSelectSecondOptions() {
    // Change selection by value (id)
    this.campingValue = 'Sleeping Bag';
    this.picnicValue = [1, 3, 4, 12];
    this.condimentValue = 3;
    this.condimentStyledValue = 3;
  }
}
