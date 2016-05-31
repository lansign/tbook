/**
 * Created by Guang on 16/4/26.
 */

"use strict";

import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import promise from './promise';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'
var {AsyncStorage} = require('react-native');


var isDebuggingInChrome = __DEV__;


var logger = createLogger({
    predicate:(getState,action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});

var createMyStore = applyMiddleware(thunk,promise,logger)(createStore);

function configureStore(onComplete){

    const store = autoRehydrate()(createMyStore)(reducers);
    persistStore(store, {storage: AsyncStorage}, onComplete);
    if (isDebuggingInChrome){
        window.store = store
    }

    return store;
}

module.exports = configureStore;

