/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable__ = __webpack_require__(22);


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_0_symbol_observable__["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_0_symbol_observable__["a" /* default */]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.color1 = "#333";
exports.color2 = "#aaa";
exports.fontSize1 = "25px";
exports.fontFamily1 = '"Open Sans", "Lato", sans-serif';
exports.abstracktStyleFullWidhtElem = {
    position: "fixed",
    width: "100%",
    left: "0px",
    right: "0px"
};
exports.imgLoadingStyle = {
    margin: "0 auto",
    position: "absolute",
    top: "35%",
    left: "47%"
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _componentsCreateAll = __webpack_require__(16);

var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);

var _createAll = _componentsCreateAll2['default'](_react2['default']);

var Provider = _createAll.Provider;
var connect = _createAll.connect;
exports.Provider = Provider;
exports.connect = connect;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.AUTH_ERROR = "AUTH_ERROR";
exports.AUTH_SUCCESS = "AUTH_SUCCESS";
exports.AUTH_LOADING = "AUTH_LOADING";
exports.CHANGE_VIEW = "CHANGE_VIEW";
exports.CHANGE_CAMS_STATE = "CHANGE_CAMS_STATE";


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SelfGuidedGenerator = /** @class */ (function () {
    function SelfGuidedGenerator(generatorCreater) {
        this.generator = generatorCreater(this);
        this.generator.next();
    }
    SelfGuidedGenerator.prototype.next = function (arg) {
        return this.generator.next(arg);
    };
    SelfGuidedGenerator.prototype["return"] = function (arg) {
        return this.generator["return"](arg);
    };
    return SelfGuidedGenerator;
}());
exports.SelfGuidedGenerator = SelfGuidedGenerator;
exports.delay = function (time, cb) {
    setTimeout(cb, time);
};
function parseGetParams(par) {
    var tmp = new Array(); // два вспомагательных
    var tmp2 = new Array(); // массива
    var param = {};
    var get = location.search; // строка GET запроса
    var result = ""; //переменная результата
    if (get != "") {
        tmp = get.substr(1).split("&"); // разделяем переменные
        for (var i = 0; i < tmp.length; i++) {
            tmp2 = tmp[i].split("="); // массив param будет содержать
            param[tmp2[0]] = tmp2[1]; // пары ключ(имя переменной)->значение
        }
    }
    if (typeof param[par] != "undefined") {
        result = param[par];
    }
    return result;
}
exports.parseGetParams = parseGetParams;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ACTION_TYPE_CONST_1 = __webpack_require__(4);
exports.chageView = function (payload) { return ({
    type: ACTION_TYPE_CONST_1.CHANGE_VIEW,
    payload: payload
}); };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var apiHost = stb.__type__ === "mag" ? "http://cam.rikt.ru" : "http://cam.rikt.ru";
exports.httpAutReq = function (login, password, cb) {
    var data = "Login=" + login + "&Password=" + password;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", apiHost + "/api/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            cb(JSON.parse(xhr.responseText));
        }
    });
};
exports.httpGetTranslation = function (SessionID, CameraID, Format, cb) {
    var data = "SessionID=" + SessionID + "&CameraID=" + CameraID + "&Format=" + Format;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", apiHost + "/api/GetTranslationURL", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            cb(JSON.parse(xhr.responseText));
        }
    });
};
exports.httpStopTranslation = function (URL, cb) {
    var data = "op=stop";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            cb();
        }
    });
};
exports.getCameras = function (SessionID, cb) {
    var data = "SessionID=" + SessionID + "&ActiveOnly=1";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", apiHost + "/api/GetCameras");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            cb(JSON.parse(xhr.responseText));
        }
    });
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var style_1 = __webpack_require__(2);
var fullScreenStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    height: "100%",
    width: "100%"
};
exports.style = __assign({}, fullScreenStyle);
exports.imgLoadingStyle = style_1.imgLoadingStyle;
exports.playerBodyStyle = __assign({}, fullScreenStyle);
exports.controlPanelStyle = {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: "120px",
    background: "url(./../forpost-app/img/layerControlBg.png)",
    backgroundRepeat: "repeat-x"
};
exports.playerButtonsStyle = {
    borderBottom: "2px solid #6A6A6A",
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    height: "50px"
};


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var style_1 = __webpack_require__(2);
exports.colorError = "#b00020";
exports.fontSize1 = style_1.fontSize1;
exports.fontFamily1 = style_1.fontFamily1;
var bodyStyle = __assign({}, style_1.abstracktStyleFullWidhtElem, { height: "75%", top: "100px", bottom: "0px", background: "url(./../forpost-app/img/background1.png) no-repeat", borderBottom: "100px solid " + style_1.color1 });
exports.bodyStyle = bodyStyle;
exports.loginFormStyle = {
    maxWidth: "520px",
    padding: "19px 29px 50px",
    margin: "0 auto 20px",
    backgroundColor: "#fff",
    border: "4px solid #e5e5e5",
    borderRadius: "5px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, .05)",
    marginTop: "60px",
    marginBottom: "100px"
};
exports.labelStyle = {
    color: style_1.color1,
    display: "block",
    marginBottom: "25px",
    fontSize: "25px",
    position: "relative"
};
var inputStyle = {
    color: style_1.color1,
    fontSize: exports.fontSize1,
    position: "absolute",
    right: "0px"
};
exports.inputStyle = inputStyle;
if (stb.__type__ === "tvip") {
    inputStyle.border = "2px solid buttonface";
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(36);
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return (React.createElement("div", { style: style_1.headerStyle },
            React.createElement("img", { src: "./../forpost-app/img/logo.png", style: style_1.logoStyle }),
            React.createElement("span", { style: style_1.nameAppStyle }, "\u0412\u0438\u0434\u0435\u043E\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C. \u041E\u0431\u043B\u0430\u0447\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0410\u041E \"\u0420\u0418\u041A\u0422\"")));
    };
    return Header;
}(React.Component));
exports["default"] = Header;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = createStoreShape;

function createStoreShape(PropTypes) {
  return PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  });
}

