const LRU = require("lru-cache");
const accountModel = require('../models/account.model')
const cache = new LRU({
  max: 500,
  maxAge: 24*3600*1000, // refresh after 1 day
});

module.exports = function (app) {
  app.use((req, res, next) => {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  });
}