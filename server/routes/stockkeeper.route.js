const router = require('express').Router();
const orderingCardBookController = require('../controllers/ordering_card_book.controller');
const orderingCardController = require('../controllers/ordering_card.controller');
const bookController = require('../controllers/book.controller');
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const returningCardController = require('../controllers/returning_card.controller');

// router.get('/stockkeeper/Books/add',bookController.add);
// router.get('/stockkeeper/BookTitles/add',bookTitleController.add);

// router.get('/stockkeeper/ordering/add',orderingCardController.add);
// router.get('/stockkeeper/ordering/edit/:id',orderingCardController.update);

// router.get('/stockkeeper/orderingBook/add',orderingCardBookController.add);
// router.get('/stockkeeper/orderingBook/edit/:id',orderingCardBookController.update);

// router.get('/stockkeeper/BorrowingCard', borrowingCardController.getByOffset);

// router.get('/stockkeeper/borrowingCardBook', borrowingCardBookController.getByOffset);

router.get('/stockkeeper/returningCard/add/:id',returningCardController.add);

router.get('/stockkeeper/search',bookTitleController.search);
module.exports = router;