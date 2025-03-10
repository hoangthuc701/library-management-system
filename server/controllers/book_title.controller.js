const BookTitle = require('../models/book_title.model');
const functUtils = require('../middlewares/UtilityFunction')
const dateUtils = require('../middlewares/dateUtils');
const Category = require('../models/category.model');
const fs = require('fs');


module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listBookTitle = await BookTitle.loadByOffset((p - 1) * 10);
		var listCate = await Category.load();
        var quantity = await BookTitle.quantity();
		const newLocal = 'admin/BookTitle/list';
		res.render(newLocal, {
			ListCate: listCate,
			List: listBookTitle, quantity: quantity[0]["quantity"],
			pagi:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'adminPanel'
		});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		var list = await BookTitle.loadByID(id);
		res.json(list);
	},
	getByCategoryID: async(req,res) => {
		var id = req.params.id;
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
		var listCate = await BookTitle.loadByCategoryID(id, (p - 1) * 10);
		var quantity = await BookTitle.quantityCategory(id);
		res.json({list: listCate, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	add: async (req, res) => {
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
		var BookID = req.body.id;
		const row = await BookTitle.loadByID(BookID);
		// if recieve new image, delete old image 
		if (req.file) {
			var imagePath = row[0]["image"].substring(1, row[0]["image"].length);
			fs.unlinkSync(imagePath);
		}
		var book_titleEntity = {
			id : req.body.id,
			name: req.body.name,
			author: req.body.author,
			quantity: req.body.quantity,
			category_id: req.body.category_id,
			image: "/public/bookTitleImage/" + req.file.filename,
			description: req.body.description,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
		}
		await BookTitle.update(book_titleEntity);
		return res.json(true);
	},
	search: async (req, res) => {
		var list = []
		list = await BookTitle.fulltextsearch(req.body.search, 0);
		const newLocal = 'user/viewSearch';
    	res.render(newLocal, {List: list, layout: 'main' });
	}
};