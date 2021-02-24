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
const moment = require('moment');
class Cart {
	constructor() {
		this.data = {};
		this.data.items = [];
		this.data.totals = 0;
	}
}
module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
		//modify lis cho hien thi vai tro
		var listAccount = await Account.loadByOffset((p - 1) * 10);
		var quantity = await Account.quantity();
		const newLocal = 'admin/Account/list';
		res.render(newLocal, {
			List: listAccount, quantity: quantity[0]["quantity"],
			pagi:funcUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'adminPanel'
		});
	},
	getByID: async (req, res) => {
		var id = req.params.id;
		res.json(await Account.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		// req.body.username = 'test20';
		// req.body.password = '123';
		// req.body.name = 'test';
		// req.body.email = 'test';
		// req.body.phone = 'test';
		//validation -- check duplicate user
		var list = await Account.loadUser(req.body.username);
		if (list.length != 0) {
			return res.json(false);
		}
		//insert

		var accountEntity = {
			username: req.body.username,
			password: md5(req.body.password),
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			role_id: 1,
			isBlock: 0,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await Account.insert(accountEntity);
		return res.json(true);
	},
	update: async (req, res) => {
		//const id = +req.params.id || -1;
		//test 
		req.body.id = 1;
		req.body.block = 0;
		req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		//validation -- check duplicate user
		var list = await Account.loadUser(req.body.username);
		if (list.length != 0) {
			return res.json(false);
		}
		var accountEntity = {
			id: req.body.id,
			username: req.body.username,
			password: md5(req.body.password),
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			role_id: req.body.role_id,
			isBlock: req.body.block,
			//created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await Account.update(accountEntity);
		return res.json(true);
	},
	readerCard: async (req, res) => {

		const id = +req.params.id || -1;
		if (req.session.authUser.role_id != 1)
			res.json(false);
		req.session.authUser.role_id = 6;
		var accountEntity = {
			id: req.session.authUser.id,
			role_id: 6//change role into awaiting for approval
		}
		await Account.update(accountEntity);
		res.json(true);
	},
	awaiting: async(req,res) => {
		var list = await accountModel.awaiting();
		res.json(list);
	},
	login: async (req, res) => {
		// req.body.username = 'test20';
		// req.body.password = '123';
		var pass = md5(req.body.password);
		const acc = await Account.loadUser(req.body.username);
		
		if (acc.length == 0) {
			return res.json(false);
		}
		if (acc[0]["password"] != pass) {
			return res.json(false);
		}
		//update reader card
		if (acc[0]["role_id"] == 5) {
			const card = await readerCard.loadByUserID(acc[0]["id"]);
			//const TH = moment(card[0]["expirated_date"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
			console.log(card[0]["expirated_date"]);
			let cardDate = new Date(card[0]["expirated_date"]);
			var currentDate = new Date(dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()));
			console.log(currentDate);
			if (currentDate > cardDate) {
				//change role into user
				console.log("ok");
				acc[0]["role_id"] = 1;
				var accountEntity = {
					id: acc[0]["id"],
					role_id: 1
				}
				await Account.update(accountEntity);
				//remove reader card
				await readerCard.delete(card[0]["id"]);
			}
		}
		cart = new Cart();
		req.session.cart = cart.data;
		req.session.isAuthenticated = true;
		req.session.authUser = {
			username: acc[0]["username"], id: acc[0]["id"], name: acc[0]["name"], email: acc[0]["email"], phone: acc[0]["phone"],
			role_id: acc[0]["role_id"], isBlock: acc[0]["isBlock"]
		};


		return res.json(true);
	},
	logout: async (req, res) => {
		req.session.authUser = null;
		req.session.cart = null;
		req.session.isAuthenticated = false;
		req.session.cart = null;
		return res.json(true);
	},
	processCart: async (req,res) => {
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

