/**
 * Created by Guang on 16/5/31.
 */

"use strict";

import {BOOK} from '../action/types'

const initializeState = {
    books:[]
};

export default function book(state = initializeState,action){

    switch (action.type){
        case BOOK.UPDATE:
            return Object.assign({},state,{
                books:action.data
            });

        default:
            return state
    }
}