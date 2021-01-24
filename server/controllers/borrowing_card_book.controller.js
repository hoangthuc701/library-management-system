const BorrwingCardBook = require('../models/borrowing_card_book.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const BorrwingCard = require('../models/borrowing_card.model');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listBorrwingCardBook = await BorrwingCardBook.loadByOffset((p - 1) * 10);
        var quantity = await BorrwingCard.quantity();
		res.json({list: listBorrwingCardBook, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await BorrwingCardBook.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.borrowing_card_id = 2;
        req.body.book_id = 1;
        
        var list = await BorrwingCard.loadByID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
        
		var Borrowing_card_bookEntity = {
            borrowing_card_id: req.body.borrowing_card_id,
            book_id: req.body.book_id,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await BorrwingCardBook.insert(Borrowing_card_bookEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await BorrwingCardBook.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.borrowing_card_id = 3;
        req.body.book_id = 1;
        req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await BorrwingCard.loadByID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
		var Borrowing_card_bookEntity = {
			id : id,
            borrowing_card_id: req.body.borrowing_card_id,
            book_id: req.body.book_id,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BorrwingCardBook.update(Borrowing_card_bookEntity);
		return res.json(true);
	},
};