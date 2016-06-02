/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import ArticleType from '../types/Article';
import { GraphQLList as List } from 'graphql';
import BookModel from '../models/BookModel'

const books = {
    type: new List(ArticleType),
    resolve: function resolve() {
        return new Promise(function (resolve, reject) {
            BookModel.find(function (err, books) {
                if (err) reject(err);else resolve(books);
            });
        });
    }
};

export default books;
