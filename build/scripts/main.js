(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
module.exports = function(opts) {
  return new ElementClass(opts)
}

function indexOf(arr, prop) {
  if (arr.indexOf) return arr.indexOf(prop)
  for (var i = 0, len = arr.length; i < len; i++)
    if (arr[i] === prop) return i
  return -1
}

function ElementClass(opts) {
  if (!(this instanceof ElementClass)) return new ElementClass(opts)
  var self = this
  if (!opts) opts = {}

  // similar doing instanceof HTMLElement but works in IE8
  if (opts.nodeType) opts = {el: opts}

  this.opts = opts
  this.el = opts.el || document.body
  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
}

ElementClass.prototype.add = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return el.className = className
  var classes = el.className.split(' ')
  if (indexOf(classes, className) > -1) return classes
  classes.push(className)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.remove = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return
  var classes = el.className.split(' ')
  var idx = indexOf(classes, className)
  if (idx > -1) classes.splice(idx, 1)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.has = function(className) {
  var el = this.el
  if (!el) return
  var classes = el.className.split(' ')
  return indexOf(classes, className) > -1
}

ElementClass.prototype.toggle = function(className) {
  var el = this.el
  if (!el) return
  if (this.has(className)) this.remove(className)
  else this.add(className)
}

},{}],3:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function () {
			return ExecutionEnvironment;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());

},{}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":17}],5:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
"use strict";

var keyOf = function (oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;
},{}],6:[function(require,module,exports){
!(function() {
  function jss(blocks) {
    var css = [];
    for (var block in blocks)
      css.push(createStyleBlock(block, blocks[block]));
    injectCSS(css);
  }

  function createStyleBlock(selector, rules) {
    return selector + ' {\n' + parseRules(rules) + '\n}';
  }

  function parseRules(rules) {
    var css = [];
    for (var rule in rules)
      css.push('  '+rule+': '+rules[rule]+';');
    return css.join('\n');
  }

  function injectCSS(css) {
    var style = document.getElementById('jss-styles');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('id', 'jss-styles');
      var head = document.getElementsByTagName('head')[0];
      head.insertBefore(style, head.firstChild);
    }
    var node = document.createTextNode(css.join('\n\n'));
    style.appendChild(node);
  }

  if (typeof exports === 'object')
    module.exports = jss;
  else
    window.jss = jss;

})();


},{}],7:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"lodash._basecopy":8,"lodash.keys":15}],8:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],9:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],10:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":9,"lodash._isiterateecall":12,"lodash.restparam":16}],11:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],12:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],13:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

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
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;

},{}],14:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],15:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":11,"lodash.isarguments":13,"lodash.isarray":14}],16:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],17:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],18:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))

},{"./lib/ReactPropTypesSecret":22,"_process":17,"fbjs/lib/invariant":24,"fbjs/lib/warning":25}],19:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":22,"fbjs/lib/emptyFunction":23,"fbjs/lib/invariant":24}],20:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');
var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this,require('_process'))

},{"./checkPropTypes":18,"./lib/ReactPropTypesSecret":22,"_process":17,"fbjs/lib/emptyFunction":23,"fbjs/lib/invariant":24,"fbjs/lib/warning":25,"object-assign":26}],21:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this,require('_process'))

},{"./factoryWithThrowingShims":19,"./factoryWithTypeCheckers":20,"_process":17}],22:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],23:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],24:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":17}],25:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))

},{"./emptyFunction":23,"_process":17}],26:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],27:[function(require,module,exports){
module.exports = require('react/lib/update');
},{"react/lib/update":47}],28:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["Dropzone"] = factory(require("react"), require("prop-types"));
	else
		root["Dropzone"] = factory(root["react"], root["prop-types"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(3);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _attrAccept = __webpack_require__(4);
	
	var _attrAccept2 = _interopRequireDefault(_attrAccept);
	
	var _getDataTransferItems = __webpack_require__(5);
	
	var _getDataTransferItems2 = _interopRequireDefault(_getDataTransferItems);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint prefer-template: 0 */
	
	var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;
	
	function fileAccepted(file, accept) {
	  // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
	  // that MIME type will always be accepted
	  return file.type === 'application/x-moz-file' || (0, _attrAccept2.default)(file, accept);
	}
	
	var Dropzone = function (_React$Component) {
	  _inherits(Dropzone, _React$Component);
	
	  _createClass(Dropzone, null, [{
	    key: 'onDocumentDragOver',
	    value: function onDocumentDragOver(evt) {
	      // allow the entire document to be a drag target
	      evt.preventDefault();
	    }
	  }]);
	
	  function Dropzone(props, context) {
	    _classCallCheck(this, Dropzone);
	
	    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this, props, context));
	
	    _this.renderChildren = function (children, isDragActive, isDragReject) {
	      if (typeof children === 'function') {
	        return children(_extends({}, _this.state, { isDragActive: isDragActive, isDragReject: isDragReject }));
	      }
	      return children;
	    };
	
	    _this.onClick = _this.onClick.bind(_this);
	    _this.onDocumentDrop = _this.onDocumentDrop.bind(_this);
	    _this.onDragStart = _this.onDragStart.bind(_this);
	    _this.onDragEnter = _this.onDragEnter.bind(_this);
	    _this.onDragLeave = _this.onDragLeave.bind(_this);
	    _this.onDragOver = _this.onDragOver.bind(_this);
	    _this.onDrop = _this.onDrop.bind(_this);
	    _this.onFileDialogCancel = _this.onFileDialogCancel.bind(_this);
	    _this.setRef = _this.setRef.bind(_this);
	    _this.setRefs = _this.setRefs.bind(_this);
	    _this.onInputElementClick = _this.onInputElementClick.bind(_this);
	    _this.isFileDialogActive = false;
	    _this.state = {
	      draggedFiles: [],
	      acceptedFiles: [],
	      rejectedFiles: []
	    };
	    return _this;
	  }
	
	  _createClass(Dropzone, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var preventDropOnDocument = this.props.preventDropOnDocument;
	
	      this.dragTargets = [];
	
	      if (preventDropOnDocument) {
	        document.addEventListener('dragover', Dropzone.onDocumentDragOver, false);
	        document.addEventListener('drop', this.onDocumentDrop, false);
	      }
	      this.fileInputEl.addEventListener('click', this.onInputElementClick, false);
	      // Tried implementing addEventListener, but didn't work out
	      document.body.onfocus = this.onFileDialogCancel;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var preventDropOnDocument = this.props.preventDropOnDocument;
	
	      if (preventDropOnDocument) {
	        document.removeEventListener('dragover', Dropzone.onDocumentDragOver);
	        document.removeEventListener('drop', this.onDocumentDrop);
	      }
	      this.fileInputEl.removeEventListener('click', this.onInputElementClick, false);
	      // Can be replaced with removeEventListener, if addEventListener works
	      document.body.onfocus = null;
	    }
	  }, {
	    key: 'onDocumentDrop',
	    value: function onDocumentDrop(evt) {
	      if (this.node.contains(evt.target)) {
	        // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
	        return;
	      }
	      evt.preventDefault();
	      this.dragTargets = [];
	    }
	  }, {
	    key: 'onDragStart',
	    value: function onDragStart(evt) {
	      if (this.props.onDragStart) {
	        this.props.onDragStart.call(this, evt);
	      }
	    }
	  }, {
	    key: 'onDragEnter',
	    value: function onDragEnter(evt) {
	      evt.preventDefault();
	
	      // Count the dropzone and any children that are entered.
	      if (this.dragTargets.indexOf(evt.target) === -1) {
	        this.dragTargets.push(evt.target);
	      }
	
	      this.setState({ draggedFiles: (0, _getDataTransferItems2.default)(evt) });
	
	      if (this.props.onDragEnter) {
	        this.props.onDragEnter.call(this, evt);
	      }
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(evt) {
	      // eslint-disable-line class-methods-use-this
	      evt.preventDefault();
	      evt.stopPropagation();
	      try {
	        evt.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
	      } catch (err) {
	        // continue regardless of error
	      }
	
	      if (this.props.onDragOver) {
	        this.props.onDragOver.call(this, evt);
	      }
	      return false;
	    }
	  }, {
	    key: 'onDragLeave',
	    value: function onDragLeave(evt) {
	      var _this2 = this;
	
	      evt.preventDefault();
	
	      // Only deactivate once the dropzone and all children have been left.
	      this.dragTargets = this.dragTargets.filter(function (el) {
	        return el !== evt.target && _this2.node.contains(el);
	      });
	      if (this.dragTargets.length > 0) {
	        return;
	      }
	
	      // Clear dragging files state
	      this.setState({ draggedFiles: [] });
	
	      if (this.props.onDragLeave) {
	        this.props.onDragLeave.call(this, evt);
	      }
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(evt) {
	      var _this3 = this;
	
	      var _props = this.props,
	          onDrop = _props.onDrop,
	          onDropAccepted = _props.onDropAccepted,
	          onDropRejected = _props.onDropRejected,
	          multiple = _props.multiple,
	          disablePreview = _props.disablePreview,
	          accept = _props.accept;
	
	      var fileList = (0, _getDataTransferItems2.default)(evt);
	      var acceptedFiles = [];
	      var rejectedFiles = [];
	
	      // Stop default browser behavior
	      evt.preventDefault();
	
	      // Reset the counter along with the drag on a drop.
	      this.dragTargets = [];
	      this.isFileDialogActive = false;
	
	      fileList.forEach(function (file) {
	        if (!disablePreview) {
	          try {
	            file.preview = window.URL.createObjectURL(file); // eslint-disable-line no-param-reassign
	          } catch (err) {
	            if (process.env.NODE_ENV !== 'production') {
	              console.error('Failed to generate preview for file', file, err); // eslint-disable-line no-console
	            }
	          }
	        }
	
	        if (fileAccepted(file, accept) && _this3.fileMatchSize(file)) {
	          acceptedFiles.push(file);
	        } else {
	          rejectedFiles.push(file);
	        }
	      });
	
	      if (!multiple) {
	        // if not in multi mode add any extra accepted files to rejected.
	        // This will allow end users to easily ignore a multi file drop in "single" mode.
	        rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(1)));
	      }
	
	      if (onDrop) {
	        onDrop.call(this, acceptedFiles, rejectedFiles, evt);
	      }
	
	      if (rejectedFiles.length > 0 && onDropRejected) {
	        onDropRejected.call(this, rejectedFiles, evt);
	      }
	
	      if (acceptedFiles.length > 0 && onDropAccepted) {
	        onDropAccepted.call(this, acceptedFiles, evt);
	      }
	
	      // Clear files value
	      this.draggedFiles = null;
	
	      // Reset drag state
	      this.setState({
	        draggedFiles: [],
	        acceptedFiles: acceptedFiles,
	        rejectedFiles: rejectedFiles
	      });
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(evt) {
	      var _props2 = this.props,
	          onClick = _props2.onClick,
	          disableClick = _props2.disableClick;
	
	      if (!disableClick) {
	        evt.stopPropagation();
	
	        if (onClick) {
	          onClick.call(this, evt);
	        }
	
	        // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
	        // this is so react can handle state changes in the onClick prop above above
	        // see: https://github.com/okonet/react-dropzone/issues/450
	        setTimeout(this.open.bind(this), 0);
	      }
	    }
	  }, {
	    key: 'onInputElementClick',
	    value: function onInputElementClick(evt) {
	      evt.stopPropagation();
	      if (this.props.inputProps && this.props.inputProps.onClick) {
	        this.props.inputProps.onClick();
	      }
	    }
	  }, {
	    key: 'onFileDialogCancel',
	    value: function onFileDialogCancel() {
	      // timeout will not recognize context of this method
	      var onFileDialogCancel = this.props.onFileDialogCancel;
	      var fileInputEl = this.fileInputEl;
	      var isFileDialogActive = this.isFileDialogActive;
	      // execute the timeout only if the onFileDialogCancel is defined and FileDialog
	      // is opened in the browser
	
	      if (onFileDialogCancel && isFileDialogActive) {
	        setTimeout(function () {
	          // Returns an object as FileList
	          var FileList = fileInputEl.files;
	          if (!FileList.length) {
	            isFileDialogActive = false;
	            onFileDialogCancel();
	          }
	        }, 300);
	      }
	    }
	  }, {
	    key: 'setRef',
	    value: function setRef(ref) {
	      this.node = ref;
	    }
	  }, {
	    key: 'setRefs',
	    value: function setRefs(ref) {
	      this.fileInputEl = ref;
	    }
	  }, {
	    key: 'fileMatchSize',
	    value: function fileMatchSize(file) {
	      return file.size <= this.props.maxSize && file.size >= this.props.minSize;
	    }
	  }, {
	    key: 'allFilesAccepted',
	    value: function allFilesAccepted(files) {
	      var _this4 = this;
	
	      return files.every(function (file) {
	        return fileAccepted(file, _this4.props.accept);
	      });
	    }
	
	    /**
	     * Open system file upload dialog.
	     *
	     * @public
	     */
	
	  }, {
	    key: 'open',
	    value: function open() {
	      this.isFileDialogActive = true;
	      this.fileInputEl.value = null;
	      this.fileInputEl.click();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props,
	          accept = _props3.accept,
	          activeClassName = _props3.activeClassName,
	          inputProps = _props3.inputProps,
	          multiple = _props3.multiple,
	          name = _props3.name,
	          rejectClassName = _props3.rejectClassName,
	          children = _props3.children,
	          rest = _objectWithoutProperties(_props3, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName', 'children']);
	
	      var activeStyle = rest.activeStyle,
	          className = rest.className,
	          rejectStyle = rest.rejectStyle,
	          style = rest.style,
	          props = _objectWithoutProperties(rest, ['activeStyle', 'className', 'rejectStyle', 'style']);
	
	      var draggedFiles = this.state.draggedFiles;
	
	      var filesCount = draggedFiles.length;
	      var isMultipleAllowed = multiple || filesCount <= 1;
	      var isDragActive = filesCount > 0 && this.allFilesAccepted(draggedFiles);
	      var isDragReject = filesCount > 0 && (!isDragActive || !isMultipleAllowed);
	
	      className = className || '';
	
	      if (isDragActive && activeClassName) {
	        className += ' ' + activeClassName;
	      }
	      if (isDragReject && rejectClassName) {
	        className += ' ' + rejectClassName;
	      }
	
	      if (!className && !style && !activeStyle && !rejectStyle) {
	        style = {
	          width: 200,
	          height: 200,
	          borderWidth: 2,
	          borderColor: '#666',
	          borderStyle: 'dashed',
	          borderRadius: 5
	        };
	        activeStyle = {
	          borderStyle: 'solid',
	          borderColor: '#6c6',
	          backgroundColor: '#eee'
	        };
	        rejectStyle = {
	          borderStyle: 'solid',
	          borderColor: '#c66',
	          backgroundColor: '#eee'
	        };
	      }
	
	      var appliedStyle = void 0;
	      if (activeStyle && isDragActive) {
	        appliedStyle = _extends({}, style, activeStyle);
	      } else if (rejectStyle && isDragReject) {
	        appliedStyle = _extends({}, style, rejectStyle);
	      } else {
	        appliedStyle = _extends({}, style);
	      }
	
	      var inputAttributes = {
	        accept: accept,
	        type: 'file',
	        style: { display: 'none' },
	        multiple: supportMultiple && multiple,
	        ref: this.setRefs,
	        onChange: this.onDrop
	      };
	
	      if (name && name.length) {
	        inputAttributes.name = name;
	      }
	
	      // Remove custom properties before passing them to the wrapper div element
	      var customProps = ['acceptedFiles', 'preventDropOnDocument', 'disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected', 'onFileDialogCancel', 'maxSize', 'minSize'];
	      var divProps = _extends({}, props);
	      customProps.forEach(function (prop) {
	        return delete divProps[prop];
	      });
	
	      return _react2.default.createElement(
	        'div',
	        _extends({
	          className: className,
	          style: appliedStyle
	        }, divProps /* expand user provided props first so event handlers are never overridden */, {
	          onClick: this.onClick,
	          onDragStart: this.onDragStart,
	          onDragEnter: this.onDragEnter,
	          onDragOver: this.onDragOver,
	          onDragLeave: this.onDragLeave,
	          onDrop: this.onDrop,
	          ref: this.setRef
	        }),
	        this.renderChildren(children, isDragActive, isDragReject),
	        _react2.default.createElement('input', _extends({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes))
	      );
	    }
	  }]);
	
	  return Dropzone;
	}(_react2.default.Component);
	
	Dropzone.propTypes = {
	  /**
	   * Allow specific types of files. See https://github.com/okonet/attr-accept for more information.
	   * Keep in mind that mime type determination is not reliable accross platforms. CSV files,
	   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
	   * Windows. In some cases there might not be a mime type set at all.
	   * See: https://github.com/okonet/react-dropzone/issues/276
	   */
	  accept: _propTypes2.default.string,
	
	  /**
	   * Contents of the dropzone
	   */
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
	
	  /**
	   * Disallow clicking on the dropzone container to open file dialog
	   */
	  disableClick: _propTypes2.default.bool,
	
	  /**
	   * Enable/disable preview generation
	   */
	  disablePreview: _propTypes2.default.bool,
	
	  /**
	   * If false, allow dropped items to take over the current browser window
	   */
	  preventDropOnDocument: _propTypes2.default.bool,
	
	  /**
	   * Pass additional attributes to the `<input type="file"/>` tag
	   */
	  inputProps: _propTypes2.default.object,
	
	  /**
	   * Allow dropping multiple files
	   */
	  multiple: _propTypes2.default.bool,
	
	  /**
	   * `name` attribute for the input tag
	   */
	  name: _propTypes2.default.string,
	
	  /**
	   * Maximum file size
	   */
	  maxSize: _propTypes2.default.number,
	
	  /**
	   * Minimum file size
	   */
	  minSize: _propTypes2.default.number,
	
	  /**
	   * className
	   */
	  className: _propTypes2.default.string,
	
	  /**
	   * className for accepted state
	   */
	  activeClassName: _propTypes2.default.string,
	
	  /**
	   * className for rejected state
	   */
	  rejectClassName: _propTypes2.default.string,
	
	  /**
	   * CSS styles to apply
	   */
	  style: _propTypes2.default.object,
	
	  /**
	   * CSS styles to apply when drop will be accepted
	   */
	  activeStyle: _propTypes2.default.object,
	
	  /**
	   * CSS styles to apply when drop will be rejected
	   */
	  rejectStyle: _propTypes2.default.object,
	
	  /**
	   * onClick callback
	   * @param {Event} event
	   */
	  onClick: _propTypes2.default.func,
	
	  /**
	   * onDrop callback
	   */
	  onDrop: _propTypes2.default.func,
	
	  /**
	   * onDropAccepted callback
	   */
	  onDropAccepted: _propTypes2.default.func,
	
	  /**
	   * onDropRejected callback
	   */
	  onDropRejected: _propTypes2.default.func,
	
	  /**
	   * onDragStart callback
	   */
	  onDragStart: _propTypes2.default.func,
	
	  /**
	   * onDragEnter callback
	   */
	  onDragEnter: _propTypes2.default.func,
	
	  /**
	   * onDragOver callback
	   */
	  onDragOver: _propTypes2.default.func,
	
	  /**
	   * onDragLeave callback
	   */
	  onDragLeave: _propTypes2.default.func,
	
	  /**
	   * Provide a callback on clicking the cancel button of the file dialog
	   */
	  onFileDialogCancel: _propTypes2.default.func
	};
	
	Dropzone.defaultProps = {
	  preventDropOnDocument: true,
	  disablePreview: false,
	  disableClick: false,
	  multiple: true,
	  maxSize: Infinity,
	  minSize: 0
	};
	
	exports.default = Dropzone;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=Array.isArray(n)?n:n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,y,d=t&s.G,h=t&s.P,v=d?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=d?o:o[n]||(o[n]={});d&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],y=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,y),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getDataTransferFiles;
	function getDataTransferFiles(event) {
	  var dataTransferItemsList = [];
	  if (event.dataTransfer) {
	    var dt = event.dataTransfer;
	    if (dt.files && dt.files.length) {
	      dataTransferItemsList = dt.files;
	    } else if (dt.items && dt.items.length) {
	      // During the drag even the dataTransfer.files is null
	      // but Chrome implements some drag store, which is accesible via dataTransfer.items
	      dataTransferItemsList = dt.items;
	    }
	  } else if (event.target && event.target.files) {
	    dataTransferItemsList = event.target.files;
	  }
	  // Convert from DataTransferItemsList to the native Array
	  return Array.prototype.slice.call(dataTransferItemsList);
	}
	module.exports = exports["default"];

