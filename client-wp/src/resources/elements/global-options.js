import * as Bloodhound from 'typeahead.js/dist/typeahead.bundle';

/**
 * Extra options that can be passed to the Custom Element
 */
export let globalElementOptions = {
  datasets: null,
  limitTo: Infinity,
  prefetch: null,
  prefetchUrl: '',
  remote: null,
  remoteOptions: {
    url: '',
    rateLimitBy: 'debounce',
    rateLimitWait: 300,
    wildcard: '%QUERY'
  },
  templateOptions: {
    footer: '',
    header: '',
    notFound: '<div class="empty-message">No matches.</div>',
    notFoundUrl: '',
    pending: '',
    pendingUrl: '',
    url: ''
  }
};

/**
 * Options that can be passed to Bloodhound Suggestion Engine
 */
export let globalBloodhoundOptions = {
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.whitespace
};

/**
 * Options that can be passed to jQuery Typeahead
 */
export let globalTypeaheadOptions = {
  classNames: {
    wrapper: 'twitter-typeahead',
    input: 'tt-input',
    hint: 'tt-hint',
    menu: 'tt-menu',
    dataset: 'tt-dataset',
    suggestion: 'tt-suggestion',
    selectable: 'tt-selectable',
    empty: 'tt-empty',
    open: 'tt-open',
    cursor: 'tt-cursor',
    highlight: 'tt-highlight'
  },
  hint: true,
  highlight: true,
  minLength: 1
};
