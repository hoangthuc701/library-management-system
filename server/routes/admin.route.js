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
const BorrowingCard = require('../models/borrowing_card.model');
const ReturningCard = require('../models/returning_card.model');
const md5 = require('md5');
const dateUtils = require('../middlewares/dateUtils')
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
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
    res.redirect('/admin/BookTitles?p=1');
});

router.get('/admin/BookTitle/edit/:id', async function (req, res) {
    console.log(req.params.id);
    var listBook = await BookTitle.loadByID(+req.params.id);
    var listCategory = await Category.load();
    const newLocal = 'admin/BookTitle/edit';
    res.render(newLocal, { Listcate: listCategory, ListBook: listBook, layout: 'adminPanel'});
});
router.post('/admin/BookTitle/edit/:id', upload.single('urlImage'), async function (req, res) {
    var BookID = +req.params.id;
    const row = await BookTitle.loadByID(BookID);
    // if recieve new image, delete old image 
    var image = '';
    if (req.file) {
        var imagePath = row[0]["image"].substring(1, row[0]["image"].length);
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
// ======================================= category
router.post('/admin/Category/add', async function (req, res) {
    var CategoryEntity = {
        name: req.body.name,
        created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
        updated_at: ''
    }
    await Category.insert(CategoryEntity);
    res.redirect('/admin/category?p=1');
});
router.get('/admin/Category/add/validation', async function (req, res) {
    const name = req.query.categoryname;
    var list = await Category.loadName(name);
    var result = 0;
    if(list.length != 0){
        result = 1
    }
    res.json({ result });
});
router.post('/admin/Category/edit/:id', async function (req, res) {
    var CategoryEntity = {
        id : req.body.id,
        name: req.body.name,			
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
    }
    await Category.update(CategoryEntity);
    res.redirect('/admin/category?p=1');
});
router.get('/admin/Category/del/validation', async function (req, res) {
    var id = req.query.id;
    var p = 1;
    var list = await BookTitle.loadByCategoryID(id, (p - 1) * 10);
    var result = 0;
    if(list.length != 0){
        result = 1
    }
	res.json({ result });
});
router.get('/admin/Category/del/:id', async function (req, res) {
    var id = req.params.id;
	await Category.delete(id);
    res.redirect('/admin/category?p=1');
});

//=======================================borrowing card
router.get('/admin/BorrowingCard/add', async function (req, res) {
    var listAccount = await Account.load();
    const newLocal = 'admin/BorrowingCard/add';
    res.render(newLocal, { List: listAccount, layout: 'adminPanel' });
});
router.post('/admin/BorrowingCard/add', async function (req, res) {
    req.body.borrowed_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
    var datetimestamp = Date.now();
    var fieldname = 'BR'
    var cardID = fieldname + '-' + datetimestamp;
    var Borrowing_cardEntity = {
        card_id: cardID,
        reader_id: req.body.readerID,
        returned_date: req.body.returned_date,
        borrowed_date: req.body.borrowed_date,
        created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
        updated_at: ''
    }
    await BorrowingCard.insert(Borrowing_cardEntity);
    res.redirect('/admin/BorrowingCard?p=1');
});
router.get('/admin/BorrowingCard/edit/:id', async function (req, res) {
    var id = +req.params.id;
    var listAccount = await Account.load();
    var listBorrowing = await BorrowingCard.loadByID(id);
    listBorrowing[0]["returned_date"] = moment(listBorrowing[0]["returned_date"], 'YYYY/MM/DD').format('YYYY-MM-DD');
    const newLocal = 'admin/BorrowingCard/edit';
    res.render(newLocal, { Listborrowing: listBorrowing, ListAcc: listAccount});
});
router.post('/admin/BorrowingCard/edit/:id', async function (req, res) {
    var Borrowing_cardEntity = {
        id: req.body.id,
        reader_id: req.body.reader_id,
        returned_date: req.body.returned_date,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
    }
    await BorrowingCard.update(Borrowing_cardEntity);
    res.redirect('/admin/BorrowingCard?p=1');
});
router.get('/admin/BorrowingCard/del/:id', async function (req, res) {
    var id = req.params.id;
    var listBorrowing = await BorrowingCard.loadByID(id);
    var listBorrowingBook = await BorrowingCardBook.loadByBorrowingCardID(listBorrowing[0]["card_id"]);
    if (listBorrowingBook.length != 0) {
        for (var i = 0; i < listBorrowingBook.length; i++) {
            var listBook = await BookTitle.loadByID(listBorrowingBook[i]["book_id"]);
            var bookTitleEntity = {
                id: listBook[0]["id"],
                quantity: listBook[0]["quantity"] + 1,
                updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
            }
			await BookTitle.update(bookTitleEntity);
            await BorrowingCardBook.delete(listBorrowingBook[i]["id"]);
        }
    }
	await BorrowingCard.delete(id);
    res.redirect('/admin/BorrowingCard?p=1');
});
//=======================================borrowing card book
router.post('/admin/borrowingCardBook/add', async function (req, res) {
    var listBorrowing = await BorrowingCard.loadByCardID(req.body.borrowing_card_id);
    var listBook = await BookTitle.loadByID(req.body.book_id);
    var listBorrowingBook = await BorrowingCardBook.loadByBorrowingCardID(req.body.borrowing_card_id);
    var check = false;
    if (listBorrowing.length == 0 || listBook.length == 0) {
        res.redirect('/admin/BorrowingCard?p=1');
    }
    if(listBook[0]["quantity"] === 0)
    {
        res.redirect('/admin/BorrowingCard?p=1');
    }
    for(var i = 0; i < listBorrowingBook.length; i++){
        if(listBorrowingBook[i]["book_id"] == req.body.book_id){
            check = true;
        }
    }
    if(check === true){
        res.redirect('/admin/BorrowingCard?p=1');
    }
    var book_titleEntity = {
        id : listBook[0]["id"],
        quantity: listBook[0]["quantity"] - 1,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
    }
    await BookTitle.update(book_titleEntity);
    var Borrowing_card_bookEntity = {
        borrowing_card_id: req.body.borrowing_card_id,
        book_id: req.body.book_id,
        created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
        updated_at: ''
    }
    await BorrowingCardBook.insert(Borrowing_card_bookEntity);
    res.redirect('/admin/BorrowingCard?p=1');
});
router.get('/admin/borrowingCardBook/del/:id', async function (req, res) {
    var id = req.params.id;
    var listBorrowingBook = await BorrowingCardBook.loadByID(id);
    var listBook = await BookTitle.loadByID(listBorrowingBook[0]["book_id"]);
    var book_titleEntity = {
        id : listBook[0]["id"],
        quantity: listBook[0]["quantity"] + 1,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
    }
    await BookTitle.update(book_titleEntity);
	await BorrowingCardBook.delete(id);
    res.redirect('/admin/BorrowingCard?p=1');
});
//=======================================returing card
router.post('/admin/returningCard/add', async function (req, res) {
    var id = req.body.borrowing_card_id;
    req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());

    var listBorrowing = await BorrowingCard.loadByCardID(id);
    var listBorrowingBook = await BorrowingCardBook.loadByBorrowingCardID(listBorrowing[0]["card_id"]);//load danh sach

    if (listBorrowing.length == 0 || listBorrowingBook.length == 0) {
        res.redirect('/admin/returningCard?p=1');
    }

    for (var i = 0; i < listBorrowingBook.length; i++) {
        var tempid = listBorrowingBook[i]["book_id"];
        var listBook = await BookTitle.loadByID(tempid);
        var bookTitleEntity = {
            id: listBook[0]["id"],
            quantity: listBook[0]["quantity"] + 1,
            updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
        }
        await BookTitle.update(bookTitleEntity);

    }

    let date_ob = new Date();
    let date_ob2 = new Date(listBorrowing[0]["returned_date"]);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let date2 = ("0" + date_ob2.getDate()).slice(-2);
    let month2 = ("0" + (date_ob2.getMonth() + 1)).slice(-2);
    let year2 = date_ob2.getFullYear();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(year2, month2, date2);
    const secondDate = new Date(year, month, date);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    req.body.penalty_cost = diffDays * 10000;
    var returning_cardEntity = {
        borrowing_card_id: id,
        penalty_cost: req.body.penalty_cost,
        returned_at: req.body.returned_at,
        created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
        updated_at: ''
    }
    await ReturningCard.insert(returning_cardEntity);
    res.redirect('/admin/returningCard?p=1');
});
router.get('/admin/returningCard/del/:id', async function (req, res) {
    var id = req.params.id;
    var listReturningCard = await ReturningCard.loadByID(id);
    var listBorrowingCardBook = await BorrowingCardBook.loadByBorrowingCardID(listReturningCard[0]["borrowing_card_id"]);//load danh sach
    var temp = true;
    for (var i = 0; i < listBorrowingCardBook.length; i++) {
        var tempid = listBorrowingCardBook[i]["book_id"];
        var listBook = await BookTitle.loadByID(tempid);
        if (listBook[0]["quantity"] == 0) {
            temp = false;
        }
    }
    if (temp === false) {
        res.json(false);
    }
    else {
        for (var i = 0; i < listBorrowingCardBook.length; i++) {
            var tempid = listBorrowingCardBook[i]["book_id"];
            var listBook = await BookTitle.loadByID(tempid);
            var bookTitleEntity = {
                id: listBook[0]["id"],
                quantity: listBook[0]["quantity"] - 1,
                updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
            }
            await BookTitle.update(bookTitleEntity);

        }
        await ReturningCard.delete(id);
    }
    res.redirect('/admin/returningCard?p=1');
});
router.get('/admin/BookTitles', bookTitleController.getByOffset);
router.get('/admin/BookTitles/getinfo/:id', bookTitleController.getByID);
router.post('/admin/BookTitles/add', upload.single('urlImage'), bookTitleController.add);
router.get('/admin/BookTitles/del/:id', bookTitleController.delete);
//router.post('/admin/BookTitles/edit', upload.single('urlImage'), bookTitleController.update);
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
//router.post('/admin/returningCard/add', returningCardController.add);
router.get('/admin/returningCard/del/:id', returningCardController.delete);
router.post('/admin/returningCard/edit/:id', returningCardController.update);

router.get('/admin/Accounts', accountController.getByOffset);
router.get('/admin/Accounts/getinfo/:id', accountController.getByID);
//router.post('/admin/Accounts/add',accountController.add);
//router.post('/admin/Accounts/edit/:id',accountController.update);
module.exports = router;