const Book = require('../models/book.model');

exports.getAll = async (req, res) => {
const book = await Book.getAll();
	res.json(book);
};