/***/ })
/******/ ])
});
;

},{"prop-types":21,"react":"react"}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PropTypes = _react2['default'].PropTypes;
var span = _react2['default'].DOM.span;

var Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

var ImageLoader = (function (_React$Component) {
  function ImageLoader(props) {
    _classCallCheck(this, ImageLoader);

    _get(Object.getPrototypeOf(ImageLoader.prototype), 'constructor', this).call(this, props);
    this.state = { status: props.src ? Status.LOADING : Status.PENDING };
  }

  _inherits(ImageLoader, _React$Component);

  _createClass(ImageLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.status === Status.LOADING) {
        this.createLoader();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.setState({
          status: nextProps.src ? Status.LOADING : Status.PENDING
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.status === Status.LOADING && !this.img) {
        this.createLoader();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyLoader();
    }
  }, {
    key: 'getClassName',
    value: function getClassName() {
      var className = 'imageloader ' + this.state.status;
      if (this.props.className) className = '' + className + ' ' + this.props.className;
      return className;
    }
  }, {
    key: 'createLoader',
    value: function createLoader() {
      this.destroyLoader(); // We can only have one loader at a time.

      this.img = new Image();
      this.img.onload = this.handleLoad.bind(this);
      this.img.onerror = this.handleError.bind(this);
      this.img.src = this.props.src;
    }
  }, {
    key: 'destroyLoader',
    value: function destroyLoader() {
      if (this.img) {
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
    }
  }, {
    key: 'handleLoad',
    value: function handleLoad(event) {
      this.destroyLoader();
      this.setState({ status: Status.LOADED });

      if (this.props.onLoad) this.props.onLoad(event);
    }
  }, {
    key: 'handleError',
    value: function handleError(error) {
      this.destroyLoader();
      this.setState({ status: Status.FAILED });

      if (this.props.onError) this.props.onError(error);
    }
  }, {
    key: 'renderImg',
    value: function renderImg() {
      var _props2 = this.props;
      var src = _props2.src;
      var imgProps = _props2.imgProps;

      var props = { src: src };

      for (var k in imgProps) {
        if (imgProps.hasOwnProperty(k)) {
          props[k] = imgProps[k];
        }
      }

      return _react2['default'].createElement('img', props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props;

      var wrapperProps = {
        className: this.getClassName()
      };

      if (this.props.style) {
        wrapperProps.style = this.props.style;
      }

      var wrapperArgs = [wrapperProps];

      switch (this.state.status) {
        case Status.LOADED:
          wrapperArgs.push(this.renderImg());
          break;

        case Status.FAILED:
          if (this.props.children) wrapperArgs.push(this.props.children);
          break;

        default:
          if (this.props.preloader) wrapperArgs.push(this.props.preloader());
          break;
      }

      return (_props = this.props).wrapper.apply(_props, wrapperArgs);
    }
  }], [{
    key: 'propTypes',
    value: {
      wrapper: PropTypes.func,
      className: PropTypes.string,
      style: PropTypes.object,
      preloader: PropTypes.func,
      src: PropTypes.string,
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      imgProps: PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      wrapper: span
    },
    enumerable: true
  }]);

  return ImageLoader;
})(_react2['default'].Component);

exports['default'] = ImageLoader;
module.exports = exports['default'];
},{"react":"react"}],30:[function(require,module,exports){
(function (process){
var React = require('react');
var ReactDOM = require('react-dom');
var ExecutionEnvironment = require('exenv');
var ModalPortal = React.createFactory(require('./ModalPortal'));
var ariaAppHider = require('../helpers/ariaAppHider');
var elementClass = require('element-class');
var renderSubtreeIntoContainer = require("react-dom").unstable_renderSubtreeIntoContainer;

var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};

var Modal = module.exports = React.createClass({

  displayName: 'Modal',
  statics: {
    setAppElement: ariaAppHider.setElement,
    injectCSS: function() {
      "production" !== process.env.NODE_ENV
        && console.warn('React-Modal: injectCSS has been deprecated ' +
                        'and no longer has any effect. It will be removed in a later version');
    }
  },

  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    style: React.PropTypes.shape({
      content: React.PropTypes.object,
      overlay: React.PropTypes.object
    }),
    appElement: React.PropTypes.instanceOf(SafeHTMLElement),
    onRequestClose: React.PropTypes.func,
    closeTimeoutMS: React.PropTypes.number,
    ariaHideApp: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      isOpen: false,
      ariaHideApp: true,
      closeTimeoutMS: 0
    };
  },

  componentDidMount: function() {
    this.node = document.createElement('div');
    this.node.className = 'ReactModalPortal';
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
  },

  componentWillReceiveProps: function(newProps) {
    this.renderPortal(newProps);
  },

  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  },

  renderPortal: function(props) {
    if (props.isOpen) {
      elementClass(document.body).add('ReactModal__Body--open');
    } else {
      elementClass(document.body).remove('ReactModal__Body--open');
    }

    if (props.ariaHideApp) {
      ariaAppHider.toggle(props.isOpen, props.appElement);
    }
    sanitizeProps(props);
    this.portal = renderSubtreeIntoContainer(this, ModalPortal(props), this.node);
  },

  render: function () {
    return React.DOM.noscript();
  }
});

function sanitizeProps(props) {
  delete props.ref;
}

}).call(this,require('_process'))

},{"../helpers/ariaAppHider":32,"./ModalPortal":31,"_process":17,"element-class":2,"exenv":3,"react":"react","react-dom":"react-dom"}],31:[function(require,module,exports){
var React = require('react');
var div = React.DOM.div;
var focusManager = require('../helpers/focusManager');
var scopeTab = require('../helpers/scopeTab');
var Assign = require('lodash.assign');


// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: {
    base: 'ReactModal__Overlay',
    afterOpen: 'ReactModal__Overlay--after-open',
    beforeClose: 'ReactModal__Overlay--before-close'
  },
  content: {
    base: 'ReactModal__Content',
    afterOpen: 'ReactModal__Content--after-open',
    beforeClose: 'ReactModal__Content--before-close'
  }
};

