const router = require('express').Router();
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const returningCardController = require('../controllers/returning_card.controller');
const multer = require('multer');
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

router.get('/stockkeeper/BookTitles', bookTitleController.getByOffset);
router.get('/stockkeeper/BookTitles/getinfo/:id', bookTitleController.getByID);
router.post('/stockkeeper/BookTitles/add', upload.single('urlImage'), bookTitleController.add);
router.get('/stockkeeper/BookTitles/del/:id', bookTitleController.delete);
router.post('/stockkeeper/BookTitles/edit', upload.single('urlImage'), bookTitleController.update);

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
router.post('/stockkeeper/returningCard/add',returningCardController.add);
router.get('/stockkeeper/returningCard/del/:id',returningCardController.delete);
router.post('/stockkeeper/returningCard/edit/:id',returningCardController.update);

router.get('/stockkeeper/search',bookTitleController.search);
module.exports = router;