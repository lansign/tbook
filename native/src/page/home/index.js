/**
 * Created by lan on 16/5/23.
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native'

import Header from'TBHeader'
import ListView from './BookListView'
import {connect} from 'react-redux'

import {
    update
} from '../../action'

class HomePage extends Component{

    // 构造
    constructor(props) {
        super(props);

        this.props.dispatch(update())
    }


    render() {
        return(
            <View style={{flex:1}}>
                <Header title="技术博客"/>
                <ListView navigator={this.props.navigator} data={this.props.book.books}/>
            </View>
        )
    }
}

function select(store){
    return{
        book:store.book
    }
}

module.exports = connect(select)(HomePage);