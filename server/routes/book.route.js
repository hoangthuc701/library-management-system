const express = require("express");
const moment = require("moment");
const comments = require("../models/comment.model");
const book = require("../models/book_title.model");
const mdlFunction = require("../middlewares/UtilityFunction");
const dateUtils = require("../middlewares/dateUtils");
const router = express.Router();

router.get("/bookDetail/:id", async (req, res) => {
    const id = +req.params.id;
    const row = await book.loadByID(id);

    var book_titleEntity = {
        id: id,
        view: row[0]["view"] + 1
    }
    await book.update(book_titleEntity);
    
    

    if (row[0]) {
        const [_relatedBook, _comments, quantity] = await Promise.all([
            book.load5DependCategory(id, row[0]["category_id"]),
            comments.load5CommentsOffset(id, 0),
            comments.getCommentsQuantity(id),
        ]);
    
        res.render("bookDetail/detail", {
            _book: row[0],
            _relatedBook,
            _comments,
            quantity,
            _pagi: mdlFunction.rangeOfPagination(Math.ceil(+quantity[0]["SoLuong"] / 5), 1),
        });
    }
});

router.get("/bookDetail", async (req, res) => {
    const [id, page] = [req.query.id, req.query.page];
    const [_comments, quantity] = await Promise.all([
        comments.load5CommentsOffset(id, (page - 1) * 5),
        comments.getCommentsQuantity(id),
    ]);

    const _pagi = mdlFunction.rangeOfPagination(Math.ceil(+quantity[0]["SoLuong"] / 5), page);

    res.json({ _comments, _pagi });
});


router.post("/book-comment", async (req, res) => {

    const entity = {
      Comment: req.body.Comment,
      //AccountID: +req.session.authUser["id"],
      AccountID: '1',
      BookID: req.body.BookID,
      Created: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
      
    };
  
    await comments.addComment(entity);
  
    const [_comments, _quantity] = await Promise.all([
      comments.load5CommentsOffset(+req.body.BookID, 0),
      comments.getCommentsQuantity(+req.body.BookID),
    ]);
    console.log(_comments);
    res.json({
      _comments,
      _quantity: +_quantity[0]["SoLuong"],
      _pagi: mdlFunction.rangeOfPagination(
        Math.ceil(+_quantity[0]["SoLuong"] / 5),
        1
      ),
    });
  });
module.exports = router;
