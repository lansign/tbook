/**
 * Created by Guang on 16/6/14.
 */

"use strict";

import React from 'react';
import Header from '../home/Header'
import md from 'marked';

export default class Detail extends React.Component{

    render(){
        const {title,content,imageUrl,createTime} = this.props.data;
        const date = new Date(createTime || 0);

        return(
            <div>
                <Header backUrl="/"/>
                <div style={{maxWidth:1000,margin:"0 auto"}}>
                    <div >
                        {imageUrl?
                            <img style={{width:'100%',height:'auto'}} src={imageUrl}/>
                            :null}

                        <div style={{fontSize:21,padding:11,display:'flex'}}>
                            {title}
                        </div>

                        <div style={{flexDirection:'row',flex:1,padding:11,display:'flex'}}>
                            <div style={{fontSize:12,color:'#989898',display:'flex'}}>
                                作者:大光
                            </div>

                            <div style={{marginLeft:20,fontSize:12,color:'#989898',display:'flex'}}>
                                {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                            </div>

                            <div style={{marginLeft:20,fontSize:12,color:'#989898',display:'flex'}}>
                                阅读133万+
                            </div>
                        </div>
                    </div>

                    <dev dangerouslySetInnerHTML= {{ __html: md(content) }}/>
                </div>
            </div>
        )
    }
}

