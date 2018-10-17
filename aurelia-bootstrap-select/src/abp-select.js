import {inject, bindable, bindingMode, DOM} from 'aurelia-framework';
import {UtilService} from './util-service';
import $ from 'jquery';
import 'bootstrap-select';
import {globalExtraOptions, globalPickerOptions} from './picker-global-options';
import {BindingEngine} from 'aurelia-binding';
//import 'bootstrap-select/dist/css/bootstrap-select.min.css';

@inject(Element, UtilService, BindingEngine)
export class AbpSelectCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) collection = [];
  @bindable({defaultBindingMode: bindingMode.twoWay}) element;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedItem;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedValue;
  @bindable class;
  @bindable dataMappingStructure;
  @bindable disabled = false;
  @bindable emptyOnNull = false;
  @bindable hasOptgroup = false;
  @bindable multiple = false;
  @bindable objectKey = 'id';
  @bindable pickerOptions;
  @bindable placeholder;
  @bindable required = false;
  @bindable selected;

  // events (from the View)
  @bindable onChanged;
  @bindable onHide;
  @bindable onHidden;
  @bindable onLoaded;
  @bindable onRendered;
  @bindable onRefreshed;
  @bindable onShow;
  @bindable onShown;

  // variables
  _originalSelectedIndexes;
  _originalSelectedObjects;
  pickerRef;
  bindingEngine;
  collectionSubscription;

  constructor(elm, utilService, bindingEngine) {
    this.elm = elm;
    this.util = utilService;
    this.bindingEngine = bindingEngine;

    // ensure the element exposes a "focus" method for Aurelia-Validation
    elm.focus = () => this.input.focus();
  }

  attached() {
    // reference to the DOM element
    this.domElm = $(this.pickerRef);

    // expose events & methods
    let events = this.applyExposeEvents();
    let methods = this.exposeMethods();

    // finally create the bootstrap-select with all options
    let pickerOptions = Object.assign({}, globalPickerOptions, this.pickerOptions || {});
    this.domElm.selectpicker(pickerOptions);

    // expose the element object to the outside
    // this will be useful for calling events/methods/options from the outside
    this.element = {
      events: events,
      options: pickerOptions,
      methods: methods,
      dataMappingStructure: this.dataMappingStructure
    };

    let observer = this.bindingEngine.expressionObserver(this, 'collection');
    this.collectionSubscription = observer.subscribe((newCollection, oldCollection) => this.collectionChangedObserver(newCollection, oldCollection));

    this.watchOnLoadedToRenderPreSelection();
    this.watchOnChangedToUpdateValueAndItemObjects();
  }

  /**
   * Keep original value(s) that could be passed by the user ViewModel.
   * If nothing was passed, it will default to first option of select
   */
  bind() {
    if (this.elm.hasAttribute('multiple')) {
      this.multiple = true;
      if (this.elm.getAttribute('multiple') === false) {
        this.multiple = false;
      }
    }

    let originalSelectedObjects = this.selectedItem || this.elm.getAttribute('selectedItem');
    let originalSelectedIndexes = this.selectedValue || this.elm.getAttribute('selectedValue');

    // make a deep clone copy to avoid object pointer issues
    this._originalSelectedObjects = originalSelectedObjects ? JSON.parse(JSON.stringify(originalSelectedObjects)) : null;
    this._originalSelectedIndexes = originalSelectedIndexes ? JSON.parse(JSON.stringify(originalSelectedIndexes)) : null;
  }

  /**
   * Apply/expose selectpicker events
   * Each event has 2 ways of triggering an event (from the View as an attribute or from the ViewModel has a function call)
   */
  applyExposeEvents() {
    let events = {};

    this.domElm.on('show.bs.select', (e) => {
      if (typeof this.onShow === 'function') {
        this.onShow(e);
      }
      if (typeof events.onShow === 'function') {
        events.onShow(e);
      }
    });

    this.domElm.on('shown.bs.select', (e) => {
      if (typeof this.onShown === 'function') {
        this.onShown(e);
      }
      if (typeof events.onShown === 'function') {
        events.onShown(e);
      }
    });

    this.domElm.on('hide.bs.select', (e) => {
      if (typeof this.onHide === 'function') {
        this.onHide(e);
      }
      if (typeof events.onHide === 'function') {
        events.onHide(e);
      }
    });

    this.domElm.on('hidden.bs.select', (e) => {
      if (typeof this.onHidden === 'function') {
        this.onHidden(e);
      }
      if (typeof events.onHidden === 'function') {
        events.onHidden(e);
      }
    });

    this.domElm.on('loaded.bs.select', (e) => {
      if (typeof this.onLoaded === 'function') {
        this.onLoaded(e);
      }
      if (typeof events.onLoaded === 'function') {
        events.onLoaded(e);
      }
    });

    this.domElm.on('rendered.bs.select', (e) => {
      if (typeof this.onRendered === 'function') {
        this.onRendered(e);
      }
      if (typeof events.onRendered === 'function') {
        events.onRendered(e);
      }
    });

    this.domElm.on('refreshed.bs.select', (e) => {
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
   * Expose selectpicker methods
   */
  exposeMethods() {
    let methods = {
      deselectAll: () => this.domElm.selectpicker('deselectAll'),
      destroy: () => this.domElm.selectpicker('destroy'),
      disableOptgroupByIndex: (index, isDisable = true) => {
        if (this.domElm.find('optgroup')[index]) {
          const optgroup = this.domElm.find('optgroup').eq(index);
          const label = optgroup.prop('label');
          optgroup.prop('disabled', isDisable);
          this.collection.forEach((item) => {
            if (item.group === label) {
              item.disabled = isDisable;
            }
          });
          this.domElm.selectpicker('refresh');
        }
      },
      disableOptgroupByLabel: (label, isDisable = true) => {
        this.domElm.find(`optgroup[label=${label}]`).prop('disabled', isDisable);
        this.collection.forEach((item) => {
          if (item.group === label) {
            item.disabled = isDisable;
          }
        });
        this.domElm.selectpicker('refresh');
      },
      mobile: () => this.domElm.selectpicker('mobile'),
      refresh: () => this.domElm.selectpicker('refresh'),
      render: () => this.domElm.selectpicker('render'),
      val: (value) => this.domElm.selectpicker('val', value),
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

  collectionChangedObserver(newCollection, oldCollection) {
    setTimeout(() => {
      this.domElm.selectpicker('refresh');
      this.renderPreSelection();
    });
  }

  detached() {
    if (this.domElm && this.domElm.selectpicker) {
      this.domElm.selectpicker('destroy');
    }
    this.collectionSubscription.dispose();
  }

  /**
   * Get the grouped collection by the mapping 'groupLabel' property
   * @return {array} groupedCollection
   */
  getGroupedCollection() {
    // group the array by the mapping group property
    // ex input: [{ id: 12, option: 'Steam', group: 'Breads' }, { id: 4, option: 'Mayonnaise', group: 'Condiments' }]
    // output: { Breads: [{ id: 12, option: 'Steam', group: 'Breads' }], Condiments: [{ id: 4, option: 'Mayonnaise', group: 'Condiments' }]}
    let groupingPropName = this.getMappingProperty('groupLabel');
    let collectionGroupedAsObject = this.collection.reduce((groups, y) => {
      let key = y[groupingPropName];
      (groups[key] = groups[key] || []).push(y);

      return groups;
    }, {});

    // then recreate an array with previously found subgroup
    // output: [ [{ id: 12, option: 'Steam', group: 'Breads' }], [{ id: 4, option: 'Mayonnaise', group: 'Condiments' }] ]
    return Object.keys(collectionGroupedAsObject).map(k => collectionGroupedAsObject[k]);
  }

  /**
   * Get data structure mapping property
   * @param {string} type
   * @return {string} mappingPropertyName
   */
  getMappingProperty(type) {
    let dataMappingStructure = this.getMergedMappingStructure();
    return dataMappingStructure[type];
  }

  /**
   * From an input array, find the mapping property of the first element
   * Example: getMappingPropertyValueFromGroup(option, 'groupLabel') => 'groupLabel' or the user custom group
   * @param {array} input array
   * @param {string} search property name
   * @return {any} found item (stringo/object)
   */
  getMappingPropertyValueFromGroup(inputArray, searchPropName) {
    let propertyName = this.getMappingProperty(searchPropName);
    return (Array.isArray(inputArray) && inputArray[0] && inputArray[0].hasOwnProperty(propertyName)) ? inputArray[0][propertyName] : '';
  }

  /**
   * From an input array, find the mapping property value
   * Example: getMappingPropertyValue(option, 'divider') => 'divider' or the user custom divider
   * @param {array} input array
   * @param {string} search property name
   * @return {any} found item (stringo/object)
   */
  getMappingPropertyValue(inputArray, searchPropName) {
    let propertyName = this.getMappingProperty(searchPropName);
    return inputArray.hasOwnProperty(propertyName) ? inputArray[propertyName] : '';
  }

  /**
   * Get merged data structure mapping
   * @return {array} mergedDataMappingStructure
   */
  getMergedMappingStructure() {
    let dataMappingStructure = Object.assign({}, globalExtraOptions.mappingDataStructure, this.dataMappingStructure || {});
    return dataMappingStructure;
  }

  /**
   * Find item(s) in the collection.
   * @param {array} collection
   * @param {any} newValue
   * @param {string} objectKey
   * @return {object} found selection, the output is an object with structure of selection = { indexes: any | any[], items: any | any[] };
   */
  findItems(collection, newValue, objectKey) {
    let searchingItems = [];
    let selection = {
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

    for (let searchItem of searchingItems) {
      let searchFilter = this.util.isObject(searchItem) ? searchItem[objectKey] : searchItem;
      let foundItem = collection.find(item => {
        // for comparison, we're using == mostly because indexes are passed as string because of html
        const itemInput = this.util.isObject(item) ? item[objectKey] : item;
        return !item.disabled && itemInput.toString() === searchFilter.toString();
      });
      if (foundItem) {
        const foundItemIndex = this.util.isObject(foundItem) ? foundItem[objectKey] : foundItem;
        if (this.multiple) {
          selection.index.push(foundItemIndex);
          selection.item.push(foundItem);
        } else {
          selection.index = foundItemIndex;
          selection.item = foundItem;
          break;
        }
      }
    }

    return selection;
  }

  /**
   * From the selection object provided, we want to know if the selection is empty
   * The structure is:: selection = { indexes: [], items: [] };
   * @param {obejct} selection object
   */
  isEmptySelection(selection) {
    if (!selection) {
      return true;
    }
    if (this.multiple) {
      return selection.item.length === 0;
    }
    return selection.item ? false : true;
  }

  /**
   * Select the item in the UI element from a selection object passed
   * The structure is:: selection = { indexes: [], items: [] };
   * @param {object} selection object
   */
  renderSelection(selection) {
    if (this.domElm) {
      if (this.isEmptySelection(selection) && this.util.parseBool(this.emptyOnNull)) {
        this.domElm.selectpicker('val', null);
      } else if (!this.isEmptySelection(selection)) {
        this.domElm.selectpicker('val', selection.index);
      }
    }
  }

  renderPreSelection() {
    let newValue = this._originalSelectedIndexes || this._originalSelectedObjects;
    let selection = this.findItems(this.collection, newValue, this.objectKey);
    if (this.isEmptySelection(selection)) {
      this.selectedValue = (this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0]);
      this.selectedItem = this.collection[0];
    } else {
      this.selectedValue = selection.index;
      this.selectedItem = selection.item;
    }
    this.renderSelection(selection);
  }

  /**
   * On selected item (ids) changed, we will update the selectedValue(s) unless user chose emptyOnNull on first pass.
   * We will also render the selection with new value(s)
   * @param {any} newValue
   * @param {any} oldValue
   */
  selectedItemChanged(newValue, oldValue) {
    if (!this.util.isEqual(newValue, oldValue)) {
      let selection = this.findItems(this.collection, newValue || this._originalSelectedIndexes, this.objectKey);

      // get selected indexes (ids), unless user chose to emptyOnNull on first pass
      if (this.isEmptySelection(selection) && !this.util.parseBool(this.emptyOnNull) && !this.multiple) {
        // value could be an object, if so we will use the objectKey (object.id by default)
        this.selectedValue = (this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0]);
      } else if (!this.isEmptySelection(selection)) {
        this.selectedValue = selection.index;
      }

      this.renderSelection(selection);
    }
  }

  /**
   * On selected value (string/object) changed, we will update the selectedItem(s) unless user chose emptyOnNull on first pass.
   * We will also render the selection with new value(s)
   * @param {any} newValue
   * @param {any} oldValue
   */
  selectedValueChanged(newValue, oldValue) {
    if (!this.util.isEqual(newValue, oldValue)) {
      let selection = this.findItems(this.collection, newValue || this._originalSelectedObjects, this.objectKey);
      this.selectedItem = selection.item;
    }
  }

  /**
   * onLoaded trigger, we will also check if user pre-selected any option(s).
   * Pre-selection of options can be done by index and/or by item object.
   * If provided, we will make them part of the select index/item and render selection on UI as well
   */
  watchOnLoadedToRenderPreSelection() {
    this.domElm.on('loaded.bs.select', (e) => {
      this.renderPreSelection();
    });
  }

  /**
   * onChanged trigger, we will update our index(es) and item object(s)
   */
  watchOnChangedToUpdateValueAndItemObjects() {
    this.domElm.on('changed.bs.select', (e, clickedIndex, newValue, oldValue) => {
      if (clickedIndex !== undefined) {
        const val = this.domElm.selectpicker('val');
        let selection = this.findItems(this.collection, val, this.objectKey);
        this.selectedValue = selection.index;
      }
    });
  }
} // class > end

export class OptionalBindingBehavior {
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
}
