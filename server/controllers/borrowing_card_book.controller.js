const BorrowingCardBook = require('../models/borrowing_card_book.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const BorrowingCard = require('../models/borrowing_card.model');

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
		//test data
		// req.body.borrowing_card_id = 2;
        // req.body.book_id = 1;
        
        var list = await BorrowingCard.loadByCardID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
        req.session.cart.items.forEach(item => {
			var Borrowing_card_bookEntity = {
				borrowing_card_id: req.body.borrowing_card_id,
				book_id: item.id,
				created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
				updated_at: ''
			}
			await BorrowingCardBook.insert(Borrowing_card_bookEntity);
		 });
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await BorrowingCardBook.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		//const id = +req.params.id || -1;
		//test 
		// req.body.borrowing_card_id = 3;
        // req.body.book_id = 1;
        //req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await BorrowingCard.loadByCardID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
		var Borrowing_card_bookEntity = {
			id : req.body.id,
            borrowing_card_id: req.body.borrowing_card_id,
            book_id: req.body.book_id,
			//created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BorrowingCardBook.update(Borrowing_card_bookEntity);
		return res.json(true);
	},
};