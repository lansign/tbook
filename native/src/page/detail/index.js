/**
 * Created by Guang on 16/5/31.
 */

"use strict";

import React from 'react'
import {
    View,
    Image
} from 'react-native'

import {Text} from 'TBText'
import Header from 'TBHeader'

export default class BookDetail extends React.Component{

    render(){
        return(
            <View style={{flex:1}}>
                <Header leftItem={{icon:require('../../common/img/back.png'),onPress:() =>{
                    this.props.navigator.pop()
                }}}/>

                <Text>
                    文章正文
                </Text>
            </View>
        )
    }
}