require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(3);
  
  var _path = __webpack_require__(4);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(5);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(6);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(7);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(8);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(9);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(10);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(11);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(12);
  
  var _prettyError = __webpack_require__(13);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(14);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _schema = __webpack_require__(23);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(46);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(118);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(22);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  // eslint-disable-line import/no-unresolved
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  app.use(_passport2.default.initialize());
  
  var callback = function callback(req, res) {
    var expiresIn = 60 * 60 * 24 * 30; // 30 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  };
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/callback', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), callback);
  app.get('/login/github', _passport2.default.authenticate('github', { scope: ['user:email'], session: false }));
  
  app.get('/login/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/login', session: false }), callback);
  
  app.get('/login/google', _passport2.default.authenticate('google', { scope: ['profile'], session: false }));
  
  app.get('/login/google/callback', _passport2.default.authenticate('google', { failureRedirect: '/login', session: false }), callback);
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("production") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var success;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, template, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = [];
                        statusCode = 200;
                        template = __webpack_require__(119); // eslint-disable-line global-require
  
                        data = { title: '', description: '', css: '', body: '', entry: _assets2.default.main.js };
  
  
                        if (true) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        console.log("user", req.user._doc);
                        _context.next = 8;
                        return (0, _universalRouter.match)(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          user: req.user ? req.user._doc : undefined,
                          context: {
                            insertCss: function insertCss(styles) {
                              return css.push(styles._getCss());
                            }, // eslint-disable-line no-underscore-dangle
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  
                            if (status == 401) {
                              //需要登录的页面,user为空
                              res.redirect("/login");
                              return false;
                            }
  
                            css = [];
                            statusCode = status;
                            data.body = _server2.default.renderToString(component);
                            data.css = css.join('');
                            return true;
                          }
                        });
  
                      case 8:
                        success = _context.sent;
  
  
                        if (success) {
                          res.status(statusCode);
                          res.send(template(data));
                        }
  
                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
    return function (_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(121); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  true ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  app.listen(_config.port, function () {
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _passport = __webpack_require__(15);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(16);
  
  var _passportGithub = __webpack_require__(17);
  
  var _passportGoogleOauth = __webpack_require__(18);
  
  var _UserModel = __webpack_require__(19);
  
  var _UserModel2 = _interopRequireDefault(_UserModel);
  
  var _config = __webpack_require__(22);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
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
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: 'http://localhost:3001/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone']
  }, function (accessToken, refreshToken, profile, done) {
    return callback("facebook", accessToken, refreshToken, profile, done);
  }));
  
  _passport2.default.use(new _passportGithub.Strategy({
    clientID: _config.auth.github.id,
    clientSecret: _config.auth.github.secret,
    callbackURL: "http://localhost:3001/login/github/callback"
  }, function (accessToken, refreshToken, profile, done) {
    return callback("github", accessToken, refreshToken, profile, done);
  }));
  
  _passport2.default.use(new _passportGoogleOauth.Strategy({
    clientID: _config.auth.google.id,
    clientSecret: _config.auth.google.secret,
    callbackURL: "http://localhost:3001/login/google/callback"
  }, function (accessToken, refreshToken, profile, done) {
    return callback("google", accessToken, refreshToken, profile, done);
  }));
  
  function callback(source, accessToken, refreshToken, profile, done) {
    console.log("profile", profile);
    _UserModel2.default.findOne({ source: source, sourceId: profile.id }, function (err, user) {
      if (err) {
        done(err, null);
      } else if (user) {
        done(null, user);
      } else {
        var newUser = new _UserModel2.default({
          source: source,
          sourceId: profile.id,
          email: profile._json.email, //only for github
          emailConfirmed: false,
          displayName: profile.displayName,
          picture: profile._json.avatar_url, //only for github
          accessToken: accessToken,
          refreshToken: refreshToken
        });
  
        newUser.save(function (err) {
          if (err) {
            done(err, null);
          } else {
            done(null, newUser);
          }
        });
      }
    });
  }
  
  exports.default = _passport2.default;

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("passport-github2");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("passport-google-oauth2");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
  
  var mongoose = __webpack_require__(20);
  
  var Schema = new mongoose.Schema({
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
  });
  
  Schema.index({ source: 1, sourceId: -1 }, { unique: true });
  
  var UserModel = mongoose.model('UserModel', Schema);
  
  exports.default = UserModel;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Created by lan on 16/6/7.
   */
  
  var mongoose = __webpack_require__(21);
  mongoose.connect('mongodb://localhost/DATABASE_UBOOK');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('connection mongodb success');
  });
  
  module.exports = mongoose;

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("mongoose");

