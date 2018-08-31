'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionalBindingBehavior = exports.AbpSelectCustomElement = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23;

var _aureliaFramework = require('aurelia-framework');

var _utilService = require('./util-service');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('bootstrap-select');

var _pickerGlobalOptions = require('./picker-global-options');

var _aureliaBinding = require('aurelia-binding');

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

var AbpSelectCustomElement = exports.AbpSelectCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _utilService.UtilService, _aureliaBinding.BindingEngine), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
  function AbpSelectCustomElement(elm, utilService, bindingEngine) {
    var _this = this;

    _classCallCheck(this, AbpSelectCustomElement);

    _initDefineProp(this, 'collection', _descriptor, this);

    _initDefineProp(this, 'element', _descriptor2, this);

    _initDefineProp(this, 'selectedItem', _descriptor3, this);

    _initDefineProp(this, 'selectedValue', _descriptor4, this);

    _initDefineProp(this, 'class', _descriptor5, this);

    _initDefineProp(this, 'dataMappingStructure', _descriptor6, this);

    _initDefineProp(this, 'disabled', _descriptor7, this);

    _initDefineProp(this, 'emptyOnNull', _descriptor8, this);

    _initDefineProp(this, 'hasOptgroup', _descriptor9, this);

    _initDefineProp(this, 'multiple', _descriptor10, this);

    _initDefineProp(this, 'objectKey', _descriptor11, this);

    _initDefineProp(this, 'pickerOptions', _descriptor12, this);

    _initDefineProp(this, 'placeholder', _descriptor13, this);

    _initDefineProp(this, 'required', _descriptor14, this);

    _initDefineProp(this, 'selected', _descriptor15, this);

    _initDefineProp(this, 'onChanged', _descriptor16, this);

    _initDefineProp(this, 'onHide', _descriptor17, this);

    _initDefineProp(this, 'onHidden', _descriptor18, this);

    _initDefineProp(this, 'onLoaded', _descriptor19, this);

    _initDefineProp(this, 'onRendered', _descriptor20, this);

    _initDefineProp(this, 'onRefreshed', _descriptor21, this);

    _initDefineProp(this, 'onShow', _descriptor22, this);

    _initDefineProp(this, 'onShown', _descriptor23, this);

    this.elm = elm;
    this.util = utilService;
    this.bindingEngine = bindingEngine;

    elm.focus = function () {
      return _this.input.focus();
    };
  }

  AbpSelectCustomElement.prototype.attached = function attached() {
    var _this2 = this;

    this.domElm = (0, _jquery2.default)(this.pickerRef);

    var events = this.applyExposeEvents();
    var methods = this.exposeMethods();

    var pickerOptions = Object.assign({}, _pickerGlobalOptions.globalPickerOptions, this.pickerOptions || {});
    this.domElm.selectpicker(pickerOptions);

    this.element = {
      events: events,
      options: pickerOptions,
      methods: methods,
      dataMappingStructure: this.dataMappingStructure
    };

    var observer = this.bindingEngine.expressionObserver(this, 'collection');
    this.collectionSubscription = observer.subscribe(function (newCollection, oldCollection) {
      return _this2.collectionChangedObserver(newCollection, oldCollection);
    });

    this.watchOnLoadedToRenderPreSelection();
    this.watchOnChangedToUpdateValueAndItemObjects();
  };

  AbpSelectCustomElement.prototype.bind = function bind() {
    if (this.elm.hasAttribute('multiple')) {
      this.multiple = true;
      if (this.elm.getAttribute('multiple') === false) {
        this.multiple = false;
      }
    }

    var originalSelectedObjects = this.selectedItem || this.elm.getAttribute('selectedItem');
    var originalSelectedIndexes = this.selectedValue || this.elm.getAttribute('selectedValue');

    this._originalSelectedObjects = originalSelectedObjects ? JSON.parse(JSON.stringify(originalSelectedObjects)) : null;
    this._originalSelectedIndexes = originalSelectedIndexes ? JSON.parse(JSON.stringify(originalSelectedIndexes)) : null;
  };

  AbpSelectCustomElement.prototype.applyExposeEvents = function applyExposeEvents() {
    var _this3 = this;

    var events = {};

    this.domElm.on('show.bs.select', function (e) {
      if (typeof _this3.onShow === 'function') {
        _this3.onShow(e);
      }
      if (typeof events.onShow === 'function') {
        events.onShow(e);
      }
    });

    this.domElm.on('shown.bs.select', function (e) {
      if (typeof _this3.onShown === 'function') {
        _this3.onShown(e);
      }
      if (typeof events.onShown === 'function') {
        events.onShown(e);
      }
    });

    this.domElm.on('hide.bs.select', function (e) {
      if (typeof _this3.onHide === 'function') {
        _this3.onHide(e);
      }
      if (typeof events.onHide === 'function') {
        events.onHide(e);
      }
    });

    this.domElm.on('hidden.bs.select', function (e) {
      if (typeof _this3.onHidden === 'function') {
        _this3.onHidden(e);
      }
      if (typeof events.onHidden === 'function') {
        events.onHidden(e);
      }
    });

    this.domElm.on('loaded.bs.select', function (e) {
      if (typeof _this3.onLoaded === 'function') {
        _this3.onLoaded(e);
      }
      if (typeof events.onLoaded === 'function') {
        events.onLoaded(e);
      }
    });

    this.domElm.on('rendered.bs.select', function (e) {
      if (typeof _this3.onRendered === 'function') {
        _this3.onRendered(e);
      }
      if (typeof events.onRendered === 'function') {
        events.onRendered(e);
      }
    });

    this.domElm.on('refreshed.bs.select', function (e) {
      if (typeof _this3.onRefreshed === 'function') {
        _this3.onRefreshed(e);
      }
      if (typeof events.onRefreshed === 'function') {
        events.onRefreshed(e);
      }
    });

    this.domElm.on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
      if (typeof _this3.onChanged === 'function') {
        _this3.onChanged(e);
      }
      if (typeof events.onChanged === 'function') {
        events.onChanged(e);
      }
    });

    return events;
  };

  AbpSelectCustomElement.prototype.blur = function blur() {
    var event = _aureliaFramework.DOM.createCustomEvent('blur');
    this.elm.dispatchEvent(event);
  };

  AbpSelectCustomElement.prototype.exposeMethods = function exposeMethods() {
    var _this4 = this;

    var methods = {
      deselectAll: function deselectAll() {
        return _this4.domElm.selectpicker('deselectAll');
      },
      destroy: function destroy() {
        return _this4.domElm.selectpicker('destroy');
      },
      disableOptgroupByIndex: function disableOptgroupByIndex(index) {
        var isDisable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (_this4.domElm.find('optgroup')[index]) {
          _this4.domElm.find('optgroup')[index].prop('disabled', isDisable);
          _this4.domElm.selectpicker('refresh');
        }
      },
      disableOptgroupByLabel: function disableOptgroupByLabel(label) {
        var isDisable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _this4.domElm.find('optgroup[label=' + label + ']').prop('disabled', isDisable);
        _this4.domElm.selectpicker('refresh');
      },
      mobile: function mobile() {
        return _this4.domElm.selectpicker('mobile');
      },
      refresh: function refresh() {
        return _this4.domElm.selectpicker('refresh');
      },
      render: function render() {
        return _this4.domElm.selectpicker('render');
      },
      val: function val(value) {
        return _this4.domElm.selectpicker('val', value);
      },
      selectAll: function selectAll() {
        return _this4.domElm.selectpicker('selectAll');
      },
      setStyle: function setStyle(style) {
        var isAddingTheClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (style.includes('btn')) {
          var action = isAddingTheClass ? 'add' : 'remove';
          _this4.domElm.selectpicker('setStyle', style, action);
        } else {
          _this4.domElm.addClass(style).selectpicker('setStyle');
        }
      }
    };

    return methods;
  };

  AbpSelectCustomElement.prototype.collectionChangedObserver = function collectionChangedObserver(newCollection, oldCollection) {
    var _this5 = this;

    setTimeout(function () {
      _this5.domElm.selectpicker('refresh');
    });
  };

  AbpSelectCustomElement.prototype.detached = function detached() {
    this.domElm.selectpicker('destroy');
    this.collectionSubscription.dispose();
  };

  AbpSelectCustomElement.prototype.getGroupedCollection = function getGroupedCollection() {
    var groupingPropName = this.getMappingProperty('groupLabel');
    var collectionGroupedAsObject = this.collection.reduce(function (groups, y) {
      var key = y[groupingPropName];
      (groups[key] = groups[key] || []).push(y);

      return groups;
    }, {});

    return Object.keys(collectionGroupedAsObject).map(function (k) {
      return collectionGroupedAsObject[k];
    });
  };

  AbpSelectCustomElement.prototype.getMappingProperty = function getMappingProperty(type) {
    var dataMappingStructure = this.getMergedMappingStructure();
    return dataMappingStructure[type];
  };

  AbpSelectCustomElement.prototype.getMappingPropertyValueFromIndex = function getMappingPropertyValueFromIndex(inputArray, arrayIndex, searchPropName) {
    var propertyName = this.getMappingProperty(searchPropName);
    return inputArray[arrayIndex] && inputArray[arrayIndex].hasOwnProperty(propertyName) ? inputArray[arrayIndex][propertyName] : '';
  };

  AbpSelectCustomElement.prototype.getMappingPropertyValue = function getMappingPropertyValue(inputArray, searchPropName) {
    var propertyName = this.getMappingProperty(searchPropName);
    return inputArray.hasOwnProperty(propertyName) ? inputArray[propertyName] : '';
  };

  AbpSelectCustomElement.prototype.getMergedMappingStructure = function getMergedMappingStructure() {
    var dataMappingStructure = Object.assign({}, _pickerGlobalOptions.globalExtraOptions.mappingDataStructure, this.dataMappingStructure || {});
    return dataMappingStructure;
  };

  AbpSelectCustomElement.prototype.findItems = function findItems(collection, newValue, objectKey) {
    var _this6 = this;

    var searchingItems = [];
    var selection = {
      index: this.multiple ? [] : undefined,
      item: this.multiple ? [] : undefined
    };
    if (newValue === null || newValue === undefined) {
      return selection;
    }

    if (!Array.isArray(newValue)) {
      searchingItems.push(newValue);
    } else {
      searchingItems = newValue;
    }

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return 'break';
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return 'break';
        _ref = _i.value;
      }

      var searchItem = _ref;

      var searchFilter = _this6.util.isObject(searchItem) ? searchItem[objectKey] : searchItem;
      var foundItem = collection.find(function (item) {
        var itemInput = _this6.util.isObject(item) ? item[objectKey] : item;
        return itemInput.toString() === searchFilter.toString();
      });
      if (foundItem) {
        var foundItemIndex = _this6.util.isObject(foundItem) ? foundItem[objectKey] : foundItem;
        if (_this6.multiple) {
          selection.index.push(foundItemIndex);
          selection.item.push(foundItem);
        } else {
          selection.index = foundItemIndex;
          selection.item = foundItem;
          return 'break';
        }
      }
    };

    for (var _iterator = searchingItems, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      var _ret = _loop();

      if (_ret === 'break') break;
    }

    return selection;
  };

  AbpSelectCustomElement.prototype.isEmptySelection = function isEmptySelection(selection) {
    if (!selection) {
      return true;
    }
    if (this.multiple) {
      return selection.item.length === 0;
    }
    return selection.item ? false : true;
  };

  AbpSelectCustomElement.prototype.renderSelection = function renderSelection(selection) {
    if (this.domElm) {
      if (this.isEmptySelection(selection) && this.util.parseBool(this.emptyOnNull)) {
        this.domElm.selectpicker('val', null);
      } else if (!this.isEmptySelection(selection)) {
        this.domElm.selectpicker('val', selection.index);
      }
    }
  };

  AbpSelectCustomElement.prototype.selectedItemChanged = function selectedItemChanged(newValue, oldValue) {
    if (!this.util.isEqual(newValue, oldValue)) {
      var selection = this.findItems(this.collection, newValue || this._originalSelectedIndexes, this.objectKey);

      if (this.isEmptySelection(selection) && !this.util.parseBool(this.emptyOnNull) && !this.multiple) {
        this.selectedValue = this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0];
      } else if (!this.isEmptySelection(selection)) {
        this.selectedValue = selection.index;
      }

      this.renderSelection(selection);
    }
  };

  AbpSelectCustomElement.prototype.selectedValueChanged = function selectedValueChanged(newValue, oldValue) {
    if (!this.util.isEqual(newValue, oldValue)) {
      var selection = this.findItems(this.collection, newValue || this._originalSelectedObjects, this.objectKey);
      this.selectedItem = selection.item;
    }
  };

  AbpSelectCustomElement.prototype.watchOnLoadedToRenderPreSelection = function watchOnLoadedToRenderPreSelection() {
    var _this7 = this;

    this.domElm.on('loaded.bs.select', function (e) {
      var newValue = _this7._originalSelectedIndexes || _this7._originalSelectedObjects;
      var selection = _this7.findItems(_this7.collection, newValue, _this7.objectKey);
      if (_this7.isEmptySelection(selection)) {
        _this7.selectedValue = _this7.util.isObject(_this7.collection[0]) ? _this7.collection[0][_this7.objectKey] : _this7.collection[0];
        _this7.selectedItem = _this7.collection[0];
      } else {
        _this7.selectedValue = selection.index;
        _this7.selectedItem = selection.item;
      }
      _this7.renderSelection(selection);
    });
  };

  AbpSelectCustomElement.prototype.watchOnChangedToUpdateValueAndItemObjects = function watchOnChangedToUpdateValueAndItemObjects() {
    var _this8 = this;

    this.domElm.on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
      var val = _this8.domElm.selectpicker('val');
      var selection = _this8.findItems(_this8.collection, val, _this8.objectKey);
      _this8.selectedValue = selection.index;
    });
  };

  return AbpSelectCustomElement;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'collection', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectedItem', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'selectedValue', [_dec5], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'class', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'dataMappingStructure', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'emptyOnNull', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'hasOptgroup', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'multiple', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'objectKey', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'id';
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'pickerOptions', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'required', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, 'onChanged', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, 'onHide', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, 'onHidden', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, 'onLoaded', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, 'onRendered', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, 'onRefreshed', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, 'onShow', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, 'onShown', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);

var OptionalBindingBehavior = exports.OptionalBindingBehavior = function () {
  function OptionalBindingBehavior() {
    _classCallCheck(this, OptionalBindingBehavior);
  }

  OptionalBindingBehavior.prototype.bind = function bind(binding, scope, interceptor) {
    binding.originalupdateTarget = binding.updateTarget;
    binding.originalTargetProperty = binding.targetProperty;
    binding.updateTarget = function (val) {
      if (val === undefined || val === null || val === '') {
        binding.targetProperty = null;
      } else {
        binding.targetProperty = binding.originalTargetProperty;
      }
      binding.originalupdateTarget(val);
    };
  };

  OptionalBindingBehavior.prototype.unbind = function unbind(binding, scope) {
    binding.updateTarget = binding.originalupdateTarget;
    binding.originalupdateTarget = null;
    binding.targetProperty = binding.originalTargetProperty;
    binding.originalTargetProperty = null;
  };

  return OptionalBindingBehavior;
}();