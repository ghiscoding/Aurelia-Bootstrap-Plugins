import {inject, bindable, bindingMode, DOM} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput';
import {globalExtraOptions, globalPickerOptions} from './picker-global-options';

@inject(Element)
export class AbpTagsInputCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) element;
  @bindable({defaultBindingMode: bindingMode.twoWay}) value;

  // plugin own variables
  @bindable bootstrapVersion = globalExtraOptions.bootstrapVersion;
  @bindable placeholder = '';

  // picker options
  @bindable options;

  // events (from the View)
  @bindable onBeforeItemAdd;
  @bindable onBeforeItemRemove;
  @bindable onItemAdded;
  @bindable onItemAddedOnInit;
  @bindable onItemRemoved;

  // variables
  events = {};
  methods = {};
  options = {};

  constructor(elm) {
    this.elm = elm;

    // ensure the element exposes a "focus" method for Aurelia-Validation
    elm.focus = () => this.input.focus();
  }

  attached() {
    // reference to the DOM element
    this.domElm = $(this.elm).find('input');

    // Bootstrap 3 & 4 have different class names
    //if tagClass isn't yet configured we will define the tagClass depending on the version
    let pickerOptions = this.options || {};
    if (!this.options.tagClass) {
      pickerOptions.tagClass = this.bootstrapVersion === 3 ? 'label label-info' : 'badge badge-info';
    }

    // create TagsInput
    this.applyExposeEvents();
    this.exposeMethods();

    // finally create the tagsinput with all options
    pickerOptions = Object.assign({}, globalPickerOptions, pickerOptions);
    this.domElm.tagsinput(pickerOptions);

    // expose the element object to the outside
    // this will be useful for calling events/methods/options from the outside
    this.element = {
      events: this.events,
      options: this.options,
      methods: this.methods
    };
  }

  /**
   * Apply/expose tagsinput events
   * Each event has 2 ways of triggering an event (from the View as an attribute or from the ViewModel has a function call)
   */
  applyExposeEvents() {
    this.domElm.on('beforeItemAdd', (e) => {
      if (typeof this.onBeforeItemAdd === 'function') {
        this.onBeforeItemAdd(e);
      }
      if (typeof this.events.onBeforeItemAdd === 'function') {
        this.events.onBeforeItemAdd(e);
      }
    });

    this.domElm.on('beforeItemRemove', (e) => {
      if (typeof this.onBeforeItemRemove === 'function') {
        this.onBeforeItemRemove(e);
      }
      if (typeof this.events.onBeforeItemRemove === 'function') {
        this.events.onBeforeItemRemove(e);
      }
    });

    this.domElm.on('itemAdded', (e) => {
      this.value = this.domElm.tagsinput('items');
      if (typeof this.onItemAdded === 'function') {
        this.onItemAdded(e);
      }
      if (typeof this.events.onItemAdded === 'function') {
        this.events.onItemAdded(e);
      }
    });

    this.domElm.on('itemAddedOnInit', (e) => {
      if (typeof this.onItemAddedOnInit === 'function') {
        this.onItemAddedOnInit(e);
      }
      if (typeof this.events.onItemAddedOnInit === 'function') {
        this.events.onItemAddedOnInit(e);
      }
    });

    this.domElm.on('itemRemoved', (e) => {
      this.value = this.domElm.tagsinput('items');
      if (typeof this.onItemRemoved === 'function') {
        this.onItemRemoved(e);
      }
      if (typeof this.events.onItemRemoved === 'function') {
        this.events.onItemRemoved(e);
      }
    });
  }

  /**
   * forward "blur" events to the custom element
   * As described in Aurelia-Validation
   * https://www.danyow.net/aurelia-validation-alpha/
   */
  blur() {
    const event = DOM.createCustomEvent('blur');
    this.elm.dispatchEvent(event);
  }

  /**
   * Expose tagsinput methods
   */
  exposeMethods() {
    let methods = {
      add: (value) => this.domElm.tagsinput('add', value),
      destroy: () => this.domElm.tagsinput('destroy'),
      focus: () => this.domElm.tagsinput('focus'),
      input: () => { return this.domElm.tagsinput('input'); },
      refresh: () => this.domElm.tagsinput('refresh'),
      remove: (value) => this.domElm.tagsinput('remove', value),
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
}
