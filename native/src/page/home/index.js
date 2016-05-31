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

export default class HomePage extends Component{


    render() {
        return(
            <View style={{flex:1}}>
                <Header title="技术博客"/>
                <ListView navigator={this.props.navigator}/>
            </View>
        )
    }
}