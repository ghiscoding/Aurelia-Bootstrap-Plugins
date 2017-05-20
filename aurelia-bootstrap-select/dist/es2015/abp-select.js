var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22;

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

import { inject, bindable, bindingMode, DOM } from 'aurelia-framework';
import { UtilService } from './util-service';
import $ from 'jquery';
import 'bootstrap-select';
import { globalExtraOptions, globalPickerOptions } from './picker-global-options';

export let AbpSelectCustomElement = (_dec = inject(Element, UtilService), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec4 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class AbpSelectCustomElement {

  constructor(elm, utilService) {
    _initDefineProp(this, 'element', _descriptor, this);

    _initDefineProp(this, 'selectedItem', _descriptor2, this);

    _initDefineProp(this, 'selectedValue', _descriptor3, this);

    _initDefineProp(this, 'class', _descriptor4, this);

    _initDefineProp(this, 'collection', _descriptor5, this);

    _initDefineProp(this, 'dataMappingStructure', _descriptor6, this);

    _initDefineProp(this, 'disabled', _descriptor7, this);

    _initDefineProp(this, 'emptyOnNull', _descriptor8, this);

    _initDefineProp(this, 'hasOptgroup', _descriptor9, this);

    _initDefineProp(this, 'multiple', _descriptor10, this);

    _initDefineProp(this, 'objectKey', _descriptor11, this);

    _initDefineProp(this, 'pickerOptions', _descriptor12, this);

    _initDefineProp(this, 'placeholder', _descriptor13, this);

    _initDefineProp(this, 'selected', _descriptor14, this);

    _initDefineProp(this, 'onChanged', _descriptor15, this);

    _initDefineProp(this, 'onHide', _descriptor16, this);

    _initDefineProp(this, 'onHidden', _descriptor17, this);

    _initDefineProp(this, 'onLoaded', _descriptor18, this);

    _initDefineProp(this, 'onRendered', _descriptor19, this);

    _initDefineProp(this, 'onRefreshed', _descriptor20, this);

    _initDefineProp(this, 'onShow', _descriptor21, this);

    _initDefineProp(this, 'onShown', _descriptor22, this);

    this.elm = elm;
    this.util = utilService;

    elm.focus = () => this.input.focus();
  }

  attached() {
    this.domElm = $(this.elm).find('.selectpicker');

    let events = this.applyExposeEvents();
    let methods = this.exposeMethods();

    let pickerOptions = Object.assign({}, globalPickerOptions, this.pickerOptions || {});
    this.domElm.selectpicker(pickerOptions);

    this.element = {
      events: events,
      options: pickerOptions,
      methods: methods,
      dataMappingStructure: this.dataMappingStructure
    };

    this.watchOnLoadedToRenderPreSelection();
    this.watchOnChangedToUpdateValueAndItemObjects();
  }

  bind() {
    this.multiple = this.util.parseBool(this.multiple || this.elm.getAttribute('multiple'));
    let originalSelectedObjects = this.selectedItem || this.elm.getAttribute('selectedItem');
    let originalSelectedIndexes = this.selectedValue || this.elm.getAttribute('selectedValue');

    this._originalSelectedObjects = originalSelectedObjects ? JSON.parse(JSON.stringify(originalSelectedObjects)) : null;
    this._originalSelectedIndexes = originalSelectedIndexes ? JSON.parse(JSON.stringify(originalSelectedIndexes)) : null;
  }

  applyExposeEvents() {
    let events = {};

    this.domElm.on('show.bs.select', e => {
      if (typeof this.onShow === 'function') {
        this.onShow(e);
      }
      if (typeof events.onShow === 'function') {
        events.onShow(e);
      }
    });

    this.domElm.on('shown.bs.select', e => {
      if (typeof this.onShown === 'function') {
        this.onShown(e);
      }
      if (typeof events.onShown === 'function') {
        events.onShown(e);
      }
    });

    this.domElm.on('hide.bs.select', e => {
      if (typeof this.onHide === 'function') {
        this.onHide(e);
      }
      if (typeof events.onHide === 'function') {
        events.onHide(e);
      }
    });

    this.domElm.on('hidden.bs.select', e => {
      if (typeof this.onHidden === 'function') {
        this.onHidden(e);
      }
      if (typeof events.onHidden === 'function') {
        events.onHidden(e);
      }
    });

    this.domElm.on('loaded.bs.select', e => {
      if (typeof this.onLoaded === 'function') {
        this.onLoaded(e);
      }
      if (typeof events.onLoaded === 'function') {
        events.onLoaded(e);
      }
    });

    this.domElm.on('rendered.bs.select', e => {
      if (typeof this.onRendered === 'function') {
        this.onRendered(e);
      }
      if (typeof events.onRendered === 'function') {
        events.onRendered(e);
      }
    });

    this.domElm.on('refreshed.bs.select', e => {
      if (typeof this.onRefreshed === 'function') {
        this.onRefreshed(e);
      }
      if (typeof events.onRefreshed === 'function') {
        events.onRefreshed(e);
      }
    });

    this.domElm.on('changed.bs.select', (e, clickedIndex, newValue, oldValue) => {
      if (typeof this.onChanged === 'function') {
        this.onChanged(e);
      }
      if (typeof events.onChanged === 'function') {
        events.onChanged(e);
      }
    });

    return events;
  }

  blur() {
    const event = DOM.createCustomEvent('blur');
    this.elm.dispatchEvent(event);
  }

  exposeMethods() {
    let methods = {
      deselectAll: () => this.domElm.selectpicker('deselectAll'),
      destroy: () => this.domElm.selectpicker('destroy'),
      disableOptgroupByIndex: (index, isDisable = true) => {
        if (this.domElm.find('optgroup')[index]) {
          this.domElm.find('optgroup')[index].prop('disabled', isDisable);
          this.domElm.selectpicker('refresh');
        }
      },
      disableOptgroupByLabel: (label, isDisable = true) => {
        this.domElm.find(`optgroup[label=${label}]`).prop('disabled', isDisable);
        this.domElm.selectpicker('refresh');
      },
      mobile: () => this.domElm.selectpicker('mobile'),
      refresh: () => this.domElm.selectpicker('refresh'),
      render: () => this.domElm.selectpicker('render'),
      val: value => this.domElm.selectpicker('val', value),
      selectAll: () => this.domElm.selectpicker('selectAll'),
      setStyle: (style, isAddingTheClass = true) => {
        if (style.includes('btn')) {
          let action = isAddingTheClass ? 'add' : 'remove';
          this.domElm.selectpicker('setStyle', style, action);
        } else {
          this.domElm.addClass(style).selectpicker('setStyle');
        }
      }
    };

    return methods;
  }

  detached() {
    this.domElm.selectpicker('destroy');
  }

  getGroupedCollection() {
    let groupingPropName = this.getMappingProperty('groupLabel');
    let collectionGroupedAsObject = this.collection.reduce((groups, y) => {
      let key = y[groupingPropName];
      (groups[key] = groups[key] || []).push(y);

      return groups;
    }, {});

    return Object.keys(collectionGroupedAsObject).map(k => collectionGroupedAsObject[k]);
  }

  getMappingProperty(type) {
    let dataMappingStructure = this.getMergedMappingStructure();
    return dataMappingStructure[type];
  }

  getMappingPropertyValueFromIndex(inputArray, arrayIndex, searchPropName) {
    let propertyName = this.getMappingProperty(searchPropName);
    return inputArray[arrayIndex] && inputArray[arrayIndex].hasOwnProperty(propertyName) ? inputArray[arrayIndex][propertyName] : '';
  }

  getMappingPropertyValue(inputArray, searchPropName) {
    let propertyName = this.getMappingProperty(searchPropName);
    return inputArray.hasOwnProperty(propertyName) ? inputArray[propertyName] : '';
  }

  getMergedMappingStructure() {
    let dataMappingStructure = Object.assign({}, globalExtraOptions.mappingDataStructure, this.dataMappingStructure || {});
    return dataMappingStructure;
  }

  findItems(collection, newValue, objectKey) {
    let foundItems = [];
    let searchingItems = [];
    let selection = {
      indexes: [],
      items: []
    };
    if (newValue === null || newValue === undefined) {
      return selection;
    }

    if (!Array.isArray(newValue)) {
      searchingItems.push(newValue);
    } else {
      searchingItems = newValue;
    }

    for (let searchItem of searchingItems) {
      let searchFilter = this.util.isObject(searchItem) ? searchItem[objectKey] : searchItem;
      let foundItem = collection.find(item => {
        return this.util.isObject(item) ? item[objectKey] == searchFilter : item == searchFilter;
      });
      if (foundItem) {
        selection.indexes.push(this.util.isObject(foundItem) ? foundItem[objectKey] : foundItem);
        selection.items.push(foundItem);
        foundItems.push(foundItem);
      }
    }

    return selection;
  }

  isEmptySelection(selection) {
    if (!selection) {
      return true;
    }
    return selection.items.length === 0 && selection.indexes.length === 0;
  }

  isNotEmptySelection(selection) {
    if (!selection) {
      return true;
    }
    return selection.items.length > 0 && selection.indexes.length > 0;
  }

  isSelected(option) {
    if (option === this._originalSelectedIndexes || option === this._originalSelectedObjects) {
      return true;
    }
    return false;
  }

  renderSelection(selection) {
    if (selection.indexes.length > 0) {
      this.domElm.selectpicker('val', selection.indexes);
    } else if (this.util.parseBool(this.emptyOnNull) && this.isEmptySelection(selection)) {
      this.domElm.selectpicker('val', null);
    }
  }

  selectedItemChanged(newValue, oldValue) {
    if (!this.util.isEqual(newValue, oldValue)) {
      let selection = this.findItems(this.collection, newValue || this._originalSelectedIndexes, this.objectKey);

      if (!this.util.parseBool(this.emptyOnNull) && !this.multiple || this.isNotEmptySelection(selection)) {
        if (selection.indexes.length > 0) {
          this.selectedValue = selection.indexes;
        } else {
          this.selectedValue = this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0];
        }
      }

      this.renderSelection(selection);
    }
  }

  selectedValueChanged(newValue, oldValue) {
    if (!this.util.isEqual(newValue, oldValue)) {
      let selection = this.findItems(this.collection, newValue || this._originalSelectedObjects, this.objectKey);

      if (!this.util.parseBool(this.emptyOnNull) && !this.multiple || this.isNotEmptySelection(selection)) {
        this.selectedItem = selection.items.length > 0 ? selection.items : this.collection[0];
      }

      this.renderSelection(selection);
    }
  }

  watchOnLoadedToRenderPreSelection() {
    this.domElm.on('loaded.bs.select', e => {
      let newValue = this._originalSelectedIndexes || this._originalSelectedObjects;
      let selection = this.findItems(this.collection, newValue, this.objectKey);
      if (selection.indexes) {
        this.selectedValue = selection.indexes;
      } else {
        this.selectedValue = this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0];
      }
      this.selectedItem = selection.items ? selection.items : this.collection[0];
      this.renderSelection(selection);
    });
  }

  watchOnChangedToUpdateValueAndItemObjects() {
    this.domElm.on('changed.bs.select', (e, clickedIndex, newValue, oldValue) => {
      this.selectedValue = this.domElm.selectpicker('val');
      let selection = this.findItems(this.collection, this.selectedValue, this.objectKey);
      if (selection.indexes) {
        this.domElm.selectpicker('val', selection.indexes);
      }

      this.selectedValue = selection.indexes;
      this.selectedItem = selection.items;
    });
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selectedItem', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectedValue', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'class', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'collection', [bindable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'dataMappingStructure', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'disabled', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'emptyOnNull', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'hasOptgroup', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'multiple', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'objectKey', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'id';
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'pickerOptions', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'onChanged', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, 'onHide', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, 'onHidden', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, 'onLoaded', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, 'onRendered', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, 'onRefreshed', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, 'onShow', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, 'onShown', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);

export let OptionalBindingBehavior = class OptionalBindingBehavior {
  bind(binding, scope, interceptor) {
    binding.originalupdateTarget = binding.updateTarget;
    binding.originalTargetProperty = binding.targetProperty;
    binding.updateTarget = val => {
      if (val === undefined || val === null || val === '') {
        binding.targetProperty = null;
      } else {
        binding.targetProperty = binding.originalTargetProperty;
      }
      binding.originalupdateTarget(val);
    };
  }

  unbind(binding, scope) {
    binding.updateTarget = binding.originalupdateTarget;
    binding.originalupdateTarget = null;
    binding.targetProperty = binding.originalTargetProperty;
    binding.originalTargetProperty = null;
  }
};