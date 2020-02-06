'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var reactRouterDom = require('react-router-dom');
var axios = _interopDefault(require('axios'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var _routerApiRouter; // router props
var _currentRouterChildren = []; // 子路由
var _completeRouterConfig = []; // 完整配置
function setCompleteRouterConfig(completeRouterConfig) {
    _completeRouterConfig = completeRouterConfig;
}
function getCurrentRouterChildren() {
    return _currentRouterChildren;
}
function setCurrentRouterChildren(children) {
    _currentRouterChildren = children;
}
function setRouterApiRouter(routerApiRouter) {
    _routerApiRouter = routerApiRouter;
}
var Navigation = /** @class */ (function () {
    function Navigation() {
    }
    Navigation.routerConfig = function () {
        return _completeRouterConfig;
    };
    Navigation.location = function () {
        return _routerApiRouter.location;
    };
    Navigation.params = function () {
        return _routerApiRouter.match.params;
    };
    Navigation.push = function (path) {
        return _routerApiRouter.history.push(path);
    };
    Navigation.replace = function (path) {
        return _routerApiRouter.history.push(path);
    };
    Navigation.go = function (num) {
        return _routerApiRouter.history.go(num);
    };
    Navigation.back = function () {
        return _routerApiRouter.history.goBack();
    };
    return Navigation;
}());

function renderRouter(routers, render) {
    return routers.map(function (item, index) {
        var Component;
        if (!!item.asyncComponent) {
            Component = React__default.lazy(item.asyncComponent);
        }
        else if (!!item.component) {
            Component = item.component;
        }
        var props = {
            exact: !!item.exact,
            path: item.path,
            key: index,
            render: function (props) {
                var _a;
                var children = (_a = item.children, (_a !== null && _a !== void 0 ? _a : []));
                setRouterApiRouter(props);
                setCurrentRouterChildren(children);
                if (props.location.pathname === item.path && item.redirect) {
                    props.history.replace(item.redirect);
                }
                return (React__default.createElement(Component, __assign({}, props)));
            }
        };
        if (render)
            return render(props);
        return (React__default.createElement(reactRouterDom.Route, __assign({}, props)));
    });
}
function App(props) {
    var _a;
    var loading = (_a = React.useContext(LoadingContext), (_a !== null && _a !== void 0 ? _a : null));
    return (React__default.createElement(React.Suspense, { fallback: loading },
        React__default.createElement(reactRouterDom.HashRouter, null,
            React__default.createElement(reactRouterDom.Switch, null, renderRouter(props.routers)))));
}

var RouterConfigError = /** @class */ (function () {
    function RouterConfigError(message) {
        this.message = message;
        this.name = "RouterConfigError";
    }
    return RouterConfigError;
}());

function assert(condition, err) {
    if (!condition) {
        throw err;
    }
}
// merge router path
function mergePath(routers) {
    return (function di(items, prePath) {
        if (prePath === void 0) { prePath = ""; }
        return items.map(function (item) {
            if (!!item.path) {
                assert(item.path.startsWith("/", 0), new RouterConfigError(item.path + " \u8DEF\u7531 \u5FC5\u987B\u4EE5\u2018/\u2019\u5F00\u5934"));
            }
            var path = "" + prePath + item.path;
            path = path.replace(/\/\//, "/");
            var children = item.children || [];
            return __assign(__assign({}, item), { path: path, children: di(children, path) });
        });
    })(routers, "");
}
// 深查找
function findDeep(value, values, key, childrenKey, match) {
    if (key === void 0) { key = "path"; }
    if (childrenKey === void 0) { childrenKey = "children"; }
    if (match === void 0) { match = function (value, values) { return false; }; }
    var target;
    var paths = [];
    var di = function (items, index) {
        var _a;
        for (var i = 0; i < items.length; i++) {
            if (items[i][key] === value || match(value, items[i][key])) {
                target = items[i];
                var pathr = [i];
                if (index !== -1)
                    pathr.unshift(index);
                paths = __spreadArrays(paths, pathr);
                break;
            }
            di((_a = items[i][childrenKey], (_a !== null && _a !== void 0 ? _a : [])), i);
        }
    };
    di(values, -1);
    // @ts-ignore
    return [target, paths];
}
// 是不是函数
function isFunction(fun) {
    return typeof fun === "function";
}

var tag = "@";
var StoreContext = React__default.createContext({});
var StoreProvider = function (props) {
    var reducer = splitReducerAndState(props.value);
    var _a = React.useReducer(reducer, props.value), models = _a[0], dispatch = _a[1];
    return React__default.createElement(StoreContext.Provider, { value: {
            models: models,
            dispatch: dispatch
        } }, props.children);
};
function splitReducerAndState(models) {
    var actionMap = new Map();
    Object.keys(models).forEach(function (key) {
        var reducers = models[key].reducers;
        Object.keys(reducers).forEach(function (reducerKey) {
            actionMap.set("" + key + tag + reducerKey, reducers[reducerKey]);
        });
    });
    var reducer = function (state, action) {
        var _a;
        var _b;
        var paths = action.type.split(tag);
        var namespace = (_b = paths[0], (_b !== null && _b !== void 0 ? _b : ""));
        return __assign(__assign({}, state), (_a = {}, _a[namespace] = __assign(__assign({}, state[namespace]), { state: Reflect.apply(actionMap.get(action.type), null, [state[namespace].state, action.payload]) }), _a));
    };
    return reducer;
}
// store
function useStore(namespace) {
    var _a;
    assert(!!namespace, new UseStoreError("请传入namespace"));
    var _b = React.useContext(StoreContext), models = _b.models, dispatch = _b.dispatch;
    var state = (_a = models) === null || _a === void 0 ? void 0 : _a[namespace].state;
    var dispatchHandler = function (actionName, payload) {
        var _a;
        assert(!!actionName, new DispatchError("请传入actionName"));
        var action = {
            type: "" + namespace + tag + actionName,
            payload: payload
        };
        (_a = dispatch) === null || _a === void 0 ? void 0 : _a(action);
    };
    return { state: state, dispatch: dispatchHandler };
}
function createModel(model) {
    return model;
}
var UseStoreError = /** @class */ (function () {
    function UseStoreError(message) {
        this.message = message;
        this.name = "UseStoreError";
    }
    return UseStoreError;
}());
var DispatchError = /** @class */ (function () {
    function DispatchError(message) {
        this.message = message;
        this.name = "DispatchError";
    }
    return DispatchError;
}());

var CacheManager = /** @class */ (function () {
    function CacheManager(maxCache) {
        if (maxCache === void 0) { maxCache = -1; }
        this.cache = {};
        this.localCache = {};
        this.cacheKeys = [];
        this.maxCache = maxCache;
    }
    CacheManager.prototype.add = function (path, data, local) {
        if (local === void 0) { local = false; }
        if (local) {
            this.localCache[path] = data;
            return;
        }
        var _a = this, cacheKeys = _a.cacheKeys, maxCache = _a.maxCache, cache = _a.cache;
        if (!(path in cache)) {
            cacheKeys.push(path);
        }
        cache[path] = data;
        if (maxCache !== -1 && cacheKeys.length > maxCache) {
            var deleteKey = cacheKeys.shift();
            delete cache[deleteKey];
        }
    };
    CacheManager.prototype.get = function (path) {
        var localData = this.localCache[path];
        return localData ? localData : this.cache[path];
    };
    CacheManager.prototype.delete = function (path) {
        delete this.cache[path];
        this.cacheKeys = this.cacheKeys.filter(function (key) { return key === path; });
    };
    CacheManager.prototype.clear = function (clearLocalCache) {
        if (clearLocalCache === void 0) { clearLocalCache = false; }
        this.cacheKeys = [];
        this.cache = {};
        clearLocalCache && (this.localCache = {});
    };
    CacheManager.prototype.focus = function (path) {
        if (!this.cache[path]) {
            return;
        }
        var keys = this.cacheKeys.filter(function (key) { return path !== key; });
        keys.push(path);
        this.cacheKeys = keys;
    };
    return CacheManager;
}());

var Updater = /** @class */ (function (_super) {
    __extends(Updater, _super);
    function Updater() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prevPath = "";
        return _this;
    }
    Updater.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return nextProps.location.pathname !== this.prevPath || nextProps.deps.join(",") !== this.props.deps.join(",");
    };
    Updater.prototype.render = function () {
        var _a = this.props, children = _a.children, options = __rest(_a, ["children"]);
        var prevPath = this.prevPath;
        this.prevPath = options.location.pathname;
        return typeof children === "function" ? children(__assign({ currentPath: this.prevPath, prevPath: prevPath }, options)) : null;
    };
    return Updater;
}(React.Component));
var RouteUpdater = reactRouterDom.withRouter(Updater);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pubsub = createCommonjsModule(function (module, exports) {
/**
 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
 * License: MIT - http://mrgnrdrck.mit-license.org
 *
 * https://github.com/mroderick/PubSubJS
 */

(function (root, factory){

    var PubSub = {};
    root.PubSub = PubSub;

    var define = root.define;

    factory(PubSub);

    // AMD support
    if (typeof define === 'function' && define.amd){
        define(function() { return PubSub; });

        // CommonJS and Node.js module support
    } else {
        if (module !== undefined && module.exports) {
            exports = module.exports = PubSub; // Node.js specific `module.exports`
        }
        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
        module.exports = exports = PubSub; // CommonJS
    }

}(( typeof window === 'object' && window ) || commonjsGlobal, function (PubSub){

    var messages = {},
        lastUid = -1;

    function hasKeys(obj){
        var key;

        for (key in obj){
            if ( obj.hasOwnProperty(key) ){
                return true;
            }
        }
        return false;
    }

    /**
     * Returns a function that throws the passed exception, for use as argument for setTimeout
     * @alias throwException
     * @function
     * @param { Object } ex An Error object
     */
    function throwException( ex ){
        return function reThrowException(){
            throw ex;
        };
    }

    function callSubscriberWithDelayedExceptions( subscriber, message, data ){
        try {
            subscriber( message, data );
        } catch( ex ){
            setTimeout( throwException( ex ), 0);
        }
    }

    function callSubscriberWithImmediateExceptions( subscriber, message, data ){
        subscriber( message, data );
    }

    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
        var subscribers = messages[matchedMessage],
            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
            s;

        if ( !messages.hasOwnProperty( matchedMessage ) ) {
            return;
        }

        for (s in subscribers){
            if ( subscribers.hasOwnProperty(s)){
                callSubscriber( subscribers[s], originalMessage, data );
            }
        }
    }

    function createDeliveryFunction( message, data, immediateExceptions ){
        return function deliverNamespaced(){
            var topic = String( message ),
                position = topic.lastIndexOf( '.' );

            // deliver the message as it is now
            deliverMessage(message, message, data, immediateExceptions);

            // trim the hierarchy and deliver message to each level
            while( position !== -1 ){
                topic = topic.substr( 0, position );
                position = topic.lastIndexOf('.');
                deliverMessage( message, topic, data, immediateExceptions );
            }
        };
    }

    function messageHasSubscribers( message ){
        var topic = String( message ),
            found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
            position = topic.lastIndexOf( '.' );

        while ( !found && position !== -1 ){
            topic = topic.substr( 0, position );
            position = topic.lastIndexOf( '.' );
            found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
        }

        return found;
    }

    function publish( message, data, sync, immediateExceptions ){
        message = (typeof message === 'symbol') ? message.toString() : message;

        var deliver = createDeliveryFunction( message, data, immediateExceptions ),
            hasSubscribers = messageHasSubscribers( message );

        if ( !hasSubscribers ){
            return false;
        }

        if ( sync === true ){
            deliver();
        } else {
            setTimeout( deliver, 0 );
        }
        return true;
    }

    /**
     * Publishes the message, passing the data to it's subscribers
     * @function
     * @alias publish
     * @param { String } message The message to publish
     * @param {} data The data to pass to subscribers
     * @return { Boolean }
     */
    PubSub.publish = function( message, data ){
        return publish( message, data, false, PubSub.immediateExceptions );
    };

    /**
     * Publishes the message synchronously, passing the data to it's subscribers
     * @function
     * @alias publishSync
     * @param { String } message The message to publish
     * @param {} data The data to pass to subscribers
     * @return { Boolean }
     */
    PubSub.publishSync = function( message, data ){
        return publish( message, data, true, PubSub.immediateExceptions );
    };

    /**
     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
     * @function
     * @alias subscribe
     * @param { String } message The message to subscribe to
     * @param { Function } func The function to call when a new message is published
     * @return { String }
     */
    PubSub.subscribe = function( message, func ){
        if ( typeof func !== 'function'){
            return false;
        }

        message = (typeof message === 'symbol') ? message.toString() : message;

        // message is not registered yet
        if ( !messages.hasOwnProperty( message ) ){
            messages[message] = {};
        }

        // forcing token as String, to allow for future expansions without breaking usage
        // and allow for easy use as key names for the 'messages' object
        var token = 'uid_' + String(++lastUid);
        messages[message][token] = func;
        
        // return token for unsubscribing
        return token;
    };

    /**
     * Subscribes the passed function to the passed message once
     * @function
     * @alias subscribeOnce
     * @param { String } message The message to subscribe to
     * @param { Function } func The function to call when a new message is published
     * @return { PubSub }
     */
    PubSub.subscribeOnce = function( message, func ){
        var token = PubSub.subscribe( message, function(){
            // before func apply, unsubscribe message
            PubSub.unsubscribe( token );
            func.apply( this, arguments );
        });
        return PubSub;
    };

    /**
     * Clears all subscriptions
     * @function
     * @public
     * @alias clearAllSubscriptions
     */
    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
        messages = {};
    };

    /**
     * Clear subscriptions by the topic
     * @function
     * @public
     * @alias clearAllSubscriptions
     * @return { int }
     */
    PubSub.clearSubscriptions = function clearSubscriptions(topic){
        var m;
        for (m in messages){
            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
                delete messages[m];
            }
        }
    };

    /** 
       Count subscriptions by the topic
     * @function
     * @public
     * @alias countSubscriptions
     * @return { Array }
    */
    PubSub.countSubscriptions = function countSubscriptions(topic){
        var m;
        var count = 0;
        for (m in messages){
            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
                count++;
            }
        }
        return count;
    };

    
    /** 
       Gets subscriptions by the topic
     * @function
     * @public
     * @alias getSubscriptions
    */
    PubSub.getSubscriptions = function getSubscriptions(topic){
        var m;
        var list = [];
        for (m in messages){
            if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
                list.push(m);
            }
        }
        return list;
    };

    /**
     * Removes subscriptions
     *
     * - When passed a token, removes a specific subscription.
     *
	 * - When passed a function, removes all subscriptions for that function
     *
	 * - When passed a topic, removes all subscriptions for that topic (hierarchy)
     * @function
     * @public
     * @alias subscribeOnce
     * @param { String | Function } value A token, function or topic to unsubscribe from
     * @example // Unsubscribing with a token
     * var token = PubSub.subscribe('mytopic', myFunc);
     * PubSub.unsubscribe(token);
     * @example // Unsubscribing with a function
     * PubSub.unsubscribe(myFunc);
     * @example // Unsubscribing from a topic
     * PubSub.unsubscribe('mytopic');
     */
    PubSub.unsubscribe = function(value){
        var descendantTopicExists = function(topic) {
                var m;
                for ( m in messages ){
                    if ( messages.hasOwnProperty(m) && m.indexOf(topic) === 0 ){
                        // a descendant of the topic exists:
                        return true;
                    }
                }

                return false;
            },
            isTopic    = typeof value === 'string' && ( messages.hasOwnProperty(value) || descendantTopicExists(value) ),
            isToken    = !isTopic && typeof value === 'string',
            isFunction = typeof value === 'function',
            result = false,
            m, message, t;

        if (isTopic){
            PubSub.clearSubscriptions(value);
            return;
        }

        for ( m in messages ){
            if ( messages.hasOwnProperty( m ) ){
                message = messages[m];

                if ( isToken && message[value] ){
                    delete message[value];
                    result = value;
                    // tokens are unique, so we can just stop here
                    break;
                }

                if (isFunction) {
                    for ( t in message ){
                        if (message.hasOwnProperty(t) && message[t] === value){
                            delete message[t];
                            result = true;
                        }
                    }
                }
            }
        }

        return result;
    };
}));
});
var pubsub_1 = pubsub.PubSub;

