/**
 * Created by Guang on 16/5/31.
 */

import React from 'react'
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import {Text} from 'TBText'

export default class CardWrapper extends React.Component{

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text numberOfLines={2} style={styles.title}>
                            文章标题1,文章标题1,文章标题1,文章标题1,文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1
                        </Text>

                        <View style={styles.moreBox}>
                            <Text>
                                1024人阅读
                            </Text>

                            <Text>
                                作者:大光
                            </Text>
                        </View>
                    </View>

                    <Image style={{width: 84,height: 70}} source={{uri:'http://img.alicdn.com/tps/TB1kaazMpXXXXacXFXXXXXXXXXX-900-500.jpg'}}/>
                </View>
                <View style={styles.split}/>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:15,
        color:'#131313',
        fontWeight:'bold'
    },
    moreBox:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowBox:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor:'#ececec',
        paddingBottom:12,
        marginRight:11,
        marginLeft:11,
        marginTop:11
    },
    titleBox:{
        flex:1,
        justifyContent:'space-between',
        marginRight:15
    },
    split:{
        flex:1,
        height:7,
        backgroundColor:'#ebebeb'
    }
});

