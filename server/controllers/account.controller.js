const Account = require('../models/account.model');
const dateUtils = require('../middlewares/dateUtils')

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;

		var listAccount = await Account.loadByOffset((p - 1) * 10);
		//hien thi vai tro
		//write something here

		res.json(listAccount);
	},
	add: async (req, res) => {
		console.log(dateUtils.getCurrentDateTime());
	}
};