// 匹配缓存
function matchCache(path, cacheKeys) {
    return !!cacheKeys.find(function (item) { return item === path; });
}
var CacheSwitch = /** @class */ (function (_super) {
    __extends(CacheSwitch, _super);
    function CacheSwitch(props) {
        var _this = _super.call(this, props) || this;
        _this.prevPath = "";
        _this.cacheManager = new CacheManager(props.maxRoutes);
        return _this;
    }
    CacheSwitch.prototype.render = function () {
        var _this = this;
        var _a = this.props, maxRoutes = _a.maxRoutes, children = _a.children, cacheKeys = _a.cacheKeys;
        var cacheManager = this.cacheManager;
        return React.createElement(RouteUpdater, { deps: cacheKeys }, function (_a) {
            var currentPath = _a.currentPath, prevPath = _a.prevPath;
            return React.Children.map(children, function (child, index) {
                if (!React.isValidElement(child)) {
                    return null;
                }
                var props = child.props, match = reactRouterDom.matchPath(currentPath, props);
                if (match) {
                    _this.prevPath = currentPath;
                    maxRoutes !== -1 && cacheManager.focus(currentPath);
                }
                var paths = props.path;
                if (!Array.isArray(paths)) {
                    paths = [paths || ''];
                }
                var key = match ? _this.prevPath : paths.join(',');
                // @ts-ignore
                if (child.type["displayName"] === "CacheRoute") {
                    var isCache = matchCache(key, cacheKeys);
                    if (!isCache) { // 如果没被缓存则清除缓存
                        cacheManager.delete(key);
                    }
                    var cacheRoute_1 = cacheManager.get(key);
                    setTimeout(function () {
                        // 触发（激活）钩子
                        cacheRoute_1 && match && pubsub.publish("activate" + key, null);
                        // 触发（失激钩子）
                        if (cacheRoute_1 && !match && prevPath !== currentPath) {
                            pubsub.publish("deactivated" + prevPath, null);
                        }
                    });
                    // 未匹配或者cacheRoute存在时且开启了缓存时直接返回；
                    if (!match || cacheRoute_1) {
                        return cacheRoute_1;
                    }
                    cacheRoute_1 = React.cloneElement(child, __assign(__assign({ key: key || index }, props), { cache: isCache }));
                    // 判断是否开启缓存
                    if (key && isCache) {
                        cacheManager.add(key, cacheRoute_1, props.local);
                    }
                    return cacheRoute_1;
                }
                else {
                    return match ? React.cloneElement(child, __assign({ key: key || index }, props)) : null;
                }
            });
        });
    };
    CacheSwitch.defaultProps = {
        maxRoutes: -1,
        cacheKeys: []
    };
    return CacheSwitch;
}(React.Component));

