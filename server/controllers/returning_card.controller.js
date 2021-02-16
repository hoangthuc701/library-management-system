const ReturningCard = require('../models/returning_card.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const BorrwingCard = require('../models/borrowing_card.model');
const BorrwingCardBook = require('../models/borrowing_card_book.model');
const Book = require('../models/book.model');
const { months } = require('moment');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listReturningCard = await ReturningCard.loadByOffset((p - 1) * 10);
        var quantity = await ReturningCard.quantity();
		res.json({list: listReturningCard, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await ReturningCard.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		var id = req.params.id;
		req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
		var list = await BorrwingCard.loadByID(id);
		var list2 = await BorrwingCardBook.loadByBorrowingCardID(id);//load danh sach

		if (list.length == 0 || list2.length == 0) {
			return res.json(false);
		}

		for(var i = 0; i < list2.length; i++){
			var tempid = list2[i]["book_id"];
			var list3 = await Book.loadByBookTitleID(tempid);
			var bookEntity = {
				id : list3[0]["id"],
				book_title_id: list3[0]["book_title_id"],
				status: 0,
				created_at: list3[0]["created_at"],
				updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
			}
			await Book.update(bookEntity);
			
		}

		let date_ob = new Date();
		let date_ob2 = new Date(list[0]["returned_date"]);
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
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await ReturningCard.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.borrowing_card_id = 1;
        req.body.penalty_cost = 123;
        req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await BorrwingCard.loadByID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
		var returning_cardEntity = {
			id : id,
            borrowing_card_id: req.body.borrowing_card_id,
            penalty_cost: req.body.penalty_cost,
            returned_at: req.body.returned_at,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await ReturningCard.update(returning_cardEntity);
		return res.json(true);
	},
};