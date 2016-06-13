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
                    editTime:time.getTime()
                })

                book.id = book._id
                book.save(function (err) {
                    console.log("add article", book)
                    if (err) reject(err)
                    else resolve(book)
                })
            }

            if (args.id) {
                BookModel.findByIdAndUpdate(args.id, {$set:{
                    title:args.title,
                    imageUrl:args.imageUrl,
                    thumbnailUrl:args.thumbnailUrl,
                    summary:args.summary,
                    content:args.content,
                    editTime:time.getTime()
                }}, {new: true}, function(err, book){
                    console.log("update article", book)
                    if (err) reject(err)
                    else resolve(book)
                })
            } else {
                addBook();
            }
        })
    }
};



export default article