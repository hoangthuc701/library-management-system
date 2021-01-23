const Book = require('../models/book.model');


module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
		var listBook = await Book.loadByOffset((p - 1) * 10);
		console.log(p);
		res.json(listBook);
	}
};