module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var style_1 = __webpack_require__(2);
exports.color2 = style_1.color2;
exports.color3 = "#383838";
exports.camItemStyle = {
    background: exports.color3,
    border: "2px solid black",
    borderRadius: "4px",
    top: "10px",
    left: "10px",
    right: "10px",
    bottom: "10px",
    position: "absolute"
};
exports.camItemActiveStyle = __assign({}, exports.camItemStyle, { background: exports.color2 });
exports.nameStyle = {
    position: "absolute",
    left: "20px",
    right: "0px",
    bottom: "0px",
    color: exports.color2,
    fontSize: style_1.fontSize1,
    fontFamily: style_1.fontFamily1,
    marginBottom: "15px"
};
exports.nameActiveStyle = __assign({}, exports.nameStyle, { color: style_1.color1 });
exports.camBodyStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    right: "10px",
    bottom: "60px"
};
exports.imgWrapStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px"
};
exports.imgCamStyle = {
    maxHeight: "100%",
    maxWidth: "100%",
    margin: "0 auto"
};
exports.imgLoadingStyle = style_1.imgLoadingStyle;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(15);
var react_redux_1 = __webpack_require__(3);
var redux_1 = __webpack_require__(1);
var redux_thunk_1 = __webpack_require__(28);
var root_1 = __webpack_require__(29);
var Login_1 = __webpack_require__(33);
var Panel_1 = __webpack_require__(37);
var Player_1 = __webpack_require__(44);
var Exit_1 = __webpack_require__(49);
var global = window;
var store = redux_1.createStore(root_1["default"], redux_1.applyMiddleware(redux_thunk_1["default"]));
global["store"] = store;
var ViewWrap = /** @class */ (function (_super) {
    __extends(ViewWrap, _super);
    function ViewWrap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewWrap.prototype.render = function () {
        if (this.props.view === "/login") {
            return React.createElement(Login_1["default"], null);
        }
        else if (this.props.view === "/panel") {
            return React.createElement(Panel_1["default"], null);
        }
        else if (this.props.view === "/player") {
            return React.createElement(Player_1["default"], null);
        }
        else if (this.props.view === "/exit") {
            return React.createElement(Exit_1["default"], null);
        }
    };
    return ViewWrap;
}(React.Component));
var ViewWrapContainer = react_redux_1.connect(function (state) { return ({
    view: state.app.view
}); })(ViewWrap);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(ViewWrapContainer, null)), document.getElementById("reactRoot"));


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = createAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createProvider = __webpack_require__(17);

var _createProvider2 = _interopRequireDefault(_createProvider);

var _createConnect = __webpack_require__(18);

var _createConnect2 = _interopRequireDefault(_createConnect);

function createAll(React) {
  var Provider = _createProvider2['default'](React);
  var connect = _createConnect2['default'](React);

  return { Provider: Provider, connect: connect };
}

module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = createProvider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilsCreateStoreShape = __webpack_require__(12);

var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

function isUsingOwnerContext(React) {
  var version = React.version;

  if (typeof version !== 'string') {
    return true;
  }

  var sections = version.split('.');
  var major = parseInt(sections[0], 10);
  var minor = parseInt(sections[1], 10);

  return major === 0 && minor === 13;
}

function createProvider(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;
  var Children = React.Children;

  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);
  var requireFunctionChild = isUsingOwnerContext(React);

  var didWarnAboutChild = false;
  function warnAboutFunctionChild() {
    if (didWarnAboutChild || requireFunctionChild) {
      return;
    }

    didWarnAboutChild = true;
    console.error( // eslint-disable-line no-console
    'With React 0.14 and later versions, you no longer need to ' + 'wrap <Provider> child into a function.');
  }
  function warnAboutElementChild() {
    if (didWarnAboutChild || !requireFunctionChild) {
      return;
    }

    didWarnAboutChild = true;
    console.error( // eslint-disable-line no-console
    'With React 0.13, you need to ' + 'wrap <Provider> child into a function. ' + 'This restriction will be removed with React 0.14.');
  }

  var didWarnAboutReceivingStore = false;
  function warnAboutReceivingStore() {
    if (didWarnAboutReceivingStore) {
      return;
    }

    didWarnAboutReceivingStore = true;
    console.error( // eslint-disable-line no-console
    '<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
  }

  var Provider = (function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      return { store: this.store };
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      _Component.call(this, props, context);
      this.store = props.store;
    }

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var store = this.store;
      var nextStore = nextProps.store;

      if (store !== nextStore) {
        warnAboutReceivingStore();
      }
    };

    Provider.prototype.render = function render() {
      var children = this.props.children;

      if (typeof children === 'function') {
        warnAboutFunctionChild();
        children = children();
      } else {
        warnAboutElementChild();
      }

      return Children.only(children);
    };

    return Provider;
  })(Component);

  Provider.childContextTypes = {
    store: storeShape.isRequired
  };
  Provider.propTypes = {
    store: storeShape.isRequired,
    children: (requireFunctionChild ? PropTypes.func : PropTypes.element).isRequired
  };

  return Provider;
}

module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createConnect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilsCreateStoreShape = __webpack_require__(12);

var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

var _utilsShallowEqual = __webpack_require__(19);

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsIsPlainObject = __webpack_require__(20);

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _utilsWrapActionCreators = __webpack_require__(21);

var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

var _hoistNonReactStatics = __webpack_require__(26);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = __webpack_require__(27);

var _invariant2 = _interopRequireDefault(_invariant);

var defaultMapStateToProps = function defaultMapStateToProps() {
  return {};
};
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
  return _extends({}, parentProps, stateProps, dispatchProps);
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

// Helps track hot reloading.
var nextVersion = 0;