/***/ },
/* 22 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: 'UA-79209823-1' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: 'www.51tbook.com' },
  
    // https://developers.facebook.com/
    facebook: {
      id: 'xxx',
      secret: 'xxx'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: '209681579571-mksqtt876daqpsa5083mic5bmd1s3967.apps.googleusercontent.com',
      secret: 't_mT4Xf3wDwTHzfJl7PHk-2k'
    },
  
    // https://www.github.com/
    github: {
      id: 'ad75c00803574b188212',
      secret: '2019a0aa9757b674a523bb4334d0ba10d7577daa'
    }
  
  };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(24);
  
  var _me = __webpack_require__(25);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(27);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(36);
  
  var _news2 = _interopRequireDefault(_news);
  
  var _book = __webpack_require__(40);
  
  var _book2 = _interopRequireDefault(_book);
  
  var _article = __webpack_require__(44);
  
  var _article2 = _interopRequireDefault(_article);
  
  var _ArticleDelete = __webpack_require__(45);
  
  var _ArticleDelete2 = _interopRequireDefault(_ArticleDelete);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default,
        books: _book2.default
      }
    }),
    mutation: new _graphql.GraphQLObjectType({
      name: 'Mutation',
      fields: {
        article: _article2.default,
        articleDelete: _ArticleDelete2.default
      }
    })
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = schema;

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(26);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(24);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(28);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(29);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return function resolveExtension(_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.jade', '.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
    return function resolveFileName(_x3) {
      return ref.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(30);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(4);
  
  var _bluebird = __webpack_require__(31);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(32);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(33);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _graphql = __webpack_require__(24);
  
  var _ContentType = __webpack_require__(34);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var md = __webpack_require__(35);
  
  // A folder with Jade/Markdown/HTML content pages
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.jade':
        htmlContent = _jade2.default.render(fmContent.body);
        break;
      case '.md':
        htmlContent = md(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var _this = this;
  
      var request = _ref.request;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref3, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref3 = _context3.sent;
                success = _ref3.success;
                fileName = _ref3.fileName;
                extension = _ref3.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(24);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("marked");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(24);
  
  var _fetch = __webpack_require__(37);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(39);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(31);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(38);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(22);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(24);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _promise = __webpack_require__(41);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _article = __webpack_require__(42);
  
  var _article2 = _interopRequireDefault(_article);
  
  var _graphql = __webpack_require__(24);
  
  var _BookModel = __webpack_require__(43);
  
  var _BookModel2 = _interopRequireDefault(_BookModel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var books = {
      type: new _graphql.GraphQLList(_article2.default),
      args: {
          id: { type: _graphql.GraphQLID },
          author: { type: _graphql.GraphQLString },
          size: { type: _graphql.GraphQLInt },
          createTime: { type: _graphql.GraphQLFloat }
      },
      resolve: function resolve(root, args) {
          return new _promise2.default(function (resolve, reject) {
              var callback = function callback(err, books) {
                  if (err) reject(err);else resolve(books);
              };
              if (args.id) {
                  _BookModel2.default.find({ _id: args.id }, callback);
              } else {
                  _BookModel2.default.find(args.author ? {} : { author: args.author }).where('createTime').lte(args.createTime ? args.createTime : new Date().getTime()).sort({ createTime: -1 }).limit(args.size && args.size > 0 && args.size < 500 ? args.size : 500).exec(callback);
              }
          });
      }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = books;

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _graphql = __webpack_require__(24);
  
  var ArticleType = new _graphql.GraphQLObjectType({
      name: 'Article',
      fields: function fields() {
          return {
              id: { type: _graphql.GraphQLID },
              title: { type: _graphql.GraphQLString },
              imageUrl: { type: _graphql.GraphQLString },
              thumbnailUrl: { type: _graphql.GraphQLString },
              summary: { type: _graphql.GraphQLString },
              content: { type: _graphql.GraphQLString },
              createTime: { type: _graphql.GraphQLFloat },
              editTime: { type: _graphql.GraphQLFloat },
              author: { type: _graphql.GraphQLString }
          };
      }
  }); /**
       * Created by lan on 16/5/25.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ArticleType;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  /**
   * Created by lan on 16/5/31.
   */
  
  var mongoose = __webpack_require__(20);
  
  var Book = mongoose.model('Book', {
      id: mongoose.Schema.Types.ObjectId,
      title: String,
      imageUrl: String,
      thumbnailUrl: String,
      summary: String,
      content: String,
      createTime: { type: Number, index: true, default: new Date().getTime() },
      editTime: { type: Number, default: new Date().getTime() },
      author: String
  });
  
  exports.default = Book;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _promise = __webpack_require__(41);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _article = __webpack_require__(42);
  
  var _article2 = _interopRequireDefault(_article);
  
  var _graphql = __webpack_require__(24);
  
  var _BookModel = __webpack_require__(43);
  
  var _BookModel2 = _interopRequireDefault(_BookModel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var article = {
      type: _article2.default,
      args: {
          id: { type: _graphql.GraphQLID },
          title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
          imageUrl: { type: _graphql.GraphQLString },
          thumbnailUrl: { type: _graphql.GraphQLString },
          summary: { type: _graphql.GraphQLString },
          content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
      },
  
      resolve: function resolve(root, args) {
          return new _promise2.default(function (resolve, reject) {
              var time = new Date();
              var addBook = function addBook() {
                  var book = new _BookModel2.default({
                      title: args.title,
                      imageUrl: args.imageUrl,
                      thumbnailUrl: args.thumbnailUrl,
                      summary: args.summary,
                      content: args.content,
                      createTime: time.getTime(),
                      editTime: time.getTime(),
                      author: root.request.user._doc._id
                  });
  
                  book.id = book._id;
                  book.save(function (err) {
                      if (err) reject(err);else resolve(book);
                  });
              };
  
              if (args.id) {
                  _BookModel2.default.findById(args.id, function (err, book) {
                      if (err) {
                          reject(err);
                      } else if (book && book.author === root.request.user._doc._id) {
                          book.title = args.title;
                          book.imageUrl = args.imageUrl;
                          book.thumbnailUrl = args.thumbnailUrl;
                          book.summary = args.summary;
                          book.content = args.content;
                          book.editTime = time.getTime();
                          book.save(function (err) {
                              if (err) {
                                  reject(err);
                              } else {
                                  resolve(book);
                              }
                          });
                      } else {
                          reject(new Error("您没有权限!"));
                      }
                  });
              } else {
                  addBook();
              }
          });
      }
  }; /**
      * Created by lan on 16/5/31.
      */
  
  exports.default = article;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _promise = __webpack_require__(41);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _article = __webpack_require__(42);
  
  var _article2 = _interopRequireDefault(_article);
  
  var _graphql = __webpack_require__(24);
  
  var _BookModel = __webpack_require__(43);
  
  var _BookModel2 = _interopRequireDefault(_BookModel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var articleDelete = {
      type: _article2.default,
      args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) }
      },
  
      resolve: function resolve(root, args) {
          return new _promise2.default(function (resolve, reject) {
              _BookModel2.default.findById(args.id, function (err, book) {
                  if (err) {
                      reject(err);
                  } else if (book && book.author === root.request.user._doc._id) {
                      _BookModel2.default.findByIdAndRemove(args.id, function (err, book) {
                          if (err) {
                              reject(err);
                          } else {
                              resolve(book);
                          }
                      });
                  } else {
                      reject(new Error("您没有权限!"));
                  }
              });
          });
      }
  }; /**
      * Created by lan on 16/5/31.
      */
  
  exports.default = articleDelete;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(49);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(84);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _contact = __webpack_require__(90);
  
  var _contact2 = _interopRequireDefault(_contact);
  
  var _login = __webpack_require__(94);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _content = __webpack_require__(98);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _error = __webpack_require__(102);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _article = __webpack_require__(106);
  
  var _article2 = _interopRequireDefault(_article);
  
  var _Edit = __webpack_require__(107);
  
  var _Edit2 = _interopRequireDefault(_Edit);
  
  var _detail = __webpack_require__(108);
  
  var _detail2 = _interopRequireDefault(_detail);
  
  var _index = __webpack_require__(109);
  
  var _index2 = _interopRequireDefault(_index);
  
  var _detail3 = __webpack_require__(116);
  
  var _detail4 = _interopRequireDefault(_detail3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Child routes
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/',
  
    children: [_home2.default, _contact2.default, _login2.default, _content2.default, _error2.default, _article2.default, _detail2.default, _Edit2.default, _index2.default, _detail4.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next;
      var render = _ref.render;
      var context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                return _context.abrupt('return', render((0, _jsx3.default)(_App2.default, {
                  context: context
                }, void 0, component)));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/jsx");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(55);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(56);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(62);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(78);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(81);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 53 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 54 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 55 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(57);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}a{color:#0074c2}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:' (' attr(href) ')'}abbr[title]:after{content:' (' attr(title) ')'}a[href^='#']:after,a[href^='javascript:']:after{content:''}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports


/***/ },
/* 58 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(29);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(60);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(61);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(28);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 60 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 61 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(64);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(66);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(73);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _logoSmall = __webpack_require__(77);
  
  var _logoSmall2 = _interopRequireDefault(_logoSmall);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)('img', {
    src: _logoSmall2.default,
    width: '38',
    height: '38',
    alt: 'React'
  });
  
  function Header() {
    return (0, _jsx3.default)('div', {
      className: _Header2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Header2.default.container
    }, void 0, (0, _jsx3.default)(_Navigation2.default, {
      className: _Header2.default.nav
    }), (0, _jsx3.default)(_Link2.default, {
      className: _Header2.default.brand,
      to: '/'
    }, void 0, _ref, (0, _jsx3.default)('span', {
      className: _Header2.default.brandTxt
    }, void 0, 'Your Company')), (0, _jsx3.default)('div', {
      className: _Header2.default.banner
    }, void 0, (0, _jsx3.default)('h1', {
      className: _Header2.default.bannerTitle
    }, void 0, 'React'), (0, _jsx3.default)('p', {
      className: _Header2.default.bannerDesc
    }, void 0, 'Complex web apps made easy'))));
  }
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Gi4{background:#373277;color:#fff}._1rGb{margin:0 auto;padding:20px 0;max-width:1000px}._19ln{color:#92e5fc;text-decoration:none;font-size:1.75em}._2mix{margin-left:10px}._1zCy{float:right;margin-top:6px}._2Lc2{text-align:center}._2Qzp{margin:0;padding:10px;font-weight:400;font-size:4em;line-height:1em}._3mmk{padding:0;color:hsla(0,0%,100%,.5);font-size:1.25em;margin:0}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Gi4",
  	"container": "_1rGb",
  	"brand": "_19ln",
  	"brandTxt": "_2mix",
  	"nav": "_1zCy",
  	"banner": "_2Lc2",
  	"bannerTitle": "_2Qzp",
  	"bannerDesc": "_3mmk"
  };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(67);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(68);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(69);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _Object$getPrototypeO;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Link)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _history2.default.push(_this.props.to);
          } else {
            _history2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      // eslint-disable-line react/prefer-stateless-function
  
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _history2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  exports.default = Link;

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(70);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(71);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(72);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var history = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                    *
                                                                                                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                    *
                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                    */
  
  exports.default = history;

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 72 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(74);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(75);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(66);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return (0, _jsx3.default)('div', {
      className: (0, _classnames2.default)(_Navigation2.default.root, className),
      role: 'navigation'
    }, void 0, (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/about'
    }, void 0, 'About'), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/contact'
    }, void 0, 'Contact'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, ' | '), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/login'
    }, void 0, 'Log in'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, 'or'), (0, _jsx3.default)(_Link2.default, {
      className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight),
      to: '/register'
    }, void 0, 'Sign up'));
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(76);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, ".Kev6{margin:0}._1-rh{display:inline-block;padding:3px 8px;text-decoration:none;font-size:1.125em}._1-rh,._1-rh:active,._1-rh:visited{color:hsla(0,0%,100%,.6)}._1-rh:hover,.g6k6{color:#fff}.g6k6{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15)}.g6k6:hover{background:rgba(0,0,0,.3)}._2KA9{color:hsla(0,0%,100%,.3)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Kev6",
  	"link": "_1-rh",
  	"highlight": "g6k6",
  	"spacer": "_2KA9"
  };

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACrRJREFUeNqcWAlQlFcSnosBhmFmBAaVG0RAEBQVUUh2jRKjiKJGEfFE8YisGkw066rrmd2o5bWaaIyaQuMRo/EAiRG8SojxwAMFEQWEkUMYkBlmmHtmu//9f+rtXzhFQlXXPN7r192vX/fX/X4+x/4fF4gHxAcSADnQvwJ6jksThxhz6TU+zU/u4RH8dv/43TCKMUhIkyP9y2cZx+Z3ZPGTh/nThpFKGOFOBAlp5Xyaj+1Vht+Z4O/KMNu7DBPYMZoxDJU4i739xe/96+BIB1epXFtf+7p4x9p7quoKLayZgUxAFuKw1PVJA0NcBn+2JcbFy8/H1K5qLvzHwmuauhoNbRwaZaWpS8+8y5NC+rSiPhPSfOM2f3NY4OwSzjBYLea3bRWlh36dl3hc39JkJBTwnNw9hR8dyZshC4nI4PEFPZg9Zp227Pb6pRkvzx+rhX87gPRARuJQdq+SuUZHmkSjD+duAk9Flh/fn1mweNJ2LpdbiB6UBvSdEzZ94QhQ+Kz58V30mnP47L/1HbX/7D5xb9/xHU0N1yt+PPTV1cwp2/lCx0J59LCpntGx3qVHdl+ljbHSHrd1x2Nc2lsYHyJZnzC3iZce33n7/En2heQhh0nXx67dNThk6ryNPAcHSVn23i04Fz5n6VqryaSu+OnI+jtbsorJ0JiY82C+rG/EnPPjBsS2VZa30l7T0V6zsePILkyEpMwP4PJ4opbShw/p0xlpMoHikivzxy0ztLUqIuYu34iEY5zDNTr2GH4zePUhygpJyQgkEof7rgB/l2GUcc4ePakY0b6pa6dPxQQtrgve3C/Uvzjz/UUun++I9PzHQxdwjk4cLs1L7etobkQZHGcPTxlhFPePZGUnSJp1HdSEk8xdyuKnsi8wMcU/Iv3TJR3NDdU4GZnxWWbbizJFdd5pDWEcpctR5ib53yHr9SwctOsxNspT+NV4v7ANFx1lPXrDjwtJrj4BkrhNX6+2mk3G/PlJ+5BwjHO4xuIXOcncUAZHWXJPQwC2oKtr5XWB2gw4Ur/VOafUoKxd7BOIUOEKJIPrlQeNnx764eFLWUKJzKfl6YPf+89fEYWEY5zDNeRBXtwDJBF7B/RDWbX5Fzro5HJkVYZOe9i1jTmFC22EBLBLOqWgfJfAWSTVKZsUzp69Ah1EYo/ulhaMLVOHRqlraqyG2PKF0FCdSQjLAohRwZoaCONOSyQJwoiFSxRYIVFyRKGpC/qGz14629UvKAEwCE/M6XhT97JdUV1lUL1V+Y1Mmqypr31y64t5Bw1tLUZNvQKFc8Revi6OMnfh+1uPLBR7+UXWXsv92VHaQ+rqGxgk6ukdjDwWo6GtvbaqoOzo3qPPT333ggBbBnDNfFZtE/mOTPIceyx/U9C4aeuEUpl/e01lUX1RQUGP0MiYF2ezT9/4NC0/In35MGd5T+9bK9O3wVqzvqXZaDUarEgwNkHZ0amrKyoCk1ISTJr2lkupfzkFRurlA2OHVOWc3A8HbZcEBI/0Gzl+Zmhqhr/61csHwG8is55PFFrR8PV7Bw/+/MtsBxfXUOWT4oNXP5m85eGeDYU1V87VAKK/J5L3loC3GsJnZabX3bpy9uHeTQ/wSoOSUv1j1+xIDJ40K8pqNmveVjxVq2tedsijYmy9Y0ckqaqe3wtJmTcSMMycOyV+D1SQm4pruWfcw6PbwMBJAWM+ngSyH72++UszAUdUYHoHjJ0ydM4znXLmo7fPgifOGgtz0UCDEOCBRo0+fCl7brnBlHKzqhR4Wpzc5HNhPjV62fptc5/pTekVJhsSjqOXb9iOa3Clc4C3GffgXpSBsmiZKDsadaFO1I02oC1oUyc8DMxcm8Ll8lxv/zNzJRTZRhq19XTJ0BXvWJPDsdksLr19wxVXc87oW5sxLmxhMxanArB24huOw9IWTcM1iD0d8P6Me2CvtXjXulxGHi3bhLpQJ+pGGxj46ExPoavE12LQ11VePNFM9EpWJktayh6pda1NL9C4h3s3/8bUNiG0Qew0JOZsFC/swb0AJSpGHlEROKgTdYMNPky28xgDdMo3pQAJ/tA/hbDQn8pav4RkL5FHr36AMPyhq7ePZjBH19xYzTZM19TAzPEoXtgDe8NQRhetOQd1om6woYyJLx7T6EHanwVsqQSQ3Dl8w76BdLZSHQb+Ri74PBnA0QCB/ZtXfEKyrG84lihO8c51P9CYxPRcquLd64+hUuQB3gm4B/o3Q9SiVcmkTNSBulAn6kYb6BBCmygmdyC/kKnp8TOKlXcgiC0pNypz+s1ckobBCnGTjEE84dzdm5DyWRCohqSfin7FAEeC8jMfWqDdSDhm5pEHeXEP7gUZSpSFMlE26kBdoPMu6kYbaFtEXKIkUJABqC5KPHkjHU67gCdwkEJ3Wgqg+gqEJwF07Hz09ZdlCQfOjfX9YNzE2xuXris/8W0l09SS9RcayCDwxhYA2HMAO5cHZq4Jh2xd0fzoTi6AbQB0uRFwAyoo+N/lTR/xPVSHDrKr5RL3TT46RNKgUI+Yv2+b4B4RPQbioz/GCQjSQxzUAIi+cQ8fGG9QtdaVnzx4wmY2WyFLNVQX4iYXcwUCHhiW5ih184GkKXRyl/eEmukPB3XCROhQNj6F/u7yva9WXQCMayEMMjBlqat3oJC+XglNrqlFit0AjkLoOp9AS+0PWecpcBF7QD/vZK9IQlzpzVqN0tiuaoJqUAPdcKTNajWcivfNIuqkmjbMSDxqLAI6Ky2sVwuPKejQKTiBF/q8KS46/cvMUSfIKxtzND+t97ARsxQ38k7XFlwsx0m/hAlhviMSUxp+v3Hs8uwP/49/7PFr03sOipsGMk1GdZueqI962ihGv43HwiymdTYwG+CFJMPOFAp4BX06FU3qgkUTj2sbX5d4xyeMh67BZtJqbDjGufyMpB/Y/PDse46yoB6LCB3M9ZlJbOOxHp82AgApIz0iB1NdJ7Q8DTRiM0GqgxTXQWBvA3BUx23clxm/+ZtMHFNzRoOOza9vVaIMjnzAUAn76gj9dnv+TgO5PD715oOs0RKIbaGFmiCIW0sObj/gIJZ4IOEY51gPYWoPyNBRlUEs4bPRv7s9P7PBqm1QoBKOxC/Ig04Q8jFigRbIa8Anq5dY9DqKD8fQ/rx+emRXC6s75tEyOLRMK9lJdPeV1FknS77dVg3Z1SYfEBtHwgqkvhCCeVLMqq3/sVnM2qK1i1cUrlmUBWPNkJX/3oNryEO2zh5RQ4ejLJBZxbrCbnmMTASzSdtu0NYrzgMozgBlNVCIK9z6DQj2iBryMYBxCAR63lV4nQNeUc8pVeWz9FEHzq3sFfP+F2n3myYrS+6faX32+KV7/0Eh4LGp7a9fHQeZTLC/8zrtfbtwYL7YyIL7uY3JvrLVWd4rkfkgYlS9vVt/+9qh68tSi4iM6vwY88Gek3FecaMyhNIescweKPh5+YuSV8PhlGTr09W3C66ddyX5SYnqcqEI+8mCwz0V1/Nq4d3YQgS4mfW1h+kg8N3p7vPXj/wA4ZvgCmuJHs9A7LX9EcPYb0zyicUhIMXUlceIL4l8IqHITwx2r5LfnecXK+7I7xFGAo/MREBbWIaTfORB3gkX3THMShhFKjN1cWobq7SZCTLZA9Q/YxjbaxbWr81OZlu74LV2R+F/BRgA2E9xgXp3xzgAAAAASUVORK5CYII="

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(79);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return (0, _jsx3.default)('div', {
      className: _Feedback2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Feedback2.default.container
    }, void 0, (0, _jsx3.default)('a', {
      className: _Feedback2.default.link,
      href: 'https://gitter.im/kriasoft/react-starter-kit'
    }, void 0, 'Ask a question'), (0, _jsx3.default)('span', {
      className: _Feedback2.default.spacer
    }, void 0, '|'), (0, _jsx3.default)('a', {
      className: _Feedback2.default.link,
      href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
    }, void 0, 'Report an issue')));
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(_Feedback2.default)(Feedback);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(80);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "._2NP0{background:#f5f5f5;color:#333}._2AyN{margin:0 auto;padding:20px 8px;max-width:1000px;text-align:center;font-size:1.5em}._17M0,._17M0:active,._17M0:hover,._17M0:visited{color:#333;text-decoration:none}._17M0:hover{text-decoration:underline}._2n9Q{padding-right:15px;padding-left:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2NP0",
  	"container": "_2AyN",
  	"link": "_17M0",
  	"spacer": "_2n9Q"
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(82);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(66);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Footer() {
    return (0, _jsx3.default)('div', {
      className: _Footer2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Footer2.default.container
    }, void 0, (0, _jsx3.default)('span', {
      className: _Footer2.default.text
    }, void 0, '© Your Company'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '·'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/'
    }, void 0, 'Home'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '·'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/privacy'
    }, void 0, 'Privacy'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '·'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/not-found'
    }, void 0, 'Not Found')));
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(83);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Jih{background:#333;color:#fff}.n1bV{margin:0 auto;padding:20px 15px;max-width:1000px;text-align:center}._2mr6{color:hsla(0,0%,100%,.5)}._3HO-,._9iT6{color:hsla(0,0%,100%,.3)}._1sUk,._2mr6{padding:2px 5px;font-size:1em}._1sUk,._1sUk:active,._1sUk:visited{color:hsla(0,0%,100%,.6);text-decoration:none}._1sUk:hover{color:#fff}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Jih",
  	"container": "n1bV",
  	"text": "_2mr6",
  	"textMuted": "_9iT6 _2mr6",
  	"spacer": "_3HO-",
  	"link": "_1sUk"
  };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(60);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(85);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _fetch = __webpack_require__(37);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: 'query { books { id,title,content,createTime,imageUrl} }'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
                _context.next = 5;
                return resp.json();
  
              case 5:
                _ref = _context.sent;
                data = _ref.data;
  
                if (!(!data || !data.books)) {
                  _context.next = 9;
                  break;
                }
  
                throw new Error('Failed to load the news feed.');
  
              case 9:
                return _context.abrupt('return', (0, _jsx3.default)(_Home2.default, {
                  books: data.books
                }));
  
              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(86);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Header = __webpack_require__(88);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Home3 = __webpack_require__(89);
  
  var _Home4 = _interopRequireDefault(_Home3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'React Starter Kit'; /**
                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                    *
                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                    *
                                    * This source code is licensed under the MIT license found in the
                                    * LICENSE.txt file in the root directory of this source tree.
                                    */
  
  var _ref2 = (0, _jsx3.default)(_Header2.default, {
    title: '技术博客'
  });
  
  function Home(_ref, context) {
    var books = _ref.books;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Home2.default.root
    }, void 0, _ref2, (0, _jsx3.default)('div', {
      className: _Home2.default.container
    }, void 0, (0, _jsx3.default)('ul', {
      className: _Home2.default.news
    }, void 0, books.map(function (item, index) {
      return (0, _jsx3.default)('li', {
        className: _Home2.default.newsItem
      }, index, (0, _jsx3.default)(_Home4.default, {
        book: item
      }));
    }))));
  }
  
  Home.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(87);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "._2Yej{margin:0 auto;padding:0 0 40px;max-width:1000px}.oTyG{padding:0}._3Ob1{list-style-type:none;padding-bottom:6px}._1yWV{font-size:1.125em}._1yWV,._21LX{display:block}._1VMY{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;background-color:#fff;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2IMq",
  	"container": "_2Yej",
  	"news": "oTyG",
  	"newsItem": "_3Ob1",
  	"newsTitle": "_1yWV",
  	"newsDesc": "_21LX",
  	"card": "_1VMY"
  };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  exports.default = Header;
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header(_ref) {
      var title = _ref.title;
  
  
      return (0, _jsx3.default)('div', {
          style: { display: 'flex',
              flex: 1,
              height: 50,
              backgroundColor: '#d94b40',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20,
              color: 'white' }
      }, void 0, title);
  } /**
     * Created by Guang on 16/6/14.
     */

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(86);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref2 = (0, _jsx3.default)('div', {}, void 0, '作者:大光'); /**
                                                               * Created by Guang on 16/6/14.
                                                               */
  
  function CardWrapper(_ref) {
      var book = _ref.book;
      var title = book.title;
      var createTime = book.createTime;
      var imageUrl = book.imageUrl;
      var id = book.id;
  
      var date = new Date(createTime || 0);
      return (0, _jsx3.default)('div', {
          className: _Home2.default.card
      }, void 0, (0, _jsx3.default)('a', {
          href: '/detail?id=' + id
      }, void 0, (0, _jsx3.default)('div', {
          style: { flex: 1, display: 'flex', padding: 11 }
      }, void 0, (0, _jsx3.default)('div', {
          style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: 8 }
      }, void 0, (0, _jsx3.default)('div', {
          style: {
              fontSize: 15,
              color: '#131313',
              fontWeight: 'bold' }
      }, void 0, title), (0, _jsx3.default)('div', {
          style: { justifyContent: 'space-between', flexDirection: 'row', display: 'flex', marginTop: 8 }
      }, void 0, (0, _jsx3.default)('div', {}, void 0, date.getFullYear(), '-', date.getMonth() + 1, '-', date.getDate()), _ref2)), imageUrl ? (0, _jsx3.default)('img', {
          style: { width: 84, height: 70 },
          src: imageUrl
      }) : null)), (0, _jsx3.default)('div', {
          style: { flex: 1, height: 7, backgroundColor: '#ebebeb', display: 'flex' }
      }));
  }
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(CardWrapper);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(91);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_Contact2.default, {});
  
  exports.default = {
  
    path: '/contact',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(92);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us'; /**
                             * React Starter Kit (https://www.reactstarterkit.com/)
                             *
                             * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                             *
                             * This source code is licensed under the MIT license found in the
                             * LICENSE.txt file in the root directory of this source tree.
                             */
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '...');
  
  function Contact(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Contact2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Contact2.default.container
    }, void 0, _ref, _ref2));
  }
  
  Contact.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Contact2.default)(Contact);

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(93);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "._1G9o{padding-left:20px;padding-right:20px}._2TnC{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1G9o",
  	"container": "_2TnC"
  };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(95);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
      path: '/login',
  
      action: function action(_ref) {
          var context = _ref.context;
  
          return (0, _jsx3.default)(_Login2.default, {
              context: context
          });
      }
  };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(96);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('path', {
    d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  /**
   * Created by lan on 16/6/2.
   */
  
  var _ref2 = (0, _jsx3.default)('span', {}, void 0, 'Log in with GitHub');
  
  var _ref3 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Google');
  
  var Login = function (_Component) {
    (0, _inherits3.default)(Login, _Component);
  
  
    // 构造
  
    function Login(props) {
      (0, _classCallCheck3.default)(this, Login);
  
      // 初始状态
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this, props));
  
      _this.state = {
        text: ""
      };
      return _this;
    }
  
    (0, _createClass3.default)(Login, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.props.context.setTitle('登录');
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: _Login2.default.root
        }, void 0, (0, _jsx3.default)('div', {
          className: _Login2.default.container
        }, void 0, (0, _jsx3.default)('div', {
          className: _Login2.default.formGroup
        }, void 0, (0, _jsx3.default)('a', {
          className: _Login2.default.github,
          href: '/login/github'
        }, void 0, (0, _jsx3.default)('svg', {
          className: _Login2.default.icon,
          height: '30',
          width: '30',
          viewBox: '0 0 16 16',
          xmlns: 'http://www.w3.org/2000/svg'
        }, void 0, _ref, '/>'), _ref2)), (0, _jsx3.default)('div', {
          className: _Login2.default.formGroup
        }, void 0, (0, _jsx3.default)('a', {
          className: _Login2.default.google,
          href: '/login/google'
        }, void 0, (0, _jsx3.default)('svg', {
          className: _Login2.default.icon,
          width: '30',
          height: '30',
          viewBox: '0 0 30 30',
          xmlns: 'http://www.w3.org/2000/svg'
        }, void 0, (0, _jsx3.default)('path', {
          d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
        })), _ref3))));
      }
    }]);
    return Login;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(97);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, ".rQNQ{padding-left:20px;padding-right:20px}._2BVu{margin:0 auto;padding:20px 20px 40px;max-width:380px}._1mJB{font-size:1.25em}._25Ti{margin-bottom:15px}._2G0a{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._1bTr{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._1bTr:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._11e1{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._11e1:hover{background:rgba(54,50,119,.8)}._11e1:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._2nZ7{border-color:#3b5998;background:#3b5998}._2nZ7:hover{background:#2d4373}._23Hc{border-color:#dd4b39;background:#dd4b39}._23Hc:hover{background:#c23321}.AJde{border-color:#55acee;background:#55acee}.AJde:hover{background:#2795e9}.LL7O{border-color:#444;background:#444}._34kk{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.UpbG{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.UpbG:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.UpbG:after,.UpbG:before{position:absolute;content:''}.UpbG:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "rQNQ",
  	"container": "_2BVu",
  	"lead": "_1mJB",
  	"formGroup": "_25Ti",
  	"label": "_2G0a",
  	"input": "_1bTr",
  	"button": "_11e1",
  	"facebook": "_2nZ7 _11e1",
  	"google": "_23Hc _11e1",
  	"twitter": "AJde _11e1",
  	"github": "LL7O _11e1",
  	"icon": "_34kk",
  	"lineThrough": "UpbG"
  };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(60);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Content = __webpack_require__(99);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  var _fetch = __webpack_require__(37);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '*',
  
    action: function action(_ref) {
      var _this = this;
  
      var path = _ref.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref2, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: '{content(path:"' + path + '"){path,title,content,component}}'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 5;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 5:
                _context.next = 7;
                return resp.json();
  
              case 7:
                _ref2 = _context.sent;
                data = _ref2.data;
  
                if (!(!data || !data.content)) {
                  _context.next = 11;
                  break;
                }
  
                return _context.abrupt('return', undefined);
  
              case 11:
                return _context.abrupt('return', _react2.default.createElement(_Content2.default, data.content));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Content = __webpack_require__(100);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Content = function (_Component) {
    (0, _inherits3.default)(Content, _Component);
  
    function Content() {
      (0, _classCallCheck3.default)(this, Content);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Content).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Content, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: _Content2.default.root
        }, void 0, (0, _jsx3.default)('div', {
          className: _Content2.default.container
        }, void 0, this.props.path === '/' ? null : (0, _jsx3.default)('h1', {}, void 0, this.props.title), (0, _jsx3.default)('div', {
          dangerouslySetInnerHTML: { __html: this.props.content || '' }
        })));
      }
    }]);
    return Content;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  Content.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(_Content2.default)(Content);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(101);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, ".aWU5{padding-left:20px;padding-right:20px}._2OJN{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "aWU5",
  	"container": "_2OJN"
  };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(49);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(103);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render;
      var context = _ref.context;
      var error = _ref.error;
  
      return render((0, _jsx3.default)(_App2.default, {
        context: context,
        error: error
      }, void 0, (0, _jsx3.default)(_ErrorPage2.default, {
        error: error
      })), error.status || 500);
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(104);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (false) {
      errorMessage = (0, _jsx3.default)('pre', {}, void 0, error.stack);
    }
  
    context.setTitle(title);
  
    return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h1', {}, void 0, title), (0, _jsx3.default)('p', {}, void 0, content), errorMessage);
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(105);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;margin:2em auto}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _App = __webpack_require__(49);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Edit = __webpack_require__(107);
  
  var _Edit2 = _interopRequireDefault(_Edit);
  
  var _detail = __webpack_require__(108);
  
  var _detail2 = _interopRequireDefault(_detail);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref2 = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'page List2')); /**
                                                                                                         * Created by lan on 16/6/1.
                                                                                                         */
  
  function List(_ref, context) {
      var list = _ref.list;
  
      return _ref2;
  }
  
  var _ref4 = (0, _jsx3.default)(List, {});
  
  exports.default = {
  
      path: '/article',
  
      action: function action(_ref3) {
          var render = _ref3.render;
          var context = _ref3.context;
  
          return render((0, _jsx3.default)(_App2.default, {
              context: context
          }, void 0, _ref4));
      }
  };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _App = __webpack_require__(49);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _detail = __webpack_require__(108);
  
  var _detail2 = _interopRequireDefault(_detail);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by lan on 16/6/1.
   */
  
  var _ref2 = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'page Edit'));
  
  function Edit(_ref, context) {
      var list = _ref.list;
  
      return _ref2;
  }
  
  var _ref4 = (0, _jsx3.default)(Edit, {});
  
  exports.default = {
  
      path: '/article/edit/:id',
  
      action: function action(_ref3) {
          var render = _ref3.render;
          var context = _ref3.context;
  
          return render((0, _jsx3.default)(_App2.default, {
              context: context
          }, void 0, _ref4));
      }
  };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(49);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref2 = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'page Detail')); /**
                                                                                                          * Created by lan on 16/6/1.
                                                                                                          */
  
  function Detail(_ref, context) {
      var article = _ref.article;
  
      return _ref2;
  }
  
  var _ref4 = (0, _jsx3.default)(Detail, {});
  
  exports.default = {
  
      path: '/article/detail/:id',
  
      action: function action(_ref3) {
          var render = _ref3.render;
          var context = _ref3.context;
  
          console.log(context);
  
          return render((0, _jsx3.default)(_App2.default, {
              context: context
          }, void 0, _ref4));
      }
  };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _App = __webpack_require__(49);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Add = __webpack_require__(110);
  
  var _Add2 = _interopRequireDefault(_Add);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
      path: '/article/add',
  
      action: function action(_ref) {
          var render = _ref.render;
          var context = _ref.context;
          var user = _ref.user;
  
          return render((0, _jsx3.default)(_App2.default, {
              context: context
          }, void 0, (0, _jsx3.default)(_Add2.default, {
              context: context
          })), user ? 200 : 401);
      }
  }; /**
      * Created by lan on 16/6/1.
      */

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _stringify = __webpack_require__(60);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Add = __webpack_require__(111);
  
  var _Add2 = _interopRequireDefault(_Add);
  
  var _fetch = __webpack_require__(37);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Add3 = __webpack_require__(113);
  
  var _Add4 = _interopRequireDefault(_Add3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var md = __webpack_require__(35); /**
                               * Created by lan on 16/6/2.
                               */
  
  var img = {
      edit: __webpack_require__(115)
  };
  
  var _ref = (0, _jsx3.default)(_Add4.default, {});
  
  var _ref2 = (0, _jsx3.default)('hr', {});
  
  var Add = function (_Component) {
      (0, _inherits3.default)(Add, _Component);
  
  
      // 构造
  
      function Add(props) {
          (0, _classCallCheck3.default)(this, Add);
  
          // 初始状态
  
          var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Add).call(this, props));
  
          _this.state = {
              text: ""
          };
          return _this;
      }
  
      (0, _createClass3.default)(Add, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
              this.props.context.setTitle("添加文章");
          }
      }, {
          key: 'render',
          value: function render() {
              var _this2 = this;
  
              return (0, _jsx3.default)('div', {
                  id: 'add',
                  className: _Add2.default.root
              }, void 0, _ref, (0, _jsx3.default)('div', {
                  className: _Add2.default.center
              }, void 0, (0, _jsx3.default)('textarea', {
                  className: _Add2.default.inputFrame,
                  type: 'text',
                  placeholder: 'Say something...',
                  onChange: function onChange(e) {
                      _this2.setState({ text: e.target.value });
                  }
              }), (0, _jsx3.default)('div', {
                  className: _Add2.default.showFrame
              }, void 0, (0, _jsx3.default)('div', {
                  style: { display: 'flex', flex: 1, paddingTop: 10 }
              }, void 0, (0, _jsx3.default)('input', {
                  type: 'text',
                  placeholder: '无标题文章',
                  className: _Add2.default.inputTitle,
                  style: { display: 'flex', flex: 1, height: 40, fontSize: 30, paddingLeft: 20, color: '#555555' },
                  onChange: function onChange(e) {
                      _this2.state.title = e.target.value;
                  }
              })), _ref2, (0, _jsx3.default)('span', {
                  className: _Add2.default.showFrame_span,
                  dangerouslySetInnerHTML: this.rawMarkup()
              }), (0, _jsx3.default)('button', {
                  className: _Add2.default.button,
                  type: 'submit',
                  onClick: function onClick() {
                      _this2.send(_this2.state.text, _this2.state.title);
                  }
              }, void 0, (0, _jsx3.default)('img', {
                  style: { marginRight: '10px' },
                  src: img.edit
              }), '发布'))));
          }
      }, {
          key: 'rawMarkup',
          value: function rawMarkup() {
              //md.setOptions({
              //    highlight: function (code, lang, callback) {
              //        require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
              //            callback(err, result.toString());
              //        });
              //    }
              //});
              return { __html: md(this.state.text) };
          }
      }, {
          key: 'send',
          value: function send(text, title) {
              if (!title) {
                  alert("标题不可为空");
                  return;
              }
              var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
              var meta = { // table of character substitutions
                  "\b": "\\b",
                  "\t": "\\t",
                  "\n": "\\n",
                  "\f": "\\f",
                  "\r": "\\r",
                  "\"": "\\\"",
                  "\\": "\\\\"
              };
  
              var quote = function quote(string) {
  
                  // If the string contains no control characters, no quote characters, and no
                  // backslash characters, then we can safely slap some quotes around it.
                  // Otherwise we must also replace the offending characters with safe escape
                  // sequences.
  
                  rx_escapable.lastIndex = 0;
                  return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) {
                      var c = meta[a];
                      return typeof c === "string" ? c : '\\u' + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                  }) + "\"" : "\"" + string + "\"";
              };
  
              var requestText = quote('' + text);
  
              console.log("requestText", requestText);
              (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                      query: 'mutation{article(title: "' + title + '", content: ' + requestText + ') {id}}'
                  }),
                  credentials: 'include'
              }).then(function (resp) {
                  return resp.json();
              }).then(function (data) {
                  console.log(data);
                  if (data.data.article.id) {
                      alert("发布成功!");
                  } else {
                      alert("发布失败!");
                  }
              }).catch(function (err) {
                  alert(err);
              });
          }
      }]);
      return Add;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Add2.default)(Add);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(112);
      var insertCss = __webpack_require__(59);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(58)();
  // imports
  
  
  // module
  exports.push([module.id, "body,html{height:100%;background:#e9e9e9}._1r8b{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}._1r8b,.BliM{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-direction:normal}.BliM{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}._28J4{background-image:-webkit-gradient(linear,left top,left bottom,from(#ef6f5e),to(#da3c30));background-image:-webkit-linear-gradient(top,#ef6f5e,#da3c30);background-image:linear-gradient(-180deg,#ef6f5e,#da3c30);width:100%;height:60px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}._28J4,.uD_P{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.uD_P{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin-left:26px;margin-right:26px}.vvC1{margin-left:20px}._17KC,.vvC1{font-family:Roboto-Medium;font-size:20px;color:#fff;letter-spacing:0;text-align:left}._17KC{margin-left:10px}._14cB{border:1px solid #fff;width:0;height:34px;margin-right:38px}.LP3A{width:50%;background-color:transparent;resize:none;font-size:13px;outline:none;border-style:none;padding-left:50px;padding-top:20px}.bVxo{float:right;width:50%;height:100%;background-color:#fff;box-sizing:border-box;padding-bottom:146px}._2i1O{float:left;height:100%;width:100%;overflow-y:auto}.mORg{background-image:-webkit-gradient(linear,left top,left bottom,from(#ef6f5e),to(#da3c30));background-image:-webkit-linear-gradient(top,#ef6f5e,#da3c30);background-image:linear-gradient(-180deg,#ef6f5e,#da3c30);width:100%;height:60px;font-size:20px;color:#fff}.mORg,.yjnR{border:none;outline:none}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1r8b",
  	"center": "BliM",
  	"header": "_28J4",
  	"header_wrapper": "uD_P",
  	"title": "vvC1",
  	"push_text": "_17KC",
  	"header_split": "_14cB",
  	"inputFrame": "LP3A",
  	"showFrame": "bVxo",
  	"showFrame_span": "_2i1O",
  	"button": "mORg",
  	"inputTitle": "yjnR"
  };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Add = __webpack_require__(111);
  
  var _Add2 = _interopRequireDefault(_Add);
  
  var _withStyles = __webpack_require__(63);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var img = {
      login: __webpack_require__(114),
      edit: __webpack_require__(115)
  }; /**
      * Created by Guang on 16/6/13.
      */
  
  var Header = function (_React$Component) {
      (0, _inherits3.default)(Header, _React$Component);
  
      function Header() {
          (0, _classCallCheck3.default)(this, Header);
          return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Header).apply(this, arguments));
      }
  
      (0, _createClass3.default)(Header, [{
          key: 'render',
          value: function render() {
              return (0, _jsx3.default)('div', {
                  className: _Add2.default.header
              }, void 0, (0, _jsx3.default)('div', {
                  className: _Add2.default.header_wrapper
              }, void 0, (0, _jsx3.default)('img', {
                  src: img.login
              }), (0, _jsx3.default)('div', {
                  className: _Add2.default.title
              }, void 0, 'Technology Book')), (0, _jsx3.default)('div', {
                  className: _Add2.default.header_wrapper
              }, void 0, (0, _jsx3.default)('div', {
                  className: _Add2.default.header_split
              }), (0, _jsx3.default)('img', {
                  src: img.edit
              }), (0, _jsx3.default)('div', {
                  className: _Add2.default.push_text
              }, void 0, '发布')));
          }
      }]);
      return Header;
  }(_react2.default.Component);
  
  exports.default = (0, _withStyles2.default)(_Add2.default)(Header);

