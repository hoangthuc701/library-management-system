const router = require('express').Router();
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const returningCardController = require('../controllers/returning_card.controller');
const multer = require('multer');

const BookTitle = require('../models/book_title.model');
const Category = require('../models/category.model');
const BorrowingCardBook = require('../models/borrowing_card_book.model');
const ReturningCard = require('../models/returning_card.model');
const moment = require('moment');
const md5 = require('md5');
const dateUtils = require('../middlewares/dateUtils')
const fs = require('fs');
const functUtils = require('../middlewares/UtilityFunction');
const restrictStocker = require('../middlewares/restrictStocker');

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

//  =======================================       book title
router.get('/stockkeeper/BookTitle', restrictStocker,async function (req, res) {
    var p = 1;
    var list = [];
    if (req.query.p)
        p = req.query.p;

    var listBookTitle = await BookTitle.loadByOffset((p - 1) * 10);
    var listCate = await Category.load();
    
    var quantity = await BookTitle.quantity();
    const newLocal = 'stocker/BookTitle/list';
    res.render(newLocal, {
        ListCate: listCate,
        List: listBookTitle, quantity: quantity[0]["quantity"],
        pagi: functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'stock'
    });
});

router.get('/stockkeeper/BookTitle/add', restrictStocker,async function (req, res) {
    var listCategory = await Category.load();
    const newLocal = 'stocker/BookTitle/add';
    res.render(newLocal, {List: listCategory});
});
router.post('/stockkeeper/BookTitle/add', upload.single('urlImage'), async function (req, res) {
    var list = await BookTitle.loadName(req.body.name);
    if (list.length != 0) {
        var text = `Tên sách đã tồn tại, vui lòng nhập tên khác!`
		var link = '/stockkeeper/BookTitle?p=1';
		res.render('duplicateItem', {Text: text, Link: link, layout: 'addandedit'});
    }
    else {
        var image = '';
        if (req.file) {
            image = req.file.filename;
        }
        console.log(req.file.filename);
        var book_titleEntity = {
            name: req.body.name,
            author: req.body.author,
            quantity: req.body.quantity,
            category_id: req.body.categoryID,
            image: image,
            description: req.body.description,
            created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
            updated_at: '',
            view: 0
        }
        await BookTitle.insert(book_titleEntity);
        res.redirect('/stockkeeper/BookTitle?p=1');
    }
});

router.get('/stockkeeper/BookTitle/edit', restrictStocker,async function (req, res) {
    console.log(req.params.id);
    var listBook = await BookTitle.loadByID(+req.query.id);
    var listCategory = await Category.load();
    const newLocal = 'stocker/BookTitle/edit';
    res.render(newLocal, { Listcate: listCategory, ListBook: listBook, layout: 'main'});
});
router.post('/stockkeeper/BookTitle/edit/:id', upload.single('urlImage'), async function (req, res) {
    var BookID = +req.params.id;
    const row = await BookTitle.loadByID(BookID);
    // if recieve new image, delete old image 
    var image = '';
    if (req.file) {
        var imagePath = 'public/bookTitleImage/' + row[0]["image"].substring(0, row[0]["image"].length);
        fs.unlinkSync(imagePath);
        image = req.file.filename;

    }
    else {
        image = row[0]['image'];
    }
    var book_titleEntity = {
        id: BookID,
        name: req.body.name,
        author: req.body.author,
        quantity: req.body.quantity,
        category_id: req.body.categoryID,
        image: image,
        description: req.body.description,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
    }
    await BookTitle.update(book_titleEntity);
    res.redirect('/stockkeeper/BookTitle?p=1');
});
router.get('/stockkeeper/BookTitle/del/:id', restrictStocker,async function (req, res) {
    var id = req.params.id;
    const row = await BookTitle.loadByID(id);
    var listborrowing = await BorrowingCardBook.loadByBookID(id);
    var check = false;
    if (listborrowing.length != 0) {
        for (var i = 0; i < listborrowing.length; i++) {
            var listReturningCard = await ReturningCard.loadByborrowingCardID(listborrowing[i]["borrowing_card_id"]);
            if (listReturningCard.length == 0) {
                check = true;
            }
        }
        if (check == false) {
            var imagePath = 'public/bookTitleImage/' + row[0]["image"].substring(0, row[0]["image"].length);
            fs.unlinkSync(imagePath);
            await BookTitle.delete(id);
            res.redirect('/stockkeeper/BookTitle?p=1');
        }
        else{
            var text = `Sách đã được mượn và chưa được trả, không thể xóa!`
		    var link = '/stockkeeper/BookTitle?p=1';
		    res.render('duplicateItem', {Text: text, Link: link, layout: 'addandedit'});
        }

    }
    else {
        var imagePath = 'public/bookTitleImage/' + row[0]["image"].substring(0, row[0]["image"].length);
        fs.unlinkSync(imagePath);
        await BookTitle.delete(id);
        res.redirect('/stockkeeper/BookTitle?p=1');
    }
    
});
router.post('/stockkeeper/BookTitle/search', async function (req, res) {
    var list = []
    var p = 0;
    list = await BookTitle.fulltextsearch(req.body.search, p);
    const newLocal = 'stocker/BookTitle/list';
    res.render(newLocal, {
        List: list, quantity: list.length,
        pagi: functUtils.rangeOfPagination(Math.ceil(list.length / 10), p), layout: 'stock'
    });
});

const directory = '/public/bookTitleImage/';

// router.get('/stockkeeper/BookTitles', bookTitleController.getByOffset);
// router.get('/stockkeeper/BookTitles/getinfo/:id', bookTitleController.getByID);
// router.post('/stockkeeper/BookTitles/add', upload.single('urlImage'), bookTitleController.add);
// router.get('/stockkeeper/BookTitles/del/:id', bookTitleController.delete);
// router.post('/stockkeeper/BookTitles/edit', upload.single('urlImage'), bookTitleController.update);
// router.get('/stockkeeper/BookTitles/getCategory/:id', bookTitleController.getByCategoryID);

// router.get('/stockkeeper/BorrowingCard', borrowingCardController.getByOffset);
// router.get('/stockkeeper/BorrowingCard/getinfo/:id', borrowingCardController.getByID);
// router.post('/stockkeeper/BorrowingCard/add',borrowingCardController.add);
// router.get('/stockkeeper/BorrowingCard/del/:id', borrowingCardController.delete);
// router.post('/stockkeeper/BorrowingCard/edit',borrowingCardController.update);

// router.get('/stockkeeper/borrowingCardBook', borrowingCardBookController.getByOffset);
// router.get('/stockkeeper/borrowingCardBook/getinfo/:id', borrowingCardBookController.getByID);
// router.post('/stockkeeper/borrowingCardBook/add',borrowingCardBookController.add);
// router.get('/stockkeeper/borrowingCardBook/del/:id', borrowingCardBookController.delete);
// router.post('/stockkeeper/borrowingCardBook/edit',borrowingCardBookController.update);

// router.get('/stockkeeper/returningCard', returningCardController.getByOffset);
// router.get('/stockkeeper/returningCard/getinfo/:id', returningCardController.getByID);
// router.post('/stockkeeper/returningCard/add',returningCardController.add);
// router.get('/stockkeeper/returningCard/del/:id',returningCardController.delete);
// router.post('/stockkeeper/returningCard/edit/:id',returningCardController.update);

// router.get('/stockkeeper/search',bookTitleController.search);
module.exports = router;