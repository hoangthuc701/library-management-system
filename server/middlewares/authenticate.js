const expressJwt = require('express-jwt');
require('dotenv').config();

exports.auth = expressJwt({
  secret: process.env.PRIVATE_KEY,
  algorithms: ['HS256'],
  resultProperty: 'user',
});
