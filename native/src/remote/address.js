/**
 * Created by Guang on 16/6/1.
 */

"use strict";

const SERVER_HOST = 'http://localhost:3000/graphql';

function getBookListUrl(){
    return SERVER_HOST + '?query={ books { id,title,imageUrl,thumbnailUrl,summary,content} }';
}

module.exports = {
    getBookListUrl
};