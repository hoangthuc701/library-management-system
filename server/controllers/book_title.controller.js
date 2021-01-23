const BookTitle = require('../models/book_title.model');
const functUtils = require('../middlewares/UtilityFunction')

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
	delete: async(req,res) => {
		var id = req.params.id;
		await BookTitle.delete(id);
		res.json(true);
	}
};