var CachePage = /** @class */ (function (_super) {
    __extends(CachePage, _super);
    function CachePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CachePage.prototype.shouldComponentUpdate = function () {
        return false;
    };
    CachePage.prototype.render = function () {
        var children = this.props.children;
        return typeof children === "function" && children();
    };
    return CachePage;
}(React.Component));

var CacheRoute = /** @class */ (function (_super) {
    __extends(CacheRoute, _super);
    function CacheRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CacheRoute.prototype.render = function () {
        var _this = this;
        var _a = this.props, local = _a.local, children = _a.children, component = _a.component, render = _a.render, options = __rest(_a, ["local", "children", "component", "render"]);
        return React.createElement(reactRouterDom.Route, null, function (routeProps) {
            var path = routeProps.location.pathname, match = reactRouterDom.matchPath(path, options);
            // 当不匹配且不缓存时返回null
            if (!match && !_this.props.cache) {
                return null;
            }
            var props = Object.assign({}, routeProps, { match: match });
            if (Array.isArray(children) && children.length === 0) {
                children = null;
            }
            if (isFunction(children)) {
                children = children(props);
            }
            return React.createElement("div", { style: { display: match ? '' : 'none' } },
                React.createElement(CachePage, null, function () {
                    return children
                        ? children
                        : component
                            ? React.createElement(component, props)
                            : (render ? render(props) : null);
                }));
        });
    };
    CacheRoute.displayName = 'CacheRoute';
    CacheRoute.defaultProps = {
        local: false
    };
    return CacheRoute;
}(React.Component));

