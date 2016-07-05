/**
 * Created by Guang on 16/6/14.
 */

"use strict";

import React from 'react';
import Header from '../home/Header'
import md from 'marked';

export default class Detail extends React.Component{

    render(){
        const {title,content,imageUrl,createTime,author} = this.props.data;
        const date = new Date(createTime || 0);

        return(
            <div>
                <Header backUrl="/"/>
                <div style={{maxWidth:1000,margin:"0 auto"}}>
                    <div>
                        {imageUrl?
                            <img style={{width:'100%',height:'auto'}} src={imageUrl}/>
                            :null}

                        <div style={{flexDirection:'row',flex:1,paddingLeft:"20px",paddingRight:"20px",paddingTop:"20px",display:'flex'}}>
                            <img style={{width:'50px',height:'50px', borderRadius:"25px", borderWidth:'1px'}} src={author && author.picture ? author.picture:require('./img/default_avatar@1x.png')}/>

                            <div style={{paddingLeft:"10px", fontSize:18,color:'#000000',display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {author?author.displayName:"null"}
                            </div>
                        </div>
                    </div>

                    <div style={{paddingLeft:"20px",paddingRight:"20px",paddingBottom:"20px"}} dangerouslySetInnerHTML= {{ __html: md(content) }}/>
                </div>
            </div>
        )
    }
}

