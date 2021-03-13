const router = require('express').Router();
const book_titleModel = require('../models/book_title.model');
const BorrowingCard = require('../models/borrowing_card.model');
const BorrowingCardBook = require('../models/borrowing_card_book.model');
const moment = require('moment');
const ReturningCard = require('../models/returning_card.model');

router.get('/', async (req,res) => {
    var newLocal = 'home/home';
    var list6GonnaOutOfStock = await book_titleModel.loadGonnaOutOfStockBook();
    var list6MostView = await book_titleModel.loadMostView();
    res.render(newLocal, {list6GonnaOutOfStock: list6GonnaOutOfStock, list6MostView: list6MostView});
});

router.get('/home/profile', async (req,res) => {
    var p = 1;
    let list = [];
    let list2 = [];
    var listBorrowingCard = await BorrowingCard.loadByAccountID(req.session.authUser.id);
    for(var i = 0; i < listBorrowingCard.length; i++){
        listBorrowingCard[i]["returned_date"] = moment(listBorrowingCard[i]["returned_date"], 'YYYY/MM/DD').format('YYYY/MM/DD');
        listBorrowingCard[i]["borrowed_date"] = moment(listBorrowingCard[i]["borrowed_date"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
    }
    for (let i = 0; i < listBorrowingCard.length; i++) {
        var listBorrowingCardBook = await BorrowingCardBook.loadByBorrowingCardID(listBorrowingCard[i]["card_id"]);
        list.push([listBorrowingCard[i]]);
        listBorrowingCardBook.forEach((brDetail) => {
            list[i].push(brDetail);
        });
    };
    for(var i = 0; i < listBorrowingCard.length; i++){
        var listReturningCard = await ReturningCard.loadByborrowingCardID(listBorrowingCard[i]['card_id']);
        if(listReturningCard.length != 0){
            listReturningCard[0]["returned_at"] = moment(listReturningCard[0]["returned_at"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
            list2.push([listReturningCard[0]]);
        }
    }
    
    var newLocal = 'home/profile';
    res.render(newLocal, {
        List: list, ListReturning: list2,layout: 'stock'
    });
});
module.exports = router;