var defaultStyles = {
  overlay: {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position                : 'absolute',
    top                     : '40px',
    left                    : '40px',
    right                   : '40px',
    bottom                  : '40px',
    border                  : '1px solid #ccc',
    background              : '#fff',
    overflow                : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius            : '4px',
    outline                 : 'none',
    padding                 : '20px'
  }
};

function stopPropagation(event) {
  event.stopPropagation();
}

var ModalPortal = module.exports = React.createClass({

  displayName: 'ModalPortal',

  getDefaultProps: function() {
    return {
      style: {
        overlay: {},
        content: {}
      }
    };
  },

  getInitialState: function() {
    return {
      afterOpen: false,
      beforeClose: false
    };
  },

  componentDidMount: function() {
    // Focus needs to be set when mounting and already open
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.closeTimer);
  },

  componentWillReceiveProps: function(newProps) {
    // Focus only needs to be set once when the modal is being opened
    if (!this.props.isOpen && newProps.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  },

  componentDidUpdate: function () {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(false);
    }
  },

  setFocusAfterRender: function (focus) {
    this.focusAfterRender = focus;
  },

  open: function() {
    focusManager.setupScopedFocus(this.node);
    focusManager.markForFocusLater();
    this.setState({isOpen: true}, function() {
      this.setState({afterOpen: true});
    }.bind(this));
  },

  close: function() {
    if (!this.ownerHandlesClose())
      return;
    if (this.props.closeTimeoutMS > 0)
      this.closeWithTimeout();
    else
      this.closeWithoutTimeout();
  },

  focusContent: function() {
    this.refs.content.focus();
  },

  closeWithTimeout: function() {
    this.setState({beforeClose: true}, function() {
      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
    }.bind(this));
  },

  closeWithoutTimeout: function() {
    this.setState({
      afterOpen: false,
      beforeClose: false
    }, this.afterClose);
  },

  afterClose: function() {
    focusManager.returnFocus();
    focusManager.teardownScopedFocus();
  },

  handleKeyDown: function(event) {
    if (event.keyCode == 9 /*tab*/) scopeTab(this.refs.content, event);
    if (event.keyCode == 27 /*esc*/) this.requestClose();
  },

  handleOverlayClick: function() {
    if (this.ownerHandlesClose())
      this.requestClose();
    else
      this.focusContent();
  },

  requestClose: function() {
    if (this.ownerHandlesClose())
      this.props.onRequestClose();
  },

  ownerHandlesClose: function() {
    return this.props.onRequestClose;
  },

  shouldBeClosed: function() {
    return !this.props.isOpen && !this.state.beforeClose;
  },

  buildClassName: function(which, additional) {
    var className = CLASS_NAMES[which].base;
    if (this.state.afterOpen)
      className += ' '+CLASS_NAMES[which].afterOpen;
    if (this.state.beforeClose)
      className += ' '+CLASS_NAMES[which].beforeClose;
    return additional ? className + ' ' + additional : className;
  },

  render: function() {
    return this.shouldBeClosed() ? div() : (
      div({
        ref: "overlay",
        className: this.buildClassName('overlay', this.props.overlayClassName),
        style: Assign({}, defaultStyles.overlay, this.props.style.overlay || {}),
        onClick: this.handleOverlayClick
      },
        div({
          ref: "content",
          style: Assign({}, defaultStyles.content, this.props.style.content || {}),
          className: this.buildClassName('content', this.props.className),
          tabIndex: "-1",
          onClick: stopPropagation,
          onKeyDown: this.handleKeyDown
        },
          this.props.children
        )
      )
    );
  }
});

},{"../helpers/focusManager":33,"../helpers/scopeTab":34,"lodash.assign":37,"react":"react"}],32:[function(require,module,exports){
var _element = typeof document !== 'undefined' ? document.body : null;

function setElement(element) {
  if (typeof element === 'string') {
    var el = document.querySelectorAll(element);
    element = 'length' in el ? el[0] : el;
  }
  _element = element || _element;
}

function hide(appElement) {
  validateElement(appElement);
  (appElement || _element).setAttribute('aria-hidden', 'true');
}

function show(appElement) {
  validateElement(appElement);
  (appElement || _element).removeAttribute('aria-hidden');
}

function toggle(shouldHide, appElement) {
  if (shouldHide)
    hide(appElement);
  else
    show(appElement);
}

function validateElement(appElement) {
  if (!appElement && !_element)
    throw new Error('react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible');
}

function resetForTesting() {
  _element = document.body;
}

exports.toggle = toggle;
exports.setElement = setElement;
exports.show = show;
exports.hide = hide;
exports.resetForTesting = resetForTesting;

},{}],33:[function(require,module,exports){
var findTabbable = require('../helpers/tabbable');
var modalElement = null;
var focusLaterElement = null;
var needToFocus = false;

function handleBlur(event) {
  needToFocus = true;
}

function handleFocus(event) {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation 
    // is that the document.body gets focus, and then we focus our element right 
    // after, seems fine.
    setTimeout(function() {
      if (modalElement.contains(document.activeElement))
        return;
      var el = (findTabbable(modalElement)[0] || modalElement);
      el.focus();
    }, 0);
  }
}

exports.markForFocusLater = function() {
  focusLaterElement = document.activeElement;
};

exports.returnFocus = function() {
  try {
    focusLaterElement.focus();
  }
  catch (e) {
    console.warn('You tried to return focus to '+focusLaterElement+' but it is not in the DOM anymore');
  }
  focusLaterElement = null;
};

exports.setupScopedFocus = function(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener('blur', handleBlur, false);
    document.addEventListener('focus', handleFocus, true);
  } else {
    window.attachEvent('onBlur', handleBlur);
    document.attachEvent('onFocus', handleFocus);
  }
};

exports.teardownScopedFocus = function() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener('blur', handleBlur);
    document.removeEventListener('focus', handleFocus);
  } else {
    window.detachEvent('onBlur', handleBlur);
    document.detachEvent('onFocus', handleFocus);
  }
};



},{"../helpers/tabbable":35}],34:[function(require,module,exports){
var findTabbable = require('../helpers/tabbable');

module.exports = function(node, event) {
  var tabbable = findTabbable(node);
  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  var leavingFinalTabbable = (
    finalTabbable === document.activeElement ||
    // handle immediate shift+tab after opening with mouse
    node === document.activeElement
  );
  if (!leavingFinalTabbable) return;
  event.preventDefault();
  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  target.focus();
};

},{"../helpers/tabbable":35}],35:[function(require,module,exports){
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  return (/input|select|textarea|button|object/.test(nodeName) ?
    !element.disabled :
    "a" === nodeName ?
      element.href || isTabIndexNotNaN :
      isTabIndexNotNaN) && visible(element);
}

function hidden(el) {
  return (el.offsetWidth <= 0 && el.offsetHeight <= 0) ||
    el.style.display === 'none';
}

function visible(element) {
  while (element) {
    if (element === document.body) break;
    if (hidden(element)) return false;
    element = element.parentNode;
  }
  return true;
}

function tabbable(element) {
  var tabIndex = element.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(function(el) {
    return tabbable(el);
  });
}

module.exports = findTabbableDescendants;


},{}],36:[function(require,module,exports){
module.exports = require('./components/Modal');


},{"./components/Modal":30}],37:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAssign = require('lodash._baseassign'),
    createAssigner = require('lodash._createassigner'),
    keys = require('lodash.keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"lodash._baseassign":7,"lodash._createassigner":10,"lodash.keys":15}],38:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function syncNodeAttributes(node, props) {
  if (props.selected) {
    node.setAttribute('tabindex', 0);
    node.setAttribute('selected', 'selected');
    if (props.focus) {
      node.focus();
    }
  } else {
    node.removeAttribute('tabindex');
    node.removeAttribute('selected');
  }
}

module.exports = _react2.default.createClass({
  displayName: 'Tab',

  propTypes: {
    className: _react.PropTypes.string,
    id: _react.PropTypes.string,
    selected: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    panelId: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      focus: false,
      selected: false,
      id: null,
      panelId: null
    };
  },
  componentDidMount: function componentDidMount() {
    syncNodeAttributes((0, _reactDom.findDOMNode)(this), this.props);
  },
  componentDidUpdate: function componentDidUpdate() {
    syncNodeAttributes((0, _reactDom.findDOMNode)(this), this.props);
  },
  render: function render() {
    return _react2.default.createElement(
      'li',
      {
        className: (0, _classnames2.default)('ReactTabs__Tab', this.props.className, {
          'ReactTabs__Tab--selected': this.props.selected,
          'ReactTabs__Tab--disabled': this.props.disabled
        }),
        role: 'tab',
        id: this.props.id,
        'aria-selected': this.props.selected ? 'true' : 'false',
        'aria-expanded': this.props.selected ? 'true' : 'false',
        'aria-disabled': this.props.disabled ? 'true' : 'false',
        'aria-controls': this.props.panelId
      },
      this.props.children
    );
  }
});
},{"classnames":1,"react":"react","react-dom":"react-dom"}],39:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'TabList',

  propTypes: {
    className: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])
  },

  render: function render() {
    return _react2.default.createElement(
      'ul',
      {
        className: (0, _classnames2.default)('ReactTabs__TabList', this.props.className),
        role: 'tablist'
      },
      this.props.children
    );
  }
});
},{"classnames":1,"react":"react"}],40:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
  displayName: 'TabPanel',

  propTypes: {
    className: _react.PropTypes.string,
    selected: _react.PropTypes.bool,
    id: _react.PropTypes.string,
    tabId: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
  },

  contextTypes: {
    forceRenderTabPanel: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selected: false,
      id: null,
      tabId: null
    };
  },
  render: function render() {
    var children = this.context.forceRenderTabPanel || this.props.selected ? this.props.children : null;

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('ReactTabs__TabPanel', this.props.className, {
          'ReactTabs__TabPanel--selected': this.props.selected
        }),
        role: 'tabpanel',
        id: this.props.id,
        'aria-labelledby': this.props.tabId,
        style: { display: this.props.selected ? null : 'none' }
      },
      children
    );
  }
});
},{"classnames":1,"react":"react"}],41:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jsStylesheet = require('js-stylesheet');

var _jsStylesheet2 = _interopRequireDefault(_jsStylesheet);