var NavigationView = React__default.memo(function (props) {
    var _a, _b;
    var loading = (_a = React.useContext(LoadingContext), (_a !== null && _a !== void 0 ? _a : null));
    var children = React.useState(getCurrentRouterChildren())[0];
    var SWITCH = props.cacheKeys ? CacheSwitch : reactRouterDom.Switch;
    var ROUTER = props.cacheKeys ? CacheRoute : reactRouterDom.Route;
    return (React__default.createElement(React.Suspense, { fallback: loading },
        React__default.createElement(SWITCH, { cacheKeys: (_b = props.cacheKeys, (_b !== null && _b !== void 0 ? _b : [])) }, renderRouter(children, function (props) {
            return React__default.createElement(ROUTER, __assign({}, props));
        }))));
});

// axios.interceptors.response.use(function (response) {
//     return response.data;
// }, function (error) {
//     return Promise.reject(error);
// });
function useApi(api) {
    var _a = React.useState(false), loading = _a[0], setLoading = _a[1];
    var load = function () {
        setLoading(true);
        return fetch(api)
            .finally(function () { return setLoading(false); });
    };
    return [load, loading];
}
function useCreate(create) {
    React.useEffect(function () { return create(); }, []);
}
function useDestroy(destroy) {
    React.useEffect(function () { return function () { return destroy(); }; }, []);
}
// 路由缓存激活钩子
function useActivate(callback) {
    React.useEffect(function () {
        var _a;
        var path = (_a = Navigation.location().pathname, (_a !== null && _a !== void 0 ? _a : ""));
        var token = pubsub.subscribe("activate" + path, callback);
        return function () { return pubsub.unsubscribe(token); };
    }, []);
}
// 路由缓存失激钩子
function useDeactivated(callback) {
    React.useEffect(function () {
        var _a;
        var path = (_a = Navigation.location().pathname, (_a !== null && _a !== void 0 ? _a : ""));
        var token = pubsub.subscribe("deactivated" + path, callback);
        return function () { return pubsub.unsubscribe(token); };
    }, []);
}
// 当前router
function useCurrentRoute() {
    var _a = React.useState(), router = _a[0], setRouter = _a[1];
    React.useEffect(function () {
        var _a;
        var routerConfig = Navigation.routerConfig();
        var path = (_a = Navigation.location().pathname, (_a !== null && _a !== void 0 ? _a : ""));
        var targetRouter = findDeep(path, routerConfig, "path", "children", function (value, tValue) {
            if (tValue.search("/:") > -1) {
                return !!reactRouterDom.matchPath(value, {
                    path: tValue,
                });
            }
            return false;
        })[0];
        var router;
        if (targetRouter) {
            router = __assign(__assign({}, targetRouter), { path: path });
        }
        setRouter(router);
    }, [Navigation.location().pathname]);
    return router;
}