function createConnect(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var shouldSubscribe = Boolean(mapStateToProps);
    var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
    var finalMapDispatchToProps = _utilsIsPlainObject2['default'](mapDispatchToProps) ? _utilsWrapActionCreators2['default'](mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
    var finalMergeProps = mergeProps || defaultMergeProps;
    var shouldUpdateStateProps = finalMapStateToProps.length > 1;
    var shouldUpdateDispatchProps = finalMapDispatchToProps.length > 1;
    var _options$pure = options.pure;
    var pure = _options$pure === undefined ? true : _options$pure;

    // Helps track hot reloading.
    var version = nextVersion++;

    function computeStateProps(store, props) {
      var state = store.getState();
      var stateProps = shouldUpdateStateProps ? finalMapStateToProps(state, props) : finalMapStateToProps(state);

      _invariant2['default'](_utilsIsPlainObject2['default'](stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);
      return stateProps;
    }

    function computeDispatchProps(store, props) {
      var dispatch = store.dispatch;

      var dispatchProps = shouldUpdateDispatchProps ? finalMapDispatchToProps(dispatch, props) : finalMapDispatchToProps(dispatch);

      _invariant2['default'](_utilsIsPlainObject2['default'](dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);
      return dispatchProps;
    }

    function _computeNextState(stateProps, dispatchProps, parentProps) {
      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
      _invariant2['default'](_utilsIsPlainObject2['default'](mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
      return mergedProps;
    }

    return function wrapWithConnect(WrappedComponent) {
      var Connect = (function (_Component) {
        _inherits(Connect, _Component);

        Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
          if (!pure) {
            this.updateStateProps(nextProps);
            this.updateDispatchProps(nextProps);
            this.updateState(nextProps);
            return true;
          }

          var storeChanged = nextState.storeState !== this.state.storeState;
          var propsChanged = !_utilsShallowEqual2['default'](nextProps, this.props);
          var mapStateProducedChange = false;
          var dispatchPropsChanged = false;

          if (storeChanged || propsChanged && shouldUpdateStateProps) {
            mapStateProducedChange = this.updateStateProps(nextProps);
          }

          if (propsChanged && shouldUpdateDispatchProps) {
            dispatchPropsChanged = this.updateDispatchProps(nextProps);
          }

          if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
            this.updateState(nextProps);
            return true;
          }

          return false;
        };

        function Connect(props, context) {
          _classCallCheck(this, Connect);

          _Component.call(this, props, context);
          this.version = version;
          this.store = props.store || context.store;

          _invariant2['default'](this.store, 'Could not find "store" in either the context or ' + ('props of "' + this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + this.constructor.displayName + '".'));

          this.stateProps = computeStateProps(this.store, props);
          this.dispatchProps = computeDispatchProps(this.store, props);
          this.state = { storeState: null };
          this.updateState();
        }

        Connect.prototype.computeNextState = function computeNextState() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

          return _computeNextState(this.stateProps, this.dispatchProps, props);
        };

        Connect.prototype.updateStateProps = function updateStateProps() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

          var nextStateProps = computeStateProps(this.store, props);
          if (_utilsShallowEqual2['default'](nextStateProps, this.stateProps)) {
            return false;
          }

          this.stateProps = nextStateProps;
          return true;
        };

        Connect.prototype.updateDispatchProps = function updateDispatchProps() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

          var nextDispatchProps = computeDispatchProps(this.store, props);
          if (_utilsShallowEqual2['default'](nextDispatchProps, this.dispatchProps)) {
            return false;
          }

          this.dispatchProps = nextDispatchProps;
          return true;
        };

        Connect.prototype.updateState = function updateState() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

          this.nextState = this.computeNextState(props);
        };

        Connect.prototype.isSubscribed = function isSubscribed() {
          return typeof this.unsubscribe === 'function';
        };

        Connect.prototype.trySubscribe = function trySubscribe() {
          if (shouldSubscribe && !this.unsubscribe) {
            this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
            this.handleChange();
          }
        };

        Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        };

        Connect.prototype.componentDidMount = function componentDidMount() {
          this.trySubscribe();
        };

        Connect.prototype.componentWillUnmount = function componentWillUnmount() {
          this.tryUnsubscribe();
        };

        Connect.prototype.handleChange = function handleChange() {
          if (!this.unsubscribe) {
            return;
          }

          this.setState({
            storeState: this.store.getState()
          });
        };

        Connect.prototype.getWrappedInstance = function getWrappedInstance() {
          return this.refs.wrappedInstance;
        };

        Connect.prototype.render = function render() {
          return React.createElement(WrappedComponent, _extends({ ref: 'wrappedInstance'
          }, this.nextState));
        };

        return Connect;
      })(Component);

      Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
      Connect.WrappedComponent = WrappedComponent;
      Connect.contextTypes = {
        store: storeShape
      };
      Connect.propTypes = {
        store: storeShape
      };

      if (process.env.NODE_ENV !== 'production') {
        Connect.prototype.componentWillUpdate = function componentWillUpdate() {
          if (this.version === version) {
            return;
          }

          // We are hot reloading!
          this.version = version;

          // Update the state and bindings.
          this.trySubscribe();
          this.updateStateProps();
          this.updateDispatchProps();
          this.updateState();
        };
      }

      return _hoistNonReactStatics2['default'](Connect, WrappedComponent);
    };
  };
}

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = shallowEqual;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = exports["default"];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = isPlainObject;
var fnToString = function fnToString(fn) {
  return Function.prototype.toString.call(fn);
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

  if (proto === null) {
    return true;
  }

  var constructor = proto.constructor;

  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
}

module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = wrapActionCreators;

var _redux = __webpack_require__(1);

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return _redux.bindActionCreators(actionCreators, dispatch);
  };
}

module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(25);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(23), __webpack_require__(24)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



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

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

