/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me'
import content from './queries/content'
import news from './queries/news'
import books from './queries/book'
import article from './mutation/article'
import articleDelete from './mutation/ArticleDelete'
import user from './mutation/user'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      content,
      news,
      books
    }
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      article,
      articleDelete,
      user
    }
  })
});

export default schema;
