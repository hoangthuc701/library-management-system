const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');
const borrowingCardController = require('../controllers/borrowing_card.controller');
const borrowingCardBookController = require('../controllers/borrowing_card_book.controller');
const readerCardController = require('../controllers/reader_card.controller');
const CategoryController = require('../controllers/category.controller');
const returningCardController = require('../controllers/returning_card.controller');

const BookTitle = require('../models/book_title.model');
const Category = require('../models/category.model');
const ReaderCard = require('../models/reader.model');
const Account = require('../models/account.model');
const BorrowingCardBook = require('../models/borrowing_card_book.model');
const ReturningCard = require('../models/returning_card.model');
const md5 = require('md5');
const dateUtils = require('../middlewares/dateUtils')
const multer = require('multer');
const fs = require('fs');
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
router.get('/admin', async function (req, res) {
    const newLocal = 'admin/dashboard';
    res.render(newLocal, { layout: 'adminPanel' });
});

router.get('/admin/account/add', async function (req, res) {
    const newLocal = 'admin/Account/add';
    res.render(newLocal, { layout: 'adminPanel' });
});
router.post('/admin/account/add', async function (req, res) {
    var list = await Account.loadUser(req.body.username);
    if (list.length != 0) {
        res.redirect('/admin/account/add');
    }
    var role = +req.body.roleID;
    //insert
    var accountEntity = {
        username: req.body.username,
        password: md5(req.body.password),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role_id: req.body.roleID,
        isBlock: 0,
        created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
        updated_at: ''
    }
    await Account.insert(accountEntity);
    if (role == 5) {
        var listuser = await Account.loadUser(req.body.username);
        var date = new Date("12/2/2030");
        var Reader_cardEntity = {
            card_id: '',
            account_id: listuser[0]["id"],
            created_date: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
            expirated_date: date,
        }
        await ReaderCard.insert(Reader_cardEntity);
    }
    res.redirect('/admin/Accounts?p=1');
});
router.post('/admin/account/edit/:id', async function (req, res) {
    var id = +req.params.id;
    var accountEntity = {
        id: req.body.id,
        username: req.body.username,
        password: md5(req.body.password),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role_id: req.body.roleID,
        isBlock: req.body.block,
        //created_at: req.body.created_at,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
    }
    await Account.update(accountEntity);
    res.redirect('/admin/Accounts?p=1');
});
router.get('/admin/account/del/:id', async function (req, res) {
    var id = req.params.id;
    var listReader = await ReaderCard.loadByUserID(id);
    await Account.delete(id);
    if (listReader.length != 0) {
        await ReaderCard.delete(listReader[0]["id"]);
    }
    res.redirect('/admin/Accounts?p=1');
});
//         book title
router.get('/admin/BookTitle/add', async function (req, res) {
    var listCategory = await Category.load();
    const newLocal = 'admin/BookTitle/add';
    res.render(newLocal, { List: listCategory, layout: 'adminPanel' });
});
router.post('/admin/BookTitle/add', upload.single('urlImage'), async function (req, res) {
    var list = await BookTitle.loadName(req.body.name);
    if (list.length != 0) {
        res.redirect('/admin/BookTitle/add');
    }
    var image = '';
    if (req.file) {
        image = "/public/bookTitleImage/" + req.file.filename;
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
    res.redirect('/admin/BookTitles?p=1');
});
router.post('/admin/BookTitle/edit/:id', upload.single('urlImage'), async function (req, res) {
    var BookID = +req.params.id;
    const row = await BookTitle.loadByID(BookID);
    // if recieve new image, delete old image 
    var image = '';
    if (req.file) {
        var imagePath = row[0]["image"].substring(1, row[0]["image"].length);
        fs.unlinkSync(imagePath);
        image = "/public/bookTitleImage/" + req.file.filename;

    }
    else {
        image = row[0]['image'];
    }
    var book_titleEntity = {
        id: BookID,
        name: req.body.name,
        author: req.body.author,
        quantity: req.body.quantity,
        category_id: req.body.category_id,
        image: image,
        description: req.body.description,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
    }
    await BookTitle.update(book_titleEntity);
    res.redirect('/admin/BookTitles?p=1');
});
router.get('/admin/BookTitle/del/:id', async function (req, res) {
    var id = req.params.id;
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
            await BookTitle.delete(id);
        }

    }
    else {
        await BookTitle.delete(id);
    }
    res.redirect('/admin/BookTitles?p=1');
});
router.get('/admin/BookTitles', bookTitleController.getByOffset);
router.get('/admin/BookTitles/getinfo/:id', bookTitleController.getByID);
router.post('/admin/BookTitles/add', upload.single('urlImage'), bookTitleController.add);
router.get('/admin/BookTitles/del/:id', bookTitleController.delete);
router.post('/admin/BookTitles/edit', upload.single('urlImage'), bookTitleController.update);
router.get('/admin/BookTitles/getCategory/:id', bookTitleController.getByCategoryID);

router.get('/admin/BorrowingCard', borrowingCardController.getByOffset);
router.get('/admin/BorrowingCard/getinfo/:id', borrowingCardController.getByID);
router.post('/admin/BorrowingCard/add', borrowingCardController.add);
router.get('/admin/BorrowingCard/del/:id', borrowingCardController.delete);
router.post('/admin/BorrowingCard/edit', borrowingCardController.update);

router.get('/admin/borrowingCardBook', borrowingCardBookController.getByOffset);
router.get('/admin/borrowingCardBook/getinfo/:id', borrowingCardBookController.getByID);
router.post('/admin/borrowingCardBook/add', borrowingCardBookController.add);
router.get('/admin/borrowingCardBook/del/:id', borrowingCardBookController.delete);
router.post('/admin/borrowingCardBook/edit', borrowingCardBookController.update);

router.get('/admin/readerCard', readerCardController.getByOffset);
router.get('/admin/readerCard/getinfo/:id', readerCardController.getByID);
router.post('/admin/readerCard/add', readerCardController.add);
router.get('/admin/readerCard/del/:id', readerCardController.delete);
router.post('/admin/readerCard/edit', readerCardController.update);

router.get('/admin/category', CategoryController.getByOffset);
router.get('/admin/category/getinfo/:id', CategoryController.getByID);
router.post('/admin/category/add', CategoryController.add);
router.get('/admin/category/del/:id', CategoryController.delete);
router.post('/admin/category/edit', CategoryController.update);

router.get('/admin/returningCard', returningCardController.getByOffset);
router.get('/admin/returningCard/getinfo/:id', returningCardController.getByID);
router.post('/admin/returningCard/add', returningCardController.add);
router.get('/admin/returningCard/del/:id', returningCardController.delete);
router.post('/admin/returningCard/edit/:id', returningCardController.update);

router.get('/admin/Accounts', accountController.getByOffset);
router.get('/admin/Accounts/getinfo/:id', accountController.getByID);
//router.post('/admin/Accounts/add',accountController.add);
//router.post('/admin/Accounts/edit/:id',accountController.update);
module.exports = router;