const router = require('express').Router();
const bookController = require('../controllers/book.controller');
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const readerCardController = require('../controllers/reader_card.controller');
const CategoryController = require('../controllers/category.controller');
const orderingCardController = require('../controllers/ordering_card.controller');
const orderingCardBookController = require('../controllers/ordering_card_book.controller');
const returningCardController = require('../controllers/returning_card.controller');

router.get('/admin/Books', bookController.getByOffset);
router.get('/admin/Books/getinfo/:id', bookController.getByID);
router.get('/admin/Books/add',bookController.add);
router.get('/admin/Books/del/:id', bookController.delete);
router.get('/admin/Books/edit/:id',bookController.update);

router.get('/admin/BookTitles', bookTitleController.getByOffset);
router.get('/admin/BookTitles/getinfo/:id', bookTitleController.getByID);
router.get('/admin/BookTitles/add',bookTitleController.add);
router.get('/admin/BookTitles/del/:id', bookTitleController.delete);
router.get('/admin/BookTitles/edit/:id',bookTitleController.update);

router.get('/admin/BorrowingCard', borrowingCardController.getByOffset);
router.get('/admin/BorrowingCard/getinfo/:id', borrowingCardController.getByID);
router.get('/admin/BorrowingCard/add',borrowingCardController.add);
router.get('/admin/BorrowingCard/del/:id', borrowingCardController.delete);
router.get('/admin/BorrowingCard/edit/:id',borrowingCardController.update);

router.get('/admin/borrowingCardBook', borrowingCardBookController.getByOffset);
router.get('/admin/borrowingCardBook/getinfo/:id', borrowingCardBookController.getByID);
router.get('/admin/borrowingCardBook/add',borrowingCardBookController.add);
router.get('/admin/borrowingCardBook/del/:id', borrowingCardBookController.delete);
router.get('/admin/borrowingCardBook/edit/:id',borrowingCardBookController.update);

router.get('/admin/readerCard', readerCardController.getByOffset);
router.get('/admin/readerCard/getinfo/:id', readerCardController.getByID);
router.get('/admin/readerCard/add',readerCardController.add);
router.get('/admin/readerCard/del/:id', readerCardController.delete);
router.get('/admin/readerCard/edit/:id',readerCardController.update);

router.get('/admin/category', CategoryController.getByOffset);
router.get('/admin/category/getinfo/:id', CategoryController.getByID);
router.get('/admin/category/add',CategoryController.add);
router.get('/admin/category/del/:id', CategoryController.delete);
router.get('/admin/category/edit/:id',CategoryController.update);

router.get('/admin/orderingCard', orderingCardController.getByOffset);
router.get('/admin/orderingCard/getinfo/:id', orderingCardController.getByID);
router.get('/admin/orderingCard/add',orderingCardController.add);
router.get('/admin/orderingCard/del/:id', orderingCardController.delete);
router.get('/admin/orderingCard/edit/:id',orderingCardController.update);

router.get('/admin/orderingCardBook', orderingCardBookController.getByOffset);
router.get('/admin/orderingCardBook/getinfo/:id', orderingCardBookController.getByID);
router.get('/admin/orderingCardBook/add',orderingCardBookController.add);
router.get('/admin/orderingCardBook/del/:id', orderingCardBookController.delete);
router.get('/admin/orderingCardBook/edit/:id',orderingCardBookController.update);

router.get('/admin/returningCard', returningCardController.getByOffset);
router.get('/admin/returningCard/getinfo/:id', returningCardController.getByID);
router.get('/admin/returningCard/add/:id',returningCardController.add);
router.get('/admin/returningCard/del/:id', returningCardController.delete);
router.get('/admin/returningCard/edit/:id',returningCardController.update);

router.get('/admin/Accounts', accountController.getByOffset);
router.get('/admin/Accounts/getinfo/:id',accountController.getByID);
router.get('/admin/Accounts/add',accountController.add);
router.get('/admin/Accounts/edit/:id',accountController.update);
module.exports = router;