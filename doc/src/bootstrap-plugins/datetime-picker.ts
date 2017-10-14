import {bindable, inject} from 'aurelia-framework';
import * as Moment from 'moment';

export interface Task {
  dueDate: Date;
}

@inject()
export class DateTimeEdit {
  @bindable picker;
  activeDate: Date;
  awesomeDate: Moment.Moment;
  dueDate: string = '30.06.2017';
  myDateObject: Date;
  myDateObject2: Moment.Moment;
  post: {
    dateEntered: Date
  };

  constructor() {
    this.myDateObject = new Date(2017, 1, 1, 2, 30);
    this.myDateObject2 = Moment();
    this.activeDate = null;
    this.awesomeDate = Moment();
  }

  pickerChanged() {
    this.picker.events.onChange = (e) => console.log('onChange');
    this.picker.events.onUpdate = (e) => console.log('onUpdate');
    this.picker.methods.daysOfWeekDisabled([0, 6]); // disable Sunday & Saturday
  }

  changePostDateValue(dateStr) {
    this.post.dateEntered = dateStr;
  }

  changePostDateObject(dateStr) {
    this.myDateObject = new Date(dateStr);
  }
}
