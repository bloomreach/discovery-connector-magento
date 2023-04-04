(function () {
  'use strict';

  const AUTOSUGGEST_MINIMUM_QUERY_LENGTH = 2;
  const AUTOSUGGEST_TYPED_QUERY_TEMPLATE = '<span class="blm-autosuggest__suggestion-term-link--typed-query"><%= query %></span>';
  const COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS = 'cdp_segments';
  const COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE = 'customer_profile';
  const DEFAULT_CURRENCY = '$';
  const DEFAULT_PAGE_SIZE = 16;
  const DEFAULT_SEARCH_PARAMETER = 'q';
  const DEFAULT_SORTING_OPTIONS = [{
    label: 'Relevance',
    value: ''
  }, {
    label: 'Price (low - high)',
    value: 'price+asc'
  }, {
    label: 'Price (high - low)',
    value: 'price+desc'
  }, {
    label: 'Name (A - Z)',
    value: 'title+asc'
  }, {
    label: 'Name (Z - A)',
    value: 'title+desc'
  }];
  const DEFAULT_START = 0;
  const DEFAULT_WIDGETS_TO_DISPLAY = 4;
  const FIELD_NAME_PRICE = 'price';
  const MAX_COLOR_SWATCHES = 4;
  const MAX_PAGINATION_NUMBER_BEFORE_CURRENT = 2;
  const MAX_PAGINATION_NUMBER_AFTER_CURRENT = 2;
  const NUMBER_OF_AUTOSUGGEST_COLLECTIONS = 8;
  const NUMBER_OF_AUTOSUGGEST_PRODUCTS = 8;
  const NUMBER_OF_AUTOSUGGEST_TERMS = 4;
  const NUMBER_OF_FACET_GROUPS = 5;
  const NUMBER_OF_FACET_VALUES = 6;
  const PARAMETER_NAME_FACETS = 'fq';
  const PARAMETER_NAME_FILTERS_PANEL = 'filterpanel';
  const PARAMETER_NAME_GROUPBY = 'groupby';
  const PARAMETER_NAME_PAGE = 'page';
  const PARAMETER_NAME_SIZE = 'size';
  const PARAMETER_NAME_SORT = 'sort';
  const REQUEST_TYPE_SEARCH = 'search';
  const REQUEST_TYPE_SUGGEST = 'suggest';
  const SEARCH_TYPE_CATEGORY = 'category';
  const SEARCH_TYPE_KEYWORD = 'keyword';
  const SELECTOR_AUTOSUGGEST_INPUT = '.search__input';
  const SELECTOR_SEARCH_RESULTS_CONTAINER = '.main-content';
  /**
   * This is the attribute name used to flag an element as an add to cart event
   * generator, such as a butto or link.
   */
  const ADD_TO_CART_ATTRIBUTE_NAME = 'data-blm-add-to-cart';
  /**
   * Attribute that should be applied to the element that has
   * ADD_TO_CART_ATTRIBUTE_NAME added to it to populate the sku value sent in the
   * pixel event.
   */
  const ADD_TO_CART_ATTRIBUTE_SKU = 'data-blm-add-to-cart-sku';
  /**
   * Attribute that should be applied to the element that has
   * ADD_TO_CART_ATTRIBUTE_NAME added to it to populate the prod_id value sent in
   * the pixel event.
   */
  const ADD_TO_CART_ATTRIBUTE_PROD_ID = 'data-blm-add-to-cart-prod-id';
  /**
   * Attribute that should be applied to the element that has
   * ADD_TO_CART_ATTRIBUTE_NAME added to it to prevent emitting the pixel event.
   */
  const ADD_TO_CART_ATTRIBUTE_DISABLE = 'data-blm-add-to-cart-disable';
  const QUICKVIEW_ATTRIBUTE_NAME = 'data-blm-quickview';
  const QUICKVIEW_ATTRIBUTE_SKU = 'data-blm-quickview-sku';
  const QUICKVIEW_ATTRIBUTE_PROD_ID = 'data-blm-quickview-prod-id';
  const QUICKVIEW_ATTRIBUTE_PROD_NAME = 'data-blm-quickview-prod-name';

  var constants = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AUTOSUGGEST_MINIMUM_QUERY_LENGTH: AUTOSUGGEST_MINIMUM_QUERY_LENGTH,
    AUTOSUGGEST_TYPED_QUERY_TEMPLATE: AUTOSUGGEST_TYPED_QUERY_TEMPLATE,
    COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS: COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS,
    COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE: COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE,
    DEFAULT_CURRENCY: DEFAULT_CURRENCY,
    DEFAULT_PAGE_SIZE: DEFAULT_PAGE_SIZE,
    DEFAULT_SEARCH_PARAMETER: DEFAULT_SEARCH_PARAMETER,
    DEFAULT_SORTING_OPTIONS: DEFAULT_SORTING_OPTIONS,
    DEFAULT_START: DEFAULT_START,
    DEFAULT_WIDGETS_TO_DISPLAY: DEFAULT_WIDGETS_TO_DISPLAY,
    FIELD_NAME_PRICE: FIELD_NAME_PRICE,
    MAX_COLOR_SWATCHES: MAX_COLOR_SWATCHES,
    MAX_PAGINATION_NUMBER_BEFORE_CURRENT: MAX_PAGINATION_NUMBER_BEFORE_CURRENT,
    MAX_PAGINATION_NUMBER_AFTER_CURRENT: MAX_PAGINATION_NUMBER_AFTER_CURRENT,
    NUMBER_OF_AUTOSUGGEST_COLLECTIONS: NUMBER_OF_AUTOSUGGEST_COLLECTIONS,
    NUMBER_OF_AUTOSUGGEST_PRODUCTS: NUMBER_OF_AUTOSUGGEST_PRODUCTS,
    NUMBER_OF_AUTOSUGGEST_TERMS: NUMBER_OF_AUTOSUGGEST_TERMS,
    NUMBER_OF_FACET_GROUPS: NUMBER_OF_FACET_GROUPS,
    NUMBER_OF_FACET_VALUES: NUMBER_OF_FACET_VALUES,
    PARAMETER_NAME_FACETS: PARAMETER_NAME_FACETS,
    PARAMETER_NAME_FILTERS_PANEL: PARAMETER_NAME_FILTERS_PANEL,
    PARAMETER_NAME_GROUPBY: PARAMETER_NAME_GROUPBY,
    PARAMETER_NAME_PAGE: PARAMETER_NAME_PAGE,
    PARAMETER_NAME_SIZE: PARAMETER_NAME_SIZE,
    PARAMETER_NAME_SORT: PARAMETER_NAME_SORT,
    REQUEST_TYPE_SEARCH: REQUEST_TYPE_SEARCH,
    REQUEST_TYPE_SUGGEST: REQUEST_TYPE_SUGGEST,
    SEARCH_TYPE_CATEGORY: SEARCH_TYPE_CATEGORY,
    SEARCH_TYPE_KEYWORD: SEARCH_TYPE_KEYWORD,
    SELECTOR_AUTOSUGGEST_INPUT: SELECTOR_AUTOSUGGEST_INPUT,
    SELECTOR_SEARCH_RESULTS_CONTAINER: SELECTOR_SEARCH_RESULTS_CONTAINER,
    ADD_TO_CART_ATTRIBUTE_NAME: ADD_TO_CART_ATTRIBUTE_NAME,
    ADD_TO_CART_ATTRIBUTE_SKU: ADD_TO_CART_ATTRIBUTE_SKU,
    ADD_TO_CART_ATTRIBUTE_PROD_ID: ADD_TO_CART_ATTRIBUTE_PROD_ID,
    ADD_TO_CART_ATTRIBUTE_DISABLE: ADD_TO_CART_ATTRIBUTE_DISABLE,
    QUICKVIEW_ATTRIBUTE_NAME: QUICKVIEW_ATTRIBUTE_NAME,
    QUICKVIEW_ATTRIBUTE_SKU: QUICKVIEW_ATTRIBUTE_SKU,
    QUICKVIEW_ATTRIBUTE_PROD_ID: QUICKVIEW_ATTRIBUTE_PROD_ID,
    QUICKVIEW_ATTRIBUTE_PROD_NAME: QUICKVIEW_ATTRIBUTE_PROD_NAME
  });

  const globalBloomreachModules = Object.assign(Object.assign({}, window.BloomreachModules ? window.BloomreachModules : {}), {
    version: '4.0.0',
    constants
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function () {
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var ejs = {};

  var _polyfillNode_fs = {};

  var _polyfillNode_fs$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _polyfillNode_fs
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_fs$1);

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  function resolve() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : '/';

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  }
  // path.normalize(path)
  // posix version
  function normalize(path) {
    var isPathAbsolute = isAbsolute(path),
        trailingSlash = substr(path, -1) === '/';

    // Normalize the path
    path = normalizeArray(filter(path.split('/'), function(p) {
      return !!p;
    }), !isPathAbsolute).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }
  // posix version
  function isAbsolute(path) {
    return path.charAt(0) === '/';
  }

  // posix version
  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize(filter(paths, function(p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }).join('/'));
  }


  // path.relative(from, to)
  // posix version
  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  }

  var sep = '/';
  var delimiter = ':';

  function dirname(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }

  function basename(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  }


  function extname(path) {
    return splitPath(path)[3];
  }
  var _polyfillNode_path = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize,
    resolve: resolve
  };
  function filter (xs, f) {
      if (xs.filter) return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i]);
      }
      return res;
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b' ?
      function (str, start, len) { return str.substr(start, len) } :
      function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
      }
  ;

  var _polyfillNode_path$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    sep: sep,
    delimiter: delimiter,
    dirname: dirname,
    basename: basename,
    extname: extname,
    'default': _polyfillNode_path
  });

  var require$$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_path$1);

  var utils = {};

  /*
   * EJS Embedded JavaScript templates
   * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *         http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
  */

  (function (exports) {

  	var regExpChars = /[|\\{}()[\]^$+*?.]/g;
  	var hasOwnProperty = Object.prototype.hasOwnProperty;
  	var hasOwn = function (obj, key) { return hasOwnProperty.apply(obj, [key]); };

  	/**
  	 * Escape characters reserved in regular expressions.
  	 *
  	 * If `string` is `undefined` or `null`, the empty string is returned.
  	 *
  	 * @param {String} string Input string
  	 * @return {String} Escaped string
  	 * @static
  	 * @private
  	 */
  	exports.escapeRegExpChars = function (string) {
  	  // istanbul ignore if
  	  if (!string) {
  	    return '';
  	  }
  	  return String(string).replace(regExpChars, '\\$&');
  	};

  	var _ENCODE_HTML_RULES = {
  	  '&': '&amp;',
  	  '<': '&lt;',
  	  '>': '&gt;',
  	  '"': '&#34;',
  	  "'": '&#39;'
  	};
  	var _MATCH_HTML = /[&<>'"]/g;

  	function encode_char(c) {
  	  return _ENCODE_HTML_RULES[c] || c;
  	}

  	/**
  	 * Stringified version of constants used by {@link module:utils.escapeXML}.
  	 *
  	 * It is used in the process of generating {@link ClientFunction}s.
  	 *
  	 * @readonly
  	 * @type {String}
  	 */

  	var escapeFuncStr =
  	  'var _ENCODE_HTML_RULES = {\n'
  	+ '      "&": "&amp;"\n'
  	+ '    , "<": "&lt;"\n'
  	+ '    , ">": "&gt;"\n'
  	+ '    , \'"\': "&#34;"\n'
  	+ '    , "\'": "&#39;"\n'
  	+ '    }\n'
  	+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
  	+ 'function encode_char(c) {\n'
  	+ '  return _ENCODE_HTML_RULES[c] || c;\n'
  	+ '};\n';

  	/**
  	 * Escape characters reserved in XML.
  	 *
  	 * If `markup` is `undefined` or `null`, the empty string is returned.
  	 *
  	 * @implements {EscapeCallback}
  	 * @param {String} markup Input string
  	 * @return {String} Escaped string
  	 * @static
  	 * @private
  	 */

  	exports.escapeXML = function (markup) {
  	  return markup == undefined
  	    ? ''
  	    : String(markup)
  	      .replace(_MATCH_HTML, encode_char);
  	};
  	exports.escapeXML.toString = function () {
  	  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
  	};

  	/**
  	 * Naive copy of properties from one object to another.
  	 * Does not recurse into non-scalar properties
  	 * Does not check to see if the property has a value before copying
  	 *
  	 * @param  {Object} to   Destination object
  	 * @param  {Object} from Source object
  	 * @return {Object}      Destination object
  	 * @static
  	 * @private
  	 */
  	exports.shallowCopy = function (to, from) {
  	  from = from || {};
  	  if ((to !== null) && (to !== undefined)) {
  	    for (var p in from) {
  	      if (!hasOwn(from, p)) {
  	        continue;
  	      }
  	      if (p === '__proto__' || p === 'constructor') {
  	        continue;
  	      }
  	      to[p] = from[p];
  	    }
  	  }
  	  return to;
  	};

  	/**
  	 * Naive copy of a list of key names, from one object to another.
  	 * Only copies property if it is actually defined
  	 * Does not recurse into non-scalar properties
  	 *
  	 * @param  {Object} to   Destination object
  	 * @param  {Object} from Source object
  	 * @param  {Array} list List of properties to copy
  	 * @return {Object}      Destination object
  	 * @static
  	 * @private
  	 */
  	exports.shallowCopyFromList = function (to, from, list) {
  	  list = list || [];
  	  from = from || {};
  	  if ((to !== null) && (to !== undefined)) {
  	    for (var i = 0; i < list.length; i++) {
  	      var p = list[i];
  	      if (typeof from[p] != 'undefined') {
  	        if (!hasOwn(from, p)) {
  	          continue;
  	        }
  	        if (p === '__proto__' || p === 'constructor') {
  	          continue;
  	        }
  	        to[p] = from[p];
  	      }
  	    }
  	  }
  	  return to;
  	};

  	/**
  	 * Simple in-process cache implementation. Does not implement limits of any
  	 * sort.
  	 *
  	 * @implements {Cache}
  	 * @static
  	 * @private
  	 */
  	exports.cache = {
  	  _data: {},
  	  set: function (key, val) {
  	    this._data[key] = val;
  	  },
  	  get: function (key) {
  	    return this._data[key];
  	  },
  	  remove: function (key) {
  	    delete this._data[key];
  	  },
  	  reset: function () {
  	    this._data = {};
  	  }
  	};

  	/**
  	 * Transforms hyphen case variable into camel case.
  	 *
  	 * @param {String} string Hyphen case string
  	 * @return {String} Camel case string
  	 * @static
  	 * @private
  	 */
  	exports.hyphenToCamel = function (str) {
  	  return str.replace(/-[a-z]/g, function (match) { return match[1].toUpperCase(); });
  	};

  	/**
  	 * Returns a null-prototype object in runtimes that support it
  	 *
  	 * @return {Object} Object, prototype will be set to null where possible
  	 * @static
  	 * @private
  	 */
  	exports.createNullProtoObjWherePossible = (function () {
  	  if (typeof Object.create == 'function') {
  	    return function () {
  	      return Object.create(null);
  	    };
  	  }
  	  if (!({__proto__: null} instanceof Object)) {
  	    return function () {
  	      return {__proto__: null};
  	    };
  	  }
  	  // Not possible, just pass through
  	  return function () {
  	    return {};
  	  };
  	})();
  } (utils));

  var name = "ejs";
  var description = "Embedded JavaScript templates";
  var keywords = [
  	"template",
  	"engine",
  	"ejs"
  ];
  var version = "3.1.8";
  var author = "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)";
  var license = "Apache-2.0";
  var bin = {
  	ejs: "./bin/cli.js"
  };
  var main = "./lib/ejs.js";
  var jsdelivr = "ejs.min.js";
  var unpkg = "ejs.min.js";
  var repository = {
  	type: "git",
  	url: "git://github.com/mde/ejs.git"
  };
  var bugs = "https://github.com/mde/ejs/issues";
  var homepage = "https://github.com/mde/ejs";
  var dependencies = {
  	jake: "^10.8.5"
  };
  var devDependencies = {
  	browserify: "^16.5.1",
  	eslint: "^6.8.0",
  	"git-directory-deploy": "^1.5.1",
  	jsdoc: "^3.6.7",
  	"lru-cache": "^4.0.1",
  	mocha: "^7.1.1",
  	"uglify-js": "^3.3.16"
  };
  var engines = {
  	node: ">=0.10.0"
  };
  var scripts = {
  	test: "mocha"
  };
  var require$$3 = {
  	name: name,
  	description: description,
  	keywords: keywords,
  	version: version,
  	author: author,
  	license: license,
  	bin: bin,
  	main: main,
  	jsdelivr: jsdelivr,
  	unpkg: unpkg,
  	repository: repository,
  	bugs: bugs,
  	homepage: homepage,
  	dependencies: dependencies,
  	devDependencies: devDependencies,
  	engines: engines,
  	scripts: scripts
  };

  /*
   * EJS Embedded JavaScript templates
   * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *         http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
  */

  (function (exports) {

  	/**
  	 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
  	 * @author Matthew Eernisse <mde@fleegix.org>
  	 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
  	 * @project EJS
  	 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
  	 */

  	/**
  	 * EJS internal functions.
  	 *
  	 * Technically this "module" lies in the same file as {@link module:ejs}, for
  	 * the sake of organization all the private functions re grouped into this
  	 * module.
  	 *
  	 * @module ejs-internal
  	 * @private
  	 */

  	/**
  	 * Embedded JavaScript templating engine.
  	 *
  	 * @module ejs
  	 * @public
  	 */


  	var fs = require$$0;
  	var path = require$$1;
  	var utils$1 = utils;

  	var scopeOptionWarned = false;
  	/** @type {string} */
  	var _VERSION_STRING = require$$3.version;
  	var _DEFAULT_OPEN_DELIMITER = '<';
  	var _DEFAULT_CLOSE_DELIMITER = '>';
  	var _DEFAULT_DELIMITER = '%';
  	var _DEFAULT_LOCALS_NAME = 'locals';
  	var _NAME = 'ejs';
  	var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
  	var _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
  	  'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'];
  	// We don't allow 'cache' option to be passed in the data obj for
  	// the normal `render` call, but this is where Express 2 & 3 put it
  	// so we make an exception for `renderFile`
  	var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
  	var _BOM = /^\uFEFF/;
  	var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;

  	/**
  	 * EJS template function cache. This can be a LRU object from lru-cache NPM
  	 * module. By default, it is {@link module:utils.cache}, a simple in-process
  	 * cache that grows continuously.
  	 *
  	 * @type {Cache}
  	 */

  	exports.cache = utils$1.cache;

  	/**
  	 * Custom file loader. Useful for template preprocessing or restricting access
  	 * to a certain part of the filesystem.
  	 *
  	 * @type {fileLoader}
  	 */

  	exports.fileLoader = fs.readFileSync;

  	/**
  	 * Name of the object containing the locals.
  	 *
  	 * This variable is overridden by {@link Options}`.localsName` if it is not
  	 * `undefined`.
  	 *
  	 * @type {String}
  	 * @public
  	 */

  	exports.localsName = _DEFAULT_LOCALS_NAME;

  	/**
  	 * Promise implementation -- defaults to the native implementation if available
  	 * This is mostly just for testability
  	 *
  	 * @type {PromiseConstructorLike}
  	 * @public
  	 */

  	exports.promiseImpl = (new Function('return this;'))().Promise;

  	/**
  	 * Get the path to the included file from the parent file path and the
  	 * specified path.
  	 *
  	 * @param {String}  name     specified path
  	 * @param {String}  filename parent file path
  	 * @param {Boolean} [isDir=false] whether the parent file path is a directory
  	 * @return {String}
  	 */
  	exports.resolveInclude = function(name, filename, isDir) {
  	  var dirname = path.dirname;
  	  var extname = path.extname;
  	  var resolve = path.resolve;
  	  var includePath = resolve(isDir ? filename : dirname(filename), name);
  	  var ext = extname(name);
  	  if (!ext) {
  	    includePath += '.ejs';
  	  }
  	  return includePath;
  	};

  	/**
  	 * Try to resolve file path on multiple directories
  	 *
  	 * @param  {String}        name  specified path
  	 * @param  {Array<String>} paths list of possible parent directory paths
  	 * @return {String}
  	 */
  	function resolvePaths(name, paths) {
  	  var filePath;
  	  if (paths.some(function (v) {
  	    filePath = exports.resolveInclude(name, v, true);
  	    return fs.existsSync(filePath);
  	  })) {
  	    return filePath;
  	  }
  	}

  	/**
  	 * Get the path to the included file by Options
  	 *
  	 * @param  {String}  path    specified path
  	 * @param  {Options} options compilation options
  	 * @return {String}
  	 */
  	function getIncludePath(path, options) {
  	  var includePath;
  	  var filePath;
  	  var views = options.views;
  	  var match = /^[A-Za-z]+:\\|^\//.exec(path);

  	  // Abs path
  	  if (match && match.length) {
  	    path = path.replace(/^\/*/, '');
  	    if (Array.isArray(options.root)) {
  	      includePath = resolvePaths(path, options.root);
  	    } else {
  	      includePath = exports.resolveInclude(path, options.root || '/', true);
  	    }
  	  }
  	  // Relative paths
  	  else {
  	    // Look relative to a passed filename first
  	    if (options.filename) {
  	      filePath = exports.resolveInclude(path, options.filename);
  	      if (fs.existsSync(filePath)) {
  	        includePath = filePath;
  	      }
  	    }
  	    // Then look in any views directories
  	    if (!includePath && Array.isArray(views)) {
  	      includePath = resolvePaths(path, views);
  	    }
  	    if (!includePath && typeof options.includer !== 'function') {
  	      throw new Error('Could not find the include file "' +
  	          options.escapeFunction(path) + '"');
  	    }
  	  }
  	  return includePath;
  	}

  	/**
  	 * Get the template from a string or a file, either compiled on-the-fly or
  	 * read from cache (if enabled), and cache the template if needed.
  	 *
  	 * If `template` is not set, the file specified in `options.filename` will be
  	 * read.
  	 *
  	 * If `options.cache` is true, this function reads the file from
  	 * `options.filename` so it must be set prior to calling this function.
  	 *
  	 * @memberof module:ejs-internal
  	 * @param {Options} options   compilation options
  	 * @param {String} [template] template source
  	 * @return {(TemplateFunction|ClientFunction)}
  	 * Depending on the value of `options.client`, either type might be returned.
  	 * @static
  	 */

  	function handleCache(options, template) {
  	  var func;
  	  var filename = options.filename;
  	  var hasTemplate = arguments.length > 1;

  	  if (options.cache) {
  	    if (!filename) {
  	      throw new Error('cache option requires a filename');
  	    }
  	    func = exports.cache.get(filename);
  	    if (func) {
  	      return func;
  	    }
  	    if (!hasTemplate) {
  	      template = fileLoader(filename).toString().replace(_BOM, '');
  	    }
  	  }
  	  else if (!hasTemplate) {
  	    // istanbul ignore if: should not happen at all
  	    if (!filename) {
  	      throw new Error('Internal EJS error: no file name or template '
  	                    + 'provided');
  	    }
  	    template = fileLoader(filename).toString().replace(_BOM, '');
  	  }
  	  func = exports.compile(template, options);
  	  if (options.cache) {
  	    exports.cache.set(filename, func);
  	  }
  	  return func;
  	}

  	/**
  	 * Try calling handleCache with the given options and data and call the
  	 * callback with the result. If an error occurs, call the callback with
  	 * the error. Used by renderFile().
  	 *
  	 * @memberof module:ejs-internal
  	 * @param {Options} options    compilation options
  	 * @param {Object} data        template data
  	 * @param {RenderFileCallback} cb callback
  	 * @static
  	 */

  	function tryHandleCache(options, data, cb) {
  	  var result;
  	  if (!cb) {
  	    if (typeof exports.promiseImpl == 'function') {
  	      return new exports.promiseImpl(function (resolve, reject) {
  	        try {
  	          result = handleCache(options)(data);
  	          resolve(result);
  	        }
  	        catch (err) {
  	          reject(err);
  	        }
  	      });
  	    }
  	    else {
  	      throw new Error('Please provide a callback function');
  	    }
  	  }
  	  else {
  	    try {
  	      result = handleCache(options)(data);
  	    }
  	    catch (err) {
  	      return cb(err);
  	    }

  	    cb(null, result);
  	  }
  	}

  	/**
  	 * fileLoader is independent
  	 *
  	 * @param {String} filePath ejs file path.
  	 * @return {String} The contents of the specified file.
  	 * @static
  	 */

  	function fileLoader(filePath){
  	  return exports.fileLoader(filePath);
  	}

  	/**
  	 * Get the template function.
  	 *
  	 * If `options.cache` is `true`, then the template is cached.
  	 *
  	 * @memberof module:ejs-internal
  	 * @param {String}  path    path for the specified file
  	 * @param {Options} options compilation options
  	 * @return {(TemplateFunction|ClientFunction)}
  	 * Depending on the value of `options.client`, either type might be returned
  	 * @static
  	 */

  	function includeFile(path, options) {
  	  var opts = utils$1.shallowCopy(utils$1.createNullProtoObjWherePossible(), options);
  	  opts.filename = getIncludePath(path, opts);
  	  if (typeof options.includer === 'function') {
  	    var includerResult = options.includer(path, opts.filename);
  	    if (includerResult) {
  	      if (includerResult.filename) {
  	        opts.filename = includerResult.filename;
  	      }
  	      if (includerResult.template) {
  	        return handleCache(opts, includerResult.template);
  	      }
  	    }
  	  }
  	  return handleCache(opts);
  	}

  	/**
  	 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
  	 * `lineno`.
  	 *
  	 * @implements {RethrowCallback}
  	 * @memberof module:ejs-internal
  	 * @param {Error}  err      Error object
  	 * @param {String} str      EJS source
  	 * @param {String} flnm     file name of the EJS file
  	 * @param {Number} lineno   line number of the error
  	 * @param {EscapeCallback} esc
  	 * @static
  	 */

  	function rethrow(err, str, flnm, lineno, esc) {
  	  var lines = str.split('\n');
  	  var start = Math.max(lineno - 3, 0);
  	  var end = Math.min(lines.length, lineno + 3);
  	  var filename = esc(flnm);
  	  // Error context
  	  var context = lines.slice(start, end).map(function (line, i){
  	    var curr = i + start + 1;
  	    return (curr == lineno ? ' >> ' : '    ')
  	      + curr
  	      + '| '
  	      + line;
  	  }).join('\n');

  	  // Alter exception message
  	  err.path = filename;
  	  err.message = (filename || 'ejs') + ':'
  	    + lineno + '\n'
  	    + context + '\n\n'
  	    + err.message;

  	  throw err;
  	}

  	function stripSemi(str){
  	  return str.replace(/;(\s*$)/, '$1');
  	}

  	/**
  	 * Compile the given `str` of ejs into a template function.
  	 *
  	 * @param {String}  template EJS template
  	 *
  	 * @param {Options} [opts] compilation options
  	 *
  	 * @return {(TemplateFunction|ClientFunction)}
  	 * Depending on the value of `opts.client`, either type might be returned.
  	 * Note that the return type of the function also depends on the value of `opts.async`.
  	 * @public
  	 */

  	exports.compile = function compile(template, opts) {
  	  var templ;

  	  // v1 compat
  	  // 'scope' is 'context'
  	  // FIXME: Remove this in a future version
  	  if (opts && opts.scope) {
  	    if (!scopeOptionWarned){
  	      console.warn('`scope` option is deprecated and will be removed in EJS 3');
  	      scopeOptionWarned = true;
  	    }
  	    if (!opts.context) {
  	      opts.context = opts.scope;
  	    }
  	    delete opts.scope;
  	  }
  	  templ = new Template(template, opts);
  	  return templ.compile();
  	};

  	/**
  	 * Render the given `template` of ejs.
  	 *
  	 * If you would like to include options but not data, you need to explicitly
  	 * call this function with `data` being an empty object or `null`.
  	 *
  	 * @param {String}   template EJS template
  	 * @param {Object}  [data={}] template data
  	 * @param {Options} [opts={}] compilation and rendering options
  	 * @return {(String|Promise<String>)}
  	 * Return value type depends on `opts.async`.
  	 * @public
  	 */

  	exports.render = function (template, d, o) {
  	  var data = d || utils$1.createNullProtoObjWherePossible();
  	  var opts = o || utils$1.createNullProtoObjWherePossible();

  	  // No options object -- if there are optiony names
  	  // in the data, copy them to options
  	  if (arguments.length == 2) {
  	    utils$1.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
  	  }

  	  return handleCache(opts, template)(data);
  	};

  	/**
  	 * Render an EJS file at the given `path` and callback `cb(err, str)`.
  	 *
  	 * If you would like to include options but not data, you need to explicitly
  	 * call this function with `data` being an empty object or `null`.
  	 *
  	 * @param {String}             path     path to the EJS file
  	 * @param {Object}            [data={}] template data
  	 * @param {Options}           [opts={}] compilation and rendering options
  	 * @param {RenderFileCallback} cb callback
  	 * @public
  	 */

  	exports.renderFile = function () {
  	  var args = Array.prototype.slice.call(arguments);
  	  var filename = args.shift();
  	  var cb;
  	  var opts = {filename: filename};
  	  var data;
  	  var viewOpts;

  	  // Do we have a callback?
  	  if (typeof arguments[arguments.length - 1] == 'function') {
  	    cb = args.pop();
  	  }
  	  // Do we have data/opts?
  	  if (args.length) {
  	    // Should always have data obj
  	    data = args.shift();
  	    // Normal passed opts (data obj + opts obj)
  	    if (args.length) {
  	      // Use shallowCopy so we don't pollute passed in opts obj with new vals
  	      utils$1.shallowCopy(opts, args.pop());
  	    }
  	    // Special casing for Express (settings + opts-in-data)
  	    else {
  	      // Express 3 and 4
  	      if (data.settings) {
  	        // Pull a few things from known locations
  	        if (data.settings.views) {
  	          opts.views = data.settings.views;
  	        }
  	        if (data.settings['view cache']) {
  	          opts.cache = true;
  	        }
  	        // Undocumented after Express 2, but still usable, esp. for
  	        // items that are unsafe to be passed along with data, like `root`
  	        viewOpts = data.settings['view options'];
  	        if (viewOpts) {
  	          utils$1.shallowCopy(opts, viewOpts);
  	        }
  	      }
  	      // Express 2 and lower, values set in app.locals, or people who just
  	      // want to pass options in their data. NOTE: These values will override
  	      // anything previously set in settings  or settings['view options']
  	      utils$1.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
  	    }
  	    opts.filename = filename;
  	  }
  	  else {
  	    data = utils$1.createNullProtoObjWherePossible();
  	  }

  	  return tryHandleCache(opts, data, cb);
  	};

  	/**
  	 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
  	 * @public
  	 */

  	/**
  	 * EJS template class
  	 * @public
  	 */
  	exports.Template = Template;

  	exports.clearCache = function () {
  	  exports.cache.reset();
  	};

  	function Template(text, opts) {
  	  opts = opts || utils$1.createNullProtoObjWherePossible();
  	  var options = utils$1.createNullProtoObjWherePossible();
  	  this.templateText = text;
  	  /** @type {string | null} */
  	  this.mode = null;
  	  this.truncate = false;
  	  this.currentLine = 1;
  	  this.source = '';
  	  options.client = opts.client || false;
  	  options.escapeFunction = opts.escape || opts.escapeFunction || utils$1.escapeXML;
  	  options.compileDebug = opts.compileDebug !== false;
  	  options.debug = !!opts.debug;
  	  options.filename = opts.filename;
  	  options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
  	  options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
  	  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
  	  options.strict = opts.strict || false;
  	  options.context = opts.context;
  	  options.cache = opts.cache || false;
  	  options.rmWhitespace = opts.rmWhitespace;
  	  options.root = opts.root;
  	  options.includer = opts.includer;
  	  options.outputFunctionName = opts.outputFunctionName;
  	  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
  	  options.views = opts.views;
  	  options.async = opts.async;
  	  options.destructuredLocals = opts.destructuredLocals;
  	  options.legacyInclude = typeof opts.legacyInclude != 'undefined' ? !!opts.legacyInclude : true;

  	  if (options.strict) {
  	    options._with = false;
  	  }
  	  else {
  	    options._with = typeof opts._with != 'undefined' ? opts._with : true;
  	  }

  	  this.opts = options;

  	  this.regex = this.createRegex();
  	}

  	Template.modes = {
  	  EVAL: 'eval',
  	  ESCAPED: 'escaped',
  	  RAW: 'raw',
  	  COMMENT: 'comment',
  	  LITERAL: 'literal'
  	};

  	Template.prototype = {
  	  createRegex: function () {
  	    var str = _REGEX_STRING;
  	    var delim = utils$1.escapeRegExpChars(this.opts.delimiter);
  	    var open = utils$1.escapeRegExpChars(this.opts.openDelimiter);
  	    var close = utils$1.escapeRegExpChars(this.opts.closeDelimiter);
  	    str = str.replace(/%/g, delim)
  	      .replace(/</g, open)
  	      .replace(/>/g, close);
  	    return new RegExp(str);
  	  },

  	  compile: function () {
  	    /** @type {string} */
  	    var src;
  	    /** @type {ClientFunction} */
  	    var fn;
  	    var opts = this.opts;
  	    var prepended = '';
  	    var appended = '';
  	    /** @type {EscapeCallback} */
  	    var escapeFn = opts.escapeFunction;
  	    /** @type {FunctionConstructor} */
  	    var ctor;
  	    /** @type {string} */
  	    var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : 'undefined';

  	    if (!this.source) {
  	      this.generateSource();
  	      prepended +=
  	        '  var __output = "";\n' +
  	        '  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
  	      if (opts.outputFunctionName) {
  	        if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
  	          throw new Error('outputFunctionName is not a valid JS identifier.');
  	        }
  	        prepended += '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
  	      }
  	      if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
  	        throw new Error('localsName is not a valid JS identifier.');
  	      }
  	      if (opts.destructuredLocals && opts.destructuredLocals.length) {
  	        var destructuring = '  var __locals = (' + opts.localsName + ' || {}),\n';
  	        for (var i = 0; i < opts.destructuredLocals.length; i++) {
  	          var name = opts.destructuredLocals[i];
  	          if (!_JS_IDENTIFIER.test(name)) {
  	            throw new Error('destructuredLocals[' + i + '] is not a valid JS identifier.');
  	          }
  	          if (i > 0) {
  	            destructuring += ',\n  ';
  	          }
  	          destructuring += name + ' = __locals.' + name;
  	        }
  	        prepended += destructuring + ';\n';
  	      }
  	      if (opts._with !== false) {
  	        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
  	        appended += '  }' + '\n';
  	      }
  	      appended += '  return __output;' + '\n';
  	      this.source = prepended + this.source + appended;
  	    }

  	    if (opts.compileDebug) {
  	      src = 'var __line = 1' + '\n'
  	        + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
  	        + '  , __filename = ' + sanitizedFilename + ';' + '\n'
  	        + 'try {' + '\n'
  	        + this.source
  	        + '} catch (e) {' + '\n'
  	        + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
  	        + '}' + '\n';
  	    }
  	    else {
  	      src = this.source;
  	    }

  	    if (opts.client) {
  	      src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
  	      if (opts.compileDebug) {
  	        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
  	      }
  	    }

  	    if (opts.strict) {
  	      src = '"use strict";\n' + src;
  	    }
  	    if (opts.debug) {
  	      console.log(src);
  	    }
  	    if (opts.compileDebug && opts.filename) {
  	      src = src + '\n'
  	        + '//# sourceURL=' + sanitizedFilename + '\n';
  	    }

  	    try {
  	      if (opts.async) {
  	        // Have to use generated function for this, since in envs without support,
  	        // it breaks in parsing
  	        try {
  	          ctor = (new Function('return (async function(){}).constructor;'))();
  	        }
  	        catch(e) {
  	          if (e instanceof SyntaxError) {
  	            throw new Error('This environment does not support async/await');
  	          }
  	          else {
  	            throw e;
  	          }
  	        }
  	      }
  	      else {
  	        ctor = Function;
  	      }
  	      fn = new ctor(opts.localsName + ', escapeFn, include, rethrow', src);
  	    }
  	    catch(e) {
  	      // istanbul ignore else
  	      if (e instanceof SyntaxError) {
  	        if (opts.filename) {
  	          e.message += ' in ' + opts.filename;
  	        }
  	        e.message += ' while compiling ejs\n\n';
  	        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
  	        e.message += 'https://github.com/RyanZim/EJS-Lint';
  	        if (!opts.async) {
  	          e.message += '\n';
  	          e.message += 'Or, if you meant to create an async function, pass `async: true` as an option.';
  	        }
  	      }
  	      throw e;
  	    }

  	    // Return a callable function which will execute the function
  	    // created by the source-code, with the passed data as locals
  	    // Adds a local `include` function which allows full recursive include
  	    var returnedFn = opts.client ? fn : function anonymous(data) {
  	      var include = function (path, includeData) {
  	        var d = utils$1.shallowCopy(utils$1.createNullProtoObjWherePossible(), data);
  	        if (includeData) {
  	          d = utils$1.shallowCopy(d, includeData);
  	        }
  	        return includeFile(path, opts)(d);
  	      };
  	      return fn.apply(opts.context,
  	        [data || utils$1.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
  	    };
  	    if (opts.filename && typeof Object.defineProperty === 'function') {
  	      var filename = opts.filename;
  	      var basename = path.basename(filename, path.extname(filename));
  	      try {
  	        Object.defineProperty(returnedFn, 'name', {
  	          value: basename,
  	          writable: false,
  	          enumerable: false,
  	          configurable: true
  	        });
  	      } catch (e) {/* ignore */}
  	    }
  	    return returnedFn;
  	  },

  	  generateSource: function () {
  	    var opts = this.opts;

  	    if (opts.rmWhitespace) {
  	      // Have to use two separate replace here as `^` and `$` operators don't
  	      // work well with `\r` and empty lines don't work well with the `m` flag.
  	      this.templateText =
  	        this.templateText.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
  	    }

  	    // Slurp spaces and tabs before <%_ and after _%>
  	    this.templateText =
  	      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

  	    var self = this;
  	    var matches = this.parseTemplateText();
  	    var d = this.opts.delimiter;
  	    var o = this.opts.openDelimiter;
  	    var c = this.opts.closeDelimiter;

  	    if (matches && matches.length) {
  	      matches.forEach(function (line, index) {
  	        var closing;
  	        // If this is an opening tag, check for closing tags
  	        // FIXME: May end up with some false positives here
  	        // Better to store modes as k/v with openDelimiter + delimiter as key
  	        // Then this can simply check against the map
  	        if ( line.indexOf(o + d) === 0        // If it is a tag
  	          && line.indexOf(o + d + d) !== 0) { // and is not escaped
  	          closing = matches[index + 2];
  	          if (!(closing == d + c || closing == '-' + d + c || closing == '_' + d + c)) {
  	            throw new Error('Could not find matching close tag for "' + line + '".');
  	          }
  	        }
  	        self.scanLine(line);
  	      });
  	    }

  	  },

  	  parseTemplateText: function () {
  	    var str = this.templateText;
  	    var pat = this.regex;
  	    var result = pat.exec(str);
  	    var arr = [];
  	    var firstPos;

  	    while (result) {
  	      firstPos = result.index;

  	      if (firstPos !== 0) {
  	        arr.push(str.substring(0, firstPos));
  	        str = str.slice(firstPos);
  	      }

  	      arr.push(result[0]);
  	      str = str.slice(result[0].length);
  	      result = pat.exec(str);
  	    }

  	    if (str) {
  	      arr.push(str);
  	    }

  	    return arr;
  	  },

  	  _addOutput: function (line) {
  	    if (this.truncate) {
  	      // Only replace single leading linebreak in the line after
  	      // -%> tag -- this is the single, trailing linebreak
  	      // after the tag that the truncation mode replaces
  	      // Handle Win / Unix / old Mac linebreaks -- do the \r\n
  	      // combo first in the regex-or
  	      line = line.replace(/^(?:\r\n|\r|\n)/, '');
  	      this.truncate = false;
  	    }
  	    if (!line) {
  	      return line;
  	    }

  	    // Preserve literal slashes
  	    line = line.replace(/\\/g, '\\\\');

  	    // Convert linebreaks
  	    line = line.replace(/\n/g, '\\n');
  	    line = line.replace(/\r/g, '\\r');

  	    // Escape double-quotes
  	    // - this will be the delimiter during execution
  	    line = line.replace(/"/g, '\\"');
  	    this.source += '    ; __append("' + line + '")' + '\n';
  	  },

  	  scanLine: function (line) {
  	    var self = this;
  	    var d = this.opts.delimiter;
  	    var o = this.opts.openDelimiter;
  	    var c = this.opts.closeDelimiter;
  	    var newLineCount = 0;

  	    newLineCount = (line.split('\n').length - 1);

  	    switch (line) {
  	    case o + d:
  	    case o + d + '_':
  	      this.mode = Template.modes.EVAL;
  	      break;
  	    case o + d + '=':
  	      this.mode = Template.modes.ESCAPED;
  	      break;
  	    case o + d + '-':
  	      this.mode = Template.modes.RAW;
  	      break;
  	    case o + d + '#':
  	      this.mode = Template.modes.COMMENT;
  	      break;
  	    case o + d + d:
  	      this.mode = Template.modes.LITERAL;
  	      this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + '\n';
  	      break;
  	    case d + d + c:
  	      this.mode = Template.modes.LITERAL;
  	      this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + '\n';
  	      break;
  	    case d + c:
  	    case '-' + d + c:
  	    case '_' + d + c:
  	      if (this.mode == Template.modes.LITERAL) {
  	        this._addOutput(line);
  	      }

  	      this.mode = null;
  	      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
  	      break;
  	    default:
  	      // In script mode, depends on type of tag
  	      if (this.mode) {
  	        // If '//' is found without a line break, add a line break.
  	        switch (this.mode) {
  	        case Template.modes.EVAL:
  	        case Template.modes.ESCAPED:
  	        case Template.modes.RAW:
  	          if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
  	            line += '\n';
  	          }
  	        }
  	        switch (this.mode) {
  	        // Just executing code
  	        case Template.modes.EVAL:
  	          this.source += '    ; ' + line + '\n';
  	          break;
  	          // Exec, esc, and output
  	        case Template.modes.ESCAPED:
  	          this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
  	          break;
  	          // Exec and output
  	        case Template.modes.RAW:
  	          this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
  	          break;
  	        case Template.modes.COMMENT:
  	          // Do nothing
  	          break;
  	          // Literal <%% mode, append as raw output
  	        case Template.modes.LITERAL:
  	          this._addOutput(line);
  	          break;
  	        }
  	      }
  	      // In string mode, just add the output
  	      else {
  	        this._addOutput(line);
  	      }
  	    }

  	    if (self.opts.compileDebug && newLineCount) {
  	      this.currentLine += newLineCount;
  	      this.source += '    ; __line = ' + this.currentLine + '\n';
  	    }
  	  }
  	};

  	/**
  	 * Escape characters reserved in XML.
  	 *
  	 * This is simply an export of {@link module:utils.escapeXML}.
  	 *
  	 * If `markup` is `undefined` or `null`, the empty string is returned.
  	 *
  	 * @param {String} markup Input string
  	 * @return {String} Escaped string
  	 * @public
  	 * @func
  	 * */
  	exports.escapeXML = utils$1.escapeXML;

  	/**
  	 * Express.js support.
  	 *
  	 * This is an alias for {@link module:ejs.renderFile}, in order to support
  	 * Express.js out-of-the-box.
  	 *
  	 * @func
  	 */

  	exports.__express = exports.renderFile;

  	/**
  	 * Version of EJS.
  	 *
  	 * @readonly
  	 * @type {String}
  	 * @public
  	 */

  	exports.VERSION = _VERSION_STRING;

  	/**
  	 * Name for detection of EJS.
  	 *
  	 * @readonly
  	 * @type {String}
  	 * @public
  	 */

  	exports.name = _NAME;

  	/* istanbul ignore if */
  	if (typeof window != 'undefined') {
  	  window.ejs = exports;
  	}
  } (ejs));

  // /utils/getRequest.ts
  /**
   * Method used to initiate the API request
   * @remarks The Assignment of the API specific promise is set in the respective API
   * @param {string} url
   * @param {{}} options
   * @returns {Promise<any>}
   */
  async function getRequest(url, options) {
    /**
     * Use of Client-Side Fetch API to retrieve the response
     * @type {Response}
     */
    const response = await fetch(url, options);
    /**
     * Formats the response as json and returns the typed promise
     * @type {any}
     */
    const result = await response.json();
    /**
     * Sets the type for the promise
     */
    return result;
  }

  // utils.requestOptions.ts
  /**
   *
   * @type {{headers: {'Content-Type': string}, method: string}}
   */
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // utils/extractTrackingCookie.ts
  /**
   * Extracts the tracking cookie from the Bloomreach cookie pixel
   * @remarks Designed to check for the cookie,and if not present will set a default
   * @returns {string}
   */
  function extractTrackingCookie() {
    const trackingCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('_br_uid_2='));
    return trackingCookie ? trackingCookie.replace('_br_uid_2=', '') : 'uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55';
  }

  // utils/formatAsCurrency.ts
  /**
   * Formats a value returned as a double into currency
   * @param {number} cents
   * @param {string} currencySign
   * @param {boolean} onFront
   * @returns {string}
   */
  const formatAsCurrency = (cents, currencySign = '$', onFront = true) => `${onFront ? currencySign : ''}${(cents / 100.0).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}${!onFront ? ` ${currencySign}` : ''}`;

  // utils/generateRequestID.ts
  /**
   * Generates a randomized request ID that is 13 characters long
   * @returns {number}
   */
  function generateRequestId() {
    // eslint-disable-next-line no-mixed-operators
    const requestID = Math.floor(1000000000000 + Math.random() * 9000000000000);
    return requestID;
  }

  // api-client/constants
  // todo Refactor vanilla js / react implementation to either use or not use the constants config
  const ENDPOINT_AUTOSUGGEST_API = 'https://suggest.dxpapi.com/api/v2/suggest/';
  const NO_ENCODE_PARAMETERS = ['_br_uid_2', 'fq', 'sort'];

  function buildQueryParameters(apiCallParameters) {
    return `?${Object.keys(apiCallParameters).reduce((queryParameters, parameterName) => [...queryParameters, `${parameterName}=${NO_ENCODE_PARAMETERS.includes(parameterName) ? apiCallParameters[parameterName] : encodeURIComponent(apiCallParameters[parameterName])}`], []).join('&')}`;
  }
  function buildAutosuggestRequestUrl(parameters) {
    const apiParameters = Object.assign({}, parameters);
    const endpoint = (apiParameters === null || apiParameters === void 0 ? void 0 : apiParameters.endpoint) || ENDPOINT_AUTOSUGGEST_API;
    if (apiParameters === null || apiParameters === void 0 ? void 0 : apiParameters.endpoint) apiParameters === null || apiParameters === void 0 ? true : delete apiParameters.endpoint;
    return `${endpoint}${buildQueryParameters(apiParameters)}`;
  }

  /**
   * Get suggestions API
   * @returns {Promise<AutosuggestResponseV1 | AutosuggestResponseV2>}
   */
  async function getSuggestions(params) {
    const url = buildAutosuggestRequestUrl(params);
    const options = requestOptions;
    return getRequest(url, options);
  }

  var searchLayoutTemplate = "<% if (did_you_mean.length) { %>\n  <div class=\"blm-product-search-header\">\n    <div class=\"blm-product-search-header-container\">\n      <h1 class=\"blm-product-search-header-container__title\">Results for\n        <% if (locals.keywordRedirect && keywordRedirect.redirected_url) { %>\n          <i><%- keywordRedirect.redirected_url %></i>\n        <% } else { %>\n          <i><%- did_you_mean[0] %></i>\n        <% } %>\n         instead of <i class=\"blm-product-search-header-container__title__searched-word\"><%- locals[config.default_search_parameter] %></i></h1>\n      <div class=\"blm-did-you-mean-suggestion\">\n        <label class=\"blm-did-you-mean-suggestion__label\">Did you mean:</label>\n        <% did_you_mean.forEach(function(word) { %>\n        <a href=\"<%= config.search_page_url %>?<%= config.default_search_parameter %>=<%= word %>\" class=\"blm-did-you-mean-suggestion__link\"><%- word %></a>\n        <% }); %>\n      </div>\n      <% if (locals.keywordRedirect && keywordRedirect.redirected_query) { %>\n      <div class=\"blm-redirected-keyword\">Redirected from <i>\"<%- keywordRedirect.redirected_query %>\"</i>.</div>\n      <% } %>\n    </div>\n  </div>\n<% } %>\n<% if (locals.keywordRedirect && keywordRedirect.redirected_query && did_you_mean.length === 0) { %>\n  <div class=\"blm-product-search-header\">\n    <div class=\"blm-product-search-header-container\">\n      <h1 class=\"blm-product-search-header-container__title\">Results for <i><%- keywordRedirect.redirected_query %></i> </h1>\n      <div class=\"blm-redirected-keyword\">Redirected from <i>\"<%- keywordRedirect.original_query %>\"</i> </div>\n    </div>\n  </div>\n<% } %>\n<div class=\"blm-<% if (config.search.is_category_page) { %>category<% } else { %>product-search<% } %> blm-results <% if (config.search.facets_included) { %>with-facets<% } %>\">\n    <% if (config.search.facets_included && facets.length) { %>\n    <aside class=\"blm-product-search-sidebar\">\n\n      <button class=\"blm-product-search-control-button blm-product-search-control-button--sidebar\">\n        Filter\n        <svg viewBox=\"0 0 14.8 14.8\" class=\"blm-product-search-control-button__icon\" focusable=\"false\"><path d=\"M1.6 14.8V0m6 14.8V1.6m5.6 13.2V0\" fill=\"none\" stroke=\"#000\" stroke-miterlimit=\"10\"></path><circle cx=\"1.6\" cy=\"7.4\" r=\"1.6\"></circle><circle cx=\"13.2\" cy=\"10.4\" r=\"1.6\"></circle><circle cx=\"7.6\" cy=\"1.6\" r=\"1.6\"></circle></svg>\n      </button>\n\n      <% if (locals.selectedFilterItems && selectedFilterItems.length > 0) { %>\n        <div class=\"blm-product-search-selected-filters\">\n          <h4 class=\"blm-product-search-selected-filters__title\">Filters</h4>\n\n          <% selectedFilterItems.forEach(function(filterIitem) { %>\n            <span class=\"blm-product-search-selected-filter\" data-filter-checkbox-id=\"<%- filterIitem.checkbox_id %>\"><%- filterIitem.label %>\n              <span class=\"blm-product-search-selected-filter__clear\">&times;</span>\n            </span>\n          <% }) %>\n\n          <button class=\"blm-product-search-selected-filters__clear-all\">Clear all</button>\n        </div>\n      <% } %>\n\n      <div class=\"blm-product-search-sidebar-content <% if (locals.isFiltersPanelOpened && isFiltersPanelOpened) { %>blm-open<% } %>\">\n\n        <button class=\"blm-product-search-control-button blm-product-search-control-button--sidebar blm-product-search-control-button--active\">\n          Done\n          <svg viewBox=\"0 0 14.8 14.8\" class=\"blm-product-search-control-button__icon\" focusable=\"false\"><path class=\"blm-product-search-control-button__icon-path\" d=\"M1.6 14.8V0m6 14.8V1.6m5.6 13.2V0\" fill=\"none\" stroke=\"#000\" stroke-miterlimit=\"10\"></path><circle cx=\"1.6\" cy=\"7.4\" r=\"1.6\"></circle><circle cx=\"13.2\" cy=\"10.4\" r=\"1.6\"></circle><circle cx=\"7.6\" cy=\"1.6\" r=\"1.6\"></circle></svg>\n        </button>\n\n        <div id=\"blm-product-search-search-filters\">\n          <input id=\"blm-product-search-search-filters__input\" placeholder=\"Type to search filters\" />\n        </div>\n\n        <div class=\"blm-product-search-filter\">\n          <h4 class=\"blm-product-search-filter-title\">Price</h4>\n          <div class=\"blm-price-range-container\">\n            <div class=\"blm-range-slider\">\n              <input\n                value=\"<%= checkedFacets.price ? checkedFacets.price[0] : priceRangeFacet.start %>\"\n                min=\"<%- priceRangeFacet.start %>\"\n                max=\"<%- priceRangeFacet.end %>\"\n                step=\"1\"\n                type=\"range\"\n                class=\"blm-price-range-input blm-price-range-input--lower blm-price-range-input--lower-%%-REQUEST_ID-%%\"\n              >\n              <span class=\"blm-price-range-slider-rail\"></span>\n              <input\n                value=\"<%= checkedFacets.price ? checkedFacets.price[1] : priceRangeFacet.end %>\"\n                min=\"<%- priceRangeFacet.start %>\"\n                max=\"<%- priceRangeFacet.end %>\"\n                step=\"1\"\n                type=\"range\"\n                class=\"blm-price-range-input blm-price-range-input--upper blm-price-range-input--upper-%%-REQUEST_ID-%%\"\n              >\n            </div>\n            <div class=\"blm-range-slider__values\">\n              <span class=\"blm-range-slider__values--min\">\n                <%= checkedFacets.price ? config.format_money(checkedFacets.price[0] * 100) : config.format_money(priceRangeFacet.start * 100) %>\n              </span>\n              <% if (checkedFacets.price) { %>\n                <span class=\"blm-range-slider__values--max\">\n                  <%= checkedFacets.price ? config.format_money(checkedFacets.price[1] * 100) : config.format_money(priceRangeFacet.start * 100) %>\n                </span>\n              <% } else { %>\n                <span class=\"blm-range-slider__values--max\">\n                  <%= config.format_money(priceRangeFacet.end * 100) %>\n                </span>\n              <% } %>\n            </div>\n          <% if (checkedFacets.price) { %>\n            <div class=\"blm-range-slider__clear-values\">\n              <button class=\"blm-range-slider__clear-values-button blm-range-slider__clear-values-button--%%-REQUEST_ID-%%\">Clear</button>\n            </div>\n          <% } %>\n          </div>\n        </div>\n\n        <% facets.forEach(function(facet, facetIndex) { %>\n          <% if (facet.section.length > 0) { %>\n          <div class=\"blm-product-search-filter blm-dynamic-filter\" id=\"blm-facet-block-item-<%= facetIndex %>\">\n            <h4 class=\"blm-product-search-filter-title\"><%- facet.title %></h4>\n            <ul class=\"blm-product-search-filter-items\">\n              <% facet.section.forEach(function(item) { %>\n              <li class=\"blm-product-search-filter-item\">\n                <input\n                  type=\"checkbox\"\n                  <% if (facet.original_title in checkedFacets && checkedFacets[facet.original_title].includes(escapeSpecialCharacters(item.id))) { %>checked<% } %>\n                  name=\"<%- facet.original_title %>\"\n                  value=\"<%- escapeSpecialCharacters(item.id) %>\"\n                  id=\"<%- facet.original_title + '[' + escapeSpecialCharacters(item.name) + ']' %>\"\n                  class=\"blm-product-search-filter-item__checkbox\"\n                />\n                <label class=\"blm-product-search-filter-item__name\" for=\"<%- facet.original_title + '[' + escapeSpecialCharacters(item.name) + ']' %>\"><%- item.name %></label>\n                <% if (!config.search.display_variants) { %>\n                <span class=\"blm-product-search-filter-item__badge\"><%- item.count %></span>\n                <% } %>\n              </li>\n              <% }); %>\n            </ul>\n            <% if (facet.section.length > config.search.initial_number_of_facet_values) { %>\n            <div class=\"blm-product-search-load-more\" data-item=\"<%= facetIndex %>\">+ More</div>\n            <% } %>\n          </div>\n          <% } %>\n        <% }); %>\n\n        <% if (facets[0].section.length) { %>\n        <div class=\"blm-load-more-facet blm-load-more-facet--%%-REQUEST_ID-%%\">+ More </div>\n        <% } %>\n\n      </div>\n    </aside>\n    <% } %>\n    <section class=\"blm-product-search-main\">\n      <div class=\"blm-product-search-toolbar\">\n        <%\n          const haveUngroupedResults = locals.number_of_results && number_of_results > 0;\n          const haveGroupedResults = locals.grouped_products && grouped_products.groups.length > 0;\n        %>\n        <% if (haveUngroupedResults || haveGroupedResults) { %>\n          <% if (haveUngroupedResults) { %>\n          <h2 class=\"blm-product-search-toolbar__title\">\n            Showing <%- start + 1 %> - <%- Math.min(start + products.length, number_of_results) %> of <%- number_of_results %> products\n          </h2>\n          <% } %>\n        <div class=\"blm-product-search-toolbar-options\">\n          <% if (config.search.groupby) { %>\n          <span class=\"blm-product-search-toolbar-options blm-product-search-toolbar-options--groupby\">\n            <label for=\"groupby-%%-REQUEST_ID-%%\" class=\"blm-product-search-toolbar-options__label\">Group By: </label>\n            <select\n              name=\"groupby\"\n              id=\"groupby-%%-REQUEST_ID-%%\"\n              class=\"blm-product-search-toolbar-options__select\"\n            >\n              <% config.search.groupby_options.forEach(function(option) { %>\n                <option value=\"<%- option.value %>\" <% if (locals.groupby && groupby === option.value) { %>selected<% } %>><%- option.label %></option>\n              <% }) %>\n            </select>\n          </span>\n          <% } %>\n          <% if (!config.search.infinite_scroll && paginationData.length > 0) { %>\n          <span class=\"blm-product-search-toolbar-options blm-product-search-toolbar-options--page-size\">\n            <label for=\"sort-size-%%-REQUEST_ID-%%\" class=\"blm-product-search-toolbar-options__label\">Size: </label>\n            <select\n              name=\"sort-size\"\n              id=\"sort-size-%%-REQUEST_ID-%%\"\n              class=\"blm-product-search-toolbar-options__select\"\n            >\n              <% for (let i = (config.search.groupby ? 4 : 16); i <= (config.search.groupby ? 16 : 48); i += 4) { %>\n                <option value=\"<%- i %>\" <% if (locals.size && size === i) { %>selected<% } %>><%- i %></option>\n              <% } %>\n            </select>\n          </span>\n          <% } %>\n          <span class=\"blm-product-search-toolbar-options blm-product-search-toolbar-options--sort-by\">\n            <label for=\"sort-by-%%-REQUEST_ID-%%\" class=\"blm-product-search-toolbar-options__label\">Sort By: </label>\n            <select\n              name=\"sort-by\"\n              id=\"sort-by-%%-REQUEST_ID-%%\"\n              class=\"blm-product-search-toolbar-options__select\"\n            >\n              <% config.search.sorting_options.forEach(function(option) { %>\n                <option value=\"<%- option.value %>\" <% if (locals.sort && sort === option.value) { %>selected<% } %>><%- option.label %></option>\n              <% }) %>\n            </select>\n          </span>\n        </div>\n        <% } else if (!(locals.grouped_products) || grouped_products.groups.length < 1) { %>\n        <h2 class=\"blm-product-search-toolbar__title\">\n          No results found\n        </h2>\n        <% } %>\n\n      </div>\n      <div <% if (products.length && !locals.grouped_products) { %>class=\"blm-product-search__results\"<% } %>>\n        <% if (products.length || (locals.grouped_products && grouped_products.groups.length > 0)) { %>\n          %%-PRODUCT_LIST_TEMPLATE-%%\n        <% } %>\n      </div>\n\n      <% if (!config.search.infinite_scroll && paginationData.length > 0) { %>\n      <div class=\"blm-product-search-pagination\">\n        <ul class=\"blm-product-search-pagination__pages blm-product-search-pagination__pages--%%-REQUEST_ID-%%\">\n          <% paginationData.forEach(paginationNode => { %>\n            <li class=\"blm-product-search-pagination__page\">\n              <button <% if (paginationNode.disabled) { %>disabled<% } %> class=\"blm-product-search-pagination__page-link <% if (paginationNode.active) { %>blm-product-search-pagination__page-link--active<% } %>\" data-value=\"<%- paginationNode.value %>\"\n                ><%- paginationNode.label ?? paginationNode.value %></button\n              >\n            </li>\n          <% }) %>\n        </ul>\n      </div>\n      <% } %>\n    </section>\n  </div>\n";

  var searchListTemplate = "<% function printProduct(product) { %>\n  <div class=\"blm-product-search__result\" <% if (product.variant_name) { %>title=\"<%- product.variant_name %>\"<% } %>>\n    <%\n      const matchingVariant = !Array.isArray(product.variants)\n        ? null\n        : 'variant_index' in product\n          ? product.variants[product.variant_index]\n          : product.variants.find(variant => selectedColors.includes(variant.sku_color_group ? variant.sku_color_group.toLowerCase() : null))\n    %>\n    <div class=\"blm-product-search-image-container\">\n      <% if (product.variants && product.variants.length > 1) { %>\n        <% product.variants.forEach(function(variant, index) { %>\n\n        <%\n          const isActiveVariant =\n            !('variant_index' in product) && !selectedColors.length\n              ? index === 0\n              : 'variant_index' in product\n                ? product.variant_index === index\n                : matchingVariant == variant\n        %>\n\n        <div class=\"blm-product-search-swatch-image fade\"\n          <% if (isActiveVariant) { %>style=\"display: block\"<% } %>\n        >\n          <img\n            class=\"blm-product-search-image-container__image\"\n            alt=\"title\"\n            src=\"<%= variant.image %>\"\n          />\n        </div>\n        <% }); %>\n      <% } else { %>\n        <div class=\"blm-product-search-swatch-image fade\" style=\"display: block\"\n        >\n          <img\n            class=\"blm-product-search-image-container__image\"\n            alt=\"title\"\n            src=\"<%= product.image %>\"\n          />\n        </div>\n      <% } %>\n    </div>\n    <div class=\"blm-product-search-details-container\">\n      <div class=\"blm-product-search-details-title-container\">\n        <a href=\"<%= product.link %>\" class=\"blm-product-search-details-container__title\"\n          ><%- product.title %></a\n        >\n      </div>\n\n      <% if (product.variants && product.variants.length > 1) { %>\n        <% product.variants.forEach(function(variant, index) { %>\n          <%\n            const isActiveVariant =\n              !('variant_index' in product) && !selectedColors.length\n                ? index === 0\n                : 'variant_index' in product\n                  ? product.variant_index === index\n                  : matchingVariant == variant\n          %>\n          <p class=\"blm-product-search-details-container__price <% if (isActiveVariant) { %>active<% } %>\">\n            <%\n              const salePrice = variant.sku_sale_price !== undefined ? variant.sku_sale_price : product.sale_price;\n              const price = variant.sku_price !== undefined ? variant.sku_price : product.price;\n            %>\n            <%= config.format_money((salePrice !== undefined ? salePrice : price).toFixed(2) * 100) %>\n            <% if (salePrice !== undefined) { %>\n              <span <% if (salePrice !== undefined) { %>class=\"blm-product-search-details-container__price--strike-through\"<% } %>>\n                <%= config.format_money(price.toFixed(2) * 100) %>\n              </span>\n            <% } %>\n          </p>\n        <% }); %>\n      <% } else { %>\n        <p class=\"blm-product-search-details-container__price active\">\n          <%= config.format_money((product.sale_price !== undefined ? product.sale_price : product.price).toFixed(2) * 100) %>\n          <% if (product.sale_price !== undefined) { %>\n            <span <% if (product.sale_price !== undefined) { %>class=\"blm-product-search-details-container__price--strike-through\"<% } %>>\n              <%= config.format_money(product.price.toFixed(2) * 100) %>\n            </span>\n          <% } %>\n        </p>\n      <% } %>\n\n    </div>\n\n    <% if (product.variants && product.variants.length > 1) { %>\n      <ul class=\"blm-product-search-swatch-container\">\n      <% product.variants.slice(0, defaultMaxColorSwatches || 0).forEach(function(variant, index) { %>\n        <%\n          const isActiveVariant =\n            !('variant_index' in product) && !selectedColors.length\n              ? index === 0\n              : 'variant_index' in product\n                ? product.variant_index === index\n                : matchingVariant == variant\n        %>\n        <li\n          class=\"blm-product-search-swatch-container__swatch <% if (isActiveVariant) { %>active<% } %>\"\n          style=\"background-image: url('<%= variant.image %>')\"\n        ></li>\n      <% }); %>\n      </ul>\n\n      <% if (product.variants.length > defaultMaxColorSwatches || 0) { %>\n      <small class=\"blm-product-search-swatch-colors\">(Colors) <%- product.variants.length %></small>\n      <% } %>\n    <% } %>\n  </div>\n<% } %>\n\n<% if (locals.grouped_products && grouped_products && grouped_products.groups) { %>\n\n  <% grouped_products.groups.forEach(group => { %>\n  <div class=\"blm-result-group\">\n    <h3 class=\"blm-result-group__title\"><%- group.title %></h3>\n\n    <div class=\"blm-product-search__results\">\n      <% group.products.forEach(printProduct); %>\n    </div>\n  </div>\n  <% }); %>\n\n<% } else { %>\n\n  <% products.forEach(printProduct); %>\n\n<% } %>\n";

  var autosuggestTemplate = "<% if (terms.length || productSuggestions.length) { %>\n  <div class=\"blm-autosuggest\">\n    <div class=\"blm-autosuggest__suggestion-terms-container\">\n      <ul class=\"blm-autosuggest__suggestion-terms\">\n        <% terms.forEach(function(term) { %>\n          <li class=\"blm-autosuggest__suggestion-term\">\n            <a href=\"<%- term.link %>\" class=\"blm-autosuggest__suggestion-term-link\" data-suggestion-text=\"<%- term.text %>\"\n              ><%- term.processedText %></a\n            >\n            <% if (term.categories) { %>\n              <ul class=\"blm-autosuggest__category-results\">\n                <% term.categories.forEach(function(category) { %>\n                <li class=\"blm-autosuggest__suggestion-term\">\n                  <a href=\"#\"\n                     data-category-id=\"<%- category.value %>\"\n                     data-suggestion-text=\"<%- category.name %>\"\n                     class=\"blm-autosuggest__suggestion-term-link blm-autosuggest__suggestion-term-link--category\"\n                    ><%- category.name %></a\n                  >\n                </li>\n                <% }); %>\n              </ul>\n            <% } %>\n          </li>\n        <% }); %>\n      </ul>\n    </div>\n\n    <div class=\"blm-autosuggest__results-container\">\n      <div class=\"blm-autosuggest__results\">\n        <% productSuggestions.forEach(function(suggestion) { %>\n          <div class=\"blm-autosuggest__result\">\n            <div class=\"blm-autosuggest-result-image\">\n              <a\n                title=\"<%= suggestion.title %>\"\n                aria-hidden=\"true\"\n                tabindex=\"-1\"\n                href=\"<%= suggestion.link %>\"\n                class=\"blm-autosuggest-result-image__link\"\n                ><img\n                  class=\"blm-autosuggest-result-image__image\"\n                  src=\"<%= suggestion.image %>\"\n              /></a>\n            </div>\n            <div class=\"blm-autosuggest-result-details\">\n              <a class=\"blm-autosuggest-result-details__title\" href=\"<%= suggestion.link %>\"\n                ><%= suggestion.title %></a\n              >\n              <div class=\"blm-autosuggest-result-details__price blm-autosuggest-result-details__price--final\">\n                <% if (config.format_money) { %>\n                  <%= config.format_money(suggestion.sale_price.toFixed(2) * 100) %>\n                <% } else { %>\n                  <%= config.default_currency %><%= suggestion.sale_price.toFixed(2) %>\n                <% } %>\n                <% if (suggestion.price) { %>\n                  <span\n                  class=\"blm-autosuggest-result-details__price blm-autosuggest-result-details__price--original\"\n                  >\n                   <% if (config.format_money) { %>\n                     <%= config.format_money(suggestion.price.toFixed(2) * 100) %>\n                   <% } else { %>\n                     <%= config.default_currency %><%= suggestion.price.toFixed(2) %>\n                   <% } %>\n                  </span\n                >\n                <% } %>\n              </div>\n            </div>\n          </div>\n        <% }); %>\n      </div>\n    </div>\n\n  </div>\n  <% } %>\n";

  function buildBaseConfig() {
    var _a;
    const connectorConfig = (_a = window === null || window === void 0 ? void 0 : window.bloomreachConnector) === null || _a === void 0 ? void 0 : _a.config;
    const config = Object.assign({
      default_search_parameter: DEFAULT_SEARCH_PARAMETER,
      url: window.location.href,
      ref_url: window.location.href,
      tracking_cookie: extractTrackingCookie(),
      format_money: cents => formatAsCurrency(cents, window.bloomreachDefaultCurrency || DEFAULT_CURRENCY),
      default_currency: window.bloomreachDefaultCurrency || DEFAULT_CURRENCY
    }, connectorConfig);
    return config;
  }
  function buildAutosuggestConfig() {
    const baseConfig = buildBaseConfig();
    const config = Object.assign(Object.assign({
      request_type: REQUEST_TYPE_SUGGEST
    }, baseConfig), {
      autosuggest: Object.assign({
        enabled: true,
        endpoint: '',
        number_of_terms: NUMBER_OF_AUTOSUGGEST_TERMS,
        number_of_products: NUMBER_OF_AUTOSUGGEST_PRODUCTS,
        number_of_collections: NUMBER_OF_AUTOSUGGEST_COLLECTIONS,
        selector: SELECTOR_AUTOSUGGEST_INPUT,
        template: autosuggestTemplate,
        catalog_views: ''
      }, baseConfig.autosuggest)
    });
    return config;
  }
  function buildSearchConfig() {
    var _a, _b, _c;
    const baseConfig = buildBaseConfig();
    const urlParameters = new URLSearchParams(window.location.search);
    const state = getCurrentSearchRequestState();
    const defaultSearchProperties = Object.assign({
      display_variants: false,
      enabled: true,
      endpoint: '',
      items_per_page: DEFAULT_PAGE_SIZE,
      facets_included: true,
      initial_number_of_facets: NUMBER_OF_FACET_GROUPS,
      initial_number_of_facet_values: NUMBER_OF_FACET_VALUES,
      infinite_scroll: false,
      selector: SELECTOR_SEARCH_RESULTS_CONTAINER,
      sorting_options: DEFAULT_SORTING_OPTIONS,
      template: searchLayoutTemplate,
      product_list_template: searchListTemplate
    }, (baseConfig === null || baseConfig === void 0 ? void 0 : baseConfig.search) ? baseConfig.search : {});
    const config = Object.assign(Object.assign({}, baseConfig), {
      request_type: REQUEST_TYPE_SEARCH,
      search_type: state.is_category_page ? SEARCH_TYPE_CATEGORY : SEARCH_TYPE_KEYWORD,
      start: DEFAULT_START,
      'facet.range': FIELD_NAME_PRICE,
      'stats.field': FIELD_NAME_PRICE,
      sort: urlParameters.get(PARAMETER_NAME_SORT) || '',
      search: Object.assign(Object.assign(Object.assign({}, defaultSearchProperties), (state.is_category_page ? baseConfig.category : baseConfig.search) || {}), state.category_to_load ? {
        category_id: state.category_to_load
      } : {})
    });
    (_c = (_b = (_a = config.search) === null || _a === void 0 ? void 0 : _a.sorting_options) === null || _b === void 0 ? void 0 : _b.sort) === null || _c === void 0 ? void 0 : _c.call(_b, (option1, option2) => option1.value > option2.value ? 1 : -1);
    if (config.search) {
      config.search = Object.assign(Object.assign({}, config.search), {
        items_per_page: Number(urlParameters.has(PARAMETER_NAME_SIZE) ? urlParameters.get(PARAMETER_NAME_SIZE) : config.search.items_per_page),
        groupby: urlParameters.get(PARAMETER_NAME_GROUPBY) || config.search.groupby || ''
      });
    }
    return config;
  }

  let memoizedNS;
  const NOOP = Object.assign(() => {}, {
    warn: () => {},
    error: () => {},
    verbose: () => {}
  });
  let colorIndex = -1;
  const memoizedColor = new Map();
  /**
   * List of colors our debugger can pick from. The colors should be slightly
   * desautrated to help with reading and should be highly varied.
   */
  const pickColor = ns => {
    if (memoizedColor.has(ns)) return memoizedColor.get(ns);
    const color = ['#00a3ff', '#ff00a3', '#a3ff00', '#00ffa3', '#a300ff', '#ffaa00', '#00ffaa', '#ff00aa', '#aa00ff', '#00aaff'][++colorIndex % 10] || '#00a3ff';
    memoizedColor.set(ns, color);
    return color;
  };
  /**
   * Creates a simple debug logger system that is only activated by the stored
   * state within localStorage.debug. The value in the state can be:
   *
   * namespace1;namespace2;namespace3;etc
   *
   * or
   *
   * namepspace1
   *
   * or
   *
   * *
   *
   * Where `*` is a wildcard that will activate all namespaces.
   */
  const Debug = ns => {
    const active = activeNS();
    // If the namespace is not active, return a noop function set
    if (!active.has(ns) && !active.has('*')) return NOOP;
    const color = pickColor(ns);
    const logger = console.log.bind(console, `%c${ns}`, `color: ${color}`);
    logger.warn = console.warn.bind(console, `%c${ns}`, `color: ${color}`);
    logger.error = console.error.bind(console, `%c${ns}`, `color: ${color}`);
    if (active.has(`${ns}:verbose`) || active.has('*')) {
      logger.verbose = console.log.bind(console, `%c${ns}:verbose`, `color: ${color}`);
    } else {
      logger.verbose = () => {};
    }
    return logger;
  };
  function activeNS() {
    if (memoizedNS) return memoizedNS;
    const storage = window.localStorage;
    if (!storage) return new Set();
    const ns = storage.getItem('debug') || '';
    memoizedNS = new Set(ns.split(';'));
    return memoizedNS;
  }

  /**
   * If a truthy value is false, this throws an error and displays the message for
   * the error.
   */
  function invariant(truthy, message) {
    if (truthy) return;
    throw new Error(message);
  }

  const autosuggestLog = Debug('br:autosuggest');
  function findUpElementWithClassName(startElement, className) {
    var _a;
    let element = startElement;
    // eslint-disable-next-line functional/no-loop-statement
    while (element && element.parentElement) {
      element = element.parentElement;
      if (element && ((_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(className))) {
        return element;
      }
    }
    return null;
  }
  function findUpElementByTagName(startElement, tagName) {
    let element = startElement;
    // eslint-disable-next-line functional/no-loop-statement
    while (element && element.parentNode) {
      element = element.parentNode;
      if (element && element.tagName.toLowerCase() === tagName.toLowerCase()) {
        return element;
      }
    }
    return null;
  }
  function hideAllDynamicFacetGroups() {
    ['.blm-dynamic-filter', '.blm-product-search-filter-item', '.blm-product-search-load-more'].forEach(selector => {
      document.querySelectorAll(selector).forEach(item => {
        item.removeAttribute('style');
      });
    });
  }
  function loadMoreFacetGroups(numberOfFacetGroupsParameter) {
    var _a;
    let i = 0;
    let numberOfHiddenBoxWithVisibleChildren = 0;
    const config = buildSearchConfig();
    const numberOfFacetGroups = Number(numberOfFacetGroupsParameter || ((_a = config.search) === null || _a === void 0 ? void 0 : _a.initial_number_of_facets));
    document.querySelectorAll('.blm-dynamic-filter:not([style*="display: block"])').forEach(item => {
      const visibleChildren = item === null || item === void 0 ? void 0 : item.querySelectorAll('.blm-product-search-filter-item:not([style*="display: none"]');
      if (i < numberOfFacetGroups && visibleChildren.length > 0) {
        item === null || item === void 0 ? void 0 : item.setAttribute('style', 'display: block');
      }
      i++;
      numberOfHiddenBoxWithVisibleChildren += visibleChildren.length > 0 ? 1 : 0;
    });
    const currentSearchRequestState = getCurrentSearchRequestState();
    const loadMoreFacetGroupsElement = document.querySelector(`.blm-load-more-facet--${currentSearchRequestState.request_id}`);
    const numberOfHiddenBoxes = document.querySelectorAll('.blm-dynamic-filter:not([style*="display: block"])').length;
    if (numberOfHiddenBoxes === 0 || numberOfHiddenBoxWithVisibleChildren === 0) {
      loadMoreFacetGroupsElement === null || loadMoreFacetGroupsElement === void 0 ? void 0 : loadMoreFacetGroupsElement.classList.add('blm-hide');
    }
  }
  function getLoadMoreFacetGroupsElement() {
    const currentSearchRequestState = getCurrentSearchRequestState();
    const element = document.querySelector(`.blm-load-more-facet--${currentSearchRequestState.request_id}`);
    invariant(element, 'the element for loading more facet groups must be in the DOM');
    return element;
  }
  function resetFacetGroups() {
    var _a, _b, _c;
    const config = buildSearchConfig();
    const numberOfDisplayedFacetGroups = Number((_a = config.search) === null || _a === void 0 ? void 0 : _a.initial_number_of_facets);
    const numberOfDisplayedFacetValues = Number((_b = config.search) === null || _b === void 0 ? void 0 : _b.initial_number_of_facet_values);
    hideAllDynamicFacetGroups();
    loadMoreFacetGroups(numberOfDisplayedFacetGroups - 1);
    // init facet items visibility
    document.querySelectorAll(`.blm-product-search-filter-item:nth-child(-n+${numberOfDisplayedFacetValues})`).forEach(item => item.style.display = 'block');
    (_c = getLoadMoreFacetGroupsElement()) === null || _c === void 0 ? void 0 : _c.removeAttribute('style');
  }
  function getAutosuggestSearchInputElement() {
    const config = buildAutosuggestConfig();
    if (!config.autosuggest) return null;
    invariant(config.autosuggest.selector, 'the selector of search results container element must be set');
    const autosuggestInputElement = document.querySelector(config.autosuggest.selector);
    return autosuggestInputElement;
  }
  function getAutosuggestResultsContainerElement() {
    const autosuggestResultsContainerElement = document.querySelector('.blm-autosuggest-search-results');
    return autosuggestResultsContainerElement;
  }
  function getAutosuggestDynamicStyle() {
    const autosuggestResultsContainerElement = document.querySelector('#blm-autosuggest-dynamic-style');
    return autosuggestResultsContainerElement;
  }
  function injectAutosuggestElements() {
    var _a;
    const searchInput = getAutosuggestSearchInputElement();
    autosuggestLog('Will inject autosuggest elements for:', searchInput);
    if (!searchInput || !searchInput.parentElement) return;
    if (!getAutosuggestDynamicStyle()) {
      const searchResultsContainerStyles = document.createElement('style');
      searchResultsContainerStyles.id = '#blm-autosuggest-dynamic-style';
      searchResultsContainerStyles.innerHTML = `.blm-autosuggest-search-results {
      width: 100%;
      position: absolute;
      z-index: 100;
      left: 0;
      transform: translateY(${(_a = searchInput.offsetHeight) !== null && _a !== void 0 ? _a : 35}px);
    }`;
      document.head.appendChild(searchResultsContainerStyles);
      autosuggestLog.verbose('Added custom style tag', searchResultsContainerStyles);
    }
    if (!getAutosuggestResultsContainerElement()) {
      const searchResultsContainerElement = document.createElement('div');
      searchResultsContainerElement.classList.add('blm-autosuggest-search-results');
      searchInput.parentElement.appendChild(searchResultsContainerElement);
      autosuggestLog.verbose('Added search results container:', searchResultsContainerElement);
    }
  }
  function removeAutosuggestElements() {
    const searchResultsContainerElement = getAutosuggestResultsContainerElement();
    autosuggestLog('Will remove container:', searchResultsContainerElement);
    searchResultsContainerElement === null || searchResultsContainerElement === void 0 ? void 0 : searchResultsContainerElement.remove();
    const searchResultsContainerStyles = getAutosuggestDynamicStyle();
    autosuggestLog('Will remove style:', searchResultsContainerStyles);
    searchResultsContainerStyles === null || searchResultsContainerStyles === void 0 ? void 0 : searchResultsContainerStyles.remove();
  }

  var breakpoints;
  (function (breakpoints) {
    breakpoints["small"] = "480px";
    breakpoints["medium"] = "680px";
    breakpoints["large"] = "750px";
    breakpoints["xlarge"] = "875px";
    breakpoints["xxlarge"] = "1000px";
    breakpoints["xxxlarge"] = "1200px";
  })(breakpoints || (breakpoints = {}));
  window.matchMedia(`(max-width: ${breakpoints.medium})`);
  window.matchMedia(`(min-width:${breakpoints.medium}) and (max-width: ${breakpoints.xlarge})`);

  const log$1 = Debug('br:url');
  function updateUrl(urlParameters) {
    var _a, _b, _c, _d;
    const historyStateObject = {};
    // eslint-disable-next-line functional/no-loop-statement
    for (const pair of urlParameters.entries()) {
      historyStateObject[pair[0]] = pair[1];
    }
    window.history.pushState(historyStateObject, document.title, `?${urlParameters.toString()}`);
    const br_data = window.br_data || {};
    if (br_data.orig_ref_url !== location.href) {
      br_data.orig_ref_url = location.href;
      log$1('Generating virtual page view event for url update', location.href);
      (_b = (_a = window.BrTrk) === null || _a === void 0 ? void 0 : _a.getTracker()) === null || _b === void 0 ? void 0 : _b.updateBrData(br_data);
      (_d = (_c = window.BrTrk) === null || _c === void 0 ? void 0 : _c.getTracker()) === null || _d === void 0 ? void 0 : _d.logPageView();
    }
  }
  function updateParameterInUrl(parameterName, newValue) {
    const urlParameters = new URLSearchParams(window.location.search);
    if (typeof newValue === 'function') {
      urlParameters.set(parameterName,
      // @ts-ignore
      newValue(urlParameters.get(parameterName)).replace(/"/g, '\\"'));
    } else if (newValue === '') {
      urlParameters.delete(parameterName);
    } else {
      urlParameters.set(parameterName, newValue.replace(/"/g, '\\"'));
    }
    updateUrl(urlParameters);
  }

  const categoryLinkElementClickListener = event => {
    var _a, _b, _c;
    event.preventDefault();
    const clickedElement = event.target;
    const categoryId = ((_a = clickedElement.dataset) === null || _a === void 0 ? void 0 : _a.categoryId) || '';
    const module = ((_b = window.BloomreachModules) === null || _b === void 0 ? void 0 : _b.search) || ((_c = window.BloomreachModules) === null || _c === void 0 ? void 0 : _c.category);
    if (module) {
      updateParameterInUrl(PARAMETER_NAME_PAGE, '1');
      module.load(categoryId).then(() => {
        const autosuggestSearchElement = getAutosuggestSearchInputElement();
        const autosuggestResultsElement = getAutosuggestResultsContainerElement();
        if (autosuggestSearchElement) {
          autosuggestSearchElement.value = (clickedElement === null || clickedElement === void 0 ? void 0 : clickedElement.textContent) || '';
        }
        if (autosuggestResultsElement) {
          autosuggestResultsElement.innerHTML = '';
        }
        updateCurrentAutosuggestRequestState({
          last_template_data: null
        });
        return true;
      }).catch(console.error);
    }
  };
  function addCategoryLinkElementClickListener() {
    var _a;
    (_a = getAutosuggestResultsContainerElement()) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.blm-autosuggest__suggestion-term-link--category').forEach(categoryLinkElement => {
      categoryLinkElement === null || categoryLinkElement === void 0 ? void 0 : categoryLinkElement.removeEventListener('click', categoryLinkElementClickListener);
      categoryLinkElement === null || categoryLinkElement === void 0 ? void 0 : categoryLinkElement.addEventListener('click', categoryLinkElementClickListener);
    });
  }

  let scheduleSubmission = false;
  const formFocusListener = () => {
    scheduleSubmission = true;
  };
  const formBlurListener = () => {
    scheduleSubmission = false;
  };
  const formElementSubmitListener = () => {
    var _a, _b, _c;
    scheduleSubmission = false;
    const searchData = {
      q: (_a = getAutosuggestSearchInputElement()) === null || _a === void 0 ? void 0 : _a.value
      // catalogs: [{name: 'example_en'}]
    };

    (_c = (_b = window.BrTrk || {}) === null || _b === void 0 ? void 0 : _b.getTracker()) === null || _c === void 0 ? void 0 : _c.logEvent('suggest', 'submit', searchData, {}, true);
  };
  /**
   * We listen to the window unload event to see if the user left the page without
   * the form submit listener executing properly. This has been seen to happen
   * when the user presses enter instead of clicking the submit button in some
   * contexts.
   */
  const windowUnloadListener = () => {
    if (scheduleSubmission) {
      formElementSubmitListener();
    }
  };
  function addFormElementSubmitListener() {
    const suggestElement = getAutosuggestSearchInputElement();
    if (!suggestElement) return;
    const element = findUpElementByTagName(suggestElement, 'form');
    if (!element) return;
    // NOTES: Our environments this is deployed to is largely unknown. The only
    // known we are given is the text input provided to us. We can hope it is in a
    // form for which we can gracefully handle the submission event. But if the
    // submissions are circumvented by using other means for submission, we can
    // only rely on our little input and it's focus state. Essentially, if the
    // element is in focus and our window is loading to a new page, that is our
    // most reliable indicator of capturing things like enter key being pressed or
    // other odds and end.
    // Add listeners in re-entrant fashion
    element === null || element === void 0 ? void 0 : element.removeEventListener('submit', formElementSubmitListener, true);
    suggestElement === null || suggestElement === void 0 ? void 0 : suggestElement.removeEventListener('focus', formFocusListener, {
      capture: true
    });
    suggestElement === null || suggestElement === void 0 ? void 0 : suggestElement.removeEventListener('blur', formBlurListener, {
      capture: true
    });
    window.removeEventListener('beforeunload', windowUnloadListener, true);
    element === null || element === void 0 ? void 0 : element.addEventListener('submit', formElementSubmitListener, true);
    suggestElement === null || suggestElement === void 0 ? void 0 : suggestElement.addEventListener('focus', formFocusListener, {
      capture: true
    });
    suggestElement === null || suggestElement === void 0 ? void 0 : suggestElement.addEventListener('blur', formBlurListener, {
      capture: true
    });
    window.addEventListener('beforeunload', windowUnloadListener, true);
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */

  function isObject$2(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject$2;

  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal$1;

  var freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$2 = freeGlobal || freeSelf || Function('return this')();

  var _root = root$2;

  var root$1 = _root;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now$1 = function() {
    return root$1.Date.now();
  };

  var now_1 = now$1;

  /** Used to match a single whitespace character. */

  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex$1(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var _trimmedEndIndex = trimmedEndIndex$1;

  var trimmedEndIndex = _trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim$1(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  var _baseTrim = baseTrim$1;

  var root = _root;

  /** Built-in value references. */
  var Symbol$2 = root.Symbol;

  var _Symbol = Symbol$2;

  var Symbol$1 = _Symbol;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto$1.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag$1;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString$1;

  var Symbol = _Symbol,
      getRawTag = _getRawTag,
      objectToString = _objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$1(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  var _baseGetTag = baseGetTag$1;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */

  function isObjectLike$1(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike$1;

  var baseGetTag = _baseGetTag,
      isObjectLike = isObjectLike_1;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol$1(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol$1;

  var baseTrim = _baseTrim,
      isObject$1 = isObject_1,
      isSymbol = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber$1;

  var isObject = isObject_1,
      now = now_1,
      toNumber = toNumber_1;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  var debounce_1 = debounce;

  const searchInputElementBlurListener = () => {
    if (getCurrentAutosuggestUiState().mouseDownEventHappenedInsideAutosuggestResultsContainer) {
      updateCurrentAutosuggestUiState({
        mouseDownEventHappenedInsideAutosuggestResultsContainer: false
      });
      return false;
    }
    const containerElement = getAutosuggestResultsContainerElement();
    if (!containerElement) return;
    containerElement.innerHTML = '';
    return true;
  };
  const generalClickListenerForSearchInputBlur = event => {
    if (!event.target || !(event.target instanceof HTMLElement)) return;
    const clickHappenedOnInputOrAutosuggestResultsPanel = findUpElementWithClassName(event.target, 'blm-autosuggest');
    if (clickHappenedOnInputOrAutosuggestResultsPanel) {
      updateCurrentAutosuggestUiState({
        mouseDownEventHappenedInsideAutosuggestResultsContainer: true
      });
    } else {
      const containerElement = getAutosuggestResultsContainerElement();
      if (!containerElement) return;
      containerElement.innerHTML = '';
    }
  };
  const searchInputElementFocusListener = () => {
    const lastTemplateData = getCurrentAutosuggestRequestState().last_template_data;
    getCurrentAutosuggestRequestState();
    if (lastTemplateData) {
      const containerElement = getAutosuggestResultsContainerElement();
      if (!containerElement) return;
      containerElement.innerHTML = ejs.render(autosuggestTemplate, lastTemplateData);
    }
  };
  const searchInputElementKeyupListener = debounce_1(event => {
    const query = event.target.value;
    const searchInputElement = getAutosuggestSearchInputElement();
    if (!searchInputElement) return;
    if (query.length >= AUTOSUGGEST_MINIMUM_QUERY_LENGTH) {
      searchInputElement.dataset.originalQuery = query;
      suggest(query).catch(console.error);
    } else {
      const autosuggestResultsContainerElement = getAutosuggestResultsContainerElement();
      if (autosuggestResultsContainerElement) {
        autosuggestResultsContainerElement.innerHTML = '';
      }
      searchInputElement.dataset.originalQuery = '';
      updateCurrentAutosuggestRequestState({
        last_template_data: null
      });
    }
  }, 500);
  function addSearchInputElementBlurListener() {
    // Add listeners in re-entrant fashion
    document.body.removeEventListener('mousedown', generalClickListenerForSearchInputBlur);
    document.body.addEventListener('mousedown', generalClickListenerForSearchInputBlur);
    const element = getAutosuggestSearchInputElement();
    if (!element) return;
    element.removeEventListener('blur', searchInputElementBlurListener);
    element.addEventListener('blur', searchInputElementBlurListener);
  }
  function addSearchInputElementFocusListener() {
    const element = getAutosuggestSearchInputElement();
    if (!element) return;
    // Add listeners in re-entrant fashion
    element.removeEventListener('focus', searchInputElementFocusListener);
    element.addEventListener('focus', searchInputElementFocusListener);
  }
  function addSearchInputElementChangeListener() {
    const element = getAutosuggestSearchInputElement();
    // Add listeners in re-entrant fashion
    element === null || element === void 0 ? void 0 : element.removeEventListener('input', searchInputElementKeyupListener);
    element === null || element === void 0 ? void 0 : element.addEventListener('input', searchInputElementKeyupListener);
  }
  function addSearchInputElementListeners() {
    addSearchInputElementBlurListener();
    addSearchInputElementFocusListener();
    addSearchInputElementChangeListener();
  }

  const listeners = new WeakMap();
  const suggestionTermElementClickListener = suggestionTermElement => {
    return () => {
      var _a, _b;
      const {
        suggestionText
      } = suggestionTermElement.dataset;
      const input = getAutosuggestSearchInputElement();
      if (!input) return;
      const {
        originalQuery
      } = input.dataset;
      const suggestionData = {
        aq: originalQuery,
        q: suggestionText,
        catalogs: [{
          name: 'example_en'
        }]
      };
      (_b = (_a = window.BrTrk || {}) === null || _a === void 0 ? void 0 : _a.getTracker()) === null || _b === void 0 ? void 0 : _b.logEvent('suggest', 'click', suggestionData, {}, true);
    };
  };
  function addSuggestionTermElementClickListener() {
    var _a;
    // Apply listeners in re-entrant fashion
    (_a = getAutosuggestResultsContainerElement()) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.blm-autosuggest__suggestion-term-link').forEach(suggestionTermElement => {
      const listener = suggestionTermElementClickListener(suggestionTermElement);
      const old = listeners.get(suggestionTermElement);
      if (old) suggestionTermElement.removeEventListener('click', old);
      listeners.set(suggestionTermElement, listener);
      suggestionTermElement === null || suggestionTermElement === void 0 ? void 0 : suggestionTermElement.addEventListener('click', listener);
    });
  }

  function mapAutosuggestApiResponse(responseData) {
    return isV2Response(responseData) ? mapV2Response(responseData) : mapV1Response(responseData);
  }
  function mapV2Response(responseData) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const config = buildAutosuggestConfig();
    const productSuggestions = ((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.suggestionGroups) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.searchSuggestions) || [];
    const suggestions = ((_d = (_c = responseData === null || responseData === void 0 ? void 0 : responseData.suggestionGroups) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.querySuggestions) || [];
    const categorySuggestions = ((_f = (_e = responseData === null || responseData === void 0 ? void 0 : responseData.suggestionGroups) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.attributeSuggestions) || [];
    const mappedApiResponse = Object.assign(Object.assign({}, ((_g = responseData === null || responseData === void 0 ? void 0 : responseData.queryContext) === null || _g === void 0 ? void 0 : _g.originalQuery) ? {
      originalQuery: responseData.queryContext.originalQuery
    } : {}), {
      terms: [...suggestions.map((term, index) => {
        var _a;
        return Object.assign(Object.assign(Object.assign({}, term), {
          text: term.query,
          displayText: term.displayText,
          link: `${config.search_page_url}?${config.default_search_parameter}=${encodeURIComponent(term.query)}`
        }), index === 0 && categorySuggestions ? {
          categories: categorySuggestions.map(category => Object.assign(Object.assign({}, category), {
            name: category.name,
            value: category.value,
            type: category.attributeType
          })).slice(0, (_a = config.autosuggest) === null || _a === void 0 ? void 0 : _a.number_of_collections)
        } : {});
      })].slice(0, (_h = config.autosuggest) === null || _h === void 0 ? void 0 : _h.number_of_terms),
      productSuggestions: [...productSuggestions.map(product => Object.assign(Object.assign({}, product), {
        id: product.pid,
        image: product.thumb_image,
        title: product.title,
        link: product.url,
        sale_price: Number((product === null || product === void 0 ? void 0 : product.sale_price) || '0')
      }))].slice(0, (_j = config.autosuggest) === null || _j === void 0 ? void 0 : _j.number_of_products),
      config
    });
    return highlightQueryInTermLabels(mappedApiResponse);
  }
  function isV2Response(responseData) {
    return 'suggestionGroups' in responseData;
  }
  function mapV1Response(responseData) {
    var _a, _b;
    const config = buildAutosuggestConfig();
    const mappedApiResponse = Object.assign(Object.assign({}, responseData.response.q ? {
      originalQuery: responseData.response.q
    } : {}), {
      terms: [...(responseData.response.suggestions ? responseData.response.suggestions.map(term => {
        var _a;
        return Object.assign(Object.assign(Object.assign({}, term), {
          text: term.q,
          displayText: term.dq,
          link: `${config.search_page_url}?${config.default_search_parameter}=${encodeURIComponent(term.q)}`
        }), term.filters ? {
          categories: term.filters.map(category => Object.assign(Object.assign({}, category), {
            name: category.name,
            value: category.value,
            type: category.key
          })).slice(0, (_a = config.autosuggest) === null || _a === void 0 ? void 0 : _a.number_of_collections)
        } : {});
      }) : [])].slice(0, (_a = config.autosuggest) === null || _a === void 0 ? void 0 : _a.number_of_terms),
      productSuggestions: [...(responseData.response.products ? responseData.response.products.map(product => Object.assign(Object.assign(Object.assign({}, product), {
        id: product.pid,
        image: product.thumb_image,
        title: product.title,
        link: product.url,
        sale_price: !Number.isNaN(product.sale_price) ? product.sale_price : !Number.isNaN(product.price) ? product.price : '0'
      }), 'price' in product && 'sale_price' in product ? {
        price: product.price
      } : {})) : [])].slice(0, (_b = config.autosuggest) === null || _b === void 0 ? void 0 : _b.number_of_products),
      config
    });
    return highlightQueryInTermLabels(mappedApiResponse);
  }
  function highlightQueryInTermLabels(results) {
    const processedResults = Object.assign({}, results);
    results.terms.forEach((term, index) => {
      const typedQueryHtml = ejs.render(AUTOSUGGEST_TYPED_QUERY_TEMPLATE, {
        query: results.originalQuery
      }).trim();
      (processedResults.terms[index] || {}).processedText = term.text.replace(results.originalQuery || '', typedQueryHtml);
    });
    return processedResults;
  }

  const log = Debug('br:autosuggest');
  function buildAutosuggestModule() {
    log('Build Autosuggest Module:', '4.0.0');
    let currentAutosuggestRequestState = {
      request_id: 0,
      last_template_data: null,
      currentElement: null,
      pollIntervalId: null
    };
    let currentAutosuggestUiState = {
      mouseDownEventHappenedInsideAutosuggestResultsContainer: false
    };
    return {
      setCurrentAutosuggestRequestState: requestState => {
        currentAutosuggestRequestState = requestState;
      },
      getCurrentAutosuggestRequestState: () => currentAutosuggestRequestState,
      setCurrentAutosuggestUiState: uiState => {
        currentAutosuggestUiState = uiState;
      },
      getCurrentAutosuggestUiState: () => currentAutosuggestUiState,
      load: async () => {
        initPolling();
      },
      unload: () => {
        var _a;
        const state = getCurrentAutosuggestRequestState();
        window.clearInterval((_a = state.pollIntervalId) !== null && _a !== void 0 ? _a : void 0);
        moduleWillUnmount();
      }
    };
  }
  /**
   * We poll for the element in the DOM that is required to be present for
   * this module to work to make itself available. We perform polling as we
   * do not want to examine broad swathes of mutatations and we can not
   * assume the element in question is readily available on the page. We
   * also perform the poll to examine the element for moments it may or may
   * not be removed from the DOM which can trigger this module to pause and
   * reinitialize if the DOM element makes itself available again. Lastly, a
   * polling routine with a simple query selector will be minimally taxing
   * on the UI and keep it responsive.
   */
  function initPolling() {
    var _a;
    let state = getCurrentAutosuggestRequestState();
    window.clearInterval((_a = state.pollIntervalId) !== null && _a !== void 0 ? _a : void 0);
    const doPoll = () => {
      state = getCurrentAutosuggestRequestState();
      const currentElement = state.currentElement;
      const foundElement = getAutosuggestSearchInputElement();
      if (currentElement && !foundElement) {
        // Teardown this module to put it in a waiting state
        updateCurrentAutosuggestRequestState({
          currentElement: null
        });
        moduleWillUnmount();
      } else if (!currentElement && foundElement) {
        updateCurrentAutosuggestRequestState({
          currentElement: foundElement
        });
        moduleWillMount();
      }
    };
    if (!state.pollIntervalId) log('Polling initialized');
    // Begin the polling service.
    const pollTimer = window.setInterval(doPoll, 100);
    updateCurrentAutosuggestRequestState({
      pollIntervalId: pollTimer
    });
    // We execute the poll immediately so if we have a script that is "smarter"
    // about when all conditions are ready for the module, there is a path to have
    // an immediate initialization.
    doPoll();
  }
  /**
   * Lifecycle:
   * When the conditions for the module to operate are no longer met, this will
   * perform all the necessary teardowns to ensure the module is not operating or
   * modifying the page and puts the module in a dormant state. Polling may still
   * be in place to trigger a reinitialization of the module if the conditions
   * are met again. Use "unload" to stop polling from automatic reinitialization.
   */
  function moduleWillUnmount() {
    log('Unmounting Module');
    removeAutosuggestElements();
  }
  /**
   * Lifecycle:
   * When the module has been requested to load and the conditions on
   * the page are met to allow the module to operate, this module will mount and
   * initialize everything it needs to operate and modify any elements on the page
   * that appear.
   */
  function moduleWillMount() {
    var _a, _b;
    log('Mounting Module');
    try {
      injectAutosuggestElements();
    } catch (err) {
      log((err === null || err === void 0 ? void 0 : err.stack) || (err === null || err === void 0 ? void 0 : err.message));
    }
    try {
      areRequirementsMet();
    } catch (err) {
      log('Requirements not met, aborting');
      moduleWillUnmount();
      return;
    }
    addSearchInputElementListeners();
    addFormElementSubmitListener();
    (_a = getAutosuggestSearchInputElement()) === null || _a === void 0 ? void 0 : _a.setAttribute('autocomplete', 'off');
    (_b = getAutosuggestSearchInputElement()) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-autocomplete', 'off');
  }
  /**
   * Retrieves suggestions from the suggest API and renders them to the DOM.
   */
  async function suggest(query) {
    var _a, _b, _c;
    log('Fetching suggestions for', query);
    const config = buildAutosuggestConfig();
    updateCurrentAutosuggestRequestState({
      request_id: generateRequestId()
    });
    const apiCallParameters = buildApiCallParameters(query);
    // todo remediate typescript issue
    // @ts-ignore
    const results = await getSuggestions(apiCallParameters);
    const templateData = mapAutosuggestApiResponse(results);
    updateCurrentAutosuggestRequestState({
      last_template_data: templateData
    });
    const container = getAutosuggestResultsContainerElement();
    if (!container) return;
    log.verbose('Using config', config);
    log.verbose('Render to:', container);
    log.verbose('Is using default template?', !((_a = config.autosuggest) === null || _a === void 0 ? void 0 : _a.template));
    log.verbose('Rendering with template:', {
      template: ((_b = config.autosuggest) === null || _b === void 0 ? void 0 : _b.template) || autosuggestTemplate,
      templateData
    });
    container.innerHTML = ejs.render(((_c = config.autosuggest) === null || _c === void 0 ? void 0 : _c.template) || autosuggestTemplate, templateData);
    addCategoryLinkElementClickListener();
    addSuggestionTermElementClickListener();
  }
  /**
   * Generates the API paramters fed into the suggest API call body.
   */
  function buildApiCallParameters(query) {
    var _a, _b, _c;
    const config = buildAutosuggestConfig();
    const urlParameters = new URLSearchParams(window.location.search);
    const currentAutosuggestRequestState = getCurrentAutosuggestRequestState();
    const apiParameters = Object.assign(Object.assign({}, ((_a = config === null || config === void 0 ? void 0 : config.autosuggest) === null || _a === void 0 ? void 0 : _a.endpoint) ? {
      endpoint: config.autosuggest.endpoint
    } : {}), {
      q: query || urlParameters.get((config === null || config === void 0 ? void 0 : config.default_search_parameter) || '') || '',
      aq: query,
      sort: (_b = config.autosuggest) === null || _b === void 0 ? void 0 : _b.sort,
      account_id: config.account_id,
      domain_key: config.domain_key,
      request_id: currentAutosuggestRequestState.request_id,
      _br_uid_2: config.tracking_cookie,
      ref_url: config.ref_url,
      url: config.url,
      request_type: config.request_type,
      catalog_views: (_c = config.autosuggest) === null || _c === void 0 ? void 0 : _c.catalog_views,
      search_type: 'keyword'
    });
    if (!apiParameters.catalog_views) {
      apiParameters.catalog_views = '';
    }
    // add URL parameters
    // eslint-disable-next-line functional/no-loop-statement
    for (const [key, value] of urlParameters.entries()) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      if (!Object.keys(apiParameters).includes(key)) {
        apiParameters[key] = value;
      }
    }
    // Clean out undefined values as they cause errors with the API
    Object.keys(apiParameters).forEach(key => {
      if (apiParameters[key] === undefined) {
        delete apiParameters[key];
      }
    });
    return apiParameters;
  }
  function getCurrentAutosuggestRequestState() {
    return window.BloomreachModules.autosuggest.getCurrentAutosuggestRequestState();
  }
  function updateCurrentAutosuggestRequestState(state) {
    window.BloomreachModules.autosuggest.setCurrentAutosuggestRequestState(Object.assign(Object.assign({}, getCurrentAutosuggestRequestState()), state));
  }
  function getCurrentAutosuggestUiState() {
    return window.BloomreachModules.autosuggest.getCurrentAutosuggestUiState();
  }
  function updateCurrentAutosuggestUiState(state) {
    window.BloomreachModules.autosuggest.setCurrentAutosuggestUiState(Object.assign(Object.assign({}, getCurrentAutosuggestUiState()), state));
  }
  /**
   * This examines all of the pieces to ensure after
   */
  function areRequirementsMet() {
    var _a;
    const config = buildAutosuggestConfig();
    const check = {
      account_id: config.account_id,
      domain_key: config.domain_key,
      searchInputElement: getAutosuggestSearchInputElement(),
      resultsContainer: getAutosuggestResultsContainerElement(),
      enabled: (_a = config === null || config === void 0 ? void 0 : config.autosuggest) === null || _a === void 0 ? void 0 : _a.enabled
    };
    log('Checking requirements', check);
    invariant(check.account_id, 'account_id must be set');
    invariant(check.domain_key, 'domain_key must be set');
    return check.enabled;
  }

  Debug('br:product-events');

  Debug('br:recommendations');

  debounce_1(event => {
    var _a;
    const inputValue = (((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) || '').trim();
    document.querySelectorAll('.blm-dynamic-filter').forEach(facetBox => {
      let displayedItems = 0;
      facetBox.querySelectorAll('.blm-product-search-filter-item').forEach(facetItem => {
        var _a;
        const label = ((_a = facetItem.querySelector('label')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        const shouldDisplay = !inputValue || label.toLowerCase().includes(inputValue.toLowerCase());
        const displayStyle = shouldDisplay ? 'block' : 'none';
        displayedItems += shouldDisplay ? 1 : 0;
        facetItem.style.display = displayStyle;
      });
      facetBox.style.display = displayedItems ? 'block' : 'none';
    });
    document.querySelectorAll('.blm-product-search-load-more').forEach(loadMoreLink => {
      loadMoreLink.style.display = 'none';
    });
    const groupsELement = getLoadMoreFacetGroupsElement();
    if (!groupsELement) return;
    groupsELement.style.display = 'none';
    if (!inputValue) {
      resetFacetGroups();
    }
  }, 500);

  Debug('br:search');
  function buildDefaultSearchRequestState(options) {
    const {
      isCategoryPage
    } = options;
    return {
      request_id: 0,
      price_range_max_value: 0,
      price_range_min_value: 0,
      is_first_request: true,
      is_category_page: isCategoryPage,
      category_to_load: '',
      pollIntervalId: void 0,
      currentElement: null
    };
  }
  /**
   * Attempts to get the search request state from the existing module
   */
  function getCurrentSearchRequestState() {
    var _a, _b, _c;
    return ((_c = ((_a = window.BloomreachModules) === null || _a === void 0 ? void 0 : _a.search) || ((_b = window.BloomreachModules) === null || _b === void 0 ? void 0 : _b.category)) === null || _c === void 0 ? void 0 : _c.getCurrentSearchRequestState()) || buildDefaultSearchRequestState({
      isCategoryPage: false
    });
  }

  const autosuggestModule = buildAutosuggestModule();
  window.BloomreachModules = Object.assign(Object.assign({}, globalBloomreachModules), {
    autosuggest: autosuggestModule
  });
  autosuggestModule.load().catch(console.error);

})();
//# sourceMappingURL=autosuggest.js.map
