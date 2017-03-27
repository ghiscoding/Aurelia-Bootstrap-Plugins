var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

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
import $ from 'jquery';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput';
import { globalExtraOptions, globalPickerOptions } from './picker-global-options';

export let AbpTagsInputCustomElement = (_dec = inject(Element), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class AbpTagsInputCustomElement {

  constructor(elm) {
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

  attached() {
    this.domElm = $(this.elm).find('input');

    let pickerOptions = this.options || {};
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
  }

  applyExposeEvents() {
    this.domElm.on('beforeItemAdd', e => {
      if (typeof this.onBeforeItemAdd === 'function') {
        this.onBeforeItemAdd(e);
      }
      if (typeof this.events.onBeforeItemAdd === 'function') {
        this.events.onBeforeItemAdd(e);
      }
    });

    this.domElm.on('beforeItemRemove', e => {
      if (typeof this.onBeforeItemRemove === 'function') {
        this.onBeforeItemRemove(e);
      }
      if (typeof this.events.onBeforeItemRemove === 'function') {
        this.events.onBeforeItemRemove(e);
      }
    });

    this.domElm.on('itemAdded', e => {
      this.value = this.domElm.tagsinput('items');
      if (typeof this.onItemAdded === 'function') {
        this.onItemAdded(e);
      }
      if (typeof this.events.onItemAdded === 'function') {
        this.events.onItemAdded(e);
      }
    });

    this.domElm.on('itemAddedOnInit', e => {
      if (typeof this.onItemAddedOnInit === 'function') {
        this.onItemAddedOnInit(e);
      }
      if (typeof this.events.onItemAddedOnInit === 'function') {
        this.events.onItemAddedOnInit(e);
      }
    });

    this.domElm.on('itemRemoved', e => {
      this.value = this.domElm.tagsinput('items');
      if (typeof this.onItemRemoved === 'function') {
        this.onItemRemoved(e);
      }
      if (typeof this.events.onItemRemoved === 'function') {
        this.events.onItemRemoved(e);
      }
    });
  }

  exposeMethods() {
    let methods = {
      add: value => this.domElm.tagsinput('add', value),
      destroy: () => this.domElm.tagsinput('destroy'),
      focus: () => this.domElm.tagsinput('focus'),
      input: () => {
        return this.domElm.tagsinput('input');
      },
      refresh: () => this.domElm.tagsinput('refresh'),
      remove: value => this.domElm.tagsinput('remove', value),
      removeAll: () => {
        this.domElm.tagsinput('removeAll');
        this.value = this.domElm.tagsinput('items');
      }
    };

    this.methods = methods;
  }

  detached() {
    this.domElm.tagsinput('destroy');
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'bootstrapVersion', [bindable], {
  enumerable: true,
  initializer: function () {
    return globalExtraOptions.bootstrapVersion;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
  enumerable: true,
  initializer: function () {
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
})), _class2)) || _class);