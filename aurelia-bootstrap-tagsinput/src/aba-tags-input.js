import {inject, bindable, bindingMode} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput-typeahead.css';

@inject(Element)
export class AbaTagsInputCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) element;
  @bindable({defaultBindingMode: bindingMode.twoWay}) model;

  // options (from the View), with some defaults
  @bindable allowDuplicates = false;
  @bindable cancelConfirmKeysOnEmpty = false;
  @bindable confirmKeys = [13, 44];
  @bindable focusClass = 'focus';
  @bindable freeInput = true;
  @bindable itemValue;
  @bindable itemText;
  @bindable maxTags;
  @bindable maxChars;
  @bindable onTagExists;
  @bindable tagClass = 'label label-info';
  @bindable trimValue = false;
  @bindable typeahead = null;

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
  }

  attached() {
    // reference to the DOM element
    this.domElm = $(this.elm);

    // create TagsInput
    this.attachOptions();
    this.applyExposeEvents();
    this.exposeMethods();

    // finally create the tagsinput with all options
    this.domElm.tagsinput(this.options);

    // expose the element object to the outside
    // this will be useful for calling events/methods/options from the outside
    this.element = {
      events: this.events,
      options: this.options,
      methods: this.methods
    };
  }

  /**
   * Initialize tagsinput options
   */
  attachOptions() {
    let options = {
      allowDuplicates: this.allowDuplicates,
      cancelConfirmKeysOnEmpty: this.cancelConfirmKeysOnEmpty,
      confirmKeys: this.confirmKeys,
      focusClass: this.focusClass,
      freeInput: this.freeInput,
      maxChars: this.maxChars,
      maxTags: this.maxTags,
      tagClass: this.tagClass,
      trimValue: this.trimValue,
      typeahead: this.typeahead
    };

    // some of the options that have functions don't work well with defaults
    // so we will instantiate them only if they are defined by the user
    if (this.itemValue) {
      options.itemValue = this.itemValue;
    }
    if (this.itemText) {
      options.itemText = this.itemText;
    }
    if (this.onTagExists) {
      options.onTagExists = this.onTagExists;
    }

    this.options = options;
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
      this.model = this.domElm.tagsinput('items');
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
      this.model = this.domElm.tagsinput('items');
      if (typeof this.onItemRemoved === 'function') {
        this.onItemRemoved(e);
      }
      if (typeof this.events.onItemRemoved === 'function') {
        this.events.onItemRemoved(e);
      }
    });
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
      removeAll: () => this.domElm.tagsinput('removeAll')
    };

    this.methods = methods;
  }

  detached() {
    this.domElm.tagsinput('destroy');
  }
}
