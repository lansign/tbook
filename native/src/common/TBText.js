/**
 * Created by Guang on 16/5/31.
 *
 * @providesModule TBText
 */
import React,{

} from 'react'

import ReactNative from 'react-native'

export function Text({style,...props}:Object){
    return <ReactNative.Text style={style} {...props}/>
}