var _uuid = require('../helpers/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _childrenPropType = require('../helpers/childrenPropType');

var _childrenPropType2 = _interopRequireDefault(_childrenPropType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

var useDefaultStyles = true;

module.exports = _react2.default.createClass({
  displayName: 'Tabs',

  propTypes: {
    className: _react.PropTypes.string,
    selectedIndex: _react.PropTypes.number,
    onSelect: _react.PropTypes.func,
    focus: _react.PropTypes.bool,
    children: _childrenPropType2.default,
    forceRenderTabPanel: _react.PropTypes.bool
  },

  childContextTypes: {
    forceRenderTabPanel: _react.PropTypes.bool
  },

  statics: {
    setUseDefaultStyles: function setUseDefaultStyles(use) {
      useDefaultStyles = use;
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selectedIndex: -1,
      focus: false,
      forceRenderTabPanel: false
    };
  },
  getInitialState: function getInitialState() {
    return this.copyPropsToState(this.props);
  },
  getChildContext: function getChildContext() {
    return {
      forceRenderTabPanel: this.props.forceRenderTabPanel
    };
  },
  componentDidMount: function componentDidMount() {
    if (useDefaultStyles) {
      (0, _jsStylesheet2.default)(require('../helpers/styles.js')); // eslint-disable-line global-require
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState(this.copyPropsToState(newProps));
  },
  setSelected: function setSelected(index, focus) {
    // Don't do anything if nothing has changed
    if (index === this.state.selectedIndex) return;
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Keep reference to last index for event handler
    var last = this.state.selectedIndex;

    // Update selected index
    this.setState({ selectedIndex: index, focus: focus === true });

    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(index, last);
    }
  },
  getNextTab: function getNextTab(index) {
    var count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (var i = index + 1; i < count; i++) {
      var tab = this.getTab(i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (var _i = 0; _i < index; _i++) {
      var _tab = this.getTab(_i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab))) {
        return _i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },
  getPrevTab: function getPrevTab(index) {
    var i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      var tab = this.getTab(i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      var _tab2 = this.getTab(i);
      if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab2))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },
  getTabsCount: function getTabsCount() {
    return this.props.children && this.props.children[0] ? _react2.default.Children.count(this.props.children[0].props.children) : 0;
  },
  getPanelsCount: function getPanelsCount() {
    return _react2.default.Children.count(this.props.children.slice(1));
  },
  getTabList: function getTabList() {
    return this.refs.tablist;
  },
  getTab: function getTab(index) {
    return this.refs['tabs-' + index];
  },
  getPanel: function getPanel(index) {
    return this.refs['panels-' + index];
  },
  getChildren: function getChildren() {
    var index = 0;
    var count = 0;
    var children = this.props.children;
    var state = this.state;
    var tabIds = this.tabIds = this.tabIds || [];
    var panelIds = this.panelIds = this.panelIds || [];
    var diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      tabIds.push((0, _uuid2.default)());
      panelIds.push((0, _uuid2.default)());
    }

    // Map children to dynamically setup refs
    return _react2.default.Children.map(children, function (child) {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/rackt/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      var result = null;

      // Clone TabList and Tab components to have refs
      if (count++ === 0) {
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = (0, _react.cloneElement)(child, {
          ref: 'tablist',
          children: _react2.default.Children.map(child.props.children, function (tab) {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/rackt/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            var ref = 'tabs-' + index;
            var id = tabIds[index];
            var panelId = panelIds[index];
            var selected = state.selectedIndex === index;
            var focus = selected && state.focus;

            index++;

            return (0, _react.cloneElement)(tab, {
              ref: ref,
              id: id,
              panelId: panelId,
              selected: selected,
              focus: focus
            });
          })
        });

        // Reset index for panels
        index = 0;
      }
      // Clone TabPanel components to have refs
      else {
          var ref = 'panels-' + index;
          var id = panelIds[index];
          var tabId = tabIds[index];
          var selected = state.selectedIndex === index;

          index++;

          result = (0, _react.cloneElement)(child, {
            ref: ref,
            id: id,
            tabId: tabId,
            selected: selected
          });
        }

      return result;
    });
  },
  handleKeyDown: function handleKeyDown(e) {
    if (isTabNode(e.target)) {
      var index = this.state.selectedIndex;
      var preventDefault = false;

      // Select next tab to the left
      if (e.keyCode === 37 || e.keyCode === 38) {
        index = this.getPrevTab(index);
        preventDefault = true;
      }
      // Select next tab to the right
      /* eslint brace-style:0 */
      else if (e.keyCode === 39 || e.keyCode === 40) {
          index = this.getNextTab(index);
          preventDefault = true;
        }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
      }

      this.setSelected(index, true);
    }
  },
  handleClick: function handleClick(e) {
    var node = e.target;
    do {
      // eslint-disable-line no-cond-assign
      if (isTabNode(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        var index = [].slice.call(node.parentNode.children).indexOf(node);
        this.setSelected(index);
        return;
      }
    } while ((node = node.parentNode) !== null);
  },


  // This is an anti-pattern, so sue me
  copyPropsToState: function copyPropsToState(props) {
    var selectedIndex = props.selectedIndex;

    // If no selectedIndex prop was supplied, then try
    // preserving the existing selectedIndex from state.
    // If the state has not selectedIndex, default
    // to the first tab in the TabList.
    //
    // TODO: Need automation testing around this
    // Manual testing can be done using examples/focus
    // See 'should preserve selectedIndex when typing' in specs/Tabs.spec.js
    if (selectedIndex === -1) {
      if (this.state && this.state.selectedIndex) {
        selectedIndex = this.state.selectedIndex;
      } else {
        selectedIndex = 0;
      }
    }

    return {
      selectedIndex: selectedIndex,
      focus: props.focus
    };
  },
  render: function render() {
    var _this = this;

    // This fixes an issue with focus management.
    //
    // Ultimately, when focus is true, and an input has focus,
    // and any change on that input causes a state change/re-render,
    // focus gets sent back to the active tab, and input loses focus.
    //
    // Since the focus state only needs to be remembered
    // for the current render, we can reset it once the
    // render has happened.
    //
    // Don't use setState, because we don't want to re-render.
    //
    // See https://github.com/rackt/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(function () {
        _this.state.focus = false;
      }, 0);
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('ReactTabs', 'react-tabs', this.props.className),
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown
      },
      this.getChildren()
    );
  }
});
},{"../helpers/childrenPropType":42,"../helpers/styles.js":43,"../helpers/uuid":44,"classnames":1,"js-stylesheet":6,"react":"react","react-dom":"react-dom"}],42:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tab = require('../components/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabList = require('../components/TabList');

var _TabList2 = _interopRequireDefault(_TabList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function childrenPropTypes(props, propName) {
  var error = void 0;
  var tabsCount = 0;
  var panelsCount = 0;
  var children = props[propName];

  _react2.default.Children.forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/rackt/react-tabs/issues/37
    if (child === null) {
      return;
    }

    if (child.type === _TabList2.default) {
      _react2.default.Children.forEach(child.props.children, function (c) {
        // null happens when conditionally rendering TabPanel/Tab
        // see https://github.com/rackt/react-tabs/issues/37
        if (c === null) {
          return;
        }

        if (c.type === _Tab2.default) {
          tabsCount++;
        } else {
          error = new Error('Expected \'Tab\' but found \'' + (c.type.displayName || c.type) + '\'');
        }
      });
    } else if (child.type.displayName === 'TabPanel') {
      panelsCount++;
    } else {
      error = new Error('Expected \'TabList\' or \'TabPanel\' but found \'' + (child.type.displayName || child.type) + '\'');
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error("There should be an equal number of 'Tabs' and 'TabPanels'." + ('Received ' + tabsCount + ' \'Tabs\' and ' + panelsCount + ' \'TabPanels\'.'));
  }

  return error;
};
},{"../components/Tab":38,"../components/TabList":39,"react":"react"}],43:[function(require,module,exports){
'use strict';

module.exports = {
  '.react-tabs [role=tablist]': {
    'border-bottom': '1px solid #aaa',
    margin: '0 0 10px',
    padding: '0'
  },

  '.react-tabs [role=tab]': {
    display: 'inline-block',
    border: '1px solid transparent',
    'border-bottom': 'none',
    bottom: '-1px',
    position: 'relative',
    'list-style': 'none',
    padding: '6px 12px',
    cursor: 'pointer'
  },

  '.react-tabs [role=tab][aria-selected=true]': {
    background: '#fff',
    'border-color': '#aaa',
    color: 'black',
    'border-radius': '5px 5px 0 0',
    '-moz-border-radius': '5px 5px 0 0',
    '-webkit-border-radius': '5px 5px 0 0'
  },

  '.react-tabs [role=tab][aria-disabled=true]': {
    color: 'GrayText',
    cursor: 'default'
  },

  '.react-tabs [role=tab]:focus': {
    'box-shadow': '0 0 5px hsl(208, 99%, 50%)',
    'border-color': 'hsl(208, 99%, 50%)',
    outline: 'none'
  },

  '.react-tabs [role=tab]:focus:after': {
    content: '""',
    position: 'absolute',
    height: '5px',
    left: '-4px',
    right: '-4px',
    bottom: '-5px',
    background: '#fff'
  }
};
},{}],44:[function(require,module,exports){
"use strict";

// Get a universally unique identifier
var count = 0;
module.exports = function uuid() {
  return "react-tabs-" + count++;
};
},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPanel = exports.Tab = exports.TabList = exports.Tabs = undefined;

var _Tabs = require('./components/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabList = require('./components/TabList');

var _TabList2 = _interopRequireDefault(_TabList);

var _Tab = require('./components/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabPanel = require('./components/TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tabs =

// For bc we also export a default object, remove in 1.0
_Tabs2.default;
exports.TabList = _TabList2.default;
exports.Tab = _Tab2.default;
exports.TabPanel = _TabPanel2.default;
exports.default = {
  Tabs: _Tabs2.default,
  TabList: _TabList2.default,
  Tab: _Tab2.default,
  TabPanel: _TabPanel2.default
};
},{"./components/Tab":38,"./components/TabList":39,"./components/TabPanel":40,"./components/Tabs":41}],46:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;
},{}],47:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule update
 */

/* global hasOwnProperty:true */

'use strict';

var assign = require('./Object.assign');
var keyOf = require('fbjs/lib/keyOf');
var invariant = require('fbjs/lib/invariant');
var hasOwnProperty = ({}).hasOwnProperty;

function shallowCopy(x) {
  if (Array.isArray(x)) {
    return x.concat();
  } else if (x && typeof x === 'object') {
    return assign(new x.constructor(), x);
  } else {
    return x;
  }
}

var COMMAND_PUSH = keyOf({ $push: null });
var COMMAND_UNSHIFT = keyOf({ $unshift: null });
var COMMAND_SPLICE = keyOf({ $splice: null });
var COMMAND_SET = keyOf({ $set: null });
var COMMAND_MERGE = keyOf({ $merge: null });
var COMMAND_APPLY = keyOf({ $apply: null });

var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

var ALL_COMMANDS_SET = {};

ALL_COMMANDS_LIST.forEach(function (command) {
  ALL_COMMANDS_SET[command] = true;
});

function invariantArrayCase(value, spec, command) {
  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : undefined;
  var specValue = spec[command];
  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : undefined;
}

