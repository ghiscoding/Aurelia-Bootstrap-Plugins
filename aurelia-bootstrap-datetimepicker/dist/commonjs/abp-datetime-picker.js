'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbpDatetimePickerCustomElement = undefined;

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

var _aureliaFramework = require('aurelia-framework');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('eonasdan-bootstrap-datetimepicker');

var _pickerGlobalOptions = require('./picker-global-options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var AbpDatetimePickerCustomElement = exports.AbpDatetimePickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
  function AbpDatetimePickerCustomElement(elm) {
    var _this = this;

    _classCallCheck(this, AbpDatetimePickerCustomElement);

    _initDefineProp(this, 'element', _descriptor, this);

    _initDefineProp(this, 'model', _descriptor2, this);

    _initDefineProp(this, 'value', _descriptor3, this);

    _initDefineProp(this, 'placeholder', _descriptor4, this);

    _initDefineProp(this, 'iconBase', _descriptor5, this);

    _initDefineProp(this, 'withDateIcon', _descriptor6, this);

    _initDefineProp(this, 'bootstrapVersion', _descriptor7, this);

    _initDefineProp(this, 'buttonClass', _descriptor8, this);

    _initDefineProp(this, 'options', _descriptor9, this);

    _initDefineProp(this, 'onHide', _descriptor10, this);

    _initDefineProp(this, 'onShow', _descriptor11, this);

    _initDefineProp(this, 'onChange', _descriptor12, this);

    _initDefineProp(this, 'onError', _descriptor13, this);

    _initDefineProp(this, 'onUpdate', _descriptor14, this);

    this._events = {};
    this._methods = {};

    this.elm = elm;

    elm.focus = function () {
      return _this.input.focus();
    };
  }

  AbpDatetimePickerCustomElement.prototype.attached = function attached() {
    var _this2 = this;

    this.domElm = (0, _jquery2.default)(this.elm).find('.date');

    var pickerOptions = this.options || {};
    if (!this.options || this.options && !this.options.icons) {
      pickerOptions.icons = this.attachIconBase();
    }

    this.applyExposeEvents();
    this.exposeMethods();

    this.options = Object.assign({}, _pickerGlobalOptions.globalPickerOptions, pickerOptions);
    this.domElm.datetimepicker(this.options);

    this.domElm.on('dp.change', function (e) {
      if ((0, _moment2.default)(e.date, _this2._format, true).isValid()) {
        _this2.model = (0, _moment2.default)(e.date, _this2._format, true).toDate();
        _this2.value = (0, _moment2.default)(e.date, _this2._format, true);
      } else if (!e.date) {
        _this2.model = null;
        _this2.value = null;
      }
    });

    this.element = {
      events: this._events,
      options: pickerOptions,
      methods: this._methods
    };
  };

  AbpDatetimePickerCustomElement.prototype.attachIconBase = function attachIconBase() {
    var icons = void 0;

    if (this.iconBase === 'font-awesome') {
      icons = {
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
      icons = {
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
    return icons;
  };

  AbpDatetimePickerCustomElement.prototype.bind = function bind() {
    var pickerOptions = this.options || this.elm.getAttribute('options');
    this.options = Object.assign({}, _pickerGlobalOptions.globalPickerOptions, pickerOptions);

    if (this.options) {
      this._format = this._originalDateFormat = this.options.hasOwnProperty('format') ? this.options.format : 'YYYY-MM-DD';
    }
    if (this.model) {
      this._originalDateObject = (0, _moment2.default)(this.model, this._format, true).toDate() || this.elm.getAttribute('model');
    }
    this._originalValue = this.value || this.elm.getAttribute('value');
    var value = this._originalValue || this._originalDateObject;

    if (value && (0, _moment2.default)(value, this._format, true).isValid()) {
      this.model = (0, _moment2.default)(value, this._format, true).toDate();
      this.value = (0, _moment2.default)(value, this._format, true);
    }
  };

  AbpDatetimePickerCustomElement.prototype.applyExposeEvents = function applyExposeEvents() {
    var _this3 = this;

    this.domElm.on('dp.hide', function (e) {
      if (typeof _this3.onHide === 'function') {
        _this3.onHide(e);
      }
      if (typeof _this3._events.onHide === 'function') {
        _this3._events.onHide(e);
      }
    });

    this.domElm.on('dp.show', function (e) {
      if (typeof _this3.onShow === 'function') {
        _this3.onShow(e);
      }
      if (typeof _this3._events.onShow === 'function') {
        _this3._events.onShow(e);
      }
    });

    this.domElm.on('dp.change', function (e) {
      if (typeof _this3.onChange === 'function') {
        _this3.onChange(e);
      }
      if (typeof _this3._events.onChange === 'function') {
        _this3._events.onChange(e);
      }
    });

    this.domElm.on('dp.error', function (e) {
      if (typeof _this3.onError === 'function') {
        _this3.onError(e);
      }
      if (typeof _this3._events.onError === 'function') {
        _this3._events.onError(e);
      }
    });

    this.domElm.on('dp.update', function (e) {
      if (typeof _this3.onUpdate === 'function') {
        _this3.onUpdate(e);
      }
      if (typeof _this3._events.onUpdate === 'function') {
        _this3._events.onUpdate(e);
      }
    });
  };

  AbpDatetimePickerCustomElement.prototype.blur = function blur() {
    var event = _aureliaFramework.DOM.createCustomEvent('blur');
    this.elm.dispatchEvent(event);
  };

  AbpDatetimePickerCustomElement.prototype.constructMethod = function constructMethod(methodType, methodName) {
    var _this4 = this;

    switch (methodType) {
      case 'getterSetter':
        return function (value) {
          if (value) {
            return _this4.domElm.data('DateTimePicker')[methodName](value);
          }
          return _this4.domElm.data('DateTimePicker')[methodName]();
        };
      case 'caller':
      case 'getter':
      default:
        return function (value) {
          return _this4.domElm.data('DateTimePicker')[methodName]();
        };
    }
  };

  AbpDatetimePickerCustomElement.prototype.exposeMethods = function exposeMethods() {
    var _this5 = this;

    var methodList = [{ name: 'allowInputToggle', type: 'getterSetter' }, { name: 'calendarWeeks', type: 'getterSetter' }, { name: 'clear', type: 'caller' }, { name: 'collapse', type: 'getterSetter' }, { name: 'date', type: 'getterSetter' }, { name: 'daysOfWeekDisabled', type: 'getterSetter' }, { name: 'dayViewHeaderFormat', type: 'getterSetter' }, { name: 'defaultDate', type: 'getterSetter' }, { name: 'destroy', type: 'caller' }, { name: 'debug', type: 'caller' }, { name: 'disable', type: 'caller' }, { name: 'disabledDates', type: 'getterSetter' }, { name: 'disabledHours', type: 'getterSetter' }, { name: 'disabledTimeIntervals', type: 'getterSetter' }, { name: 'enable', type: 'caller' }, { name: 'enabledDates', type: 'getterSetter' }, { name: 'enabledHours', type: 'getterSetter' }, { name: 'extraFormats', type: 'getterSetter' }, { name: 'focusOnShow', type: 'getterSetter' }, { name: 'format', type: 'getterSetter' }, { name: 'hide', type: 'caller' }, { name: 'icons', type: 'getterSetter' }, { name: 'ignoreReadonly', type: 'getterSetter' }, { name: 'inline', type: 'getterSetter' }, { name: 'keepInvalid', type: 'getterSetter' }, { name: 'keyBinds', type: 'getterSetter' }, { name: 'locale', type: 'getterSetter' }, { name: 'maxDate', type: 'getterSetter' }, { name: 'minDate', type: 'getterSetter' }, { name: 'options', type: 'getterSetter' }, { name: 'parseInputDate', type: 'getterSetter' }, { name: 'show', type: 'caller' }, { name: 'showClear', type: 'getterSetter' }, { name: 'showClose', type: 'getterSetter' }, { name: 'showTodayButton', type: 'getterSetter' }, { name: 'sideBySide', type: 'getterSetter' }, { name: 'stepping', type: 'getterSetter' }, { name: 'toggle', type: 'caller' }, { name: 'toolbarplacement', type: 'getterSetter' }, { name: 'tooltips', type: 'getterSetter' }, { name: 'useCurrent', type: 'getterSetter' }, { name: 'useStrict', type: 'getterSetter' }, { name: 'viewDate', type: 'getterSetter' }, { name: 'viewMode', type: 'getterSetter' }, { name: 'widgetPositioning', type: 'getterSetter' }];

    var methods = {};
    methodList.forEach(function (method) {
      methods[method.name] = _this5.constructMethod(method.type, method.name);
    });

    this._methods = methods;
  };

  AbpDatetimePickerCustomElement.prototype.detached = function detached() {
    this.domElm.data('DateTimePicker').destroy();
  };

  AbpDatetimePickerCustomElement.prototype.getOption = function getOption(optionName) {
    var domElm = (0, _jquery2.default)(this.elm).find('.input-group.date');
    if (domElm && typeof domElm.data === 'function' && domElm.data('DateTimePicker')) {
      var options = domElm.data('DateTimePicker').options();
      return options.hasOwnProperty(optionName) ? options[optionName] : null;
    }
    return null;
  };

  AbpDatetimePickerCustomElement.prototype.modelChanged = function modelChanged(newValue, oldValue) {
    if (isNaN(Date.parse(newValue)) && newValue !== null) {
      throw new Error('Datetimepicker, model.bind must be of type Date');
    }
    if (newValue !== oldValue && newValue) {
      if ((0, _moment2.default)(newValue, this._format, true).isValid()) {
        this.value = (0, _moment2.default)(newValue, this._format, true).format(this._format);
      }
    }
  };

  AbpDatetimePickerCustomElement.prototype.valueChanged = function valueChanged(newValue, oldValue) {
    if (newValue !== oldValue && newValue) {
      if ((0, _moment2.default)(newValue, this._format, true).isValid()) {
        this.model = (0, _moment2.default)(newValue, this._format, true).toDate();
      }
    }
  };

  AbpDatetimePickerCustomElement.prototype.parseBool = function parseBool(value) {
    return (/^(true|1)$/i.test(value)
    );
  };

  AbpDatetimePickerCustomElement.prototype.showCalendar = function showCalendar() {
    this.domElm.data('DateTimePicker').show();
  };

  return AbpDatetimePickerCustomElement;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'iconBase', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return _pickerGlobalOptions.globalExtraOptions.iconBase;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'withDateIcon', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return _pickerGlobalOptions.globalExtraOptions.withDateIcon;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'bootstrapVersion', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return _pickerGlobalOptions.globalExtraOptions.bootstrapVersion;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'buttonClass', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return _pickerGlobalOptions.globalExtraOptions.buttonClass;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'options', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'onHide', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'onShow', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'onChange', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'onError', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'onUpdate', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);