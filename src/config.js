/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
/* jscs:disable maximumLineLength */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {

  // https://analytics.google.com/
  google: { trackingId: 'UA-79209823-1' },

};

export const auth = {

  jwt: { secret: 'www.51tbook.com' },

  // https://developers.facebook.com/
  facebook: {
    id: 'xxx',
    secret: 'xxx',
  },

  // https://cloud.google.com/console/project
  google: {
    id: '209681579571-mksqtt876daqpsa5083mic5bmd1s3967.apps.googleusercontent.com',
    secret: 't_mT4Xf3wDwTHzfJl7PHk-2k',
  },


  // https://www.github.com/
  github: {
    id: 'ad75c00803574b188212',
    secret: '2019a0aa9757b674a523bb4334d0ba10d7577daa',
  },

};