function update(value, spec) {
  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : undefined;

  if (hasOwnProperty.call(spec, COMMAND_SET)) {
    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : undefined;

    return spec[COMMAND_SET];
  }

  var nextValue = shallowCopy(value);

  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
    var mergeObj = spec[COMMAND_MERGE];
    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : undefined;
    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : undefined;
    assign(nextValue, spec[COMMAND_MERGE]);
  }

  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
    invariantArrayCase(value, spec, COMMAND_PUSH);
    spec[COMMAND_PUSH].forEach(function (item) {
      nextValue.push(item);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
    spec[COMMAND_UNSHIFT].forEach(function (item) {
      nextValue.unshift(item);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : undefined;
    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
    spec[COMMAND_SPLICE].forEach(function (args) {
      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
      nextValue.splice.apply(nextValue, args);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined;
    nextValue = spec[COMMAND_APPLY](nextValue);
  }

  for (var k in spec) {
    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
      nextValue[k] = update(value[k], spec[k]);
    }
  }

  return nextValue;
}

module.exports = update;
}).call(this,require('_process'))

},{"./Object.assign":46,"_process":17,"fbjs/lib/invariant":4,"fbjs/lib/keyOf":5}],48:[function(require,module,exports){
var React = require('react');
var ColorSwatch = require('./colorswatch.jsx')
ColorStop = require('./colorstop.jsx')

var Color = React.createClass({displayName: "Color",


    render: function() {

      if (this.props.colorStop == 'true') {
        var colorStop = React.createElement(ColorStop, {stopValue: this.props.stopValue, updateStop: this.props.updateStop})
      }

      return (
        React.createElement("div", {className: "color"}, 
          React.createElement(ColorSwatch, {
            overlayColor: this.props.overlayColor, 
            updateColor: this.props.updateColor, 
            label: this.props.label, 
            colorStop: this.props.colorStop}
          ), 
          colorStop
        )
      );

    }
});

module.exports = Color;

},{"./colorstop.jsx":53,"./colorswatch.jsx":54,"react":"react"}],49:[function(require,module,exports){
var React = require('react');
var Update = require('react-addons-update');
var Sidebar = require('./layout/sidebar.jsx');
var Main = require('./layout/main.jsx');
var Gallery = require('./layout/gallery.jsx');
var Presets = require('../presets');

var App = React.createClass({displayName: "App",

  _extend: function(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  },

  _init: {},

  _cloneInitialState: (function() {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        this._init = this.state;
      }
    };
  }.bind(this))(),

  getInitialState: function() {
    return {
      enabled: true,
      preset: 'custom',
      image: {
        type: 'unsplash',
        unsplashID: 'W_9mOGUwR08'
      },
      gallery: {
        visible: true
      },
      filter: {
        contrast: '100',
        brightness: '100',
        saturate: '100',
        grayscale: '0',
        sepia: '0',
        invert: '0',
        hueRotate: '0',
        blur: '0',
        opacity: '50',   // <-- Move to overlay
        blend: 'normal' // <-- Move to overlay
      },
      overlay: {
        type: 'none',
        direction: 'to bottom',
        position: 'center center',
        size: 'closest-corner',
        color: { a: 0.5, b: 253, g: 162, r: 62 },
        color1: {
          color: { a: 0.5, b: 253, g: 162, r: 62 },
          stop: 10
        },
        color2: {
          color: { a: 0.04, b: 70, g: 70, r: 70 },
          stop: 100
        }
      }
    }
  },

  resetState: function() {
    var newState = Update(this.state, {
      filter: { $set : this._init.filter},
      overlay: { $set : this._init.overlay},
      enabled: { $set : this._init.enabled},
      preset: { $set : 'custom'}
    })
    this.setState(newState);
  },

  updateMainImage: function(type, val) {
    switch (type) {
      case 'unsplash':
          var newState = Update(this.state, {
            image: {
              type: { $set: 'unsplash' },
              unsplashID: { $set: val }
            }
          });
          this.setState(newState);
        break;
      case 'upload':
      var newState = Update(this.state, {
        image: {
          type: { $set: 'upload' },
          source: { $set: val }
        }
      });

      default:
        this.setState(newState);
        break;
    }
  },

  toggleGallery: function(event) {
    var newState = Update(this.state, {
      gallery: {
        visible: { $set: !this.state.gallery.visible }
      }
    });
    this.setState(newState);
  },

  updatePreset: function(key) {
    var Filter = this._extend(this._init.filter, Presets[key].filter);
    var Overlay = this._extend(this._init.overlay, Presets[key].overlay);
    var Enabled = this._extend(this._init.enabled, Presets[key].enabled);

    var newState = Update(this.state, {
      preset: {$set: key},
      filter: {$set: Filter},
      overlay: {$set: Overlay},
      enabled: {$set: Enabled}
    });
    this.setState(newState);
  },

  handeUpdate: function(event) {
    var newState = Update(this.state, {
      filter: {
        contrast: { $set : this.refs.sidebar.refs.contrast.refs.range.value },
        saturate: { $set : this.refs.sidebar.refs.saturate.refs.range.value },
        brightness: { $set : this.refs.sidebar.refs.brightness.refs.range.value },
        sepia: { $set : this.refs.sidebar.refs.sepia.refs.range.value },
        grayscale: { $set : this.refs.sidebar.refs.grayscale.refs.range.value },
        invert: { $set : this.refs.sidebar.refs.invert.refs.range.value },
        hueRotate: { $set : this.refs.sidebar.refs.hueRotate.refs.range.value },
        blur: { $set : this.refs.sidebar.refs.blur.refs.range.value }
      }
    })
    this.setState(newState);
  },
  
  updateOverlay: function(event) {
    var newState = Update(this.state, {
      filter: {
        opacity: { $set : this.refs.sidebar.refs.background.refs.opacity.refs.range.value },
        blend: { $set : this.refs.sidebar.refs.background.refs.blend.refs.select.value }
      }
    })
    this.setState(newState);
  },

  updateGradientPositions: function(event) {
    if ( this.refs.sidebar.refs.background.refs.gradientsDirection != undefined ) {
      var newState = Update(this.state, {
        overlay: {
          direction: { $set: this.refs.sidebar.refs.background.refs.gradientsDirection.refs.direction.value }
        },
        preset: { $set: 'custom' }
      });
    } else if ( this.refs.sidebar.refs.background.refs.gradientsPosition != undefined ) {
      var newState = Update(this.state, {
        overlay: {
          position: { $set: this.refs.sidebar.refs.background.refs.gradientsPosition.refs.position.value },
          size: { $set: this.refs.sidebar.refs.background.refs.gradientsSize.refs.size.value }
        },
        preset: { $set: 'custom' }
      });
    }
    this.setState(newState);
  },

  updateOverlayType: function(event) {
    var newState = Update(this.state, {
      overlay: {
        type: { $set: event.currentTarget.value }
      },
      preset: { $set: 'custom' }
    });
    this.setState(newState);
  },

  updateEnabled: function(event) {
    var newState = Update(this.state, {
      enabled: { $set: !this.state.enabled }
    });
    this.setState(newState);
  },

  updateOverlayColor: function(color) {
    var newState = Update(this.state, {
      overlay: {
        color: { $set: color.rgb }
      },
      preset: { $set: 'custom' }
    });
    this.setState(newState);
  },

  updateColor1: function(color) {
    var newState = Update(this.state, {
      overlay: {
        color1: {
          color: { $set: color.rgb }
        }
      },
      preset: { $set: 'custom' }
    });
    this.setState(newState);
  },

  updateColor2: function(color) {
    var newState = Update(this.state, {
      overlay: {
        color2: {
          color: { $set: color.rgb }
        }
      },
      preset: { $set: 'custom' }
    });
    this.setState(newState);
  },

  updateColor1Stop: function(event) {

    newNum = (typeof event == 'number') ? event : parseInt(event.target.value);

    if (newNum >= 1 || newNum <=100) {
      var num = newNum;
    } else if (newNum >= 100) {
      var num = 100;
    } else {
      var num = 1;
    }

    var newState = Update(this.state, {
      overlay: {
        color1: {
          stop: { $set: num }
        }
      },
      preset: { $set: 'custom' }
    });
    this.setState(newState);
  },

  updateColor2Stop: function(event) {

    newNum = (typeof event == 'number') ? event : parseInt(event.target.value);

    if (newNum > 1 && newNum <100) {
      var num = newNum;
    } else if (newNum >= 100) {
      var num = 100;
    } else if (newNum < 1) {
      var num = 1;
    } else {
      num = 1;
    }

    var newState = Update(this.state, {
      overlay: {
        color2: {
          stop: { $set: num }
        }
      },
      preset: { $set: 'custom' }
    });
    this.setState(newState);
  },

  render: function() {
    this._cloneInitialState();

    return (
      React.createElement("section", {className: "wrap", key: this.state.timestamp}, 
      React.createElement("div", {className: "wrap-minor"}, 
      React.createElement(Gallery, {
      image: this.state.image, 
      preset: this.state.preset, 
      gallery: this.state.gallery, 
      updatePreset: this.updatePreset}
      ), 
      React.createElement(Main, {
      image: this.state.image, 
      overlay: this.state.overlay, 
      filter: this.state.filter, 
      gallery: this.state.gallery, 
      enabled: this.state.enabled, 
      toggleGallery: this.toggleGallery, 
      updateMainImage: this.updateMainImage}
      )
      ), 
      React.createElement(Sidebar, {
      ref: "sidebar", 
      overlay: this.state.overlay, 
      enabled: this.state.enabled, 
      filter: this.state.filter, 
      resetState: this.resetState, 
      updateOverlay: this.updateOverlay, 
      updateOverlayColor: this.updateOverlayColor, 
      updateColor1: this.updateColor1, 
      updateColor1Stop: this.updateColor1Stop, 
      updateColor2: this.updateColor2, 
      updateColor2Stop: this.updateColor2Stop, 
      updateOverlayType: this.updateOverlayType, 
      updateEnabled: this.updateEnabled, 
      updateGradientPositions: this.updateGradientPositions, 
      handeUpdate: this.handeUpdate}
      )
      )
    );
  }
});

