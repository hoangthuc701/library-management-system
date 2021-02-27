const BookTitle = require('../models/book_title.model');
const Account = require('../models/account.model');
const dateUtils = require('../middlewares/dateUtils')
const funcUtils = require('../middlewares/UtilityFunction');
const readerCard = require('../models/reader.model');
const BorrowingCard = require('../models/borrowing_card.model')
const BorrowingCardBook = require('../models/borrowing_card_book.model')
const passport = require("passport");
const md5 = require('md5');
const shoppingCart = require('../controllers/shopping_cart.controller');
const accountModel = require('../models/account.model');
const book_titleModel = require('../models/book_title.model');
 module.exports = {
	
	addcart: async (req, res) => {
		const id = +req.params.id || -1;
		var found = false;
		req.session.cart.items.forEach(item => {
			if(item.id === id) {
				found = true;
			}
		 });
		const listBook = await BookTitle.loadByID(id);
		if (listBook[0]["quantity"] == 0 || found === true){
			res.render('duplicateItem');
		}
		else{
			let book = {
				id: id,
				name: listBook[0]["name"],
				author: listBook[0]["author"],
				category_id: listBook[0]["category_id"],
				image: listBook[0]["image"],
				description: listBook[0]["description"]
			}
			req.session.cart.items.push(book);
			req.session.cart.totals += 1;
			res.redirect('home/home');
		}
	},
	removeFromCart: async (req, res) => {
		var id = req.params.id;
		for(let i = 0; i < req.session.items.length; i++) {
			let item = req.session.items[i];
			if(item.id === id) {
				req.session.items.splice(i, 1);
				req.session.totals -= 1;
			}
		}
		res.json(true);
	}
 };