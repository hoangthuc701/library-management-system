const Account = require('../models/account.model');
const dateUtils = require('../middlewares/dateUtils')
const funcUtils = require('../middlewares/UtilityFunction');
const passport = require("passport");
const md5 = require('md5');
module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
		//modify lis cho hien thi vai tro
		var listAccount = await Account.loadByOffset((p - 1) * 10);
		var quantity = await Account.quantity();
		//write something here
		console.log(Math.ceil(quantity["quantity"] / 10));
		res.json({ list: listAccount, quantity: quantity, rangeOfPages: funcUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p) });
	},
	getByID: async (req, res) => {
		var id = req.params.id;
		res.json(await Account.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.username = 'test20';
		req.body.password = '123';
		req.body.name = 'test';
		req.body.email = 'test';
		req.body.phone = 'test';
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
		const id = +req.params.id || -1;
		//test 
		req.body.username = 'test1234';
		req.body.password = '123';
		req.body.name = 'test';
		req.body.email = 'test';
		req.body.phone = 'test';
		req.body.role_id = 1;
		req.body.block = 0;
		req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		//validation -- check duplicate user
		var list = await Account.loadUser(req.body.username);
		if (list.length != 0) {
			return res.json(false);
		}
		var accountEntity = {
			id: id,
			username: req.body.username,
			password: md5(req.body.password),
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			role_id: req.body.role_id,
			isBlock: req.body.block,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await Account.update(accountEntity);
		return res.json(true);
	},

	login: async (req, res) => {
		req.body.username = 'test20';
		req.body.password = '123';
		pass = md5(req.body.password);
		const acc = await Account.loadUser(req.body.username);

		if (acc.length === 0) {
			return res.json(false);
		}
		if (acc[0]["password"] != pass) {
			return res.json(false);
		}

		req.session.isAuthenticated = true;
		req.session.authUser = {
			username: acc[0]["username"], id: acc[0]["id"], name: acc[0]["name"], email: acc[0]["email"], phone: acc[0]["phone"],
			role_id: acc[0]["role_id"], isBlock: acc[0]["isBlock"]
		};
		return res.json(true);
	},
	logout: async (req, res) => {
		req.session.authUser = null;
		req.session.isAuthenticated = false;
		return res.json(true);
	},
};

