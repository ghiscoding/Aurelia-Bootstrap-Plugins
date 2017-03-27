'use strict';

System.register(['aurelia-framework', 'jquery', 'bootstrap-tagsinput/dist/bootstrap-tagsinput', './picker-global-options'], function (_export, _context) {
  "use strict";

  var inject, bindable, bindingMode, $, globalExtraOptions, globalPickerOptions, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, AbpTagsInputCustomElement;

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

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_bootstrapTagsinputDistBootstrapTagsinput) {}, function (_pickerGlobalOptions) {
      globalExtraOptions = _pickerGlobalOptions.globalExtraOptions;
      globalPickerOptions = _pickerGlobalOptions.globalPickerOptions;
    }],
    execute: function () {
      _export('AbpTagsInputCustomElement', AbpTagsInputCustomElement = (_dec = inject(Element), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function AbpTagsInputCustomElement(elm) {
          _classCallCheck(this, AbpTagsInputCustomElement);

          _initDefineProp(this, 'element', _descriptor, this);

          _initDefineProp(this, 'value', _descriptor2, this);

          _initDefineProp(this, 'bootstrapVersion', _descriptor3, this);

          _initDefineProp(this, 'placeholder', _descriptor4, this);

          _initDefineProp(this, 'options', _descriptor5, this);

          _initDefineProp(this, 'onBeforeItemAdd', _descriptor6, this);

          _initDefineProp(this, 'onBeforeItemRemove', _descriptor7, this);

          _initDefineProp(this, 'onItemAdded', _descriptor8, this);

          _initDefineProp(this, 'onItemAddedOnInit', _descriptor9, this);

          _initDefineProp(this, 'onItemRemoved', _descriptor10, this);

          this.events = {};
          this.methods = {};
          this.options = {};

          this.elm = elm;
        }

        AbpTagsInputCustomElement.prototype.attached = function attached() {
          this.domElm = $(this.elm).find('input');

          var pickerOptions = this.options || {};
          if (!this.options.tagClass) {
            pickerOptions.tagClass = this.bootstrapVersion === 3 ? 'label label-info' : 'badge badge-info';
          }

          this.applyExposeEvents();
          this.exposeMethods();

          pickerOptions = Object.assign({}, globalPickerOptions, pickerOptions);
          this.domElm.tagsinput(pickerOptions);

          this.element = {
            events: this.events,
            options: this.options,
            methods: this.methods
          };
        };

        AbpTagsInputCustomElement.prototype.applyExposeEvents = function applyExposeEvents() {
          var _this = this;

          this.domElm.on('beforeItemAdd', function (e) {
            if (typeof _this.onBeforeItemAdd === 'function') {
              _this.onBeforeItemAdd(e);
            }
            if (typeof _this.events.onBeforeItemAdd === 'function') {
              _this.events.onBeforeItemAdd(e);
            }
          });

          this.domElm.on('beforeItemRemove', function (e) {
            if (typeof _this.onBeforeItemRemove === 'function') {
              _this.onBeforeItemRemove(e);
            }
            if (typeof _this.events.onBeforeItemRemove === 'function') {
              _this.events.onBeforeItemRemove(e);
            }
          });

          this.domElm.on('itemAdded', function (e) {
            _this.value = _this.domElm.tagsinput('items');
            if (typeof _this.onItemAdded === 'function') {
              _this.onItemAdded(e);
            }
            if (typeof _this.events.onItemAdded === 'function') {
              _this.events.onItemAdded(e);
            }
          });

          this.domElm.on('itemAddedOnInit', function (e) {
            if (typeof _this.onItemAddedOnInit === 'function') {
              _this.onItemAddedOnInit(e);
            }
            if (typeof _this.events.onItemAddedOnInit === 'function') {
              _this.events.onItemAddedOnInit(e);
            }
          });

          this.domElm.on('itemRemoved', function (e) {
            _this.value = _this.domElm.tagsinput('items');
            if (typeof _this.onItemRemoved === 'function') {
              _this.onItemRemoved(e);
            }
            if (typeof _this.events.onItemRemoved === 'function') {
              _this.events.onItemRemoved(e);
            }
          });
        };

        AbpTagsInputCustomElement.prototype.exposeMethods = function exposeMethods() {
          var _this2 = this;

          var methods = {
            add: function add(value) {
              return _this2.domElm.tagsinput('add', value);
            },
            destroy: function destroy() {
              return _this2.domElm.tagsinput('destroy');
            },
            focus: function focus() {
              return _this2.domElm.tagsinput('focus');
            },
            input: function input() {
              return _this2.domElm.tagsinput('input');
            },
            refresh: function refresh() {
              return _this2.domElm.tagsinput('refresh');
            },
            remove: function remove(value) {
              return _this2.domElm.tagsinput('remove', value);
            },
            removeAll: function removeAll() {
              _this2.domElm.tagsinput('removeAll');
              _this2.value = _this2.domElm.tagsinput('items');
            }
          };

          this.methods = methods;
        };

        AbpTagsInputCustomElement.prototype.detached = function detached() {
          this.domElm.tagsinput('destroy');
        };

        return AbpTagsInputCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'bootstrapVersion', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return globalExtraOptions.bootstrapVersion;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'options', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'onBeforeItemAdd', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'onBeforeItemRemove', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'onItemAdded', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'onItemAddedOnInit', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'onItemRemoved', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class));

      _export('AbpTagsInputCustomElement', AbpTagsInputCustomElement);
    }
  };
});