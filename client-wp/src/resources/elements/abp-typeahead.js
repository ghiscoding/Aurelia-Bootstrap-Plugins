import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import $ from 'jquery';
import * as Handlebars from 'handlebars/dist/handlebars';
import * as Bloodhound from 'typeahead.js/dist/typeahead.bundle';
import './typeahead.css';
//import 'typeahead.js-bootstrap4-css/typeaheadjs.css';
import {globalElementOptions, globalBloodhoundOptions, globalTypeaheadOptions} from './global-options';

@inject(Element, HttpClient)
export class AbpTypeaheadCustomElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) element;
  @bindable({defaultBindingMode: bindingMode.twoWay}) value;

  // options (from the View), with some defaults
  @bindable placeholder;
  @bindable valueKey;
  @bindable datasets = globalElementOptions.datasets;
  @bindable limitTo = globalElementOptions.limitTo;
  @bindable prefetch = globalElementOptions.prefetch;
  @bindable prefetchUrl = globalElementOptions.prefetchUrl;
  @bindable template = globalElementOptions.template;
  @bindable remoteOptions = globalElementOptions.remoteOptions;

  // Bloodhound/Typeahead options
  @bindable bloodhoundOptions = {};
  @bindable typeaheadOptions = {};

  // hooks
  @bindable afterCallback;
  @bindable beforeCallback;

  // events (from the View)
  @bindable onActive;
  @bindable onAsyncCancel;
  @bindable onAsyncReceive;
  @bindable onAsyncRequest;
  @bindable onAutoComplete;
  @bindable onChange;
  @bindable onClose;
  @bindable onCursorChange;
  @bindable onIdle;
  @bindable onOpen;
  @bindable onRender;
  @bindable onSelect;

  // variables
  _events = {};

  constructor(element, httpClient) {
    this.elm = element;
    this.http = httpClient;
  }

  async attached() {
    if (!this.prefetch && !this.prefetchOptions && !this.template && !this.templateOptions) {
      throw new Error('Typeahead requires a valid prefetch/template to work, please provide any of the following attribute: prefect, prefetchUrl, template or templateUrl.');
    }

    // reference to the DOM element
    this.domElm = $(this.elm).find('.typeahead');

    // create typeahead
    this.applyExposeEvents();

    let tahOptions = this.typeaheadOptions || {};
    this.typeaheadOptions = Object.assign({}, globalTypeaheadOptions, tahOptions);

    let bhOptions = this.bloodhoundOptions || {};
    this.bloodhoundOptions = Object.assign({}, globalBloodhoundOptions, bhOptions);

    // constructs the suggestion engine
    if (this.prefetch || this.prefetchUrl) {
      this.bloodhoundOptions.prefetch = this.prefetch || this.prefetchUrl;
    } else if (this.remote || this.remoteOptions) {
      this.bloodhoundOptions.remote = this.remote || this.applyRemote();
    }

    this.datasets = await this.loadDatasets(this.bloodhoundOptions, this.valueKey, this.limitTo);

    // finally create the typeahead with all options
    this.domElm.typeahead(this.typeaheadOptions, this.datasets);

    // expose the element object
    this.element = {
      events: this._events,
      datasets: this.datasets,
      methods: this._methods,
      bloodhoundOptions: this.bloodhoundOptions,
      typeaheadOptions: this.typeaheadOptions,
    };
  }

  applyRemote() {
    let options = this.remoteOptions || {};
    let remoteOptions = Object.assign({}, globalElementOptions.remoteOptions, options);

    return {
      url: remoteOptions.url,
      cache: false,
      rateLimitBy: remoteOptions.rateLimitBy,
      rateLimitWait: remoteOptions.rateLimitWait,
      wildcard: remoteOptions.wildcard,
      prepare: (query, settings) => {
        if (typeof remoteOptions.beforeCallback === 'function') {
          remoteOptions.beforeCallback();
        }
        settings.url = settings.url.replace(new RegExp(remoteOptions.wildcard, 'g'), encodeURIComponent(query));
        return settings;
      },
      transform: (response) => {
        if (typeof remoteOptions.afterCallback === 'function') {
          remoteOptions.afterCallback();
        }
        var resultset = [];
        resultset = response;

        // return resultset (default array of objects), however it might be returned in a property of an object (typingaheadJsonResultProperty)
        return resultset;
      }
    };
  }

  /**
   * load the typeahead datasets object
   */
  async loadDatasets(bhOptions, valueKey, limitTo) {
    let templates = await this.loadTemplates();

    // kicks off the loading and processing of local, prefetch and/or remote data
    let bhSource = new Bloodhound(bhOptions);
    bhSource.initialize();

    let datasets = {
      displayKey: valueKey,
      limit: limitTo,
      source: bhSource.ttAdapter(),
      templates: templates
    };
    let mergedDatasets = Object.assign({}, datasets, this.datasets);

    return new Promise(resolve => resolve(mergedDatasets));
  }

  async loadTemplate(type, templateOptions) {
    let template;
    let url;

    switch(type) {
      case 'header' :
        template = templateOptions.header || '';
        url = templateOptions.headerUrl || '';
        break;
      case 'notFound' :
        template = templateOptions.notFound || '';
        url = templateOptions.notFoundUrl || '';
        break;
      case 'pending' :
        template = templateOptions.pending || '';
        url = templateOptions.pendingUrl || '';
        break;
      case 'suggestion' :
        template = templateOptions.suggestion || '';
        url = templateOptions.suggestionUrl || '';
        break;
    }

    if (url) {
      let templateResponse = await this.http.get(url);
      template = templateResponse.content || '';
    }

    return new Promise(resolve => resolve(template));
  }

  /**
   * load the typeahead templates
   */
  async loadTemplates() {
    let templateOptions = Object.assign({}, globalElementOptions.templateOptions, this.template);

    let headerTemplate = await this.loadTemplate('header', templateOptions);
    let notFoundTemplate = await this.loadTemplate('notFound', templateOptions);
    let pendingTemplate = await this.loadTemplate('pending', templateOptions);
    let suggestionTemplate = await this.loadTemplate('suggestion', templateOptions);

    let templates = {
      header: headerTemplate,
      notFound: notFoundTemplate,
      pending: pendingTemplate,
      suggestion: Handlebars.compile(suggestionTemplate)
    };
    let templating = Object.assign({}, templates, this.templates);

    return new Promise(resolve => resolve(templating));
  }

  /**
   * Apply/expose typeahead events
   * Each event has 2 ways of triggering an event (from the View as an attribute or from the ViewModel has a function call)
   */
  applyExposeEvents() {
    this.domElm.on('typeahead:active', (e) => {
      if (typeof this.onActive === 'function') {
        this.onActive(e);
      }
      if (typeof this._events.onActive === 'function') {
        this._events.onActive(e);
      }
    });
    this.domElm.on('typeahead:asynccancel', (e) => {
      if (typeof this.onAsyncCancel === 'function') {
        this.onAsyncCancel(e);
      }
      if (typeof this._events.onAsyncCancel === 'function') {
        this._events.onAsyncCancel(e);
      }
    });
    this.domElm.on('typeahead:asyncreceive', (e) => {
      if (typeof this.onAsyncReceive === 'function') {
        this.onAsyncReceive(e);
      }
      if (typeof this._events.onAsyncReceive === 'function') {
        this._events.onAsyncReceive(e);
      }
    });
    this.domElm.on('typeahead:asyncrequest', (e) => {
      if (typeof this.onAsyncRequest === 'function') {
        this.onAsyncRequest(e);
      }
      if (typeof this._events.onAsyncRequest === 'function') {
        this._events.onAsyncRequest(e);
      }
    });
    this.domElm.on('typeahead:autocomplete', (e) => {
      if (typeof this.onAutoComplete === 'function') {
        this.onAutoComplete(e);
      }
      if (typeof this._events.onAutoComplete === 'function') {
        this._events.onAutoComplete(e);
      }
    });
    this.domElm.on('typeahead:change', (e) => {
      if (typeof this.onChange === 'function') {
        this.onChange(e);
      }
      if (typeof this._events.onChange === 'function') {
        this._events.onChange(e);
      }
    });
    this.domElm.on('typeahead:close', (e) => {
      if (typeof this.onClose === 'function') {
        this.onClose(e);
      }
      if (typeof this._events.onClose === 'function') {
        this._events.onClose(e);
      }
    });
    this.domElm.on('typeahead:cursorchange', (e) => {
      if (typeof this.onCursorChange === 'function') {
        this.onCursorChange(e);
      }
      if (typeof this._events.onCursorChange === 'function') {
        this._events.onCursorChange(e);
      }
    });
    this.domElm.on('typeahead:idle', (e) => {
      if (typeof this.onIdle === 'function') {
        this.onIdle(e);
      }
      if (typeof this._events.onIdle === 'function') {
        this._events.onIdle(e);
      }
    });
    this.domElm.on('typeahead:open', (e) => {
      if (typeof this.onOpen === 'function') {
        this.onOpen(e);
      }
      if (typeof this._events.onOpen === 'function') {
        this._events.onOpen(e);
      }
    });
    this.domElm.on('typeahead:render', (e) => {
      if (typeof this.onRender === 'function') {
        this.onRender(e);
      }
      if (typeof this._events.onRender === 'function') {
        this._events.onRender(e);
      }
    });
    this.domElm.on('typeahead:select', (e) => {
      if (typeof this.onSelect === 'function') {
        this.onSelect(e);
      }
      if (typeof this._events.onSelect === 'function') {
        this._events.onSelect(e);
      }
    });
  }

  detached() {
    $(this.elm).typeahead('destroy');
  }
}
