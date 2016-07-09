/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import UserType from '../types/UserType';
import UserModel from '../models/UserModel'
import {
    GraphQLList as List,
} from 'graphql';

const me = {
  type: new List(UserType),
  resolve: function resolve(root, args)  {
    return new Promise(function (resolve, reject) {
      UserModel.find((err, user) => {
        if (err) reject(err);else resolve(user);
      })
    });
  },
};

export default me;
