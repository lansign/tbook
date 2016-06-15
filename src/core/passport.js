/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import UserModel from '../data/models/UserModel';
import { auth as config } from '../config';

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: 'http://localhost:3001/login/facebook/return',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
}, (accessToken, refreshToken, profile, done) => callback("facebook", accessToken, refreshToken, profile, done)))

passport.use(new GitHubStrategy({
      clientID: config.github.id,
      clientSecret: config.github.secret,
      callbackURL: "http://localhost:3001/login/github/callback"
    }, (accessToken, refreshToken, profile, done) => callback("github", accessToken, refreshToken, profile, done)))

passport.use(new GoogleStrategy({
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: "http://localhost:3001/login/google/callback"
    }, (accessToken, refreshToken, profile, done) => callback("google", accessToken, refreshToken, profile, done)))

function callback(source, accessToken, refreshToken, profile, done) {
  console.log("profile", profile);
  UserModel.findOne({source: source, sourceId: profile.id}, function (err, user) {
    if (err) {
      done(err, null);
    } else if (user) {
      done(null, user);
    } else {
      var newUser = new UserModel({
        source: source,
        sourceId: profile.id,
        email: profile._json.email,//only for github
        emailConfirmed: false,
        displayName: profile.displayName,
        picture: profile._json.avatar_url,//only for github
        accessToken: accessToken,
        refreshToken: refreshToken
      })

      newUser.save(function (err) {
        if (err) {
          done(err, null);
        } else {
          done(null, newUser);
        }
      })
    }
  });
}

export default passport;