(function (MethodEnum) {
    MethodEnum["GET"] = "GET";
    MethodEnum["POST"] = "POST";
    MethodEnum["DELETE"] = "DELETE";
    MethodEnum["PUT"] = "PUT";
})(exports.MethodEnum || (exports.MethodEnum = {}));
function requestHook(config, apiRequestConfig) {
    return config;
}
function responseHook(data) {
    return data.data;
}
function responseErrorHook(error) {
    throw error;
}
function fetch(api) {
    var config = {
        baseURL: api.baseUrl ? api.baseUrl : F22.getInstance().getHttpConfig().baseUrl,
        method: generateMethod(api.method),
        url: api.url
    };
    // 方法设置
    api.method === exports.MethodEnum.GET ? config.params = api.request : config.data = api.request;
    return axios.request(F22.getInstance().getHttpConfig().requestHook(config, api))
        .then(function (data) { return F22.getInstance().getHttpConfig().responseHook(data); })
        .then(function (data) { return (__assign(__assign({}, api), { response: data })); })
        .catch(function (error) {
        F22.getInstance().getHttpConfig().responseErrorHook(error);
        return __assign(__assign({}, api), { response: {}, error: error });
    });
}
function generateMethod(method) {
    switch (method) {
        case exports.MethodEnum.GET:
            return "get";
        case exports.MethodEnum.POST:
            return "post";
        case exports.MethodEnum.DELETE:
            return "delete";
        case exports.MethodEnum.PUT:
            return "put";
    }
}

