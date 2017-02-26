define(['exports', 'aurelia-framework', 'moment', 'jquery', 'eonasdan-bootstrap-datetimepicker'], function (exports, _aureliaFramework, _moment, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AbaDatetimePickerCustomElement = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38;

  var AbaDatetimePickerCustomElement = exports.AbaDatetimePickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function AbaDatetimePickerCustomElement(elm) {
      _classCallCheck(this, AbaDatetimePickerCustomElement);

      _initDefineProp(this, 'element', _descriptor, this);

      _initDefineProp(this, 'value', _descriptor2, this);

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

    AbaDatetimePickerCustomElement.prototype.attached = function attached() {
      var _this = this;

      this.domElm = (0, _jquery2.default)(this.elm).find('.input-group.date');

      this.attachIconSet();
      this.attachOptions();
      this.applyExposeEvents();
      this.exposeMethods();

      this.domElm.datetimepicker(this.options);

      this.domElm.on('dp.change', function (e) {
        _this.value = (0, _moment2.default)(e.date).format(_this.format);
      });

      this.element = {
        events: this.events,
        options: this.options,
        methods: this.methods
      };
    };

    AbaDatetimePickerCustomElement.prototype.attachIconSet = function attachIconSet() {
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
    };

    AbaDatetimePickerCustomElement.prototype.attachOptions = function attachOptions() {
      var options = {
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
    };

    AbaDatetimePickerCustomElement.prototype.applyExposeEvents = function applyExposeEvents() {
      var _this2 = this;

      this.domElm.on('dp.hide', function (e) {
        if (typeof _this2.onHide === 'function') {
          _this2.onHide(e);
        }
        if (typeof _this2.events.onHide === 'function') {
          _this2.events.onHide(e);
        }
      });

      this.domElm.on('dp.show', function (e) {
        if (typeof _this2.onShow === 'function') {
          _this2.onShow(e);
        }
        if (typeof _this2.events.onShow === 'function') {
          _this2.events.onShow(e);
        }
      });

      this.domElm.on('dp.change', function (e) {
        if (typeof _this2.onChange === 'function') {
          _this2.onChange(e);
        }
        if (typeof _this2.events.onChange === 'function') {
          _this2.events.onChange(e);
        }
      });

      this.domElm.on('dp.error', function (e) {
        if (typeof _this2.onError === 'function') {
          _this2.onError(e);
        }
        if (typeof _this2.events.onError === 'function') {
          _this2.events.onError(e);
        }
      });

      this.domElm.on('dp.update', function (e) {
        if (typeof _this2.onUpdate === 'function') {
          _this2.onUpdate(e);
        }
        if (typeof _this2.events.onUpdate === 'function') {
          _this2.events.onUpdate(e);
        }
      });
    };

    AbaDatetimePickerCustomElement.prototype.constructMethod = function constructMethod(methodType, methodName) {
      var _this3 = this;

      switch (methodType) {
        case 'getterSetter':
          return function (value) {
            if (value) {
              return _this3.domElm.data('DateTimePicker')[methodName](value);
            }
            return _this3.domElm.data('DateTimePicker')[methodName]();
          };
        case 'caller':
        case 'getter':
        default:
          return function (value) {
            return _this3.domElm.data('DateTimePicker')[methodName]();
          };
      }
    };

    AbaDatetimePickerCustomElement.prototype.exposeMethods = function exposeMethods() {
      var _this4 = this;

      var methodList = [{ name: 'allowInputToggle', type: 'getterSetter' }, { name: 'calendarWeeks', type: 'getterSetter' }, { name: 'clear', type: 'caller' }, { name: 'collapse', type: 'getterSetter' }, { name: 'date', type: 'getterSetter' }, { name: 'daysOfWeekDisabled', type: 'getterSetter' }, { name: 'dayViewHeaderFormat', type: 'getterSetter' }, { name: 'defaultDate', type: 'getterSetter' }, { name: 'destroy', type: 'caller' }, { name: 'debug', type: 'caller' }, { name: 'disable', type: 'caller' }, { name: 'disabledDates', type: 'getterSetter' }, { name: 'disabledHours', type: 'getterSetter' }, { name: 'disabledTimeIntervals', type: 'getterSetter' }, { name: 'enable', type: 'caller' }, { name: 'enabledDates', type: 'getterSetter' }, { name: 'enabledHours', type: 'getterSetter' }, { name: 'extraFormats', type: 'getterSetter' }, { name: 'focusOnShow', type: 'getterSetter' }, { name: 'format', type: 'getterSetter' }, { name: 'hide', type: 'caller' }, { name: 'icons', type: 'getterSetter' }, { name: 'ignoreReadonly', type: 'getterSetter' }, { name: 'inline', type: 'getterSetter' }, { name: 'keepInvalid', type: 'getterSetter' }, { name: 'keyBinds', type: 'getterSetter' }, { name: 'locale', type: 'getterSetter' }, { name: 'maxDate', type: 'getterSetter' }, { name: 'minDate', type: 'getterSetter' }, { name: 'options', type: 'getterSetter' }, { name: 'parseInputDate', type: 'getterSetter' }, { name: 'show', type: 'caller' }, { name: 'showClear', type: 'getterSetter' }, { name: 'showClose', type: 'getterSetter' }, { name: 'showTodayButton', type: 'getterSetter' }, { name: 'sideBySide', type: 'getterSetter' }, { name: 'stepping', type: 'getterSetter' }, { name: 'toggle', type: 'caller' }, { name: 'toolbarplacement', type: 'getterSetter' }, { name: 'tooltips', type: 'getterSetter' }, { name: 'useCurrent', type: 'getterSetter' }, { name: 'useStrict', type: 'getterSetter' }, { name: 'viewDate', type: 'getterSetter' }, { name: 'viewMode', type: 'getterSetter' }, { name: 'widgetPositioning', type: 'getterSetter' }];

      var methods = {};
      methodList.forEach(function (method) {
        methods[method.name] = _this4.constructMethod(method.type, method.name);
      });

      this.methods = methods;
    };

    AbaDatetimePickerCustomElement.prototype.detached = function detached() {
      this.domElm.data('DateTimePicker').destroy();
    };

    return AbaDatetimePickerCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'iconSet', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'glyphicon';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'allowInputToggle', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'calendarWeeks', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'collapse', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'daysOfWeekDisabled', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'dayViewHeaderFormat', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'MMMM YYYY';
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'debug', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'defaultDate', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'disabledDates', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'disabledHours', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'disabledTimeIntervals', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'enabledDates', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'enabledHours', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, 'extraFormats', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, 'focusOnShow', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, 'format', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'YYYY-MM-DD';
    }
  }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, 'icons', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, 'ignoreReadonly', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, 'keepInvalid', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, 'keepOpen', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, 'inline', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, 'locale', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return _moment2.default.locale();
    }
  }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, 'maxDate', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, 'minDate', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, 'showClear', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, 'showClose', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, 'showTodayButton', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, 'sideBySide', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, 'stepping', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 1;
    }
  }), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, 'toolbarPlacement', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'default';
    }
  }), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, 'useCurrent', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return true;
    }
  }), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, 'useStrict', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, 'viewDate', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, 'viewMode', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'days';
    }
  }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, 'widgetParent', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor38 = _applyDecoratedDescriptor(_class2.prototype, 'widgetPositioning', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return {
        horizontal: 'auto',
        vertical: 'auto'
      };
    }
  })), _class2)) || _class);
});