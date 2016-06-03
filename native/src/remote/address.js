/**
 * Created by Guang on 16/6/1.
 */

"use strict";

const SERVER_HOST = 'http://localhost:3000/graphql';

function getBookListUrl(){
    return SERVER_HOST;
}

module.exports = {
    getBookListUrl
};