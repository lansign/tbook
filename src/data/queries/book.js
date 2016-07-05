/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import ArticleType from '../types/article';
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLID as ID,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';
import BookModel from '../models/BookModel'

const books = {
    type: new List(ArticleType),
    args:{
        id: {type: ID},
        author: {type: StringType},
        size: {type: IntType},
        startTime: {type: FloatType},
        recommend:{type: BooleanType}
    },
    resolve: function resolve(root, args) {
        return new Promise(function (resolve, reject) {
            var callback = (err, books) => {
                if (err) reject(err);else resolve(books);
            }
            if (args.id) {
                BookModel.find({_id:args.id}).populate('author').exec(callback);
            } else {
                var query = BookModel.find(args.author ? {author:args.author} : {}).where('createTime')
                    .lte(args.createTime ? args.createTime : new Date().getTime())
                if (args.recommend === true || args.recommend === false) {
                    query = query.where('recommend', args.recommend)
                }
                query.sort({createTime: -1}).limit((args.size && args.size > 0 && args.size < 500) ? args.size : 500).populate('author').exec(callback);
            }
        });
    }
};

export default books;
