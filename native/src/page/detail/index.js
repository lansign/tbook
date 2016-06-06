/**
 * Created by Guang on 16/5/31.
 */

"use strict";

import React from 'react'
import {
    View,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native'

import {Text} from 'TBText'
import Header from 'TBHeader'

export default class BookDetail extends React.Component{

    render(){
        const {title,content,imageUrl,createTime} = this.props.data;
        const date = new Date(createTime || 0);

        return(
            <View style={{flex:1}}>
                <Header leftItem={{icon:require('../../common/img/back.png'),onPress:() =>{
                    this.props.navigator.pop()
                }}}/>

                <ScrollView style={{flex:1}}>

                    {imageUrl?
                        <Image style={{flex:1,height:180}} source={{uri:imageUrl}}/>
                        :null}

                    <Text style={{fontSize:21,padding:11}}>
                        {title}
                    </Text>

                    <View style={{flexDirection:'row',flex:1,padding:11}}>
                        <Text style={styles.otherText}>
                            作者:大光
                        </Text>

                        <Text style={[{marginLeft:20},styles.otherText]}>
                            {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                        </Text>

                        <Text style={[{marginLeft:20},styles.otherText]}>
                            阅读133万+
                        </Text>
                    </View>

                    <Text >
                        {content}
                    </Text>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    otherText:{
        fontSize:12,
        color:'#989898'
    },
    contentText:{
        fontSize:16,
        padding:11
    }
});