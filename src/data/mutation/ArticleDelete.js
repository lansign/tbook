/**
 * Created by lan on 16/5/31.
 */

import ArticleType from '../types/article';
import {
    GraphQLNonNull as NonNull,
    GraphQLID as ID
} from 'graphql';
import BookModel from '../models/BookModel'

const articleDelete = {
    type: ArticleType,
    args:{
        id: {type: new NonNull(ID)}
    },

    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            BookModel.findById(args.id, (err, book) => {
                if (err) {
                    reject(err)
                } else if (book.author === root.request.user._doc._id) {
                    BookModel.findByIdAndRemove(args.id, (err, book) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(book)
                        }
                    });
                } else {
                    reject(new Error("您没有权限!"))
                }
            });
        })
    }
};

export default articleDelete