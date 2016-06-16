/**
 * Created by Guang on 16/6/14.
 */

import React, { PropTypes } from 'react';
import s from './Home.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


function CardWrapper({book}){
    const {title,createTime,imageUrl,id} = book;
    const date = new Date(createTime || 0);
    return(
        <div className={s.card}>
            <a href={`/detail/${id}`} >
                <div style={{flex:1,display:'flex',padding:11}} >
                    <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',marginRight:8}}>
                        <div style={{
                        fontSize:15,
                        color:'#131313',
                        fontWeight:'bold'}}>
                            {title}
                        </div>
                        <div style={{justifyContent:'space-between',flexDirection:'row',display:'flex',marginTop: 8}}>
                            <div>
                                {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                            </div>
                            <div>
                                作者:大光
                            </div>
                        </div>
                    </div>

                    {imageUrl?
                        <img style={{width: 84,height: 70}} src={imageUrl}/>
                        :null}
                </div>
            </a>

            <div style={{flex:1,height:7,backgroundColor:'#ebebeb',display:'flex'}}></div>
        </div>
    )
}

export default withStyles(s)(CardWrapper);
