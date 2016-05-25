/**
 * Created by lan on 16/5/25.
 */

var graphql = require ('graphql');

var TODOs = [
    {
        "id": 1446412739542,
        "title": "Read emails",
        "completed": false
    },
    {
        "id": 1446412740883,
        "title": "Buy orange",
        "completed": true
    }
];

var TodoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(TODOs)
                        }, 4000)
                    });
                }
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType
});