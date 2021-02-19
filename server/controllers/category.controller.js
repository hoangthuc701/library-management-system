const Category = require('../models/category.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listCategory = await Category.loadByOffset((p - 1) * 10);
        var quantity = await Category.quantity();
		res.json({list: listCategory, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await Category.loadByID(id))
	},
	add: async (req, res) => {
        var list = await Category.loadName(req.body.name);
		if (list.length != 0) {
			return res.json(false);
        }
		var CategoryEntity = {
            name: req.body.name,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await Category.insert(CategoryEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await Category.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
        
		var CategoryEntity = {
			id : req.body.id,
			name: req.body.name,			
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await Category.update(CategoryEntity);
		return res.json(true);
	},
};