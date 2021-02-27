const express = require("express");

const categories = require("../models/category.model");
const book = require("../models/book_title.model");

const router = express.Router();

router.get('/category/:id', async (req, res) => {
  const id = +req.params.id;

  const categoryName = (await categories.loadByID(id))[0];

  const _book = await book.loadByCategoryID(id, 0);
  console.log(categoryName);
  res.render('category/list', {
    _categoryName: categoryName,
    _book,
    _offset: 0
  });
});

router.get("/category-load-more", async (req, res) => {
  const id = +req.query.id;
  const offset = +req.query.offset;

  const categoryName = (await categories.loadByID(id))[0];

  const _book = await book.loadByCategoryID(id, offset);
  
  res.json(_book);
});
module.exports = router;
