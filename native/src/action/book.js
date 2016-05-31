/**
 * Created by Guang on 16/5/31.
 */

"use strict";

import {BOOK} from './types'

function update(){
    return{
        type:BOOK.UPDATE,
        data:[1,2,3,4,5,6,7,8,9]
    }
}

export default{
    update
}