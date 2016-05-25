/**
 * Created by lan on 16/5/25.
 */

var graphql = require ('graphql');
var mongoose = require('mongoose')

var TODO = mongoose.model('Todo', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    completed: Boolean
})

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

var QueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        todos: {
            type: new graphql.GraphQLList(TodoType),
            resolve: () => {
                return new Promise((resolve, reject) => {
                    TODO.find((err, todos) => {
                        if (err) reject(err)
                        else resolve(todos)
                    })
                })
            }
        }
    })
})

module.exports = new graphql.GraphQLSchema({
    query: QueryType
});