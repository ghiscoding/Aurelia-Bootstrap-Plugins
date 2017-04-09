import {inject, bindable, bindingMode} from 'aurelia-framework';
import {UtilService} from './util-service';
import $ from 'jquery';
import 'bootstrap-select';
import {globalExtraOptions, globalPickerOptions} from './picker-global-options';
//import 'bootstrap-select/dist/css/bootstrap-select.min.css';

@inject(Element, UtilService)
export class BselectCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) element;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedItem;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedValue;
  @bindable class;
  @bindable collection = [];
  @bindable dataMappingStructure;
  @bindable disabled = false;
  @bindable emptyOnNull = false;
  @bindable hasOptgroup = false;
  @bindable multiple = false;
  @bindable objectKey = 'id';
  @bindable pickerOptions;
  @bindable placeholder;
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

  constructor(elm, utilService) {
    this.elm = elm;
    this.util = utilService;
  }

  attached() {
    // reference to the DOM element
    this.domElm = $(this.elm).find('.selectpicker');

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

    this.watchOnLoadedToRenderPreSelection();
    this.watchOnChangedToUpdateValueAndItemObjects();
  }

  /**
   * Keep original value(s) that could be passed by the user ViewModel.
   * If nothing was passed, it will default to first option of select
   */
  bind() {
    this.multiple = this.util.parseBool(this.multiple || this.elm.getAttribute('multiple'));
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
   * Expose selectpicker methods
   */
  exposeMethods() {
    let methods = {
      deselectAll: () => this.domElm.selectpicker('deselectAll'),
      destroy: () => this.domElm.selectpicker('destroy'),
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

  detached() {
    this.domElm.selectpicker('destroy');
  }

  /**
   * Get the grouped collection by the mapping 'group' property
   * @return {array} groupedCollection
   */
  getGroupedCollection() {
    // group the array by the mapping group property
    // ex input: [{ id: 12, option: 'Steam', group: 'Breads' }, { id: 4, option: 'Mayonnaise', group: 'Condiments' }]
    // output: { Breads: [{ id: 12, option: 'Steam', group: 'Breads' }], Condiments: [{ id: 4, option: 'Mayonnaise', group: 'Condiments' }]}
    let groupingPropName = this.getMappingProperty('group');
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
   * From an input array, find the mapping property value by an index provided
   * Example: getMappingPropertyValueFromIndex(option, 2, 'group') => 'group' or the user custom group
   * @param {array} input array
   * @param {string} search property name
   * @return {any} found item (stringo/object)
   */
  getMappingPropertyValueFromIndex(inputArray, arrayIndex, searchPropName) {
    let propertyName = this.getMappingProperty(searchPropName);
    return inputArray[arrayIndex].hasOwnProperty(propertyName) ? inputArray[arrayIndex][propertyName] : '';
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
   * To support the "multiple" selection attribute and to make our life and code easier, we will use arrays to search and return the found item(s).
   * The array advantage is that even if we are not using "multiple", we will still have 1 value at the end (the only difference is that it's inside an array).
   * @param {array} collection
   * @param {any} newValue
   * @param {string} objectKey
   * @return {object} found selection, the output is an object with structure of selection = { indexes: [], items: [] };
   */
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
        // for comparison, we're using == mostly because indexes are passed as string because of html
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

  /**
   * From the selection object provided, we want to know if the selection is empty
   * The structure is:: selection = { indexes: [], items: [] };
   * @param {obejct} selection object
   */
  isEmptySelection(selection) {
    if (!selection) {
      return true;
    }
    return selection.items.length === 0 && selection.indexes.length === 0;
  }

  /**
   * From the selection object provided, we want to know if the selection is empty
   * The structure is:: selection = { indexes: [], items: [] };
   * @param {obejct} selection object
   */
  isNotEmptySelection(selection) {
    if (!selection) {
      return true;
    }
    return selection.items.length > 0 && selection.indexes.length > 0;
  }
  
  /**
   * From a selection option (from View), we want to know if the item is selected
   * @param {any} option
   */
  isSelected(option) {
    if (option === this._originalSelectedIndexes || option === this._originalSelectedObjects) {
      return true;
    }
    return false;
  }

  /**
   * Select the item in the UI element from a selection object passed
   * The structure is:: selection = { indexes: [], items: [] };
   * @param {object} selection object 
   */
  renderSelection(selection) {
    if (selection.indexes.length > 0) {
      this.domElm.selectpicker('val', selection.indexes);
    } else if (this.util.parseBool(this.emptyOnNull) && this.isEmptySelection(selection)) {
      this.domElm.selectpicker('val', null);
    }
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
      if ((!this.util.parseBool(this.emptyOnNull) && !this.multiple) || this.isNotEmptySelection(selection)) {
        if (selection.indexes.length > 0) {
          this.selectedValue = selection.indexes;
        } else {
          // value could be an object, if so we will use the objectKey (object.id by default)
          this.selectedValue = (this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0]);
        }
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

      // get selected items (string/object), unless user chose to emptyOnNull on first pass
      if ((!this.util.parseBool(this.emptyOnNull) && !this.multiple) || this.isNotEmptySelection(selection)) {
        this.selectedItem = (selection.items.length > 0) ? selection.items : this.collection[0];
      }

      this.renderSelection(selection);
    }
  }

  /**
   * onLoaded trigger, we will also check if user pre-selected any option(s).
   * Pre-selection of options can be done by index and/or by item object.
   * If provided, we will make them part of the select index/item and render selection on UI as well
   */
  watchOnLoadedToRenderPreSelection() {
    this.domElm.on('loaded.bs.select', (e) => {
      let newValue = this._originalSelectedIndexes || this._originalSelectedObjects;
      let selection = this.findItems(this.collection, newValue, this.objectKey);
      if (selection.indexes) {
        this.selectedValue = selection.indexes;
      } else {
        this.selectedValue = (this.util.isObject(this.collection[0]) ? this.collection[0][this.objectKey] : this.collection[0]);
      }
      this.selectedItem = selection.items ? selection.items : this.collection[0];
      this.renderSelection(selection);
    });
  }

  /**
   * onChanged trigger, we will update our index(es) and item object(s)
   */
  watchOnChangedToUpdateValueAndItemObjects() {
    this.domElm.on('changed.bs.select', (e, clickedIndex, newValue, oldValue) => {
      this.selectedValue = this.domElm.selectpicker('val');
      let selection = this.findItems(this.collection, this.selectedValue, this.objectKey);
      if (selection.indexes) {
        this.domElm.selectpicker('val', selection.indexes);
      }

      // refresh the bindable value/item
      this.selectedValue = selection.indexes;
      this.selectedItem = selection.items;
    });
  }
} // class > end
