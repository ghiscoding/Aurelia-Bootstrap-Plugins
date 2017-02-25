var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject, bindable, bindingMode } from 'aurelia-framework';
import moment from 'moment';
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';

export let AbaDatetimePickerCustomElement = (_dec = inject(Element), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class AbaDatetimePickerCustomElement {

  constructor(elm) {
    _initDefineProp(this, 'element', _descriptor, this);

    _initDefineProp(this, 'model', _descriptor2, this);

    _initDefineProp(this, 'iconSet', _descriptor3, this);

    _initDefineProp(this, 'allowInputToggle', _descriptor4, this);

    _initDefineProp(this, 'calendarWeeks', _descriptor5, this);

    _initDefineProp(this, 'collapse', _descriptor6, this);

    _initDefineProp(this, 'daysOfWeekDisabled', _descriptor7, this);

    _initDefineProp(this, 'dayViewHeaderFormat', _descriptor8, this);

    _initDefineProp(this, 'debug', _descriptor9, this);

    _initDefineProp(this, 'defaultDate', _descriptor10, this);

    _initDefineProp(this, 'disabledDates', _descriptor11, this);

    _initDefineProp(this, 'disabledHours', _descriptor12, this);

    _initDefineProp(this, 'disabledTimeIntervals', _descriptor13, this);

    _initDefineProp(this, 'enabledDates', _descriptor14, this);

    _initDefineProp(this, 'enabledHours', _descriptor15, this);

    _initDefineProp(this, 'extraFormats', _descriptor16, this);

    _initDefineProp(this, 'focusOnShow', _descriptor17, this);

    _initDefineProp(this, 'format', _descriptor18, this);

    _initDefineProp(this, 'icons', _descriptor19, this);

    _initDefineProp(this, 'ignoreReadonly', _descriptor20, this);

    _initDefineProp(this, 'keepInvalid', _descriptor21, this);

    _initDefineProp(this, 'keepOpen', _descriptor22, this);

    _initDefineProp(this, 'inline', _descriptor23, this);

    _initDefineProp(this, 'locale', _descriptor24, this);

    _initDefineProp(this, 'maxDate', _descriptor25, this);

    _initDefineProp(this, 'minDate', _descriptor26, this);

    _initDefineProp(this, 'showClear', _descriptor27, this);

    _initDefineProp(this, 'showClose', _descriptor28, this);

    _initDefineProp(this, 'showTodayButton', _descriptor29, this);

    _initDefineProp(this, 'sideBySide', _descriptor30, this);

    _initDefineProp(this, 'stepping', _descriptor31, this);

    _initDefineProp(this, 'toolbarPlacement', _descriptor32, this);

    _initDefineProp(this, 'useCurrent', _descriptor33, this);

    _initDefineProp(this, 'useStrict', _descriptor34, this);

    _initDefineProp(this, 'viewDate', _descriptor35, this);

    _initDefineProp(this, 'viewMode', _descriptor36, this);

    _initDefineProp(this, 'widgetParent', _descriptor37, this);

    _initDefineProp(this, 'widgetPositioning', _descriptor38, this);

    this.events = {};
    this.methods = {};
    this.options = {};

    this.elm = elm;
  }

  attached() {
    this.domElm = $(this.elm).find('.input-group.date');

    this.attachIconSet();
    this.attachOptions();
    this.applyExposeEvents();
    this.exposeMethods();

    this.domElm.datetimepicker(this.options);

    this.domElm.on('dp.change', e => {
      this.model = moment(e.date).format(this.format);
    });

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

    if (this.keyBinds) {
      options.keyBinds = this.keyBinds;
    }
    if (this.tooltips) {
      options.tooltips = this.tooltips;
    }

    this.options = options;
  }

  applyExposeEvents() {
    this.domElm.on('dp.hide', e => {
      if (typeof this.onHide === 'function') {
        this.onHide(e);
      }
      if (typeof this.events.onHide === 'function') {
        this.events.onHide(e);
      }
    });

    this.domElm.on('dp.show', e => {
      if (typeof this.onShow === 'function') {
        this.onShow(e);
      }
      if (typeof this.events.onShow === 'function') {
        this.events.onShow(e);
      }
    });

    this.domElm.on('dp.change', e => {
      if (typeof this.onChange === 'function') {
        this.onChange(e);
      }
      if (typeof this.events.onChange === 'function') {
        this.events.onChange(e);
      }
    });

    this.domElm.on('dp.error', e => {
      if (typeof this.onError === 'function') {
        this.onError(e);
      }
      if (typeof this.events.onError === 'function') {
        this.events.onError(e);
      }
    });

    this.domElm.on('dp.update', e => {
      if (typeof this.onUpdate === 'function') {
        this.onUpdate(e);
      }
      if (typeof this.events.onUpdate === 'function') {
        this.events.onUpdate(e);
      }
    });
  }

  constructMethod(methodType, methodName) {
    switch (methodType) {
      case 'getterSetter':
        return value => {
          if (value) {
            return this.domElm.data('DateTimePicker')[methodName](value);
          }
          return this.domElm.data('DateTimePicker')[methodName]();
        };
      case 'caller':
      case 'getter':
      default:
        return value => {
          return this.domElm.data('DateTimePicker')[methodName]();
        };
    }
  }

  exposeMethods() {
    let methodList = [{ name: 'allowInputToggle', type: 'getterSetter' }, { name: 'calendarWeeks', type: 'getterSetter' }, { name: 'clear', type: 'caller' }, { name: 'collapse', type: 'getterSetter' }, { name: 'date', type: 'getterSetter' }, { name: 'daysOfWeekDisabled', type: 'getterSetter' }, { name: 'dayViewHeaderFormat', type: 'getterSetter' }, { name: 'defaultDate', type: 'getterSetter' }, { name: 'destroy', type: 'caller' }, { name: 'debug', type: 'caller' }, { name: 'disable', type: 'caller' }, { name: 'disabledDates', type: 'getterSetter' }, { name: 'disabledHours', type: 'getterSetter' }, { name: 'disabledTimeIntervals', type: 'getterSetter' }, { name: 'enable', type: 'caller' }, { name: 'enabledDates', type: 'getterSetter' }, { name: 'enabledHours', type: 'getterSetter' }, { name: 'extraFormats', type: 'getterSetter' }, { name: 'focusOnShow', type: 'getterSetter' }, { name: 'format', type: 'getterSetter' }, { name: 'hide', type: 'caller' }, { name: 'icons', type: 'getterSetter' }, { name: 'ignoreReadonly', type: 'getterSetter' }, { name: 'inline', type: 'getterSetter' }, { name: 'keepInvalid', type: 'getterSetter' }, { name: 'keyBinds', type: 'getterSetter' }, { name: 'locale', type: 'getterSetter' }, { name: 'maxDate', type: 'getterSetter' }, { name: 'minDate', type: 'getterSetter' }, { name: 'options', type: 'getterSetter' }, { name: 'parseInputDate', type: 'getterSetter' }, { name: 'show', type: 'caller' }, { name: 'showClear', type: 'getterSetter' }, { name: 'showClose', type: 'getterSetter' }, { name: 'showTodayButton', type: 'getterSetter' }, { name: 'sideBySide', type: 'getterSetter' }, { name: 'stepping', type: 'getterSetter' }, { name: 'toggle', type: 'caller' }, { name: 'toolbarplacement', type: 'getterSetter' }, { name: 'tooltips', type: 'getterSetter' }, { name: 'useCurrent', type: 'getterSetter' }, { name: 'useStrict', type: 'getterSetter' }, { name: 'viewDate', type: 'getterSetter' }, { name: 'viewMode', type: 'getterSetter' }, { name: 'widgetPositioning', type: 'getterSetter' }];

    let methods = {};
    methodList.forEach(method => {
      methods[method.name] = this.constructMethod(method.type, method.name);
    });

    this.methods = methods;
  }

  detached() {
    this.domElm.data('DateTimePicker').destroy();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'iconSet', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'glyphicon';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'allowInputToggle', [bindable], {
  enumerable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'calendarWeeks', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'collapse', [bindable], {
  enumerable: true,
  initializer: function () {
    return true;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'daysOfWeekDisabled', [bindable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'dayViewHeaderFormat', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'MMMM YYYY';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'debug', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'defaultDate', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'disabledDates', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'disabledHours', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'disabledTimeIntervals', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'enabledDates', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'enabledHours', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, 'extraFormats', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, 'focusOnShow', [bindable], {
  enumerable: true,
  initializer: function () {
    return true;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, 'format', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'YYYY-MM-DD';
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, 'icons', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, 'ignoreReadonly', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, 'keepInvalid', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, 'keepOpen', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, 'inline', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, 'locale', [bindable], {
  enumerable: true,
  initializer: function () {
    return moment.locale();
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, 'maxDate', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, 'minDate', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, 'showClear', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, 'showClose', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, 'showTodayButton', [bindable], {
  enumerable: true,
  initializer: function () {
    return true;
  }
}), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, 'sideBySide', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, 'stepping', [bindable], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, 'toolbarPlacement', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'default';
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, 'useCurrent', [bindable], {
  enumerable: true,
  initializer: function () {
    return true;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, 'useStrict', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, 'viewDate', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, 'viewMode', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'days';
  }
}), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, 'widgetParent', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, 'widgetPositioning', [bindable], {
  enumerable: true,
  initializer: function () {
    return {
      horizontal: 'auto',
      vertical: 'auto'
    };
  }
})), _class2)) || _class);