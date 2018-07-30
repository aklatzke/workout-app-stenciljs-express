'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _etc = require('./routes/etc');

var _etc2 = _interopRequireDefault(_etc);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _workouts = require('./routes/workouts');

var _workouts2 = _interopRequireDefault(_workouts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

(0, _etc2.default)(routes, _db2.default);
(0, _users2.default)(routes, _db2.default);
(0, _workouts2.default)(routes, _db2.default);

/**
 * GET home page
 */
routes.get('*', (req, res) => {
  res.sendFile("../../www/index.html");
});

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});

exports.default = routes;
//# sourceMappingURL=routes.js.map