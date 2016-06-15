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
                'Content-Type': 'application/json',
                cookie: 'id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhY2Nlc3NUb2tlbiI6ImluaXQiLCJwaWN0dXJlIjoiaW5pdCIsImRpc3BsYXlOYW1lIjoiaW5pdCIsImVtYWlsQ29uZmlybWVkIjoiaW5pdCIsInNvdXJjZUlkIjoiaW5pdCIsInNvdXJjZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFjY2Vzc1Rva2VuIjp0cnVlLCJwaWN0dXJlIjp0cnVlLCJkaXNwbGF5TmFtZSI6dHJ1ZSwiZW1haWxDb25maXJtZWQiOnRydWUsInNvdXJjZUlkIjp0cnVlLCJzb3VyY2UiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsImFjY2Vzc1Rva2VuIjoieWEyOS5DaV9fQXR3UlZONS1jYkRiaTZIVWQxcGhiZVdiNFI3ZW5EQmVtZ2tnTW0wdm5wNmdsS3ZTajVNYUJKM2xTbGxsTUEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMTA4NDUxOTc3NzI4MDg2NDIyNTkxL3BpY3R1cmU_dHlwZT1sYXJnZSIsImRpc3BsYXlOYW1lIjoibmFuY3kgbGFuIiwiZW1haWxDb25maXJtZWQiOmZhbHNlLCJzb3VyY2VJZCI6IjEwODQ1MTk3NzcyODA4NjQyMjU5MSIsInNvdXJjZSI6Imdvb2dsZSIsIl9pZCI6IjU3NWNkZjZkMzJmYzAzNzAwNmRhMzZmMyJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2NTcxMDQxMywiZXhwIjoxNDgxMjYyNDEzfQ.Q6IldCyVoQ_cRhbJJx9Q7Jv3N1NJJMLOvJabmzfURWI',
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
            fetch('/graphql', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `query { books(id:"${addId}") { id,title,content,createTime } }`
                }),
                credentials: 'include'
            }).then(resp => {
                expect(resp.status).to.be.equal(200)
                return resp.json()
            }).then(data => {
                var books = data.data.books;
                expect(books).to.not.a('null');
                expect(books).to.not.a('undefined');
                for (var index in books) {
                    expect(books[index].id).to.be.equal(addId)
                    expect(books[index].title).to.be.a('string')
                    expect(books[index].content).to.be.a('string')
                    expect(books[index].createTime).to.be.a('Number')
                }

                return addId
            }).then(addId => {
                let updateTitle = "Read three book";
                fetch('/graphql', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        cookie: 'id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhY2Nlc3NUb2tlbiI6ImluaXQiLCJwaWN0dXJlIjoiaW5pdCIsImRpc3BsYXlOYW1lIjoiaW5pdCIsImVtYWlsQ29uZmlybWVkIjoiaW5pdCIsInNvdXJjZUlkIjoiaW5pdCIsInNvdXJjZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFjY2Vzc1Rva2VuIjp0cnVlLCJwaWN0dXJlIjp0cnVlLCJkaXNwbGF5TmFtZSI6dHJ1ZSwiZW1haWxDb25maXJtZWQiOnRydWUsInNvdXJjZUlkIjp0cnVlLCJzb3VyY2UiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsImFjY2Vzc1Rva2VuIjoieWEyOS5DaV9fQXR3UlZONS1jYkRiaTZIVWQxcGhiZVdiNFI3ZW5EQmVtZ2tnTW0wdm5wNmdsS3ZTajVNYUJKM2xTbGxsTUEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMTA4NDUxOTc3NzI4MDg2NDIyNTkxL3BpY3R1cmU_dHlwZT1sYXJnZSIsImRpc3BsYXlOYW1lIjoibmFuY3kgbGFuIiwiZW1haWxDb25maXJtZWQiOmZhbHNlLCJzb3VyY2VJZCI6IjEwODQ1MTk3NzcyODA4NjQyMjU5MSIsInNvdXJjZSI6Imdvb2dsZSIsIl9pZCI6IjU3NWNkZjZkMzJmYzAzNzAwNmRhMzZmMyJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2NTcxMDQxMywiZXhwIjoxNDgxMjYyNDEzfQ.Q6IldCyVoQ_cRhbJJx9Q7Jv3N1NJJMLOvJabmzfURWI',
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
                            'Content-Type': 'application/json',
                            cookie: 'id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhY2Nlc3NUb2tlbiI6ImluaXQiLCJwaWN0dXJlIjoiaW5pdCIsImRpc3BsYXlOYW1lIjoiaW5pdCIsImVtYWlsQ29uZmlybWVkIjoiaW5pdCIsInNvdXJjZUlkIjoiaW5pdCIsInNvdXJjZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFjY2Vzc1Rva2VuIjp0cnVlLCJwaWN0dXJlIjp0cnVlLCJkaXNwbGF5TmFtZSI6dHJ1ZSwiZW1haWxDb25maXJtZWQiOnRydWUsInNvdXJjZUlkIjp0cnVlLCJzb3VyY2UiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsImFjY2Vzc1Rva2VuIjoieWEyOS5DaV9fQXR3UlZONS1jYkRiaTZIVWQxcGhiZVdiNFI3ZW5EQmVtZ2tnTW0wdm5wNmdsS3ZTajVNYUJKM2xTbGxsTUEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMTA4NDUxOTc3NzI4MDg2NDIyNTkxL3BpY3R1cmU_dHlwZT1sYXJnZSIsImRpc3BsYXlOYW1lIjoibmFuY3kgbGFuIiwiZW1haWxDb25maXJtZWQiOmZhbHNlLCJzb3VyY2VJZCI6IjEwODQ1MTk3NzcyODA4NjQyMjU5MSIsInNvdXJjZSI6Imdvb2dsZSIsIl9pZCI6IjU3NWNkZjZkMzJmYzAzNzAwNmRhMzZmMyJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2NTcxMDQxMywiZXhwIjoxNDgxMjYyNDEzfQ.Q6IldCyVoQ_cRhbJJx9Q7Jv3N1NJJMLOvJabmzfURWI',
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
                query: 'query { books { id,title,content,createTime } }'
            }),
            credentials: 'include'
        }).then(resp => {
            expect(resp.status).to.be.equal(200)
            return resp.json()
        }).then(data => {
            var books = data.data.books;
            expect(books).to.not.a('null');
            expect(books).to.not.a('undefined');
            for (var index in books) {
                expect(books[index].id).to.be.a('string')
                expect(books[index].title).to.be.a('string')
                expect(books[index].content).to.be.a('string')
                expect(books[index].createTime).to.be.a('Number')
            }

            done()
        })
    });

});