module.exports = App;

},{"../presets":69,"./layout/gallery.jsx":59,"./layout/main.jsx":60,"./layout/sidebar.jsx":61,"react":"react","react-addons-update":27}],50:[function(require,module,exports){
var React = require('react');
var Color = require('./Color.jsx');
var OverlayType = require('./overlaytype.jsx');
var Enabled = require('./enabled.jsx');
var GradientDirections = require('./gradientdirection.jsx');
var GradientPositions = require('./gradientposition.jsx');
var GradientSizes = require('./gradientsize.jsx');
var RangeSlider = require('./range.jsx');
var BlendModes = require('./blendmode.jsx');

var Background = React.createClass({
  displayName: 'Background',

  renderColors: function() {
      if ( this.props.overlay.type == 'solid' ) {
          return (
            React.createElement("div", {className: "color__cont"}, 
              React.createElement(Color, {
                overlayColor: this.props.overlay.color, 
                updateColor: this.props.updateOverlayColor, 
                label: "Background Color", 
                colorStop: "false"}
              )
            )
          )
      } else if ( this.props.overlay.type == 'linear') {
        return (
          React.createElement("div", {className: ""}, 
            React.createElement("div", {className: "color__cont"}, 
              React.createElement(Color, {
                overlayColor: this.props.overlay.color1.color, 
                updateColor: this.props.updateColor1, 
                updateStop: this.props.updateColor1Stop, 
                label: "Color 1", 
                colorStop: "true", 
                stopValue: this.props.overlay.color1.stop}
              ), 

              React.createElement(Color, {
                overlayColor: this.props.overlay.color2.color, 
                updateColor: this.props.updateColor2, 
                updateStop: this.props.updateColor2Stop, 
                label: "Color 2", 
                colorStop: "true", 
                stopValue: this.props.overlay.color2.stop}
              )
            ), 

            React.createElement(GradientDirections, {ref: "gradientsDirection", direction: this.props.overlay.direction, updateGradientPositions: this.props.updateGradientPositions})
          )

        )
      } else if ( this.props.overlay.type == 'radial' ) {
        return (
          React.createElement("div", {className: ""}, 
            React.createElement("div", {className: "color__cont"}, 
              React.createElement(Color, {
                overlayColor: this.props.overlay.color1.color, 
                updateColor: this.props.updateColor1, 
                updateStop: this.props.updateColor1Stop, 
                label: "Color 1", 
                colorStop: "true", 
                stopValue: this.props.overlay.color1.stop}
              ), 

              React.createElement(Color, {
                overlayColor: this.props.overlay.color2.color, 
                updateColor: this.props.updateColor2, 
                updateStop: this.props.updateColor2Stop, 
                label: "Color 2", 
                colorStop: "true", 
                stopValue: this.props.overlay.color2.stop}
              )
            ), 

            React.createElement(GradientPositions, {ref: "gradientsPosition", position: this.props.overlay.position, updateGradientPositions: this.props.updateGradientPositions}), 
            React.createElement(GradientSizes, {ref: "gradientsSize", size: this.props.overlay.size, updateGradientPositions: this.props.updateGradientPositions})
          )
        )
      }
  },
  
  renderOverlayOptions: function() {
    if ( this.props.overlay.type == 'solid' || this.props.overlay.type == 'radial' || this.props.overlay.type == 'linear' ) {
        return (
          React.createElement("div", null, 
            React.createElement(BlendModes, {ref: "blend", blend: this.props.filter.blend, handeUpdate: this.props.updateOverlay}), 
            React.createElement(RangeSlider, {ref: "opacity", label: "Opacity", value: this.props.filter.opacity, min: "0", max: "100", unit: "%", handeUpdate: this.props.updateOverlay})
          )
        )
    }
  },

  render: function() {

    return (
      React.createElement("div", null, 
        React.createElement(OverlayType, {
          overlayType: this.props.overlay.type, 
          updateOverlayType: this.props.updateOverlayType}
        ), 
        React.createElement(Enabled, {
          enabled: this.props.enabled, 
          updateEnabled: this.props.updateEnabled}
        ), 

        this.renderColors(), 
        
        this.renderOverlayOptions()
      )
    );
  }
});

module.exports = Background;

},{"./Color.jsx":48,"./blendmode.jsx":51,"./enabled.jsx":55,"./gradientdirection.jsx":56,"./gradientposition.jsx":57,"./gradientsize.jsx":58,"./overlaytype.jsx":62,"./range.jsx":64,"react":"react"}],51:[function(require,module,exports){
var React = require('react');

var BlendMode = React.createClass({displayName: "BlendMode",
    render: function() {

      var modes = [ 'overlay', 'normal', 'multiply', 'screen', 'darken', 'lighten', 'color-dodge',  'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'initial', 'inherit', 'unset' ];

      var blendModes = modes.map(function(mode, index){
        return (
          React.createElement("option", {value: mode, key: index}, 
            mode.replace(/^./, mode[0].toUpperCase())
          )
        );
      });

      return (
        React.createElement("div", {className: "opts"}, 
          React.createElement("label", null, "Mix Blend Mode"), 
          React.createElement("div", {className: "dropdown"}, 
              React.createElement("select", {ref: "select", name: "blend-mode", className: "dropdown-select", onChange: this.props.handeUpdate, value: this.props.blend}, 
                blendModes
              )
          )
        )
      );
    }
});

module.exports = BlendMode;

},{"react":"react"}],52:[function(require,module,exports){
var React = require('react');
var $ = require('jquery');
var nanoScroller = require('nanoScroller');

// TODO: Refactor codeblock.jsx. There has to be a better way. This is insane.
// TODO: [Priority] Refactor codeblock.jsx. Show nothing in empty state
var CodeBlock = React.createClass({displayName: "CodeBlock",

  componentDidMount: function() {
    $('.code-scroll').nanoScroller();
  },

  render: function() {

    var filters = [];
    (this.props.filter.contrast != 100) ? filters.push('contrast('+this.props.filter.contrast+'%)') : '';
    (this.props.filter.brightness != 100) ? filters.push('brightness('+this.props.filter.brightness+'%)') : '';
    (this.props.filter.saturate != 100) ? filters.push('saturate('+this.props.filter.saturate+'%)') : '';
    (this.props.filter.sepia != 0) ? filters.push('sepia('+this.props.filter.sepia+'%)') : '';
    (this.props.filter.grayscale != 0) ? filters.push('grayscale('+this.props.filter.grayscale+'%)') : '';
    (this.props.filter.invert != 0) ? filters.push('invert('+this.props.filter.invert+'%)') : '';
    (this.props.filter.hueRotate != 0) ? filters.push('hue-rotate('+this.props.filter.hueRotate+'deg)') : '';
    (this.props.filter.blur != 0) ? filters.push('blur('+this.props.filter.blur+'px)') : '';
    var filters = filters.join(' ');


    var opacity = this.props.filter.opacity;
    var blend = this.props.filter.blend;
    var overlay = this.props.overlay;

    var output = '.filter {<br />'
    output += '  position: relative;<br />';
    output += (filters.length > 0) ? '  -webkit-filter: '+filters+';<br />' : '';
    output += (filters.length > 0) ? '  filter: '+filters+';<br />' : '';
    output += '}';
    output += '<br />';

    switch (overlay.position) {
      case 'left top':
        var overlayPos = '0% 0%';
        break;
      case 'center top':
        var overlayPos = '50% 0%';
        break;
      case 'right top':
        var overlayPos = '100% 0%';
        break;
      case 'center center':
        var overlayPos = '50% 50%';
        break;
      case 'right center':
        var overlayPos = '100% 50%';
        break;
      case 'left bottom':
        var overlayPos = '0% 100%';
        break;
      case 'center bottom':
        var overlayPos = '50% 100%';
        break;
      case 'right bottom':
        var overlayPos = '100% 100%';
        break;
      default:

    }

    if (this.props.overlay.type == 'solid' || this.props.overlay.type == 'linear' || this.props.overlay.type == 'radial') {
      output += '.filter::before {<br />';
      output += '  content: "";<br />';
      output += '  display: block;<br />';
      output += '  height: 100%;<br />';
      output += '  width: 100%;<br />';
      output += '  top: 0;<br />';
      output += '  left: 0;<br />';
      output += '  position: absolute;<br />';
      output += '  pointer-events: none;<br />';

      output += (blend && blend != 'normal') ? '  mix-blend-mode: '+blend+';<br />' : '';
      output += (opacity && opacity != '100') ? '  opacity: '+(parseInt(opacity)/100)+';<br />' : '';

      output += (overlay && overlay.type == 'solid') ? '  background: '+'rgba('+overlay.color.r+', '+overlay.color.g+', '+overlay.color.b+', '+overlay.color.a+')'+';<br />' : '';

      output += (overlay && overlay.type == 'linear') ? '  background: -webkit-linear-gradient('+overlay.direction+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';
      output += (overlay && overlay.type == 'linear') ? '  background: linear-gradient('+overlay.direction+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';

      output += (overlay && overlay.type == 'radial') ? '  background: -webkit-radial-gradient('+overlayPos+', circle '+overlay.size+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';
      output += (overlay && overlay.type == 'radial') ? '  background: radial-gradient('+overlayPos+', circle '+overlay.size+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';


      output += '}';
    }

    return (
      React.createElement("pre", {className: "code__panel code-scroll"}, 
        React.createElement("div", {className: "nano-content code__scroll-cont"}, 
          React.createElement("code", {dangerouslySetInnerHTML: {__html: output}}
          )
        )
      )
    );

  }
});

module.exports = CodeBlock;

},{"jquery":"jquery","nanoScroller":"nanoScroller","react":"react"}],53:[function(require,module,exports){
var React = require('react');

var ColorStop = React.createClass({displayName: "ColorStop",

  increaseCount: function() {
    this.props.updateStop( parseInt(this.props.stopValue) + 1 )
  },

  decreaseCount: function() {
    this.props.updateStop( parseInt(this.props.stopValue) - 1 )
  },

  render: function() {
    return (
      React.createElement("div", {className: "color__stop"}, 
        React.createElement("div", {className: "color__stop-number number"}, 
          React.createElement("input", {className: "number__input", 
            value: parseInt(this.props.stopValue), 
            onChange: this.props.updateStop, 
            id: "number", 
            min: "0", 
            max: "100"}
          ), 
          React.createElement("div", {className: "number__up", onClick: this.increaseCount}, "+"), 
          React.createElement("div", {className: "number__down", onClick: this.decreaseCount}, "-")
        ), 
        React.createElement("p", {className: "color__stop-label"}, "Stop")
      )
    );
  }
});

module.exports = ColorStop;

},{"react":"react"}],54:[function(require,module,exports){
var React = require('react');
var { ChromePicker } = require('react-color');

var ColorSwatch = React.createClass({displayName: "ColorSwatch",

  getInitialState: function() {
    return {
      displayColorPicker: false
    }
  },

  toggleColorPicker: function() {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  },

  handleClose: function() {
    this.setState({ displayColorPicker: false });
  },

  render: function() {

    var swatchColor = {
      backgroundColor: 'rgba('+this.props.overlayColor.r+', '+this.props.overlayColor.g+', '+this.props.overlayColor.b+', '+this.props.overlayColor.a+')'
    }

    var popupPosition = {
      left: 'initial',
      top: 'initial',
      marginLeft: '0',
      zIndex: '999',
      bottom: '100%',
      marginBottom: '20px',
      position: 'absolute'
    }

    var popover = {
      position: 'absolute',
      zIndex: '2'
    }
    var cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }

    return (
      React.createElement("div", {className: "color__box"}, 
        React.createElement("div", {className: "color__swatch", onClick:  this.toggleColorPicker}, 
          React.createElement("div", {className: "color__preview", style: swatchColor})
        ), 
        React.createElement("p", {className: "color__text"}, this.props.label), 
         this.state.displayColorPicker && React.createElement("div", {style:  popover }, 
            React.createElement("div", {style:  cover, onClick:  this.handleClose}), 
            React.createElement(ChromePicker, {
              className: "color-picker", 
              color:  this.props.overlayColor, 
              positionCSS:  popupPosition, 
              onChange:  this.props.updateColor}
            )
          )
        
      )
    );
  }
});

module.exports = ColorSwatch;

},{"react":"react","react-color":"react-color"}],55:[function(require,module,exports){
var React = require('react');

var Enabled = React.createClass({displayName: "Enabled",
    render: function() {
      return (
      React.createElement("fieldset", {className: "checkbox-group"}, 
        React.createElement("input", {type: "checkbox", name: "enabled", id: "c1", className: "checkbox", checked: this.props.enabled, onChange: this.props.updateEnabled}), 
        React.createElement("label", {className: "checkbox-label", htmlFor: "c1"}, React.createElement("i", null), React.createElement("span", null, this.props.enabled ? 'Disable' : 'Enable', " effect"))
      )
      );
    }
});

module.exports = Enabled;

},{"react":"react"}],56:[function(require,module,exports){
var React = require('react');

var GradientDirection = React.createClass({displayName: "GradientDirection",
    render: function() {

      var directions = [ 'to bottom right', 'to bottom', 'to bottom left', 'to right', 'to left', 'to top right', 'to top', 'to top left' ];

      var gradientDirections = directions.map(function(direction, index){
        return (
          React.createElement("option", {value: direction, key: index}, direction.replace(/^./, direction[0].toUpperCase()))
        );
      });

      return (
        React.createElement("div", {className: "opts"}, 
          React.createElement("label", null, "Gradient Diection"), 
          React.createElement("div", {className: "dropdown"}, 
              React.createElement("select", {ref: "direction", name: "gradient-direction", className: "dropdown-select", onChange: this.props.updateGradientPositions, value: this.props.direction}, 
                gradientDirections
              )
            )
          )
      );
    }
});

module.exports = GradientDirection;

},{"react":"react"}],57:[function(require,module,exports){
var React = require('react');

var GradientPosition = React.createClass({displayName: "GradientPosition",
    render: function() {

      var positions = [ 'left top', 'center top', 'right top', 'left center', 'center center', 'right center', 'left bottom', 'center bottom', 'right bottom' ];

      var gradientPositions = positions.map(function(position, index){
        return (
          React.createElement("option", {value: position, key: index}, position.replace(/^./, position[0].toUpperCase()))
        );
      });

      return (
        React.createElement("div", {className: "opts"}, 
          React.createElement("label", null, "Gradient Position"), 
          React.createElement("div", {className: "dropdown"}, 
              React.createElement("select", {ref: "position", name: "gradient-position", className: "dropdown-select", onChange: this.props.updateGradientPositions, value: this.props.position}, 
                gradientPositions
              )
            )
          )
      );
    }
});

module.exports = GradientPosition;

},{"react":"react"}],58:[function(require,module,exports){
var React = require('react');

var GradientSize = React.createClass({displayName: "GradientSize",
    render: function() {

      var sizes = [ 'closest-side', 'closest-corner', 'farthest-side', 'farthest-corner' ];

      var gradientSizes = sizes.map(function(size, index){
        return (
          React.createElement("option", {value: size, key: index}, size.replace(/^./, size[0].toUpperCase()))
        );
      });

      return (
        React.createElement("div", {className: "opts"}, 
          React.createElement("label", null, "Gradient Size"), 
          React.createElement("div", {className: "dropdown"}, 
              React.createElement("select", {ref: "size", name: "gradient-size", className: "dropdown-select", onChange: this.props.updateGradientPositions, value: this.props.size}, 
                gradientSizes
              )
            )
          )
      );
    }
});

module.exports = GradientSize;

},{"react":"react"}],59:[function(require,module,exports){
var React = require('react');
var $ = require('jquery');
var nanoScroller = require('nanoScroller');
var FilterFactory = require('../../factory');
var dragscroll = require('../../vendor/drag');
var presets = require('../../presets');
var classNames = require('classnames');

var Gallery = React.createClass({displayName: "Gallery",

    componentDidMount: function() {
      $('.gallery-scroll').nanoScroller({ alwaysVisible: true });
    },

    enablePreset: function(name, event) {
      this.props.updatePreset(name);
    },

    render: function() {

      var galleryClass = classNames({
        'gallery': true,
        'gallery-scroll': true,
        'is-active': this.props.gallery.visible
      });

      var thumbs = [];
      var self = this;
      Object.keys(presets).forEach(function(key) {
        var name = key;
        var object = presets[key];
        var thumbClass = classNames({
          'thumb': true,
          'is-active': (this.props.preset == key) ? true : false
        });

        var factory = new FilterFactory(object.filter, object.overlay);
        var overlay = factory.getOverlayStyles();
        var filter = factory.getFilterStyles();

        var image = 'https://source.unsplash.com/'+this.props.image.unsplashID+'/100x75';

        thumbs.push(
          React.createElement("li", {className: "gallery__item", key: name, onClick: this.enablePreset.bind(this, name)}, 
            React.createElement("div", {className: thumbClass}, 
              React.createElement("figure", {className: "thumb__figure", style: filter}, 
                React.createElement("div", {style: overlay}), 
                React.createElement("img", {src: image, alt: "", className: "thumb__img"})
              ), 
              React.createElement("p", {className: "thumb__label"}, 
                name.replace(/^./, name[0].toUpperCase())
              )
            )
          )
        );
      }.bind(this));

      return (
        React.createElement("div", {className: galleryClass}, 
          React.createElement("div", {className: "gallery__scroll-cont nano-content dragscroll"}, 
            React.createElement("ul", {className: "gallery__items"}, 
              thumbs
            )
          )
        )
      );
    }
});

module.exports = Gallery;

},{"../../factory":67,"../../presets":69,"../../vendor/drag":72,"classnames":1,"jquery":"jquery","nanoScroller":"nanoScroller","react":"react"}],60:[function(require,module,exports){
var React = require('react');
var Photo = require('../photo.jsx');
var UnsplashModal = require('../unsplashmodal.jsx');
var UploadModal = require('../uploadmodal.jsx');


var Main = React.createClass({displayName: "Main",
  render: function() {

    if (this.props.gallery.visible) {
      var galleryTriggerText = 'Hide Presets'
    } else {
      var galleryTriggerText = 'Show Presets'
    }

    return (
      React.createElement("main", {className: "main"}, 
        React.createElement("section", {className: "modal__trigger-cont"}, 
          React.createElement(UnsplashModal, {updateMainImage: this.props.updateMainImage}), 
          React.createElement(UploadModal, {updateMainImage: this.props.updateMainImage}), 
          React.createElement("p", {className: "gallery__trigger", onClick: this.props.toggleGallery}, React.createElement("i", {className: "icon-settings"}), galleryTriggerText)
        ), 

        React.createElement(Photo, {overlay: this.props.overlay, filter: this.props.filter, enabled: this.props.enabled, image: this.props.image}), 

        React.createElement("div", {className: "credits"}, 
          React.createElement("p", {className: "credits__cite"}, "Built by ", React.createElement("a", {href: "https://twitter.com/_ighosh", target: "_blank"}, "@_ighosh"), ". Presets from ", React.createElement("a", {href: "http://una.im/CSSgram/", target: "_blank"}, "cssgram"), " by ", React.createElement("a", {href: "https://twitter.com/una", target: "_blank"}, "@una"))
        )
      )
    )
  }
});

module.exports = Main;

},{"../photo.jsx":63,"../unsplashmodal.jsx":65,"../uploadmodal.jsx":66,"react":"react"}],61:[function(require,module,exports){
var React = require('react');
var $ = require('jquery');
var nanoScroller = require('nanoScroller');
var RangeSlider = require('../range.jsx');
var CodeBlock = require('../codeblock.jsx');
var BlendModes = require('../blendmode.jsx');
var Background = require('../background.jsx');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Sidebar = React.createClass({displayName: "Sidebar",

  getInitialState: function() {
    return {
      selectedIndex: 0
    }
  },

  handleSelected: function (index, last) {
    this.setState({
      selectedIndex: index
    });
  },

  componentDidMount: function() {
    $('.nano').nanoScroller();
    $('.mark-scroll').nanoScroller();
  },

  render: function () {

    return (
      React.createElement("aside", {className: "sidebar nano"}, 
        React.createElement("div", {className: "nano-content"}, 
          React.createElement(Tabs, {className: "tabs", onSelect: this.handleSelected, selectedIndex: this.state.selectedIndex}, 
           React.createElement(TabList, {className: "tabs__headers"}, 
             React.createElement(Tab, {className: "tabs__item"}, 
               React.createElement("p", {className: "tabs__label"}, "Generator")
             ), 
             React.createElement(Tab, {className: "tabs__item"}, 
               React.createElement("p", {className: "tabs__label"}, "CSS Code")
             )
           ), 
            React.createElement(TabPanel, {className: "tabs__content"}, 

              React.createElement("div", {className: "tabs__heading"}, 
                React.createElement("p", {className: "tabs__subheader"}, "Filters"), 
                React.createElement("span", {className: "tabs__clear", onClick: this.props.resetState}, "Clear All")
              ), 
              React.createElement(RangeSlider, {ref: "contrast", label: "Contrast", value: this.props.filter.contrast, min: "0", max: "200", unit: "%", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "brightness", label: "Brightness", value: this.props.filter.brightness, min: "0", max: "200", unit: "%", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "saturate", label: "Saturate", value: this.props.filter.saturate, min: "0", max: "200", unit: "%", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "sepia", label: "Sepia", value: this.props.filter.sepia, min: "0", max: "100", unit: "%", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "grayscale", label: "Grayscale", value: this.props.filter.grayscale, min: "0", max: "100", unit: "%", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "invert", label: "Invert", value: this.props.filter.invert, min: "0", max: "100", unit: "%", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "hueRotate", label: "Hue Rotate", value: this.props.filter.hueRotate, min: "0", max: "360", unit: "deg", handeUpdate: this.props.handeUpdate}), 
              React.createElement(RangeSlider, {ref: "blur", label: "Blur", value: this.props.filter.blur, min: "0", max: "10", unit: "px", handeUpdate: this.props.handeUpdate}), 


              React.createElement("div", {className: "tabs__heading"}, 
                React.createElement("p", {className: "tabs__subheader"}, "Overlay")
              ), 

              React.createElement(Background, {
                ref: "background", 
                handeUpdate: this.props.handeUpdate, 
                filter: this.props.filter, 
                overlay: this.props.overlay, 
                enabled: this.props.enabled, 
                updateOverlay: this.props.updateOverlay, 
                updateColor1: this.props.updateColor1, 
                updateColor1Stop: this.props.updateColor1Stop, 
                updateColor2: this.props.updateColor2, 
                updateColor2Stop: this.props.updateColor2Stop, 
                updateOverlayColor: this.props.updateOverlayColor, 
                updateOverlayType: this.props.updateOverlayType, 
                updateEnabled: this.props.updateEnabled, 
                updateGradientPositions: this.props.updateGradientPositions}
              )



            ), 
            React.createElement(TabPanel, {className: "tabs__content"}, 

              React.createElement("div", {className: "tabs__heading"}, 
                  React.createElement("p", {className: "tabs__subheader"}, "CSS")
              ), 
              React.createElement(CodeBlock, {filter: this.props.filter, overlay: this.props.overlay}), 

              React.createElement("div", {className: "tabs__heading"}, 
                  React.createElement("p", {className: "tabs__subheader"}, "Markup")
              ), 
              React.createElement("pre", {className: "mark-scroll"}, 
                React.createElement("div", {className: "nano-content mark__scroll-cont"}, 
                React.createElement("code", null, 
              "<figure class=\"filter\">", React.createElement("br", null), 
              "  <img src=\"...\">", React.createElement("br", null), 
              "</figure>"
                )
              )
              )
            )
          )
        )
      )
      );
    }
});

module.exports = Sidebar;

},{"../background.jsx":50,"../blendmode.jsx":51,"../codeblock.jsx":52,"../range.jsx":64,"jquery":"jquery","nanoScroller":"nanoScroller","react":"react","react-tabs":45}],62:[function(require,module,exports){
var React = require('react');

var OverlayType = React.createClass({displayName: "OverlayType",
    render: function() {
      return (
        React.createElement("fieldset", {className: "radio-group"}, 
          React.createElement("input", {id: "r4", type: "radio", name: "background", value: "none", className: "radio", checked: this.props.overlayType === 'none', onChange: this.props.updateOverlayType}), 
          React.createElement("label", {className: "radio-label", htmlFor: "r4"}, React.createElement("i", null), "None"), 
          React.createElement("input", {id: "r1", type: "radio", name: "background", value: "solid", className: "radio", checked: this.props.overlayType === 'solid', onChange: this.props.updateOverlayType}), 
          React.createElement("label", {className: "radio-label", htmlFor: "r1"}, React.createElement("i", null), "Solid Background"), 
          React.createElement("input", {id: "r2", type: "radio", name: "background", value: "linear", className: "radio", checked: this.props.overlayType === 'linear', onChange: this.props.updateOverlayType}), 
          React.createElement("label", {className: "radio-label", htmlFor: "r2"}, React.createElement("i", null), "Linear Gradient"), 
          React.createElement("input", {id: "r3", type: "radio", name: "background", value: "radial", className: "radio", checked: this.props.overlayType === 'radial', onChange: this.props.updateOverlayType}), 
          React.createElement("label", {className: "radio-label", htmlFor: "r3"}, React.createElement("i", null), "Radial Gradient")
        )    
      );
    }
});

module.exports = OverlayType;

},{"react":"react"}],63:[function(require,module,exports){
var React = require('react');
var FilterFactory = require('../factory');
var ImageLoader = require('react-imageloader');

var Photo = React.createClass({displayName: "Photo",

  getInitialState: function() {
    return {
      photoLoaded: false
    }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    return this.props.overlay !== nextProps.overlay ||
             this.props.filter !== nextProps.filter ||
             this.props.image !== nextProps.image ||
             this.props.enabled !== nextProps.enabled ||
             this.state != nextState;
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.image != nextProps.image) {
      this.setState({photoLoaded: false});
    }
  },

  photoLoaded: function() {
    this.setState({photoLoaded: true});
  },

  preloader: function () {
    return React.createElement("img", {className: "photo__spinner", src: "/images/spinner.gif"});
  },

  render: function() {

    if (this.props.image.type == 'unsplash') {
      var img = 'https://source.unsplash.com/'+this.props.image.unsplashID+'/800x600';
    } else if (this.props.image.type == 'upload') {
      var img = this.props.image.source;
    }


    var factory = new FilterFactory(this.props.filter, this.props.overlay);
    var overlay = factory.getOverlayStyles();
    var filter = factory.getFilterStyles();

    // Hides the overlay div to prevent bleeding filter colors on the spinnner
    overlay.display = (this.state.photoLoaded == false) ? 'none' : 'block' ;

    return (
      React.createElement("div", {className: "photo"}, 
        React.createElement("figure", {style: this.props.enabled ? filter : {}}, 
          React.createElement("div", {style: overlay}), 
          React.createElement(ImageLoader, {src: img, className: "photo__img", wrapper: React.DOM.div, preloader: this.preloader, onLoad: this.photoLoaded})
        )
      )
    );
  }
});

module.exports = Photo;

},{"../factory":67,"react":"react","react-imageloader":29}],64:[function(require,module,exports){
var React = require('react');

var RangleSlider = React.createClass({displayName: "RangleSlider",
    render: function() {
      return (
        React.createElement("div", {className: "slider"}, 
          React.createElement("div", {className: "slider__content"}, 
            React.createElement("p", {className: "slider__label"}, this.props.label), 
            React.createElement("p", {className: "slider__value"}, this.props.value, this.props.unit)
          ), 
          React.createElement("input", {
            ref: "range", 
            className: "range slider__range", 
            type: "range", 
            value: this.props.value, 
            min: this.props.min, 
            max: this.props.max, 
            step: "1", 
            onChange: this.props.handeUpdate}
          )
        )
      );
    }
});

module.exports = RangleSlider;

},{"react":"react"}],65:[function(require,module,exports){
var React = require('react');
var ReactModal = require('react-modal');
var $ = require('jquery');
var nanoScroller = require('nanoScroller');

var UnsplashModal = React.createClass({displayName: "UnsplashModal",

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  setMainImage: function(id, event) {
    this.props.updateMainImage('unsplash', id);
    this.setState({modalIsOpen: false});
  },

  componentDidMount: function() {
    $.getJSON('https://api.unsplash.com/photos/?per_page=50&client_id=86f6167ee81be7b8aea6aa0d999c1bae79b3351b43e8df03c8baaa9c630f24ba')
    .done(function(data) {
        this.setState({images: data });
    }.bind(this));

    $('.modal-scroll').nanoScroller({ alwaysVisible: true });
  },

  shouldComponentUpdate: function(nextProps, nextState){
      return this.state !== nextState;
  },

  render: function() {

    if (this.state.images) {
      var images = this.state.images.map(function(image, index){
        return (
          React.createElement("figure", {className: "modal__thumb", key: index, onClick: this.setMainImage.bind(this, image.id)}, 
            React.createElement("img", {className: "modal__img", src: image.urls.thumb, alt: ""})
          )
        );
      }.bind(this));
    }

    var modalStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '640px',
        height: '500px',
        overlfow: 'scroll',
        'border': 'transparent',
        'backgroundColor': '#191d23'
      },
      overlay: {
        backgroundColor: 'rgba(46, 47, 49, 0.701961)'
      }
    };

    return (
      React.createElement("div", null, 
        React.createElement("p", {className: "modal__trigger", onClick: this.openModal}, React.createElement("i", {className: "icon-image"}), " Select an image from Unsplash"), 
        React.createElement(ReactModal, {className: "modal", isOpen: this.state.modalIsOpen, onRequestClose: this.closeModal, style: modalStyles}, 
            React.createElement("div", {className: "modal__header"}, 
              React.createElement("h4", {className: "modal__title"}, 
                "Select an image"
              ), 
              React.createElement("a", {href: "#", className: "modal__close icon-close", onClick: this.closeModal})
            ), 
            React.createElement("div", {className: "modal__body modal-scroll"}, 
              React.createElement("div", {className: "nano-content modal__scroll-cont"}, 
                images
              )
            )
        )
      )
    );
  }
});

