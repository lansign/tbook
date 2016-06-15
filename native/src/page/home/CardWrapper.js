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

        const {data} = this.props;
        const date = new Date(data.createTime || 0);
        return(
            <TouchableOpacity onPress={() => this.props.onPress(data)}>
                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text numberOfLines={2} style={styles.title}>
                            {data.title}
                        </Text>

                        <View style={styles.moreBox}>
                            <Text>
                                {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                            </Text>

                            <Text>
                                作者:大光
                            </Text>
                        </View>
                    </View>

                    {data.imageUrl?
                        <Image style={{width: 84,height: 70}} source={{uri:data.imageUrl}}/>
                        :null}
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

