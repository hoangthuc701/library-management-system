const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const readerCardController = require('../controllers/reader_card.controller');
const CategoryController = require('../controllers/category.controller');
const returningCardController = require('../controllers/returning_card.controller');
const multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/bookTitleImage')
    },

    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});


var upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 2048 * 2048
    }
});

const directory = '/public/bookTitleImage/';

router.get('/admin/BookTitles', bookTitleController.getByOffset);
router.get('/admin/BookTitles/getinfo/:id', bookTitleController.getByID);
router.post('/admin/BookTitles/add', upload.single('urlImage'), bookTitleController.add);
router.get('/admin/BookTitles/del/:id', bookTitleController.delete);
router.post('/admin/BookTitles/edit', upload.single('urlImage'), bookTitleController.update);

router.get('/admin/BorrowingCard', borrowingCardController.getByOffset);
router.get('/admin/BorrowingCard/getinfo/:id', borrowingCardController.getByID);
router.post('/admin/BorrowingCard/add',borrowingCardController.add);
router.get('/admin/BorrowingCard/del/:id', borrowingCardController.delete);
router.post('/admin/BorrowingCard/edit',borrowingCardController.update);

router.get('/admin/borrowingCardBook', borrowingCardBookController.getByOffset);
router.get('/admin/borrowingCardBook/getinfo/:id', borrowingCardBookController.getByID);
router.post('/admin/borrowingCardBook/add',borrowingCardBookController.add);
router.get('/admin/borrowingCardBook/del/:id', borrowingCardBookController.delete);
router.post('/admin/borrowingCardBook/edit',borrowingCardBookController.update);

router.get('/admin/readerCard', readerCardController.getByOffset);
router.get('/admin/readerCard/getinfo/:id', readerCardController.getByID);
router.post('/admin/readerCard/add',readerCardController.add);
router.get('/admin/readerCard/del/:id', readerCardController.delete);
router.post('/admin/readerCard/edit',readerCardController.update);

router.get('/admin/category', CategoryController.getByOffset);
router.get('/admin/category/getinfo/:id', CategoryController.getByID);
router.post('/admin/category/add',CategoryController.add);
router.get('/admin/category/del/:id', CategoryController.delete);
router.post('/admin/category/edit',CategoryController.update);

router.get('/admin/returningCard', returningCardController.getByOffset);
router.get('/admin/returningCard/getinfo/:id', returningCardController.getByID);
router.post('/admin/returningCard/add',returningCardController.add);
router.get('/admin/returningCard/del/:id', returningCardController.delete);
router.post('/admin/returningCard/edit/:id',returningCardController.update);

router.get('/admin/Accounts', accountController.getByOffset);
router.get('/admin/Accounts/getinfo/:id',accountController.getByID);
router.post('/admin/Accounts/add',accountController.add);
router.post('/admin/Accounts/edit/:id',accountController.update);
module.exports = router;