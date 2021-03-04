const ReaderCard = require('../models/reader.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const Account = require('../models/account.model');
const accountModel = require('../models/account.model');
const moment = require('moment');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listReaderCard = await ReaderCard.loadByOffset((p - 1) * 10);
		for(var i = 0; i < listReaderCard.length; i++){
			listReaderCard[i]["created_date"] = moment(listReaderCard[i]["created_date"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
			listReaderCard[i]["expirated_date"] = moment(listReaderCard[i]["expirated_date"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
		}
        var quantity = await ReaderCard.quantity();
		const newLocal = 'librarian/ReaderCard/listReader';
		res.render(newLocal, {
			List: listReaderCard, quantity: quantity[0]["quantity"],
			pagi:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'stock'
		});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await ReaderCard.loadByID(id))
	},
	add: async (req, res) => {
        
        var list = await Account.loadByID(req.body.account_id);
		if (list.length == 0) {
			return res.json(false);
        }
		var accountEntity = {
			id: req.body.account_id,
			role_id: 5
		}
		await Account.update(accountEntity);
		var Reader_cardEntity = {
			card_id: req.body.card_id,
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
        
        var list = await Account.loadByID(req.body.account_id);
		if (list.length == 0) {
			return res.json(false);
        }
        
		var Reader_cardEntity = {
			id : req.body.id,
			card_id: req.body.card_id,
            account_id: req.body.account_id,            
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
		res.redirect('/librarian/awaiting');
	},
	reject: async(req,res) => {
		const userID = +req.params.userID || -1;
		//change user role into user after librarian rejected
		var accountEntity = {
			id: userID,
			role_id: 1
		}
		await Account.update(accountEntity);
		res.redirect('/librarian/awaiting');
	},
};