/**
 * Created by Guang on 16/3/24.
 */

"use strict";

import React from 'react';
import Root from './page'
var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');


export default class Ubook extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isLoading: true,
            store: configureStore(() => this.setState({isLoading: false})),
        };
    }

    render(){
        return(
            <Provider store={this.state.store}>
                <Root {...this.props}/>
            </Provider>
        )
    }
}