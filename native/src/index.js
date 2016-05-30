/**
 * Created by Guang on 16/3/24.
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CreateLogger from 'redux-logger';
import * as reducers from './reducers';
import HomePage from './page/home'

var isDebuggingInChrome = __DEV__;

var logger = CreateLogger({
    predicate:(getState,action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});

const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class Ubook extends Component {

    render(){
        return(
            <Provider store={store}>
                <HomePage {...this.props}/>
            </Provider>
        )
    }
}