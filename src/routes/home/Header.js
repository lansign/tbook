/**
 * Created by Guang on 16/6/14.
 */

import React, { PropTypes } from 'react';

export default function Header({title,backUrl}){

    return(
        <div style={{display: 'flex',
                      flex: 1,
                      height: 50,
                      backgroundColor: '#d94b40',
                      alignItems: 'center',
                      flexDirection:'row'}}>
            {backUrl?<a href={backUrl} style={{height: 50,width:50,position:'absolute',textAlign:'center'}}>
                    <img src={require('./img/back_white.png')} style={{marginTop: 13}} />
                </a>:null}

            {title?<div style={{flex:1,textAlign:'center',
                      fontSize: 20,
                      color: 'white'}}>
                {title}
            </div>:null}
        </div>
    )
}
