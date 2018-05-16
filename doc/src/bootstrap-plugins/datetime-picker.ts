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
  editableDate: Moment.Moment;
  editableDateMinDate: Moment.Moment;
  format: string = 'MM/DD/YYYY';
  dueDate: string = '30.06.2017';
  myDateObject: Date;
  myDateObject2: Moment.Moment;
  post: {
    dateEntered: Date
  };
  multipleDateValues = [
    {
      id: 1,
      date: "2018-01-11T00:00:00",
      timeStart: "2018-01-11T07:30:00",
      timEnd: "2018-01-11T22:00:00"
    },
    {
      id: 2,
      date: "2018-01-11T00:00:00",
      timeStart: "2018-01-24T08:30:00",
      timEnd: "2018-01-24T22:00:00"
    }
  ];

  constructor() {
    this.myDateObject = new Date(2017, 1, 1, 2, 30);
    this.myDateObject2 = Moment();
    this.activeDate = null;
    this.awesomeDate = Moment();
    this.editableDate = Moment();
    this.editableDateMinDate = Moment();
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
