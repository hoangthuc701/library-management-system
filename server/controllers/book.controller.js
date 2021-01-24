const Book = require('../models/book.model');
const BookTitle = require('../models/book_title.model');
const functUtils = require('../middlewares/UtilityFunction')
const dateUtils = require('../middlewares/dateUtils')


module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
		var listBook = await Book.loadByOffset((p - 1) * 10);
		console.log(p);
		res.json({list: listBook, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await Book.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.book_title_id = 1;
		req.body.status = 0;

		//validation -- check duplicate user
		var list = await BookTitle.loadByID(req.body.book_title_id);
		if (list.length == 0) {
			return res.json(false);

		}
		var bookEntity = {
			book_title_id: req.body.book_title_id,
			status: req.body.status,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await Book.insert(bookEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await Book.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.book_title_id = 1;
		req.body.status = 0;
		req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		var bookEntity = {
			id : id,
			book_title_id: req.body.book_title_id,
			status: req.body.status,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await Book.update(bookEntity);
		return res.json(true);
	},
};