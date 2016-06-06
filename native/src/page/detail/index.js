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
        const {title,content} = this.props.data;

        return(
            <View style={{flex:1}}>
                <Header leftItem={{icon:require('../../common/img/back.png'),onPress:() =>{
                    this.props.navigator.pop()
                }}}/>

                <Text>
                    {content}
                </Text>
            </View>
        )
    }
}