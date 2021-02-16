const ReaderCard = require('../models/reader.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const Account = require('../models/account.model');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listReaderCard = await ReaderCard.loadByOffset((p - 1) * 10);
        var quantity = await ReaderCard.quantity();
		res.json({list: listReaderCard, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await ReaderCard.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.card_id = '123';
        req.body.identity_number = '';
        req.body.account_id = 1;
        req.body.created_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        req.body.expirated_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await Account.loadByID(req.body.account_id);
		if (list.length == 0) {
			return res.json(false);
        }

		var Reader_cardEntity = {
            account_id: req.body.account_id,
            created_date: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
            expirated_date: req.body.expirated_date,
		}
		await ReaderCard.insert(Reader_cardEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await ReaderCard.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.card_id = '123';
        req.body.identity_number = '123';
        req.body.account_id = 1;
        req.body.created_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		req.body.expirated_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await Account.loadByID(req.body.account_id);
		if (list.length == 0) {
			return res.json(false);
        }
        
		var Reader_cardEntity = {
			id : id,
            account_id: req.body.account_id,
            created_date: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
            expirated_date: req.body.expirated_date,
		}
		await ReaderCard.update(Reader_cardEntity);
		return res.json(true);
	},
	accept: async (req,res) => {
		const userID = +req.params.userID || -1;
		//change user role into reader after librarian accepted
		var accountEntity = {
			id: userID,
			role_id: 5
		}
		await Account.update(accountEntity);
		var expiredDate = new Date(dateUtils.getCurrentDateTime())
		expiredDate.setDate(expiredDate.getDate() + 365);//expired day after 1 year from now
		//create new reader card
		var Reader_cardEntity = {
            account_id: userID,
            created_date: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
            expirated_date: expiredDate,
		}
		await ReaderCard.insert(Reader_cardEntity);
		return res.json(true);
	},
	reject: async(req,res) => {
		const userID = +req.params.userID || -1;
		//change user role into user after librarian rejected
		var accountEntity = {
			id: userID,
			role_id: 1
		}
	}
};