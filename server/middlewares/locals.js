const accountModel = require('../models/account.model');
const Category = require('../models/category.model');


module.exports = function (app) {
  app.use(async (req, res, next) => {
    res.locals.lcCats = await Category.load();
    next();
  });


  app.use((req, res, next) => {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    res.locals.lcCart = req.session.cart;
    next();
  });
}