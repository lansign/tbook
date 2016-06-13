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
    GraphQLInt as Int,
    GraphQLFloat as Float
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
        createTime: {type: Float},
        editTime: {type: Float},
        author:{type:StringType}
    }
  }
})

export default ArticleType;
