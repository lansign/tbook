/**
 * Created by lan on 16/6/2.
 */


import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import fetch from '../src/core/fetch';

describe('graphql mutation', () => {

    it('test article add then update then delete', (done) => {
        fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: 'mutation{article(title: "Read two book", content: "test") {id}}'
            }),
            credentials: 'include'
        }).then(resp => {
            expect(resp.status).to.be.equal(200)
            return resp.json()
        }).then(data => {
            var addId = data.data.article.id;
            expect(addId).to.not.undefined;
            return addId
        }).then(addId => {
            let updateTitle = "Read three book";
            fetch('/graphql', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `mutation{article(id:"${addId}", title: "${updateTitle}", content: "test") {id,title}}`
                }),
                credentials: 'include'
            }).then(resp => {
                expect(resp.status).to.be.equal(200)
                return resp.json()
            }).then(data => {
                var updateId = data.data.article.id
                expect(updateId).to.be.equal(addId)
                expect(data.data.article.title).to.be.equal(updateTitle);
                return updateId
            }).then(updateId => {
                fetch('/graphql', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `mutation {articleDelete(id:"${updateId}"){id}}`
                    }),
                    credentials: 'include'
                }).then(resp => {
                    expect(resp.status).to.be.equal(200)
                    return resp.json()
                }).then(data => {
                    expect(data.data.articleDelete.id).to.be.equal(addId)
                    done()
                })
            })
        })
    });

});

describe('graphql query', () => {

    it('test article query', (done) => {
        fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query {article{id,title,content,createTime}}`
            }),
            credentials: 'include'
        }).then(resp => {
            expect(resp.status).to.be.equal(200)
            return resp.json()
        }).then(datas => {
            console.log(datas)
            for (var data in datas) {
                expect(data.data.article.id).to.not.undefined
                expect(data.data.article.title).to.not.undefined
                expect(data.data.article.content).to.not.undefined
                expect(data.data.article.createTime).to.not.undefined
            }

            done()
        })
    });

});