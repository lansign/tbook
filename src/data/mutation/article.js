/**
 * Created by lan on 16/5/31.
 */

import ArticleType from '../types/article';
import {
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
    GraphQLID as ID
} from 'graphql';
import BookModel from '../models/BookModel'

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
            let time = new Date();
            var addBook = () => {
                var book = new BookModel({
                    title:args.title,
                    imageUrl:args.imageUrl,
                    thumbnailUrl:args.thumbnailUrl,
                    summary:args.summary,
                    content:args.content,
                    createTime:time.getTime(),
                    editTime:time.getTime(),
                    author:root.request.user._doc._id
                })

                book.id = book._id
                book.save(function (err) {
                    if (err) reject(err)
                    else resolve(book)
                })
            }

            if (args.id) {
                BookModel.findById(args.id, function(err, book){
                    if (err) {
                        reject(err)
                    } else if (book && book.author === root.request.user._doc._id) {
                        book.title = args.title;
                        book.imageUrl = args.imageUrl;
                        book.thumbnailUrl = args.thumbnailUrl;
                        book.summary = args.summary;
                        book.content = args.content;
                        book.editTime = time.getTime();
                        book.save((err) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(book)
                            }
                        })
                    } else {
                        reject(new Error("您没有权限!"))
                    }
                })
            } else {
                addBook();
            }
        })
    }
};



export default article