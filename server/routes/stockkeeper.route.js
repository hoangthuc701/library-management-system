const router = require('express').Router();
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const returningCardController = require('../controllers/returning_card.controller');

// router.get('/stockkeeper/Books/add',bookController.add);
// router.get('/stockkeeper/BookTitles/add',bookTitleController.add);

// router.get('/stockkeeper/BorrowingCard', borrowingCardController.getByOffset);

// router.get('/stockkeeper/borrowingCardBook', borrowingCardBookController.getByOffset);

router.post('/stockkeeper/returningCard/add/',returningCardController.add);
router.get('/stockkeeper/returningCard/del/:id',returningCardController.delete);

router.get('/stockkeeper/search',bookTitleController.search);
module.exports = router;