/* harmony default export */ __webpack_exports__["default"] = (thunk);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var redux_1 = __webpack_require__(1);
var auth_1 = __webpack_require__(30);
var cams_1 = __webpack_require__(31);
var app_1 = __webpack_require__(32);
exports["default"] = redux_1.combineReducers({
    app: app_1.app,
    auth: auth_1.auth,
    cams: cams_1.cams
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ACTION_TYPE_CONST_1 = __webpack_require__(4);
var defaultState = {
    login: "",
    password: "",
    save: false,
    error: "",
    SessionID: "",
    waitLoading: false
};
exports.auth = function (state, action) {
    if (state === void 0) { state = defaultState; }
    if (action.type === ACTION_TYPE_CONST_1.AUTH_ERROR) {
        return auth_error(state, action.payload);
    }
    if (action.type === ACTION_TYPE_CONST_1.AUTH_SUCCESS) {
        return auth_success(state, __assign({}, action.payload));
    }
    if (action.type === ACTION_TYPE_CONST_1.AUTH_LOADING) {
        return auth_loading(state, action.payload);
    }
    return state;
};
function auth_error(state, error) {
    return __assign({}, state, { error: error });
}
function auth_success(state, payload) {
    return __assign({}, state, payload, { error: "" });
}
function auth_loading(state, waitLoading) {
    return __assign({}, state, { waitLoading: waitLoading });
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ACTION_TYPE_CONST_1 = __webpack_require__(4);
var gridMaxItems = stb.__type__ === "mag" ? 3 : 3;
var defaultState = {
    items: [],
    gridActiveItemPosition: 0,
    gridMaxItems: gridMaxItems,
    grigPage: 0,
    gridLoading: false,
    currentPlay: undefined
};
exports.cams = function (state, action) {
    if (state === void 0) { state = defaultState; }
    if (action.type === ACTION_TYPE_CONST_1.CHANGE_CAMS_STATE) {
        state = changeCamsState(state, action);
    }
    return state;
};
var changeCamsState = function (state, action) {
    return __assign({}, state, action.payload);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ACTION_TYPE_CONST_1 = __webpack_require__(4);
var defaultState = {
    view: "/login"
};
exports.app = function (state, action) {
    if (state === void 0) { state = defaultState; }
    if (action.type === ACTION_TYPE_CONST_1.CHANGE_VIEW) {
        return changeView(state, action.payload);
    }
    return state;
};
function changeView(state, view) {
    return __assign({}, state, { view: view });
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var LoginForm_1 = __webpack_require__(34);
var style_1 = __webpack_require__(10);
var Header_1 = __webpack_require__(11);
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1["default"], null),
            React.createElement("div", { style: style_1.bodyStyle },
                React.createElement(LoginForm_1["default"], null))));
    };
    return Login;
}(React.Component));
exports["default"] = Login;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(10);
var style_2 = __webpack_require__(2);
var react_redux_1 = __webpack_require__(3);
var redux_1 = __webpack_require__(1);
var auth_1 = __webpack_require__(35);
var app_1 = __webpack_require__(6);
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refStore = {};
        _this.saveFormCheckBoxStatus = false;
        return _this;
    }
    LoginForm.prototype.render = function () {
        return (React.createElement("form", { style: style_1.loginFormStyle, onKeyDown: this.key.bind(this), onSubmit: this.submit.bind(this), ref: this.setRef.bind(this, "formRef") },
            this.ifElseLoading(),
            React.createElement("p", { style: {
                    fontSize: style_1.fontSize1,
                    color: style_1.colorError,
                    fontFamily: style_1.fontFamily1
                } }, this.props.error)));
    };
    LoginForm.prototype.ifElseLoading = function () {
        if (this.props.waitLoading) {
            return (React.createElement("img", { src: "./../forpost-app/img/loading_4.gif", style: {
                    margin: "100px auto",
                    display: "block"
                } }));
        }
        else {
            return this.fieldset();
        }
    };
    LoginForm.prototype.fieldset = function () {
        return (React.createElement("fieldset", null,
            React.createElement("legend", null,
                React.createElement("h1", { style: { color: style_2.color1, fontSize: "45px" } }, "\u0412\u0445\u043E\u0434")),
            React.createElement("div", null,
                React.createElement("label", { style: style_1.labelStyle },
                    "\u041B\u043E\u0433\u0438\u043D:",
                    React.createElement("input", { type: "text", style: this.mayBeFocusStyle(style_1.inputStyle, "loginRef"), ref: this.setRef.bind(this, "loginRef") }))),
            React.createElement("div", null,
                React.createElement("label", { style: style_1.labelStyle },
                    "\u041F\u0430\u0440\u043E\u043B\u044C:",
                    React.createElement("input", { type: "password", style: this.mayBeFocusStyle(style_1.inputStyle, "passwordRef"), ref: this.setRef.bind(this, "passwordRef") }))),
            React.createElement("div", null,
                React.createElement("label", { style: style_1.labelStyle },
                    "\u0417\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C:",
                    React.createElement("img", { src: this.checkboxImgUrl(), style: this.mayBeFocusStyle({
                            width: "30px",
                            height: "30px",
                            position: "absolute",
                            left: "147px",
                            top: "0px"
                        }, "inputRef"), tabIndex: -1, ref: this.setRef.bind(this, "inputRef") }))),
            React.createElement("div", null,
                React.createElement("label", { style: __assign({}, style_1.labelStyle, { top: "-10px" }) },
                    React.createElement("input", { type: "submit", value: "\u0412\u043E\u0439\u0442\u0438", style: this.mayBeFocusStyle(style_1.inputStyle, "submitRef"), ref: this.setRef.bind(this, "submitRef") })))));
    };
    LoginForm.prototype.setRef = function (name, elem) {
        this.refStore[name] = elem;
    };
    LoginForm.prototype.mayBeFocusStyle = function (style, elemName) {
        if (this.refStore[elemName] === document.activeElement) {
            return __assign({}, style, { border: "3px solid " + style_2.color1 });
        }
        return style;
    };
    LoginForm.prototype.checkboxImgUrl = function () {
        if (this.saveFormCheckBoxStatus) {
            return "./../forpost-app/img/baseline_check_box_black_36dp.png";
        }
        else {
            return "./../forpost-app/img/baseline_check_box_outline_blank_black_36dp.png";
        }
    };
    LoginForm.prototype.submit = function (e) {
        e.preventDefault();
    };
    LoginForm.prototype.switchVirtualKeyboard = function () {
        try {
            var status = stb.IsVirtualKeyboardActive();
        }
        catch (e) {
            console.log(e);
            status = false;
        }
        try {
            if (status) {
                stb.HideVirtualKeyboard();
            }
            else {
                stb.ShowVirtualKeyboard();
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    LoginForm.prototype.key = function (e) {
        if (e.key === "Escape") {
            try {
                stb.SetVideoState(1);
            }
            catch (e) {
                console.log(e);
            }
            location = "http://212.77.128.177/"; // parseGetParams("referrer");
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            this.navigate(e.key);
        }
        if (e.key === "Enter" &&
            (document.activeElement === this.refStore["loginRef"] ||
                document.activeElement === this.refStore["passwordRef"])) {
            this.switchVirtualKeyboard();
        }
        if (e.key === "Enter" &&
            document.activeElement === this.refStore["inputRef"]) {
            this.saveFormCheckBoxStatus = !this.saveFormCheckBoxStatus;
        }
        if (e.key === "Enter" &&
            document.activeElement === this.refStore["submitRef"]) {
            var loginInput = this.refStore["loginRef"];
            var passwordInput = this.refStore["passwordRef"];
            this.props.submit(loginInput.value, passwordInput.value, this.saveFormCheckBoxStatus);
        }
        this.forceUpdate();
    };
    LoginForm.prototype.navigate = function (key) {
        var _this = this;
        var refArrStore = Object.keys(this.refStore).map(function (key) {
            return _this.refStore[key];
        });
        var dif = 0;
        if (key === "ArrowDown") {
            dif = 1;
        }
        else if (key === "ArrowUp") {
            dif = -1;
        }
        var index = refArrStore.indexOf(document.activeElement);
        if (index === -1 || !refArrStore[index + dif]) {
            return;
        }
        refArrStore[index + dif].focus();
        if (document.activeElement === this.refStore["loginRef"] ||
            document.activeElement === this.refStore["passwordRef"]) {
            try {
                this.switchVirtualKeyboard();
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    LoginForm.prototype.componentDidMount = function () {
        var _this = this;
        var refArrStore = Object.keys(this.refStore).map(function (key) {
            return _this.refStore[key];
        });
        refArrStore[0].focus();
        this.forceUpdate();
        this.props.tryAutoLogin();
    };
    LoginForm.prototype.componentDidUpdate = function () {
        var _this = this;
        var refArrStore = Object.keys(this.refStore).map(function (key) {
            return _this.refStore[key];
        });
        if (refArrStore.indexOf(document.activeElement) === -1 &&
            refArrStore[0]) {
            refArrStore[0].focus();
        }
    };
    return LoginForm;
}(React.Component));
var LoginFormContainer = react_redux_1.connect(function (state) {
    return {
        error: state.auth.error,
        waitLoading: state.auth.waitLoading
    };
}, function (dispatch) {
    return redux_1.bindActionCreators({
        submit: auth_1.auth,
        tryAutoLogin: auth_1.tryAutoLogin,
        chageView: app_1.chageView
    }, dispatch);
})(LoginForm);
exports["default"] = LoginFormContainer;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utilites_1 = __webpack_require__(5);
var HTTP_1 = __webpack_require__(7);
var ACTION_TYPE_CONST_1 = __webpack_require__(4);
var app_1 = __webpack_require__(6);
var authError = function (payload) { return ({
    type: ACTION_TYPE_CONST_1.AUTH_ERROR,
    payload: payload
}); };
var authSuccess = function (SessionID, login, password, save) {
    return {
        type: ACTION_TYPE_CONST_1.AUTH_SUCCESS,
        payload: {
            SessionID: SessionID,
            login: login,
            password: password,
            save: save
        }
    };
};
var authLoading = function (payload) { return ({
    type: ACTION_TYPE_CONST_1.AUTH_LOADING,
    payload: payload
}); };
exports.auth = function (login, password, save) { return function (dispath, getState) {
    new utilites_1.SelfGuidedGenerator(function (self) {
        var data, profileJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispath(authError(""));
                    dispath(authLoading(true));
                    return [4 /*yield*/, HTTP_1.httpAutReq(login, password, self.next.bind(self))];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, utilites_1.delay(1000, self.next.bind(self))];
                case 2:
                    _a.sent();
                    dispath(authLoading(false));
                    if (data.Error) {
                        dispath(authError(data.Error));
                        return [2 /*return*/];
                    }
                    dispath(authSuccess(data.SessionID, login, password, save));
                    dispath(app_1.chageView("/panel"));
                    if (save) {
                        profileJson = JSON.stringify({
                            login: login,
                            password: password
                        });
                        try {
                            stb.RDir("setenv forpost_app_profile " + profileJson);
                        }
                        catch (e) {
                            localStorage.setItem("forpost_app_profile", profileJson);
                            console.log(e);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}; };
exports.tryAutoLogin = function () { return function (dispath, getState) {
    var profile;
    var profileJson;
    try {
        profileJson = stb.RDir("getenv forpost_app_profile");
    }
    catch (e) {
        profileJson = localStorage.getItem("forpost_app_profile");
        console.log(e);
    }
    if (profileJson) {
        try {
            profile = JSON.parse(profileJson);
            dispath(exports.auth(profile.login, profile.password, false));
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        return;
    }
}; };


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var style_1 = __webpack_require__(2);
exports.headerStyle = __assign({}, style_1.abstracktStyleFullWidhtElem, { height: "100px", top: "0px", background: style_1.color1 });
exports.logoStyle = {
    height: "60px",
    top: "25px",
    left: "100px",
    position: "absolute"
};
exports.nameAppStyle = {
    fontFamily: '"Open Sans", "Lato", sans-serif',
    fontSize: "32px",
    color: "#fff",
    top: "30px",
    left: "180px",
    position: "absolute"
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var Header_1 = __webpack_require__(11);
var Grid_1 = __webpack_require__(38);
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Panel.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Header_1["default"], null),
            React.createElement(Grid_1["default"], null)));
    };
    return Panel;
}(React.Component));
exports["default"] = Panel;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(3);
var style_1 = __webpack_require__(39);
var Rows_1 = __webpack_require__(40);
var cam_1 = __webpack_require__(43);
var redux_1 = __webpack_require__(1);
var utilites_1 = __webpack_require__(5);
var app_1 = __webpack_require__(6);
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        return (React.createElement("div", { style: style_1.gridStyle, onKeyDown: this.key.bind(this), ref: this.setRef.bind(this), tabIndex: 1 },
            this.renderLogic(),
            this.arrowR(),
            this.arrowL()));
    };
    Grid.prototype.renderLogic = function () {
        var _this = this;
        if (this.props.gridLoading) {
            return (React.createElement("img", { style: style_1.loadingStyle, src: "./../forpost-app/img/loading_3.gif" }));
        }
        var cams = this.getcamArr();
        if (cams.length <= 0) {
            return React.createElement("p", { style: style_1.noItemsMessageStyle }, "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0438\u0434\u0435\u043E\u043A\u0430\u043C\u0435\u0440!");
        }
        this.rows = [];
        var i = 0;
        cams.forEach(function (item) {
            _this.rows[i] = _this.rows[i] || [];
            if (_this.rows[i].length > 2) {
                i++;
                _this.rows[i] = _this.rows[i] || [];
            }
            _this.rows[i].push(item);
        });
        if (cams.length === 4) {
            this.rows = [[cams[0], cams[1]], [cams[2], cams[3]]];
        }
        if (cams.length === 3) {
            this.rows = [[cams[0], cams[1]], [cams[2]]];
        }
        return React.createElement(Rows_1.Rows, { rows: this.rows });
    };
    Grid.prototype.getcamArr = function () {
        var cams = this.props.items;
        var maxItems = this.props.gridMaxItems;
        var countItems = cams.length;
        var startIndex = maxItems * this.props.grigPage;
        var maxIndex = startIndex + maxItems - 1;
        maxIndex = maxIndex >= countItems ? countItems - 1 : maxIndex;
        if (maxIndex < startIndex) {
            return [];
        }
        var camArr = cams.filter(function (item, i) {
            var status;
            if (i < startIndex || i > maxIndex) {
                status = false;
            }
            else {
                status = true;
            }
            i++;
            return status;
        });
        return this.camtoCamMayBeActive(camArr);
    };
    Grid.prototype.camtoCamMayBeActive = function (cams) {
        var _this = this;
        return cams.map(function (item, i) {
            return __assign({}, item, { active: i === _this.props.gridActiveItemPosition });
        });
    };
    Grid.prototype.key = function (e) {
        var key = e.key;
        if (key === "Escape") {
            this.props.chageView("/exit");
        }
        if (key === "Enter") {
            var flatRowsArr = [].concat.apply([], __spread(this.rows));
            var activeItem = flatRowsArr[this.props.gridActiveItemPosition];
            this.props.changeStateCams(__assign({}, this.props, { currentPlay: activeItem }));
            this.props.play();
        }
        switch (key) {
            case "ArrowRight":
                this.changeActivePosition(1, 0);
                break;
            case "ArrowLeft":
                this.changeActivePosition(-1, 0);
                break;
            case "ArrowUp":
                this.changeActivePosition(0, -1);
                break;
            case "ArrowDown":
                this.changeActivePosition(0, 1);
                break;
        }
        var numbersKeyMap = {
            "49": 1,
            "50": 2,
            "51": 3,
            "52": 4,
            "53": 5,
            "54": 6,
            "55": 7,
            "56": 8,
            "57": 9
        };
        var num = numbersKeyMap[String(e.keyCode)];
        if (typeof num !== "undefined") {
            var self_1 = this;
            new utilites_1.SelfGuidedGenerator(function (g) {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self_1.props.changeStateCams({
                                gridLoading: true
                            });
                            return [4 /*yield*/, utilites_1.delay(200, g.next.bind(g))];
                        case 1:
                            _a.sent();
                            self_1.props.changeStateCams({
                                gridMaxItems: num,
                                gridActiveItemPosition: 0,
                                grigPage: 0,
                                gridLoading: false
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
    Grid.prototype.changeActivePosition = function (x, y) {
        var flatRowsArr = [].concat.apply([], __spread(this.rows));
        var activeItem = flatRowsArr[this.props.gridActiveItemPosition];
        var activeItemInRow = 0;
        var activeRowIndex = this.rows.reduce(function (p, c, i, a) {
            var activeItemIndex = c.indexOf(activeItem);
            if (activeItemIndex !== -1) {
                activeItemInRow = activeItemIndex;
                return i;
            }
            else {
                return p;
            }
        }, 0);
        var newRowType = typeof this.rows[activeRowIndex + y];
        var newItemType = this.rows[activeRowIndex + y]
            ? typeof this.rows[activeRowIndex + y][activeItemInRow + x]
            : "undefined";
        var newActiveItem;
        if (newRowType !== "undefined" && newItemType !== "undefined") {
            newActiveItem = this.rows[activeRowIndex + y][activeItemInRow + x];
        }
        else if (newRowType !== "undefined") {
            if (y) {
                newActiveItem = this.rows[activeRowIndex + y][this.rows[activeRowIndex + y].length - 1];
            }
            else {
                newActiveItem = activeItem;
            }
        }
        else {
            newActiveItem = activeItem;
        }
        var gridActiveItemPosition = flatRowsArr.indexOf(newActiveItem);
        this.props.changeStateCams({
            gridActiveItemPosition: gridActiveItemPosition
        });
        if (this.props.gridActiveItemPosition === gridActiveItemPosition) {
            this.changePage(x);
        }
    };
    Grid.prototype.changePage = function (dif) {
        if (!dif) {
            return;
        }
        var self = this;
        var grigPage = this.props.grigPage + dif;
        if (!this.pageExist(grigPage)) {
            return;
        }
        new utilites_1.SelfGuidedGenerator(function (g) {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self.props.changeStateCams({
                            gridLoading: true
                        });
                        return [4 /*yield*/, utilites_1.delay(200, g.next.bind(g))];
                    case 1:
                        _a.sent();
                        self.props.changeStateCams({
                            grigPage: grigPage,
                            gridActiveItemPosition: 0,
                            gridLoading: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Grid.prototype.pageExist = function (page) {
        var startIndex = this.props.gridMaxItems * page;
        if (typeof this.props.items[startIndex] === "undefined") {
            return false;
        }
        else {
            return true;
        }
    };
    Grid.prototype.arrowR = function () {
        if (this.pageExist(this.props.grigPage + 1)) {
            return (React.createElement("img", { src: "./../forpost-app/img/arrow-r.png", alt: "arrowR", style: style_1.arrowRStyle }));
        }
    };
    Grid.prototype.arrowL = function () {
        if (this.pageExist(this.props.grigPage - 1)) {
            return (React.createElement("img", { src: "./../forpost-app/img/arrow-l.png", alt: "arrowL", style: style_1.arrowLStyle }));
        }
    };
    Grid.prototype.setRef = function (ref) {
        this.ref = ref;
    };
    Grid.prototype.componentDidMount = function () {
        this.ref.focus();
        if (this.props.items.length > 0) {
            return;
        }
        this.props.changeStateCams({
            gridLoading: true
        });
        this.props.loadCamItems();
    };
    return Grid;
}(React.Component));
exports["default"] = react_redux_1.connect(function (state) { return state.cams; }, function (disptach) {
    return redux_1.bindActionCreators({
        changeStateCams: cam_1.changeStateCams,
        loadCamItems: cam_1.loadCamItems,
        play: cam_1.play,
        chageView: app_1.chageView
    }, disptach);
})(Grid);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var style_1 = __webpack_require__(2);
var paddingLeft = stb.__type__ === "mag" ? "80px" : "50px";
var paddingRight = stb.__type__ === "mag" ? "80px" : "50px";
exports.gridStyle = {
    top: "100px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    position: "absolute",
    background: "#212121",
    paddingLeft: paddingLeft,
    paddingRight: paddingRight
};
exports.noItemsMessageStyle = {
    color: style_1.color2,
    fontFamily: style_1.fontFamily1,
    fontSize: style_1.fontSize1,
    position: "relative",
    top: "20px",
    left: "100px"
};
exports.loadingStyle = {
    position: "relative",
    display: "block",
    margin: "auto",
    marginTop: "20%"
};
var left = stb.__type__ === "mag" ? "30px" : "0px";
var right = stb.__type__ === "mag" ? "30px" : "0px";
exports.arrowRStyle = {
    display: "block",
    position: "absolute",
    right: right,
    top: "46%"
};
exports.arrowLStyle = {
    display: "block",
    position: "absolute",
    left: left,
    top: "46%"
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var CamItem_1 = __webpack_require__(41);
var Rows = /** @class */ (function (_super) {
    __extends(Rows, _super);
    function Rows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rows.prototype.render = function () {
        var _this = this;
        var rows = this.props.rows.map(function (item, i) {
            i++;
            return _this.createRow("rowsId" + i, item, _this.props.rows.length);
        });
        return (React.createElement("div", { style: {
                height: "100%"
            } }, rows));
    };
    Rows.prototype.createRow = function (key, row, rowsCount) {
        var _this = this;
        var height = Math.round(100 / rowsCount) + "%";
        var style = { height: height, position: "relative" };
        var items = row.map(function (item, i) {
            i++;
            return _this.createItem(item, i - 1, row.length, key);
        });
        return (React.createElement("div", { style: style, key: key }, items));
    };
    Rows.prototype.createItem = function (cam, position, lengthRow, keyPrefix) {
        var width = Math.round(100 / lengthRow) + "%";
        var height = "100%";
        var top;
        var left = (100 / lengthRow) * position + "%";
        var style = {
            width: width,
            height: height,
            top: top,
            left: left,
            position: "absolute"
        };
        return (React.createElement("div", { style: style, key: keyPrefix + "_camItem_" + position },
            React.createElement(CamItem_1.CamItem, { cam: cam })));
    };
    return Rows;
}(React.Component));
exports.Rows = Rows;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var CamBody_1 = __webpack_require__(42);
var style_1 = __webpack_require__(13);
var CamItem = /** @class */ (function (_super) {
    __extends(CamItem, _super);
    function CamItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CamItem.prototype.render = function () {
        var style = this.props.cam.active ? style_1.camItemActiveStyle : style_1.camItemStyle;
        var _nameStyle = this.props.cam.active ? style_1.nameActiveStyle : style_1.nameStyle;
        return (React.createElement("div", { style: style },
            React.createElement(CamBody_1["default"], { cam: this.props.cam }),
            React.createElement("p", { style: _nameStyle }, this.props.cam.Name)));
    };
    return CamItem;
}(React.Component));
exports.CamItem = CamItem;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(13);
var utilites_1 = __webpack_require__(5);
var HTTP_1 = __webpack_require__(7);
var react_redux_1 = __webpack_require__(3);
var CamBody = /** @class */ (function (_super) {
    __extends(CamBody, _super);
    function CamBody(props) {
        var _this = _super.call(this, props) || this;
        _this.contentCoords = {
            width: 0,
            height: 0,
            left: 0,
            top: 0
        };
        _this.stbPlay = false;
        _this.mount = false;
        _this.state = {
            imgUrl: ""
        };
        return _this;
    }
    CamBody.prototype.render = function () {
        return React.createElement("div", { style: style_1.camBodyStyle }, this.getImg());
    };
    CamBody.prototype.setImgRef = function (elem) {
        this.refImg = elem;
    };
    CamBody.prototype.getImg = function () {
        var _a;
        var displayMedia = "none";
        var displayLoading = "block";
        if (this.state.imgUrl) {
            _a = __read([displayLoading, displayMedia], 2), displayMedia = _a[0], displayLoading = _a[1];
        }
        var loadingUrl = this.props.cam.active
            ? "./../forpost-app/img/loading_2.gif"
            : "./../forpost-app/img/loading_1.gif";
        return (React.createElement("div", { style: style_1.imgWrapStyle },
            this.getMediaContent(displayMedia),
            React.createElement("img", { style: __assign({}, style_1.imgLoadingStyle, { display: displayLoading }), src: loadingUrl })));
    };
    CamBody.prototype.getMediaContent = function (display) {
        if (stb.__type__ === "mag") {
            return (React.createElement("img", { style: __assign({}, style_1.imgCamStyle, { display: display }), src: this.state.imgUrl, ref: this.setImgRef.bind(this) }));
        }
        else {
            return (React.createElement("img", { style: __assign({}, style_1.imgCamStyle, { display: display }), src: this.state.imgUrl, ref: this.setImgRef.bind(this) }));
        }
    };
    CamBody.prototype.componentDidMount = function () {
        var self = this;
        self.mount = true;
        self.generator = new utilites_1.SelfGuidedGenerator(function (generator) {
            var mediaFormat, data, proxy, img, delayTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaFormat = stb.__type__ === "mag" ? "JPG" : "JPG";
                        return [4 /*yield*/, HTTP_1.httpGetTranslation(self.props.SessionID, self.props.cam.CameraID, mediaFormat, generator.next.bind(generator))];
                    case 1:
                        data = _a.sent();
                        proxy = stb.__type__ === "mag" ? "" : "";
                        data.URL = "" + proxy + data.URL;
                        img = new Image();
                        img.onload = function () {
                            generator.next(true);
                            img.onload = null;
                        };
                        img.src = data.URL;
                        return [4 /*yield*/];
                    case 2:
                        _a.sent(); //---------------
                        return [4 /*yield*/, utilites_1.delay(200, generator.next.bind(generator))];
                    case 3:
                        _a.sent();
                        self.setState(__assign({}, self.state, { imgUrl: data.URL }));
                        _a.label = 4;
                    case 4:
                        if (!self.mount) return [3 /*break*/, 6];
                        delayTime = stb.__type__ === "mag" ? 5000 : 2500;
                        return [4 /*yield*/, utilites_1.delay(delayTime, generator.next.bind(generator))];
                    case 5:
                        _a.sent();
                        self.setState(__assign({}, self.state, { imgUrl: data.URL + "?_" + Math.random() }));
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/];
                }
            });
        });
        return;
    };
    CamBody.prototype.componentDidUpdate = function () {
        var self = this;
        if (!self.props.cam.active) {
            self.stbPlay = false;
            self.contentCoords = {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            };
            return;
        }
        var coordImg = self.refImg.getBoundingClientRect();
        var coord = self.contentCoords;
        if (!(coordImg.height === coord.height &&
            coordImg.width === coord.width &&
            coordImg.top === coord.top &&
            coordImg.left === coord.left)) {
            self.contentCoords = coordImg;
            coord = coordImg;
            if (self.stbPlay) {
                try {
                    stb.SetViewport(coord.width * 1.5, coord.height * 1.5, coord.left * 1.5, coord.top * 1.5);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        if (!self.stbPlay && (stb.__type__ === "mag" || stb.__type__ === "tvip")) {
            new utilites_1.SelfGuidedGenerator(function (g) {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, HTTP_1.httpGetTranslation(self.props.SessionID, self.props.cam.CameraID, "HLS", g.next.bind(g))];
                        case 1:
                            data = _a.sent();
                            try {
                                stb.SetTopWin(0);
                                stb.SetViewport(coord.width * 1.5, coord.height * 1.5, coord.left * 1.5, coord.top * 1.5);
                                stb.PlaySolution("auto", data.URL);
                                stb.SetTopWin(1);
                                self.stbPlay = true;
                            }
                            catch (e) {
                                console.log(e);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
    CamBody.prototype.componentWillUnmount = function () {
        this.mount = false;
        this.generator["return"]();
        if (this.props.cam.active) {
            try {
                stb.Stop();
                stb.SetTopWin(0);
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    return CamBody;
}(React.Component));
exports["default"] = react_redux_1.connect(function (state) {
    return {
        SessionID: state.auth.SessionID
    };
})(CamBody);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ACTION_TYPE_CONST_1 = __webpack_require__(4);
var utilites_1 = __webpack_require__(5);
var HTTP_1 = __webpack_require__(7);
var app_1 = __webpack_require__(6);
exports.changeStateCams = function (payload) { return ({
    type: ACTION_TYPE_CONST_1.CHANGE_CAMS_STATE,
    payload: payload
}); };
exports.loadCamItems = function () { return function (dispatch, getState) {
    new utilites_1.SelfGuidedGenerator(function (gen) {
        var auth, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auth = getState().auth;
                    if (!auth.SessionID) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, HTTP_1.getCameras(auth.SessionID, gen.next.bind(gen))];
                case 1:
                    items = _a.sent();
                    dispatch(exports.changeStateCams({
                        gridLoading: false,
                        items: items
                    }));
                    return [2 /*return*/];
            }
        });
    });
}; };
exports.play = function () { return function (dispatch, getState) {
    dispatch(app_1.chageView("/player"));
}; };


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var React = __webpack_require__(0);
var react_redux_1 = __webpack_require__(3);
var app_1 = __webpack_require__(6);
var redux_1 = __webpack_require__(1);
var Body_1 = __webpack_require__(45);
var style_1 = __webpack_require__(8);
var utilites_1 = __webpack_require__(5);
var HTTP_1 = __webpack_require__(7);
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loading: true,
            playStatus: false
        };
        return _this;
    }
    Player.prototype.render = function () {
        return React.createElement("div", { style: style_1.style }, this.content());
    };
    Player.prototype.content = function () {
        if (this.state.loading) {
            return this.loadingImg();
        }
        else {
            return this.getBody();
        }
    };
    Player.prototype.loadingImg = function () {
        return (React.createElement("img", { style: style_1.imgLoadingStyle, src: "./../forpost-app/img/loading_5.gif" }));
    };
    Player.prototype.getBody = function () {
        return (React.createElement(Body_1["default"], { items: this.props.items, gridActiveItemPosition: this.props.gridActiveItemPosition, gridMaxItems: this.props.gridMaxItems, grigPage: this.props.grigPage, gridLoading: this.props.gridLoading, chageView: this.props.chageView, loading: this.state.loading, playStatus: this.state.playStatus, playerChangeState: this.playerChangeState, currentPlay: this.props.currentPlay, SessionID: this.props.SessionID }));
    };
    Player.prototype.playerChangeState = function (newState) {
        this.setState(__assign({}, this.state, newState));
    };
    Player.prototype.componentDidMount = function () {
        var self = this;
        new utilites_1.SelfGuidedGenerator(function (g) {
            var data, eventListener_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HTTP_1.httpGetTranslation(self.props.SessionID, self.props.currentPlay.CameraID, "HLS", g.next.bind(g))];
                    case 1:
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        stb.SetTopWin(0);
                        stb.SetPIG(1, 0, 0, 0);
                        stb.PlaySolution("auto", data.URL);
                        eventListener_1 = function (event) {
                            if (event == 4) {
                                g.next(true);
                                stb.rmEvenListener(eventListener_1);
                            }
                        };
                        stb.addEventListener(eventListener_1);
                        return [4 /*yield*/];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        self.playerChangeState(__assign({}, self.state, { loading: false, playStatus: true }));
                        return [2 /*return*/];
                }
            });
        });
    };
    return Player;
}(React.Component));
exports["default"] = react_redux_1.connect(function (state) {
    return __assign({}, state.cams, { SessionID: state.auth.SessionID });
}, function (disptach) {
    return redux_1.bindActionCreators({
        chageView: app_1.chageView
    }, disptach);
})(Player);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(8);
var ControlPanel_1 = __webpack_require__(46);
var PlayerBody = /** @class */ (function (_super) {
    __extends(PlayerBody, _super);
    function PlayerBody(props) {
        return _super.call(this, props) || this;
    }
    PlayerBody.prototype.render = function () {
        return (React.createElement("div", { tabIndex: 1, ref: this.setElem.bind(this), onKeyDown: this.key.bind(this), style: style_1.playerBodyStyle },
            React.createElement(ControlPanel_1["default"], null)));
    };
    PlayerBody.prototype.componentDidMount = function () {
        this.elem.focus();
    };
    PlayerBody.prototype.setElem = function (elem) {
        this.elem = elem;
    };
    PlayerBody.prototype.key = function (e) {
        console.log(e.key);
        if (e.key === "Backspace" || e.key === "Escape") {
            this.props.chageView("/panel");
            try {
                stb.Stop();
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    return PlayerBody;
}(React.Component));
exports["default"] = PlayerBody;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(8);
var PlayerButtons_1 = __webpack_require__(47);
var ControlPanel = /** @class */ (function (_super) {
    __extends(ControlPanel, _super);
    function ControlPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlPanel.prototype.render = function () {
        return (React.createElement("div", { style: style_1.controlPanelStyle },
            React.createElement(PlayerButtons_1["default"], null),
            React.createElement("div", null)));
    };
    return ControlPanel;
}(React.Component));
exports["default"] = ControlPanel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(8);
var PlayPauseButton_1 = __webpack_require__(48);
var PlayerButtons = /** @class */ (function (_super) {
    __extends(PlayerButtons, _super);
    function PlayerButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerButtons.prototype.render = function () {
        return (React.createElement("div", { style: style_1.playerButtonsStyle },
            React.createElement(PlayPauseButton_1["default"], null)));
    };
    return PlayerButtons;
}(React.Component));
exports["default"] = PlayerButtons;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = __webpack_require__(0);
var PlayPauseButton = /** @class */ (function (_super) {
    __extends(PlayPauseButton, _super);
    function PlayPauseButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayPauseButton.prototype.render = function () {
        return (React.createElement("img", { style: {
                position: "absolute",
                left: "0px",
                top: "0px",
                display: "block"
            }, src: "./../forpost-app/img/baseline_pause_white_24dp.png" }));
    };
    return PlayPauseButton;
}(React.Component));
exports["default"] = PlayPauseButton;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = __webpack_require__(0);
var style_1 = __webpack_require__(10);
var style_2 = __webpack_require__(2);
var Header_1 = __webpack_require__(11);
var react_redux_1 = __webpack_require__(3);
var app_1 = __webpack_require__(6);
var redux_1 = __webpack_require__(1);
exports.inputStyle = {
    color: style_2.color1,
    fontSize: style_1.fontSize1,
    width: "100%"
};
var Exit = /** @class */ (function (_super) {
    __extends(Exit, _super);
    function Exit(props) {
        var _this = _super.call(this, props) || this;
        _this.refArrStore = [];
        _this.refStore = {};
        return _this;
    }
    Exit.prototype.render = function () {
        return (React.createElement("div", { onKeyDown: this.key.bind(this) },
            React.createElement(Header_1["default"], null),
            React.createElement("div", { style: style_1.bodyStyle },
                React.createElement("div", { style: style_1.loginFormStyle },
                    React.createElement("fieldset", null,
                        React.createElement("legend", null,
                            React.createElement("h1", { style: { color: style_2.color1, fontSize: "30px" } }, "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u044B\u0439\u0442\u0438?")),
                        React.createElement("label", { style: __assign({}, style_1.labelStyle, { top: "-10px", marginTop: "20px" }) },
                            React.createElement("input", { type: "submit", value: "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F", style: this.mayBeFocusStyle(exports.inputStyle, "exitApp"), ref: this.setRef.bind(this, "exitApp"), onKeyDown: this.keyDownItem.bind(this) })),
                        React.createElement("label", { style: __assign({}, style_1.labelStyle, { top: "-10px" }) },
                            React.createElement("input", { type: "submit", value: "\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430", style: this.mayBeFocusStyle(exports.inputStyle, "exitAcc"), ref: this.setRef.bind(this, "exitAcc"), onKeyDown: this.keyDownItem.bind(this) })),
                        React.createElement("label", { style: __assign({}, style_1.labelStyle, { top: "-10px" }) },
                            React.createElement("input", { type: "submit", value: "\u041E\u0442\u043C\u0435\u043D\u0430", style: this.mayBeFocusStyle(exports.inputStyle, "cancel"), ref: this.setRef.bind(this, "cancel"), onKeyDown: this.keyDownItem.bind(this) })))))));
    };
    Exit.prototype.setRef = function (name, elem) {
        this.refArrStore.push(elem);
        this.refStore[name] = elem;
    };
    Exit.prototype.mayBeFocusStyle = function (style, elemName) {
        if (this.refStore[elemName] === document.activeElement) {
            return __assign({}, style, { border: "3px solid " + style_2.color1 });
        }
        return style;
    };
    Exit.prototype.key = function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            this.navigate(e.key);
            this.setState({});
        }
    };
    Exit.prototype.keyDownItem = function (e) {
        if (e.key !== "Enter") {
            return false;
        }
        e.stopPropagation();
        if (this.refStore["exitApp"] === document.activeElement) {
            try {
                stb.SetVideoState(1);
            }
            catch (e) {
                console.log(e);
            }
            location = "http://212.77.128.177/"; // parseGetParams("referrer");
        }
        else if (this.refStore["exitAcc"] === document.activeElement) {
            try {
                stb.RDir("setenv forpost_app_profile  ");
            }
            catch (e) {
                localStorage.removeItem("forpost_app_profile");
                console.log(e);
            }
            this.props.chageView("/login");
        }
        else {
            this.props.chageView("/panel");
            console.log("cancel");
        }
    };
    Exit.prototype.navigate = function (key) {
        var dif = 0;
        if (key === "ArrowDown") {
            dif = 1;
        }
        else if (key === "ArrowUp") {
            dif = -1;
        }
        var index = this.refArrStore.indexOf(document.activeElement);
        if (index === -1 || !this.refArrStore[index + dif]) {
            return;
        }
        this.refArrStore[index + dif].focus();
    };
    Exit.prototype.componentDidMount = function () {
        this.refArrStore[0].focus();
        this.setState({});
    };
    return Exit;
}(React.Component));
exports["default"] = react_redux_1.connect(null, function (dispatch) {
    return redux_1.bindActionCreators({
        chageView: app_1.chageView
    }, dispatch);
})(Exit);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map