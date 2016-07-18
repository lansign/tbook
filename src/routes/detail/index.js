/**
 * Created by Guang on 16/6/14.
 */

"use strict";

import React from 'react';
import Detail from './Detail'
import fetch from '../../core/fetch';
import App from '../../components/App';

export default {

    path: '/detail/:id',

    async action({ render, context},{id}) {

        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query { books(id:"${id}") { id,title,content,createTime,imageUrl,author {source,sourceId,displayName}} }`
            }),
            credentials: 'include',
        });
        const { data } = await resp.json();
        if (!data || !data.books) throw new Error('Failed to load the news feed.');
        return render(
            <App context={context}>
                <Detail data={data.books[0]} context={context}/>
            </App>
        )
    }
}