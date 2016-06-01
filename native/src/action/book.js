/**
 * Created by Guang on 16/5/31.
 */

"use strict";

import {BOOK} from './types'
import {loadRemoteBooks} from '../remote'

function loadBooks(){

    return dispatch =>{
        loadRemoteBooks()
            .then(data =>{
                dispatch({
                    type:BOOK.LOADED_BOOKS,
                    data
                })
            },error =>{
                console.log(error)
            })
    };
}

export default{
    loadBooks
}