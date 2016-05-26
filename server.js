/**
 * Created by lan on 16/5/25.
 */

var graphql = require ('graphql').graphql
var express = require('express')
var graphQLHTTP = require('express-graphql')
var Schema = require('./schema')

// This is just an internal test
var query = 'query { todos {title} }'
graphql(Schema, query).then( function(result) {
    console.log(JSON.stringify(result,null," "));

});

var app = express()
    .use('/', graphQLHTTP({ schema: Schema, pretty: true }))
    .listen(3000, function (err) {
        console.log('GraphQL Server is now running on localhost:3000');
    });