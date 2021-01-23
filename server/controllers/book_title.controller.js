const BookTitle = require('../models/book_title.model');
const functUtils = require('../middlewares/UtilityFunction')
const dateUtils = require('../middlewares/dateUtils')

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listBookTitle = await BookTitle.loadByOffset((p - 1) * 10);
        var quantity = await BookTitle.quantity();
		res.json({list: listBookTitle, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await BookTitle.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.name = 'Title 13';
		req.body.author = 'author 12';
		req.body.quantity = 3;
		req.body.category_id = 1;
		req.body.image='';
		req.body.description='sach test 1';
		//validation -- check duplicate user
		var list = await BookTitle.loadName(req.body.name);
		if (list.length != 0) {
			return res.json(false);

		}
		var book_titleEntity = {
			name: req.body.name,
			author: req.body.author,
			quantity: req.body.quantity,
			category_id: req.body.category_id,
			image: req.body.image,
			description: req.body.description,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await BookTitle.insert(book_titleEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await BookTitle.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.name = 'Title10';
		req.body.author = 'author1';
		req.body.quantity = 3;
		req.body.category_id = 2;
		req.body.image='';
		req.body.description='sach test 1';
		req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		var book_titleEntity = {
			id : id,
			name: req.body.name,
			author: req.body.author,
			quantity: req.body.quantity,
			category_id: req.body.category_id,
			image: req.body.image,
			description: req.body.description,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BookTitle.update(book_titleEntity);
		return res.json(true);
	},
};