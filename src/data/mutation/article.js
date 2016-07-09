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
import UserModel from '../models/UserModel'

const article = {
    type: ArticleType,
    args:{
        id: {type: ID},
        title: {type: StringType},
        imageUrl: {type: StringType},
        thumbnailUrl: {type: StringType},
        summary: {type: StringType},
        content: {type: StringType},
        recommend: {type: BooleanType}
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
                UserModel.findById(root.request.user._doc._id, function(err, user) {
                    if (err) {
                        reject(err)
                    } else if (!user) {
                        reject(new Error("您没有权限!"))
                    } else {
                        BookModel.findById(args.id, function(err, book){
                            if (err) {
                                reject(err)
                            } else if (book && (user.isAdmin || book.author === root.request.user._doc._id)) {
                                if (args.title) {
                                    book.title = args.title;
                                }

                                if (args.imageUrl) {
                                    book.imageUrl = args.imageUrl;
                                }

                                if (args.thumbnailUrl) {
                                    book.thumbnailUrl = args.thumbnailUrl;
                                }

                                if (args.summary) {
                                    book.summary = args.summary;
                                }

                                if (args.content) {
                                    book.content = args.content;
                                }

                                book.editTime = time.getTime();

                                if (user.isAdmin) {
                                    book.recommend = args.recommend;
                                }

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
                    }
                })
            } else {
                addBook();
            }
        })
    }
};



export default article