module.exports = UnsplashModal;

},{"jquery":"jquery","nanoScroller":"nanoScroller","react":"react","react-modal":36}],66:[function(require,module,exports){
var React = require('react');
var ReactModal = require('react-modal');
var Dropzone = require('react-dropzone');

var UploadModal = React.createClass({displayName: "UploadModal",

  getInitialState: function() {
    return {
      modalIsOpen: false,
      files: []
    };
  },

  setMainImage: function(src) {
    this.props.updateMainImage('upload', src)
  },

  onDrop: function (files) {
    this.setState({
      files: files
    });
    this.setMainImage(files[0].preview);
    this.closeModal();
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {

    var modalStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '640px',
        height: '500px',
        overlfow: 'scroll',
        'border': 'transparent',
        'backgroundColor': '#191d23'
      },
      overlay: {
        backgroundColor: 'rgba(46, 47, 49, 0.701961)'
      }
    };

    return (
      React.createElement("div", null, 
        React.createElement("p", {className: "modal__trigger", onClick: this.openModal}, React.createElement("i", {className: "icon-upload"}), " Upload an Image"), 
        React.createElement(ReactModal, {className: "modal", isOpen: this.state.modalIsOpen, onRequestClose: this.closeModal, style: modalStyles}, 
          React.createElement("div", {className: "modal__header"}, 
            React.createElement("h4", {className: "modal__title"}, 
              "Upload an Image"
            ), 
            React.createElement("a", {href: "#", className: "modal__close icon-close", onClick: this.closeModal})
          ), 
          React.createElement("div", {className: "modal__body"}, 
            React.createElement("div", {className: "nano-content modal__scroll-cont"}, 
            React.createElement(Dropzone, {ref: "dropzone", className: "dropzone", onDrop: this.onDrop, multiple: false}, 
                React.createElement("p", {className: "dropzone__byline"}, "Drag and drop an image here, or click to select from drive.")
            )
          )
          )
        )
      )
    );
  }
});

module.exports = UploadModal;

},{"react":"react","react-dropzone":28,"react-modal":36}],67:[function(require,module,exports){
function Factory(filter, overlay) {

  if (!(this instanceof Factory)) {
    return new Factory(filter, overlay);
  }

  this.filter = filter;
  this.overlay = overlay;

};

Factory.prototype.getOverlayStyles = function getOverlayStyles() {

  if (this.filter.blend) {
    var blend = this.filter.blend;
  }

  if (this.filter.opacity) {
    var opacity = this.filter.opacity;
  } else {
    var opacity = 100;
  }

  if (this.overlay.direction) {
    var direction = this.overlay.direction;
  }

  if (this.overlay.size) {
    var size = this.overlay.size;
  }

  if (this.overlay.position) {
    var position = this.overlay.position;
  }

  if (this.overlay.color) {
    var color = 'rgba('+this.overlay.color.r+', '+this.overlay.color.g+', '+this.overlay.color.b+', '+this.overlay.color.a+')';
  }

  if (this.overlay.color1) {
    var color1 = 'rgba('+this.overlay.color1.color.r+', '+this.overlay.color1.color.g+', '+this.overlay.color1.color.b+', '+this.overlay.color1.color.a+')';
    var color1Stop = this.overlay.color1.stop;
  }

  if (this.overlay.color2) {
    var color2 = 'rgba('+this.overlay.color2.color.r+', '+this.overlay.color2.color.g+', '+this.overlay.color2.color.b+', '+this.overlay.color2.color.a+')'
    var color2Stop = this.overlay.color2.stop;
  }


  switch (this.overlay.type) {
    case 'solid':
      var background = color;
      break;
    case 'linear':
      var background = 'linear-gradient( '+direction+', '+color1+' '+color1Stop+'%, '+color2+' '+color2Stop+'% )';
      break;
    case 'radial':
      var background = '-webkit-radial-gradient('+position+', circle '+size+', '+color1+' '+color1Stop+'%, '+color2+' '+color2Stop+'% )';
      break;
    default:
  }

  var styles = {
    content: ' ',
    display: 'block',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    pointerEvents: 'none',
    position: 'absolute',

    mixBlendMode: blend,
    opacity: (opacity/100),

    background: background
  }

  return styles;
};

Factory.prototype.getFilterStyles = function getFilterStyles() {
  var filters = '';
      filters += (this.filter.sepia) ? 'sepia(' + this.filter.sepia + '%) ' : '';
      filters += (this.filter.brightness) ? 'brightness(' + this.filter.brightness + '%) ': '';
      filters += (this.filter.contrast) ? 'contrast(' + this.filter.contrast + '%) ': '';
      filters += (this.filter.saturate) ? 'saturate(' + this.filter.saturate + '%) ': '';
      filters += (this.filter.grayscale) ? 'grayscale(' + this.filter.grayscale + '%) ': '';
      filters += (this.filter.invert) ? 'invert(' + this.filter.invert + '%) ': '';
      filters += (this.filter.hueRotate) ? 'hue-rotate(' + this.filter.hueRotate + 'deg) ': '';
      filters += (this.filter.blur) ? 'blur(' + this.filter.blur + 'px) ': '';

  var styles = {
    position: 'relative',
    WebkitFilter: filters,
    filter: filters
  }

  return styles;
};

module.exports = Factory;

},{}],68:[function(require,module,exports){
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app.jsx');
var Share = require('./share');
var Tracker = require('./track');


Share.boot({
  'twitter': true,
  'facebook': true,
  'gplus': false,
  'sharecount': false
});

Tracker.track();

/**
 * Kickoff the app
 */
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);


console.log('=====================================================================');
console.log('cssfilters.co - Custom and Instagram like photo filters for CSS');
console.log('=====================================================================');
console.log('A little project by www.twitter.com/_ighosh');

},{"./components/app.jsx":49,"./share":70,"./track":71,"react":"react","react-dom":"react-dom"}],69:[function(require,module,exports){
var filters = {
  '1977': {
    filter: {
      contrast: '110',
      brightness: '110',
      saturate: '130',
      opacity: '100',
      blend: 'screen'
    },
    overlay: {
      type: 'solid',
      color: { a: 0.3, b: 188, g: 106, r: 243 }
    }
  },
  'aden': {
    filter: {
      hueRotate: '20',
      contrast: '90',
      saturate: '85',
      brightness: '120',
      opacity: '100',
      blend: 'darken'
    },
    overlay: {
      type: 'linear',
      direction: 'to right',
      color1: {
        color: { a: 0.2, b: 14, g: 10, r: 66 },
        stop: 1
      },
      color2: {
        color: { a: 0, b: 14, g: 10, r: 66 },
        stop: 100
      }
    }
  },
  'amaro': {
    filter: {
      hueRotate: '-10',
      contrast: '90',
      saturate: '150',
      brightness: '110',
      blend: 'screen'
    },
    overlay: {
      type: 'none'
    }
  },
  'brannan': {
    filter: {
      sepia: '50',
      contrast: '140',
      blend: 'lighten',
      opacity: '100'
    },
    overlay: {
      type: 'solid',
      color: { a: 0.31, b: 199, g: 44, r: 161 }
    }
  },
  'brooklyn': {
    filter: {
      contrast: '90',
      brightness: '110',
      opacity: '100',
      blend: 'overlay'
    },
    overlay: {
      type: 'radial',
      position: 'center center',
      size: 'closest-corner',
      color1: {
        color: { a: 0.4, b: 193, g: 223, r: 168 },
        stop: 1
      },
      color2: {
        color: { a: 0.2, b: 200, g: 196, r: 183 },
        stop: 100
      }
    }
  },
  'clarendon': {
    filter: {
      contrast: '120',
      saturate: '125',
      blend: 'overlay',
      opacity: '100'
    },
    overlay: {
      type: 'solid',
      color: { a: 0.2, b: 227, g: 187, r: 127 }
    }
  },
  'earlybird': {
    filter: {
      contrast: '90',
      sepia: '20',
      blend: 'overlay',
      opacity: '100'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 142, g: 186, r: 208 },
        stop: 20
      },
      color2: {
        color: { a: 0.2, b: 16, g: 2, r: 29 },
        stop: 100
      }
    }
  },
  'gingham': {
    filter: {
      brightness: '105',
      hueRotate: '350',
      blend: 'darken',
      opacity: '100'
    },
    overlay: {
      type: 'linear',
      direction: 'to right',
      color1: {
        color: { a: 0.2, b: 14, g: 10, r: 66 },
        stop: 1
      },
      color2: {
        color: { a: 0, b: 0, g: 0, r: 0 },
        stop: 100
      }
    }
  },
  'earlybird': {
    filter: {
      contrast: '90',
      sepia: '20',
      blend: 'overlay',
      opacity: '100'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 142, g: 186, r: 208 },
        stop: 20
      },
      color2: {
        color: { a: 0.2, b: 16, g: 2, r: 29 },
        stop: 100
      }
    }
  },
  'hudson': {
    filter: {
      brightness: '120',
      contrast: '90',
      saturate: '110',
      blend: 'multiply',
      opacity: '50'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 166, g: 177, r: 255 },
        stop: 50
      },
      color2: {
        color: { a: 1, b: 52, g: 33, r: 52 },
        stop: 100
      }
    }
  },
  'inkwell': {
    filter: {
      sepia: '30',
      contrast: '110',
      brightness: '110',
      grayscale: '100',
      opacity: '100'
    },
    overlay: {
      type: 'solid',
      color: { a: 0, b: 0, g: 0, r: 0 }
    }
  },
  'lofi': {
    filter: {
      saturate: '110',
      contrast: '150',
      opacity: '100',
      blend: 'multiply'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 0, b: 0, g: 0, r: 0 },
        stop: 70
      },
      color2: {
        color: { a: 1, b: 34, g: 34, r: 34 },
        stop: 100
      }
    }
  },
  'maven': {
    filter: {
      sepia: '25',
      brightness: '95',
      contrast: '95',
      saturate: '150',
      blend: 'hue',
      opacity: '100'
    },
    overlay: {
      type: 'solid',
      color: { a: 0.2, b: 26, g: 230, r: 3 }
    }
  },
  'perpetua': {
    filter: {
      opacity: '50',
      blend: 'soft-light'
    },
    overlay: {
      type: 'linear',
      direction: 'to bottom',
      color1: {
        color: { a: 1, b: 154, g: 91, r: 0 },
        stop: 1
      },
      color2: {
        color: { a: 0, b: 230, g: 193, r: 61 },
        stop: 100
      }
    }
  },
  'reyes': {
    filter: {
      sepia: '22',
      contrast: '85',
      brightness: '110',
      saturate: '75',
      opacity: '50',
      blend: 'soft-light'
    },
    overlay: {
      type: 'solid',
      color: { a: 1, b: 239, g: 205, r: 173 }
    }
  },
  'stinson': {
    filter: {
      contrast: '75',
      saturate: '85',
      brightness: '115',
      opacity: '100',
      blend: 'soft-light'
    },
    overlay: {
      type: 'solid',
      color: { a: 0.2, b: 128, g: 149, r: 240 }
    }
  },
  'toaster': {
    filter: {
      contrast: '150',
      brightness: '90',
      opacity: '50',
      blend: 'screen'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 128, g: 78, r: 15 },
        stop: 1
      },
      color2: {
        color: { a: 1, b: 59, g: 0, r: 59 },
        stop: 100
      }
    }
  },
  'walden': {
    filter: {
      brightness: '110',
      hueRotate: '350',
      sepia: '30',
      saturate: '160',
      opacity: '30',
      blend: 'screen'
    },
    overlay: {
      type: 'solid',
      color: { a: 1, b: 0, g: 68, r: 204 }
    }
  },
  'valencia': {
    filter: {
      contrast: '108',
      sepia: '8',
      brightness: '108',
      opacity: '50',
      blend: 'exclusion'
    },
    overlay: {
      type: 'solid',
      color: { a: 1, b: 57, g: 3, r: 58 }
    }
  },
  'xpro2': {
    filter: {
      sepia: '30',
      opacity: '100',
      blend: 'color-burn'
    },
    overlay: {
      type: 'radial',
      color1: {
        color: { a: 1, b: 230, g: 231, r: 224 },
        stop: 40
      },
      color2: {
        color: { a: 0.6, b: 161, g: 42, r: 43 },
        stop: 100
      }
    }
  }
};

