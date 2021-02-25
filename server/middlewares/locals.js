const LRU = require("lru-cache");
const accountModel = require('../models/account.model');
const Category = require('../models/category.model');
const cache = new LRU({
  max: 500,
  maxAge: 300000, // refresh after 1 day
});
const GLB_CATEGORIES = "globalCategories";
module.exports = function (app) {
  app.use(async (req, res, next) => {
    let Cats = cache.get(GLB_CATEGORIES);
    if (!GLB_CATEGORIES) {
      const _Cats = await Category.load();
      Cats = _Cats;
      // save to cache
      cache.set(GLB_CATEGORIES, _Cats);
    }
    var l = 0;
    res.locals.lcCats = await Category.load();
    console.log(res.locals.lcCats);
    console.log(l)
    next();
  });


  app.use((req, res, next) => {
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
  });
}