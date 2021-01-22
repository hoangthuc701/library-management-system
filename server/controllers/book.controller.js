const Book = require('../models/book.model');

exports.getAll = async (req, res) => {
	const book = await Book.getAll();
	console.log(book);
	res.json(book);
};
