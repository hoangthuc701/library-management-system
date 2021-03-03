const router = require('express').Router();
const readerCardController = require('../controllers/reader_card.controller');
const accountController = require('../controllers/account.controller');

const BorrowingCard = require('../models/borrowing_card.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const moment = require('moment');
const BookTitle = require('../models/book_title.model');
const Category = require('../models/category.model');
const ReaderCard = require('../models/reader.model');
const Account = require('../models/account.model');
const BorrowingCardBook = require('../models/borrowing_card_book.model');
const ReturningCard = require('../models/returning_card.model');


router.get('/librarian/accept/:userID',readerCardController.accept);
router.get('/librarian/reject/:userID',readerCardController.reject);

router.get('/librarian/awaiting', accountController.awaiting);

router.get('/librarian/readerCard',readerCardController.getByOffset);
router.get('/librarian/readerCard/getinfo/:id',readerCardController.getByID);
router.post('/librarian/readerCard/add',readerCardController.add);
router.get('/librarian/readerCard/del/:id',readerCardController.delete);
router.post('/librarian/readerCard/edit',readerCardController.update);
module.exports = router;


//=======================================borrowing card
router.get('/librarian/BorrowingCard', async function (req, res) {
    var p = 1;
    let list = [];
    if (req.query.p)
        p = req.query.p;
    var listBorrowingCard = await BorrowingCard.loadByOffset((p - 1) * 10);
    for(var i = 0; i < listBorrowingCard.length; i++){
        listBorrowingCard[i]["returned_date"] = moment(listBorrowingCard[i]["returned_date"], 'YYYY/MM/DD').format('YYYY/MM/DD');
        listBorrowingCard[i]["borrowed_date"] = moment(listBorrowingCard[i]["borrowed_date"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
    }
    var quantity = await BorrowingCard.quantity();
    for (let i = 0; i < listBorrowingCard.length; i++) {
        var listBorrowingCardBook = await BorrowingCardBook.loadByBorrowingCardID(listBorrowingCard[i]["card_id"]);
        list.push([listBorrowingCard[i]]);
        listBorrowingCardBook.forEach((brDetail) => {
            list[i].push(brDetail);
        });
    };
    console.log(list[0][2]);
    newLocal = 'librarian/BorrowingCard/list';
    res.render(newLocal, {
        List: list, quantity: quantity[0]["quantity"],
        pagi: functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)
    });
});

router.get('/librarian/BorrowingCard/add', async function (req, res) {
    var listAccount = await Account.load();
    const newLocal = 'librarian/BorrowingCard/add';
    res.render(newLocal, { List: listAccount});
});
router.post('/librarian/BorrowingCard/add', async function (req, res) {
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
    res.redirect('/librarian/BorrowingCard?p=1');
});
router.get('/librarian/BorrowingCard/edit/:id', async function (req, res) {
    var id = +req.params.id;
    var listAccount = await Account.load();
    var listBorrowing = await BorrowingCard.loadByID(id);
    listBorrowing[0]["returned_date"] = moment(listBorrowing[0]["returned_date"], 'YYYY/MM/DD').format('YYYY-MM-DD');
    const newLocal = 'librarian/BorrowingCard/edit';
    res.render(newLocal, { Listborrowing: listBorrowing, ListAcc: listAccount});
});
router.post('/librarian/BorrowingCard/edit/:id', async function (req, res) {
    var Borrowing_cardEntity = {
        id: req.body.id,
        reader_id: req.body.reader_id,
        returned_date: req.body.returned_date,
        updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
    }
    await BorrowingCard.update(Borrowing_cardEntity);
    res.redirect('/librarian/BorrowingCard?p=1');
});
router.get('/librarian/BorrowingCard/del/:id', async function (req, res) {
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
    res.redirect('/librarian/BorrowingCard?p=1');
});
//=======================================borrowing card book
router.post('/librarian/borrowingCardBook/add', async function (req, res) {
    var listBorrowing = await BorrowingCard.loadByCardID(req.body.borrowing_card_id);
    var listBook = await BookTitle.loadByID(req.body.book_id);
    var listBorrowingBook = await BorrowingCardBook.loadByBorrowingCardID(req.body.borrowing_card_id);
    var check = false;
    if (listBorrowing.length == 0 || listBook.length == 0) {
        res.redirect('/librarian/BorrowingCard?p=1');
    }
    if(listBook[0]["quantity"] === 0)
    {
        res.redirect('/librarian/BorrowingCard?p=1');
    }
    for(var i = 0; i < listBorrowingBook.length; i++){
        if(listBorrowingBook[i]["book_id"] == req.body.book_id){
            check = true;
        }
    }
    if(check === true){
        res.redirect('/librarian/BorrowingCard?p=1');
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
    res.redirect('/librarian/BorrowingCard?p=1');
});

router.get('/librarian/borrowingCardBook/del/:id', async function (req, res) {
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
    res.redirect('/librarian/BorrowingCard?p=1');
});

//=======================================returing card
router.get('/librarian/returningCard', async function (req, res) {
    var p = 1;
    var list = [];
    if (req.query.p)
        p = req.query.p;

    var listReturningCard = await ReturningCard.loadByOffset((p - 1) * 10);
    for (var i = 0; i < listReturningCard.length; i++) {
        listReturningCard[i]["returned_at"] = moment(listReturningCard[i]["returned_at"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
    }
    var quantity = await ReturningCard.quantity();
    var newLocal = 'librarian/ReturningCard/list';
    res.render(newLocal, {
        List: listReturningCard, quantity: quantity[0]["quantity"],
        pagi: functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)
    });
});

router.post('/librarian/returningCard/add', async function (req, res) {
    var id = req.body.borrowing_card_id;
    req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());

    var listBorrowing = await BorrowingCard.loadByCardID(id);
    var listBorrowingBook = await BorrowingCardBook.loadByBorrowingCardID(listBorrowing[0]["card_id"]);//load danh sach

    if (listBorrowing.length == 0 || listBorrowingBook.length == 0) {
        res.redirect('/librarian/returningCard?p=1');
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
    res.redirect('/librarian/returningCard?p=1');
});
router.get('/librarian/returningCard/del/:id', async function (req, res) {
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
        res.redirect('/librarian/returningCard?p=1');
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
    res.redirect('/librarian/returningCard?p=1');
});

router.get('/librarian/returningCard/edit/:id', async function (req, res) {
    var id = +req.params.id;
    var listReturningCard = await ReturningCard.loadByID(id);
    listReturningCard[0]["returned_at"] = moment(listReturningCard[0]["returned_at"], 'YYYY/MM/DD HH:mm:SS').format('YYYY-MM-DD');
    const newLocal = 'librarian/ReturningCard/edit';
    res.render(newLocal, {List:listReturningCard });
});