var F22 = /** @class */ (function () {
    function F22() {
        this._routers = [];
        this._providerHandler = undefined;
        this._models = {};
        this._httpConfig = {
            baseUrl: "",
            responseHook: responseHook,
            responseErrorHook: responseErrorHook,
            requestHook: requestHook
        };
    }
    F22.getInstance = function () {
        if (!this._instance) {
            return this._instance = new F22();
        }
        return this._instance;
    };
    F22.prototype.useHttp = function (httpConfig) {
        this._httpConfig = __assign(__assign({}, this._httpConfig), httpConfig);
        return this;
    };
    F22.prototype.getHttpConfig = function () {
        return this._httpConfig;
    };
    F22.prototype.useLoading = function (loading) {
        this._loadingComponent = loading;
        return this;
    };
    F22.prototype.useRouter = function (routers) {
        if (routers === void 0) { routers = []; }
        this._routers = mergePath(routers);
        setCompleteRouterConfig(this._routers);
        return this;
    };
    F22.prototype.useStore = function (models) {
        this._models = models;
        return this;
    };
    F22.prototype.useProviderHandler = function (providerHandler) {
        this._providerHandler = providerHandler;
        return this;
    };
    F22.prototype.run = function (el) {
        var $el;
        if (typeof (el) == 'string') {
            $el = document.querySelector(el);
        }
        else if (el === undefined) {
            $el = document.querySelector("#root");
        }
        else {
            $el = el;
        }
        if (!$el) {
            console.error("没有找到挂载节点");
        }
        ReactDOM.render(React__default.createElement(Base, { routers: this._routers, loadingComponent: this._loadingComponent, providerHandler: this._providerHandler, models: this._models }), $el);
    };
    return F22;
}());
var LoadingContext = React__default.createContext(undefined);
function Base(_a) {
    var routers = _a.routers, models = _a.models, loadingComponent = _a.loadingComponent, providerHandler = _a.providerHandler;
    var render = function () {
        return (React__default.createElement(StoreProvider, { value: models },
            React__default.createElement(LoadingContext.Provider, { value: loadingComponent },
                React__default.createElement(App, { routers: routers }))));
    };
    if (providerHandler) {
        return providerHandler(render);
    }
    return render();
}

var index = { name: "f22" };

Object.defineProperty(exports, 'NavLink', {
    enumerable: true,
    get: function () {
        return reactRouterDom.NavLink;
    }
});
Object.defineProperty(exports, 'withRouter', {
    enumerable: true,
    get: function () {
        return reactRouterDom.withRouter;
    }
});
exports.F22 = F22;
exports.Navigation = Navigation;
exports.NavigationView = NavigationView;
exports.createModel = createModel;
exports.default = index;
exports.fetch = fetch;
exports.findDeep = findDeep;
exports.useActivate = useActivate;
exports.useApi = useApi;
exports.useCreate = useCreate;
exports.useCurrentRoute = useCurrentRoute;
exports.useDeactivated = useDeactivated;
exports.useDestroy = useDestroy;
exports.useStore = useStore;
