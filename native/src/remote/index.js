/**
 * Created by Guang on 16/6/1.
 */

import * as address from './address';

const initialHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

function loadRemoteBooks(){
    const body = {
        query: 'query { books { id,title,content,createTime,imageUrl} }'
    };
    return requestRemoteToJson(address.getBookListUrl(),body)
        .then(data =>{
            return data.data.books
        })
}



function requestRemoteToJson(url,object){
    return window.fetch(url,{
            method:object ?'POST':'GET',
            headers:initialHeader,
            body:object ? JSON.stringify(object) : null})
        .then(checkStatus)
        .then(parseJSON)
}

/**
 * json 转换
 * @param response
 * @returns {*}
 */
function parseJSON(response) {
    return response.json()
}

/**
 * 检测数据状态
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        throw new Error(response.statusText);
    }
}

module.exports = {
    loadRemoteBooks
};
