/**
 * Created by lan on 16/5/25.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
    GraphQLID as ID,
    GraphQLInt as Int
} from 'graphql';

const ArticleType = new ObjectType({
  name: 'Article',
  fields: function () {
    return {
        id: {type: ID},
        title: {type: StringType},
        imageUrl: {type: StringType},
        thumbnailUrl: {type: StringType},
        summary: {type: StringType},
        content: {type: StringType},
        createTime: {type: Int},
        editTime: {type: Int}
    }
  }
})

export default ArticleType;
