/**
 * Created by lan on 16/5/31.
 */

import ArticleType from '../types/Article';
import {
    GraphQLNonNull as NonNull,
    GraphQLID as ID
} from 'graphql';
import Book from '../models/BookModel'

const articleDelete = {
    type: ArticleType,
    args:{
        id: {type: new NonNull(ID)}
    },

    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            Book.find({ _id: args.id}).remove((err, book) => {
                if (err) reject(err)
                else resolve(book)
            });
        })
    }
};

export default articleDelete