/***/ },
/* 114 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAdCAYAAADYSS5zAAAAAXNSR0IArs4c6QAAAgNJREFUWAntl70vBEEYxq3vCCHxkVAJISGcKJBcQlQS4Vqd/0FJrVQoqDUUWrWIToFOQkKh0Akh0Z2P9Xs3O3drdu6yayayhTd57p33Y555bnZvd66mxqH5vt8ERh1SuqVC3BYQG3bFXOuKKOTp0bw1vWuBMUHsZl0smSJhJZDFx8E5mDStSf6Q/BXeM9WT5KwEssAcmALzwGQTJEdAg6mYJGcrUK3x6x1SBJV8faVCwvxz2PcUehUrf0u+CbyH9b913Ft1IA+CL4pvBdNKBWOpN6v43//vQJId4J6R92lLkl6XPazZJtA5Y48Hmq5pkmfXK7gLIbljcOl53hfeylgjB8EiED8UogP/BrpYo4iPGxMHQTV7pLgHjG+OOGM5w5x+sA0eQDVbKM/SRsxaqzZTq50Slx4pGlUppKcPHIAPkMR2SpP1AbNPkjBEej4Z7wLjs478KngBaexe1xXEMLSDYhqmSO8F494oMfFmpJ52OBblUgJX0rJo/TfEXUKGX9dqacMNk8D9tCyG/iNyOZD0fjNQBKkzJTA4zZCSQ6X87G1NLs0AsDqkMn8GTd0iRh238ow7JZERE11LokUJXM6IsKiMQJMSWIhWMjJe4DI31vIxiCB5tWXN5L08LzuYxd1Tm1XIusBlETir5DryviMeoen3uAdt/zj90MNR6eNHwjL4BvEIMzTzf0fiAAAAAElFTkSuQmCC"

/***/ },
/* 115 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAhCAYAAADK6cvnAAAAAXNSR0IArs4c6QAAAlVJREFUSA21l71rFFEUxWeiQlIZMGAjhN1obIxgrIQQMR9YCIKF4D8gNqJNmmCTJqVdGrXVKp1gkVi4sZAUCyFVgqBCjJpOROIWKpvf3Z152Zm9d/bt7OyFs/PeufedM/ft28kkrNfrYRAEF8EQ6CUOwjD8oQngcQL+NngXMHkFiojVtBmiIbgPdsB1yQvxl+smeClED/GZDt/G69E9w3gDlMAtchWugXQo8awxKegDvTHwDRyCGwlZCInCDNE6D/bBHzCTMJMJpEQhhuhIZ1+BmM22meU1RKwMPgDXQcTtca2BOdWsB8MLiLrviHEJxGbzrWbwS2DKcUwkut5S1oyD70AOhnxn0tlNJxwN4CSc/kC6wHfOMf9IrZzAX2AE3IFb45oZJ7Usd/QQ/pyWa+H2MVihVkxHGa+35Oyh9Eu4lqWSebXBZn9UbdXjTCTh9NUOKZe7tnKx2r940M3VEp1EZNgQes/2/TRyHWnL8Ckrrxqrr8HLszdXWIaPUDttKO4avBdtGYroKUPhv8F70ZahHHFrS5+Te+ClrhRZhi+ofaPUC+X1czDW6kefU+h+N9bCvLzaIT/W1whOpER/cyOXU1zXU9UQlT0wmFI7TM1zTVVDOpFnaV9CNWRLl3Erd3CUl6YnHWra0qohVfIH80pbdZLYSk79Zqohd954h/ST6K5KNWRL7yFzNkOqwk1tZ+TNlGpI9QKwnjQi9hgUangXwaz/NQ7ENU+oHbJdX/KI+azJ/RLlI67VSIc1MM1B6dvzM/Jo+mO0COTVvF/xCeFLTbcgOAJ1IfFg9ELbRwAAAABJRU5ErkJggg=="

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Created by Guang on 16/6/14.
   */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(60);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Detail = __webpack_require__(117);
  
  var _Detail2 = _interopRequireDefault(_Detail);
  
  var _fetch = __webpack_require__(37);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
      path: '/detail',
  
      action: function action() {
          var _this = this;
  
          return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
              var resp, _ref, data;
  
              return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                      switch (_context.prev = _context.next) {
                          case 0:
                              _context.next = 2;
                              return (0, _fetch2.default)('/graphql', {
                                  method: 'post',
                                  headers: {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json'
                                  },
                                  body: (0, _stringify2.default)({
                                      query: 'query { books { id,title,content,createTime,imageUrl} }'
                                  }),
                                  credentials: 'include'
                              });
  
                          case 2:
                              resp = _context.sent;
                              _context.next = 5;
                              return resp.json();
  
                          case 5:
                              _ref = _context.sent;
                              data = _ref.data;
  
                              if (data) {
                                  _context.next = 9;
                                  break;
                              }
  
                              throw new Error('Failed to load the news feed.');
  
                          case 9:
                              return _context.abrupt('return', (0, _jsx3.default)(_Detail2.default, {
                                  data: data
                              }));
  
                          case 10:
                          case 'end':
                              return _context.stop();
                      }
                  }
              }, _callee, _this);
          }))();
      }
  };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Created by Guang on 16/6/14.
   */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _jsx2 = __webpack_require__(47);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(50);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(51);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(52);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(53);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(54);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(48);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Header = __webpack_require__(88);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Header2.default, {
      title: '技术博客'
  });
  
  var Detail = function (_React$Component) {
      (0, _inherits3.default)(Detail, _React$Component);
  
      function Detail() {
          (0, _classCallCheck3.default)(this, Detail);
          return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Detail).apply(this, arguments));
      }
  
      (0, _createClass3.default)(Detail, [{
          key: 'render',
          value: function render() {
              var _props$data = this.props.data;
              var title = _props$data.title;
              var content = _props$data.content;
              var imageUrl = _props$data.imageUrl;
              var createTime = _props$data.createTime;
  
              var date = new Date(createTime || 0);
  
              return (0, _jsx3.default)('div', {
                  style: { flex: 1 }
              }, void 0, _ref, imageUrl ? (0, _jsx3.default)('img', {
                  style: { flex: 1, height: 180 },
                  src: imageUrl
              }) : null, (0, _jsx3.default)('div', {
                  style: { fontSize: 21, padding: 11 }
              }, void 0, title), (0, _jsx3.default)('div', {
                  style: { flexDirection: 'row', flex: 1, padding: 11 }
              }, void 0, (0, _jsx3.default)('div', {
                  style: { fontSize: 12, color: '#989898' }
              }, void 0, '作者:大光'), (0, _jsx3.default)('div', {
                  style: { marginLeft: 20, fontSize: 12, color: '#989898' }
              }, void 0, date.getFullYear(), '-', date.getMonth() + 1, '-', date.getDate()), (0, _jsx3.default)('div', {
                  style: { marginLeft: 20, fontSize: 12, color: '#989898' }
              }, void 0, '阅读133万+')), (0, _jsx3.default)('div', {}, void 0, content));
          }
      }]);
      return Detail;
  }(_react2.default.Component);
  
  exports.default = Detail;

/***/ },
/* 118 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(120);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  buf.push("<!DOCTYPE html><html lang=\"\" class=\"no-js\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("description", description, true, true)) + "><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\"><style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp) + "</style></head><body><div id=\"app\" style=\"height:100%\">" + (null == (jade_interp = body) ? "" : jade_interp) + "</div><script" + (jade.attr("src", entry, true, true)) + "></script><script>window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\nga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')</script>");
  if ( trackingId)
  {
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer></script>");
  }
  buf.push("</body></html>");}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  }

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(30).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(120);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  buf.push("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Internal Server Error</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><style>* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  margin: 2em auto;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n</style></head><body><h1>Internal Server Error</h1><p>Sorry, something went wrong.</p><pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)) + "</pre></body></html><!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map