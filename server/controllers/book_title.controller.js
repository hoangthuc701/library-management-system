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
		const newLocal = 'admin/BookTitle/list';
		res.render(newLocal, {
			List: listBookTitle, quantity: quantity[0]["quantity"],
			pagi:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'adminPanel'
		});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		var list = await BookTitle.loadByID(id);
		var book_titleEntity = {
			id: id,
			view: list[0]["view"] + 1
		}
		await BookTitle.update(book_titleEntity);
		res.json(list);
	},
	add: async (req, res) => {
		//test data
		// req.body.name = 'Title run go';
		// req.body.author = 'author out fly';
		// req.body.quantity = 3;
		// req.body.category_id = 1;
		// req.body.image='';
		// req.body.description='sach test mid';
		//validation -- check duplicate user
		var list = await BookTitle.loadName(req.body.name);
		if (list.length != 0) {
			return res.json(false);

		}
		console.log(req.file.filename);
		var book_titleEntity = {
			name: req.body.name,
			author: req.body.author,
			quantity: req.body.quantity,
			category_id: req.body.category_id,
			image: "/public/bookTitleImage/" + req.file.filename,
			description: req.body.description,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: '',
			view:0
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
		//const id = +req.params.id || -1;
		//test 
		// req.body.name = 'Title10';
		// req.body.author = 'author1';
		// req.body.quantity = 3;
		// req.body.category_id = 2;
		// req.body.image='';
		// req.body.description='sach test 1';
		// req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		var book_titleEntity = {
			id : req.body.id,
			name: req.body.name,
			author: req.body.author,
			quantity: req.body.quantity,
			category_id: req.body.category_id,
			image: "/public/bookTitleImage/" + req.file.filename,
			description: req.body.description,
			//created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
		}
		await BookTitle.update(book_titleEntity);
		return res.json(true);
	},
	search: async (req, res) => {
		req.body.keyword = 'author why';
		var list = []
		list = await BookTitle.fulltextsearch(req.body.keyword, 0);
		res.json(list);
	}
};