/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Created by lan on 16/5/31.
 */

var mongoose = require('./mongoose')

const Schema = new mongoose.Schema({
  source: String,
  sourceId: String,
  email: { type: String, unique: true },
  emailConfirmed: Boolean,
  displayName: String,
  picture: String,
  website: String,
  location: String,
  accessToken: String,
  refreshToken: String
})

Schema.index({ source: 1, sourceId: -1 }, { unique: true });

const UserModel = mongoose.model('UserModel', Schema)

export default UserModel;


