/**
 * Created by lan on 16/5/25.
 */

var graphql = require ('graphql');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/DATABASE_UBOOK');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection mongodb success')
});

var BOOK = mongoose.model('Book', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    imageUrl: String,
    thumbnailUrl: String,
    summary: String,
    content: String
})

var BookType = new graphql.GraphQLObjectType({
    name: 'Book',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            title: {
                type: graphql.GraphQLString
            },
            imageUrl: {
                type: graphql.GraphQLString
            },
            thumbnailUrl: {
                type: graphql.GraphQLString
            },
            summary: {
                type: graphql.GraphQLString
            },
            content: {
                type: graphql.GraphQLString
            }
        }
    }
});

var QueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function fields() {
        return {
            books: {
                type: new graphql.GraphQLList(BookType),
                resolve: function resolve() {
                    return new Promise(function (resolve, reject) {
                        BOOK.find(function (err, books) {
                            console.log("query books", books)
                            if (err) reject(err);else resolve(books);
                        });
                    });
                }
            }
        };
    }
});

var MutationSave = {
    type: BookType,
    args: {
        id: {
            type: graphql.GraphQLID
        },
        title: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        imageUrl: {
            type: graphql.GraphQLString
        },
        thumbnailUrl: {
            type: graphql.GraphQLString
        },
        summary: {
            type: graphql.GraphQLString
        },
        content: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            book = new BOOK({
                id:args.id,
                title:args.title,
                imageUrl:args.imageUrl,
                thumbnailUrl:args.thumbnailUrl,
                summary:args.summary,
                content:args.content
            })

            if (book.id) {
                book._id = book.id
            } else {
                book.id = book._id
            }

            book.save(function (err) {
                if (err) reject(err)
                else resolve(book)
            })
        })
    }
}

var MutationDelete = {
    type: BookType,
    args: {
        id: {
            type: graphql.GraphQLID
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            var book = BOOK.find({ _id:args.id}).remove(function (err) {
                if (err) reject(err)
                else resolve(book)
            });
        })
    }
}

var MutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        save: MutationSave,
        delete:MutationDelete
    }
});

module.exports = new graphql.GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});