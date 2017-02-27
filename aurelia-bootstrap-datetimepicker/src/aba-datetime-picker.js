import {inject, bindable, bindingMode} from 'aurelia-framework';
import moment from 'moment';
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';
//import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';

@inject(Element)
export class AbpDatetimePickerCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) element;
  @bindable({defaultBindingMode: bindingMode.twoWay}) value;

  // plugin own variables
  @bindable iconSet = 'glyphicon';

  // options (from the View), with some defaults
  @bindable allowInputToggle = true;
  @bindable calendarWeeks = false;
  @bindable collapse = true;
  @bindable daysOfWeekDisabled = [];
  @bindable dayViewHeaderFormat = 'MMMM YYYY';
  @bindable debug = false;
  @bindable defaultDate = false;
  @bindable disabledDates = false;
  @bindable disabledHours = false;
  @bindable disabledTimeIntervals = false;
  @bindable enabledDates = false;
  @bindable enabledHours = false;
  @bindable extraFormats = false;
  @bindable focusOnShow = true;
  @bindable format = 'YYYY-MM-DD';
  @bindable icons;
  @bindable ignoreReadonly = false;
  @bindable keepInvalid = false;
  @bindable keepOpen = false;
  @bindable inline = false;
  @bindable locale = moment.locale();
  @bindable maxDate = false;
  @bindable minDate = false;
  @bindable showClear = false;
  @bindable showClose = false;
  @bindable showTodayButton = true;
  @bindable sideBySide = false;
  @bindable stepping = 1;
  @bindable toolbarPlacement = 'default';
  @bindable useCurrent = true;
  @bindable useStrict = false;
  @bindable viewDate = false;
  @bindable viewMode = 'days';
  @bindable widgetParent = null;
  @bindable widgetPositioning = {
    horizontal: 'auto',
    vertical: 'auto'
  };

  // variables
  events = {};
  methods = {};
  options = {};

  constructor(elm) {
    this.elm = elm;
  }

  attached() {
    // reference to the DOM element
    this.domElm = $(this.elm).find('.input-group.date');

    // create datepicker
    this.attachIconSet();
    this.attachOptions();
    this.applyExposeEvents();
    this.exposeMethods();

    // finally create the datepicker with all options
    this.domElm.datetimepicker(this.options);

    this.domElm.on('dp.change', (e) => {
      this.value = moment(e.date).format(this.format);
    });

    // expose the element object to the outside
    // this will be useful for calling events/methods/options from the outside
    this.element = {
      events: this.events,
      options: this.options,
      methods: this.methods
    };
  }

  attachIconSet() {
    if (this.iconSet === 'font-awesome') {
      this.icons = {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-arrow-up',
        down: 'fa fa-arrow-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-calendar-check-o',
        clear: 'fa fa-trash',
        close: 'fa fa-window-close'
      };
    } else {
      this.icons = {
        time: 'glyphicon glyphicon-time',
        date: 'glyphicon glyphicon-calendar',
        up: 'glyphicon glyphicon-chevron-up',
        down: 'glyphicon glyphicon-chevron-down',
        previous: 'glyphicon glyphicon-chevron-left',
        next: 'glyphicon glyphicon-chevron-right',
        today: 'glyphicon glyphicon-screenshot',
        clear: 'glyphicon glyphicon-trash',
        close: 'glyphicon glyphicon-remove'
      };
    }
  }

  attachOptions() {
    let options = {
      allowInputToggle: this.allowInputToggle,
      calendarWeeks: this.calendarWeeks,
      collapse: this.collapse,
      daysOfWeekDisabled: this.daysOfWeekDisabled,
      dayViewHeaderFormat: this.dayViewHeaderFormat,
      debug: this.debug,
      defaultDate: this.defaultDate,
      disabledDates: this.disabledDates,
      disabledHours: this.disabledHours,
      disabledTimeIntervals: this.disabledTimeIntervals,
      enabledDates: this.enabledDates,
      enabledHours: this.enabledHours,
      extraFormats: this.extraFormats,
      focusOnShow: this.focusOnShow,
      format: this.format,
      icons: this.icons,
      ignoreReadonly: this.ignoreReadonly,
      inline: this.inline,
      keepInvalid: this.keepInvalid,
      keepOpen: this.keepOpen,
      locale: this.locale,
      maxDate: this.maxDate,
      minDate: this.minDate,
      showClear: this.showClear,
      showClose: this.showClose,
      showTodayButton: this.showTodayButton,
      sideBySide: this.sideBySide,
      stepping: this.stepping,
      useCurrent: this.useCurrent,
      useStrict: this.useStrict,
      toolbarPlacement: this.toolbarPlacement,
      viewDate: this.viewDate,
      viewMode: this.viewMode,
      widgetParent: this.widgetParent,
      widgetPositioning: this.widgetPositioning
    };

    // some of the options that have functions don't work well with defaults
    // so we will instantiate them only if they are defined by the user
    if (this.keyBinds) {
      options.keyBinds = this.keyBinds;
    }
    if (this.tooltips) {
      options.tooltips = this.tooltips;
    }

    this.options = options;
  }

  /**
   * Apply/expose datetimepicker events
   * Each event has 2 ways of triggering an event (from the View as an attribute or from the ViewModel has a function call)
   */
  applyExposeEvents() {
    this.domElm.on('dp.hide', (e) => {
      if (typeof this.onHide === 'function') {
        this.onHide(e);
      }
      if (typeof this.events.onHide === 'function') {
        this.events.onHide(e);
      }
    });

    this.domElm.on('dp.show', (e) => {
      if (typeof this.onShow === 'function') {
        this.onShow(e);
      }
      if (typeof this.events.onShow === 'function') {
        this.events.onShow(e);
      }
    });

    this.domElm.on('dp.change', (e) => {
      if (typeof this.onChange === 'function') {
        this.onChange(e);
      }
      if (typeof this.events.onChange === 'function') {
        this.events.onChange(e);
      }
    });

    this.domElm.on('dp.error', (e) => {
      if (typeof this.onError === 'function') {
        this.onError(e);
      }
      if (typeof this.events.onError === 'function') {
        this.events.onError(e);
      }
    });

    this.domElm.on('dp.update', (e) => {
      if (typeof this.onUpdate === 'function') {
        this.onUpdate(e);
      }
      if (typeof this.events.onUpdate === 'function') {
        this.events.onUpdate(e);
      }
    });
  }

  /**
   * Construct a method by it's type and name
   * We do this to avoid typing multiple line of the same, on 100 functions that makes a big difference in number of code lines.
   */
  constructMethod(methodType, methodName) {
    switch (methodType) {
    case 'getterSetter':
      return (value) => {
        if (value) {
          return this.domElm.data('DateTimePicker')[methodName](value);
        }
        return this.domElm.data('DateTimePicker')[methodName]();
      };
    case 'caller':
    case 'getter':
    default:
      return (value) => { return this.domElm.data('DateTimePicker')[methodName](); };
    }
  }

  /**
   * Expose datetimepicker methods
   */
  exposeMethods() {
    // prepare a list of methods with their type so we can construct them later
    let methodList = [
      { name: 'allowInputToggle', type: 'getterSetter' },
      { name: 'calendarWeeks', type: 'getterSetter' },
      { name: 'clear', type: 'caller' },
      { name: 'collapse', type: 'getterSetter' },
      { name: 'date', type: 'getterSetter' },
      { name: 'daysOfWeekDisabled', type: 'getterSetter' },
      { name: 'dayViewHeaderFormat', type: 'getterSetter' },
      { name: 'defaultDate', type: 'getterSetter' },
      { name: 'destroy', type: 'caller' },
      { name: 'debug', type: 'caller' },
      { name: 'disable', type: 'caller' },
      { name: 'disabledDates', type: 'getterSetter' },
      { name: 'disabledHours', type: 'getterSetter' },
      { name: 'disabledTimeIntervals', type: 'getterSetter' },
      { name: 'enable', type: 'caller' },
      { name: 'enabledDates', type: 'getterSetter' },
      { name: 'enabledHours', type: 'getterSetter' },
      { name: 'extraFormats', type: 'getterSetter' },
      { name: 'focusOnShow', type: 'getterSetter' },
      { name: 'format', type: 'getterSetter' },
      { name: 'hide', type: 'caller' },
      { name: 'icons', type: 'getterSetter' },
      { name: 'ignoreReadonly', type: 'getterSetter' },
      { name: 'inline', type: 'getterSetter' },
      { name: 'keepInvalid', type: 'getterSetter' },
      { name: 'keyBinds', type: 'getterSetter' },
      { name: 'locale', type: 'getterSetter' },
      { name: 'maxDate', type: 'getterSetter' },
      { name: 'minDate', type: 'getterSetter' },
      { name: 'options', type: 'getterSetter' },
      { name: 'parseInputDate', type: 'getterSetter' },
      { name: 'show', type: 'caller' },
      { name: 'showClear', type: 'getterSetter' },
      { name: 'showClose', type: 'getterSetter' },
      { name: 'showTodayButton', type: 'getterSetter' },
      { name: 'sideBySide', type: 'getterSetter' },
      { name: 'stepping', type: 'getterSetter' },
      { name: 'toggle', type: 'caller' },
      { name: 'toolbarplacement', type: 'getterSetter' },
      { name: 'tooltips', type: 'getterSetter' },
      { name: 'useCurrent', type: 'getterSetter' },
      { name: 'useStrict', type: 'getterSetter' },
      { name: 'viewDate', type: 'getterSetter' },
      { name: 'viewMode', type: 'getterSetter' },
      { name: 'widgetPositioning', type: 'getterSetter' }
    ];

    // loop through all methods and construct them before exponsing them to the element object
    let methods = {};
    methodList.forEach((method) => {
      methods[method.name] = this.constructMethod(method.type, method.name);
    });

    this.methods = methods;
  }

  detached() {
    this.domElm.data('DateTimePicker').destroy();
  }
}
