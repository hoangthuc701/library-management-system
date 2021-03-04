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
        var listAccount = await Account.loadUser(req.body.username);
		if (listAccount.length == 0 || listAccount[0]["role_id"] != 1) {
			var text = `Tên tài khoản không tồn tại, hoặc tài khoản ${req.body.username} không có quyền đăng ký thẻ độc giả!`
			var link = '/librarian/readerCard';
			res.render('duplicateItem', {Text: text, Link: link, layout: 'addandedit'});
        }
		else{
			var accountEntity = {
				id: listAccount[0]["id"],
				role_id: 5
			}
			await Account.update(accountEntity);
	
			var expiredDate = new Date(dateUtils.getCurrentDateTime())
			expiredDate.setDate(expiredDate.getDate() + 365);//expired day after 1 year from now
	
			var Reader_cardEntity = {
				card_id: '',
				account_id: listAccount[0]["id"],
				created_date: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
				expirated_date: expiredDate,
			}
			await ReaderCard.insert(Reader_cardEntity);
			res.redirect('/librarian/readerCard');
		}
	},
	delete: async(req,res) => {
		var id = req.params.id;
		var listReader = await ReaderCard.loadByID(id);
		var accountEntity = {
			id: listReader[0]["account_id"],
			role_id: 1
		}
		await Account.update(accountEntity);
		await ReaderCard.delete(id);
		res.redirect('/librarian/readerCard');
	},
	update: async (req, res) => {
        var list = await Account.loadUser(req.body.username);
		if (list.length == 0) {
			var text = 'Tên tài khoản không tồn tại!'
			var link = '/librarian/readerCard';
			res.render('duplicateItem', {Text: text, Link: link, layout: 'addandedit'});
        }
        else{
			var listReader = await ReaderCard.loadByID(req.body.id);
			var accountEntity = {
				id: listReader[0]["account_id"],
				role_id: 1
			}
			await Account.update(accountEntity);

			var accountEntity = {
				id: list[0]["id"],
				role_id: 5
			}
			await Account.update(accountEntity);

			var Reader_cardEntity = {
				id : req.body.id,
				card_id: '',
				account_id: list[0]["id"],
				expirated_date: req.body.expirated_date,
			}
			await ReaderCard.update(Reader_cardEntity);
			res.redirect('/librarian/readerCard');
		}
	},
	accept: async (req,res) => {
		const userID = +req.params.userID || -1;
		//change user role into reader after librarian accepted
		var accountEntity = {
			id: userID,
			role_id: 5
		}
		var listinfor_register = await Account.LoadInfor_register(userID);
		await Account.deleteInfor_register(listinfor_register[0]["id"]);
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
		var listinfor_register = await Account.LoadInfor_register(userID);
		await Account.deleteInfor_register(listinfor_register[0]["id"]);
		var accountEntity = {
			id: userID,
			role_id: 1
		}
		await Account.update(accountEntity);
		res.redirect('/librarian/awaiting');
	},
};