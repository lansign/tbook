/**
 * Created by lan on 16/5/24.
 */

var express = require('express');
var app = express();
var graphqlHTTP = require('express-graphql');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

//app.use('/graphql', graphqlHTTP({ schema: MyGraphQLSchema, graphiql: true }));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});