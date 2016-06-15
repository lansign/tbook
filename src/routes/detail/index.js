/**
 * Created by Guang on 16/6/14.
 */

"use strict";

import React from 'react';
import Detail from './Detail'
import fetch from '../../core/fetch';


export default {

    path: '/detail',

    async action() {
        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'query { books { id,title,content,createTime,imageUrl} }'
            }),
            credentials: 'include',
        });
        const { data } = await resp.json();
        if (!data) throw new Error('Failed to load the news feed.');
        
        return <Detail data={data}/>
    }
}