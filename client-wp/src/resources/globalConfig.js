export class GlobalConfig {
  datetimepickerFontAwesomeIcons = {
    previous: "fa fa-chevron-left",
    next: "fa fa-chevron-right",
    time: "fa fa-clock-o",
    date: "fa fa-calendar",
    today: "fa fa-calendar-check-o",
    up: "fa fa-arrow-up",
    down: "fa fa-arrow-down"
  };

  get datetimepickerIcons() {
    return this.datetimepickerFontAwesomeIcons;
  }
}
