const Account = require('../models/account.model');


module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;

		var listAccount = await Account.loadByOffset((p - 1) * 10);
		console.log('heelo');
		res.json(listAccount);
	}
};

