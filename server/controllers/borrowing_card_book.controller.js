const BorrowingCardBook = require('../models/borrowing_card_book.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const BorrowingCard = require('../models/borrowing_card.model');
const BookTitle = require('../models/book_title.model');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listBorrowingCardBook = await BorrowingCardBook.loadByOffset((p - 1) * 10);
        var quantity = await BorrowingCard.quantity();
		res.json({list: listBorrowingCardBook, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await BorrowingCardBook.loadByID(id))
	},
	add: async (req, res) => {
        var list = await BorrowingCard.loadByCardID(req.body.borrowing_card_id);
		var list2 = await BookTitle.loadByID(req.body.book_id);
		var list3 = await BorrowingCardBook.loadByBorrowingCardID(req.body.borrowing_card_id);
		var check = false;
		if (list.length == 0 || list2.length == 0) {
			return res.json(false);
        }
		if(list2[0]["quantity"] === 0)
		{
			return res.json(1);
		}
		for(var i = 0; i < list3.length; i++){
			if(list3[i]["book_id"] == req.body.book_id){
				check = true;
			}
<<<<<<< HEAD
			//await BorrowingCardBook.insert(Borrowing_card_bookEntity);
		 });
=======
			console.log(list3[i]["book_id"]);
		}
		if(check === true){
			return res.json(2);
		}
		var book_titleEntity = {
			id : list2[0]["id"],
			quantity: list2[0]["quantity"] - 1,
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
>>>>>>> d3340f155affbc1fc2ae23eaad31318ed674ed9c
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await BorrowingCardBook.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
        
        var list = await BorrowingCard.loadByCardID(req.body.borrowing_card_id);
		
		var list3 = await BorrowingCardBook.loadByBorrowingCardID(req.body.borrowing_card_id);
		
		var list2 = await BookTitle.loadByID(req.body.book_id);
		
		if (list.length == 0 || list2.length == 0 || list3.length == 0) {
			return res.json(false);
        }
		
		var tempBookid = 0;
		for (var i = 0; i < list3.length; i++) {
			if (list3[i]["id"] == req.body.id) {
				tempBookid = list3[i]["book_id"];
			}
		}
		list4 = await BookTitle.loadByID(tempBookid);
		var book_titleEntity2 = {
			id: list4[0]["id"],
			quantity: list4[0]["quantity"] + 1,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BookTitle.update(book_titleEntity2);
		if (list2[0]["quantity"] == 0) {
			return res.json(1);
		}
		var book_titleEntity = {
			id: list2[0]["id"],
			quantity: list2[0]["quantity"] - 1,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BookTitle.update(book_titleEntity);

		var Borrowing_card_bookEntity = {
			id : req.body.id,
            book_id: req.body.book_id,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BorrowingCardBook.update(Borrowing_card_bookEntity);
		return res.json(true);
	},
};