module.exports = filters;

},{}],70:[function(require,module,exports){
var $ = require('jquery');

var Share = ( function( window, undefined ) {

  var config = {
    'twitter': true,
    'facebook': true,
    'gplus': true,
    'sharecount': false
  };

  var $share = document.getElementById('share-buttons');
  var $shareLinks = $share.querySelectorAll('a');
  var $sharecounts = document.getElementsByClassName('share-count');
  var $facebook = document.getElementById('share-facebook');
  var $facebookCount = document.getElementById('facebook-count');
  var $twitter = document.getElementById('share-twitter');
  var $twitterCount = document.getElementById('twitter-count');

  var permalink = $share.getAttribute('data-permalink');


  function _extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i])
        continue;

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))
          out[key] = arguments[i][key];
      }
    }

    return out;
  };

  function _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function _setVariables ( options ) {
    config = _extend( {}, config, options );
  }

  function _setupShareButtons () {
    if (config.sharecount === true) {
        ( document.contains($facebook) && config.facebook === true ) ? _getFacebookCount() : $facebook.parentNode.removeChild($facebook) ; // jshint ignore:line
        ( document.contains($twitter) && config.twitter === true ) ? _getTwitterCount() : $twitter.parentNode.removeChild($twitter) ; // jshint ignore:line

    } else {
      // Remove share count elements from dom
      while($sharecounts.length > 0){
          $sharecounts[0].parentNode.removeChild($sharecounts[0]);
      }
    }
  }

  function _getFacebookCount () {
      $.getJSON('https://graph.facebook.com/?id='+permalink)
      .done(function(data) {

        if (data.shares > 0) {
          $facebookCount.textContent = data.shares;
          ($facebookCount.classList) ? $facebookCount.classList.add('is-loaded') : $facebookCount.className += ' ' + 'is-loaded' ;
        } else {
          $facebookCount.parentNode.removeChild($facebookCount);
        }
      })
      .fail(function(data) {
        $facebookCount.parentNode.removeChild($facebookCount);
      });
  }




  function _getTwitterCount () {

    $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + permalink + '&callback=?')
    .done(function(data) {

      if (data.count > 0) {
        $twitterCount.textContent = data.count;
        ($twitterCount.classList) ? $twitterCount.classList.add('is-loaded') : $twitterCount.className += ' ' + 'is-loaded' ;
      } else {
        $twitterCount.parentNode.removeChild($twitterCount);
      }
    })
    .fail(function(data) {
      $twitterCount.parentNode.removeChild($twitterCount);
    });

  }

  function _clickHandler(event) {
    event.preventDefault();
    var el = this,
        popup = el.getAttribute('class'),
        link = el.getAttribute('href'),
        w = 700,
        h = 400;

    // Set popup sizes
    switch (popup) {
      case 'js-twitter-link':
        h = 300;
        break;
      case 'js-gplus-link':
        w = 500;
        break;
    }

    window.open(link, popup, 'width=' + w + ', height=' + h);
  }


  function _setupShareModals () {

    for (i = 0; i < $shareLinks.length; ++i) {
      $shareLinks[i].addEventListener('click', _clickHandler);
    }
  }

  function boot( options ) {
    _setVariables( options );
    _setupShareButtons();
    _setupShareModals();
  }

  return {
    boot : boot
  };

} )( window );

module.exports = Share;

},{"jquery":"jquery"}],71:[function(require,module,exports){
var $ = require('jquery');

var Track = ( function( window, undefined ) {

  var $twitter = $('#share-twitter');
  var $facebook = $('#share-facebook');
  var $github = $('#share-github');

  function track() {
    $facebook.on('click', function(event) {
      ga('send', 'social', 'facebook', 'share', 'http://www.cssfilters.co/');
    });

    $twitter.on('click', function(event) {
      ga('send', 'social', 'twitter', 'share', 'http://www.cssfilters.co/');
    });

    $github.on('click', function(event) {
      ga('send', 'event', 'header-icons', 'click', 'github');
    });
  }

  return {
    track : track
  };

} )( window );

module.exports = Track;

},{"jquery":"jquery"}],72:[function(require,module,exports){
/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.5
 *
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        dragged = _document.getElementsByClassName('dragscroll');
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed){
                el[addEventListener](
                    mousedown,
                    el.md = function(e) {
                        // alert("What!");
                        pushed = 1;
                        lastClientX = e.clientX;
                        lastClientY = e.clientY;

                        e.preventDefault();
                        e.stopPropagation();
                    }, 0
                );

                 _window[addEventListener](
                     mouseup, el.mu = function() {pushed = 0;}, 0
                 );

                _window[addEventListener](
                    mousemove,
                    el.mm = function(e, scroller) {
                        scroller = el.scroller||el;
                        if (pushed) {
                             scroller.scrollLeft -=
                                 (- lastClientX + (lastClientX=e.clientX));
                             scroller.scrollTop -=
                                 (- lastClientY + (lastClientY=e.clientY));
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }


    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

},{}]},{},[68])

//# sourceMappingURL=build/scripts/bundle.js.map
