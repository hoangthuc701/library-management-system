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
const e = require('express');
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
		if (found === true || req.session.cart.totals == 10){
			var text = 'Sản phẩm đã tồn tại trong dánh sách mượn sách, hoặc danh sách mượn sách đã đầy!'
			var link = '/';
			res.render('duplicateItem', {Text: text, Link: link, layout: 'addandedit'});
		}
		else{
			if(listBook[0]["quantity"] == 0)
			{
				var text = 'Sách đã hết, không thể mượn, xin hãy chờ nhập thêm!'
				var link = '/';
				res.render('duplicateItem', {Text: text, Link: link, layout: 'addandedit'});
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
				res.redirect('/');
			}
		}
	},
	removeFromCart: async (req, res) => {
		var id = req.params.id;
		for(let i = 0; i < req.session.cart.totals; i++) {
			let item = req.session.cart.items[i];	
			if(item.id == id) {
				req.session.cart.items.splice(i, 1);
				req.session.cart.totals -= 1;
			}
		}
		res.redirect('/user/shoppingCart/listCart');
	},
	Listcart: async (req, res) => {
		res.render('user/listCart', {layout: 'stock'});
	},
 };