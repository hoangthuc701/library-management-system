const router = require('express').Router();
const book_titleModel = require('../models/book_title.model');
router.get('/', async (req,res) => {
    var newLocal = 'home/home';
    var list6GonnaOutOfStock = await book_titleModel.loadGonnaOutOfStockBook();
    var list6MostView = await book_titleModel.loadMostView();
    res.render(newLocal, {list6GonnaOutOfStock: list6GonnaOutOfStock, list6MostView: list6MostView});
});


module.exports = router;