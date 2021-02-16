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
			res.json(false);
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
			res.json(true);
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
	},
	processCart: async (req, res) => {
		if (req.session.cart != null && req.session.cart.totals != 0) {
			//create borrowing card
			var datetimestamp = Date.now();
			var fieldname = 'BR'
			var cardID = fieldname + '-' + datetimestamp;
			req.body.returned_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
			req.body.borrowed_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());

			var Borrowing_cardEntity = {
				card_id: cardID,
				reader_id: req.session.authUser.id,
				returned_date: req.body.returned_date,
				borrowed_date: req.body.borrowed_date,
				created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
				updated_at: ''
			}
			await BorrowingCard.insert(Borrowing_cardEntity);
			//create borrowing card book
			for (let i = 0; i < req.session.cart.totals; i++) {
				var Borrowing_card_bookEntity = {
					borrowing_card_id: cardID,
					book_id: req.session.cart.items[i].id,
					created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
					updated_at: ''
				}
				await BorrowingCardBook.insert(Borrowing_card_bookEntity);
				//update quantity of book
				var quantity = await book_titleModel.loadByID(req.session.cart.items[i].id);
				quantity = quantity[0]["quantity"];
				var bookEntity = {
					id: req.session.cart.items[i].id,
					quantity: quantity - 1
				}
				await book_titleModel.update(bookEntity)
			}
			//refresh session cart
			cart = new Cart();
			req.session.cart = cart.data;
			res.json(true);
		}
		res.json(false);
	}
 };