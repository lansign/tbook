/**
 * Created by lan on 16/5/31.
 */

import ArticleType from '../types/Article';
import {
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
    GraphQLID as ID
} from 'graphql';
import Book from '../models/BookModel'

const article = {
    type: ArticleType,
    args:{
        id: {type: ID},
        title: {type: new NonNull(StringType)},
        imageUrl: {type: StringType},
        thumbnailUrl: {type: StringType},
        summary: {type: StringType},
        content: {type: new NonNull(StringType)}
    },

    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            if (!args.id) {
                var time = new Date();

                var book = new Book({
                    id:args.id,
                    title:args.title,
                    imageUrl:args.imageUrl,
                    thumbnailUrl:args.thumbnailUrl,
                    summary:args.summary,
                    content:args.content,
                    createTime:time.getTime(),
                    editTime:time.getTime()
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
                return;
            }

            let bookQuery = Book.find({ _id: args.id}, (err, book) => {
                console.log("mutation article", book)

                if (book) {
                    bookQuery.update((err, book) => {
                        if (err) reject(err)
                        else resolve(book)
                    })
                } else {
                    var time = new Date();

                    book = new Book({
                        id:args.id,
                        title:args.title,
                        imageUrl:args.imageUrl,
                        thumbnailUrl:args.thumbnailUrl,
                        summary:args.summary,
                        content:args.content,
                        createTime:time.getTime(),
                        editTime:time.getTime()
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
                }
            })
        })
    }
};



export default article