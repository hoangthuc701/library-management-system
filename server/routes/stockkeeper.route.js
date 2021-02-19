const router = require('express').Router();
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const returningCardController = require('../controllers/returning_card.controller');

router.post('/stockkeeper/BookTitles/add',borrowingCardController.add);

router.get('/stockkeeper/BorrowingCard', borrowingCardController.getByOffset);
router.get('/stockkeeper/BorrowingCard/getinfo/:id', borrowingCardController.getByID);
router.post('/stockkeeper/BorrowingCard/add',borrowingCardController.add);
router.get('/stockkeeper/BorrowingCard/del/:id', borrowingCardController.delete);
router.post('/stockkeeper/BorrowingCard/edit',borrowingCardController.update);

router.get('/stockkeeper/borrowingCardBook', borrowingCardBookController.getByOffset);
router.get('/stockkeeper/borrowingCardBook/getinfo/:id', borrowingCardBookController.getByID);
router.post('/stockkeeper/borrowingCardBook/add',borrowingCardBookController.add);
router.get('/stockkeeper/borrowingCardBook/del/:id', borrowingCardBookController.delete);
router.post('/stockkeeper/borrowingCardBook/edit',borrowingCardBookController.update);

router.get('/stockkeeper/returningCard', returningCardController.getByOffset);
router.get('/stockkeeper/returningCard/getinfo/:id', returningCardController.getByID);
router.post('/stockkeeper/returningCard/add/:id',returningCardController.add);
router.get('/stockkeeper/returningCard/del/:id',returningCardController.delete);
router.post('/stockkeeper/returningCard/edit/:id',returningCardController.update);

router.get('/stockkeeper/search',bookTitleController.search);
module.exports = router;