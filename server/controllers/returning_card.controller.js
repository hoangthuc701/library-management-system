const ReturningCard = require('../models/returning_card.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const BorrwingCard = require('../models/borrowing_card.model');
const BorrwingCardBook = require('../models/borrowing_card_book.model');
const BookTitle = require('../models/book_title.model');
const moment = require('moment');
const { months } = require('moment');
const accountModel = require('../models/account.model');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listReturningCard = await ReturningCard.loadByOffset((p - 1) * 10);
		for(var i = 0; i < listReturningCard.length; i++){
			listReturningCard[i]["returned_at"] = moment(listReturningCard[i]["returned_at"], 'YYYY/MM/DD HH:mm:SS').format('YYYY/MM/DD HH:mm:SS');
		}
        var quantity = await ReturningCard.quantity();
		var newLocal = 'admin/ReturningCard/list';
		res.render(newLocal, {
			List: listReturningCard, quantity: quantity[0]["quantity"],
			pagi:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'adminPanel'
		});
	},
	
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await ReturningCard.loadByID(id))
	},
	add: async (req, res) => {
		var id = req.body.borrowing_card_id;
		req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
		var list = await BorrwingCard.loadByCardID(id);
		var list2 = await BorrwingCardBook.loadByBorrowingCardID(list[0]["card_id"]);//load danh sach

		if (list.length == 0 || list2.length == 0) {
			return res.json(false);
		}

		for(var i = 0; i < list2.length; i++){
			var tempid = list2[i]["book_id"];
			var list3 = await BookTitle.loadByID(tempid);
			var bookTitleEntity = {
				id: list3[0]["id"],
				name: list3[0]["name"],
				author: list3[0]["author"],
				quantity: list3[0]["quantity"] + 1,
				category_id: list3[0]["category_id"],
				image: list3[0]["image"],
				description: list3[0]["description"],
				created_at: list3[0]["created_at"],
				updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
				view: list3[0]["view"]
			}
			await BookTitle.update(bookTitleEntity);
			
		}

		let date_ob = new Date();
		let date_ob2 = new Date(list[0]["returned_date"]);
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let date2 = ("0" + date_ob2.getDate()).slice(-2);
		let month2 = ("0" + (date_ob2.getMonth() + 1)).slice(-2);
		let year2 = date_ob2.getFullYear();
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		const firstDate = new Date(year2, month2, date2);
		const secondDate = new Date(year, month, date);

		const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
		
		req.body.penalty_cost = diffDays * 10000;
		var returning_cardEntity = {
            borrowing_card_id: id,
            penalty_cost: req.body.penalty_cost,
            returned_at: req.body.returned_at,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await ReturningCard.insert(returning_cardEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		
		var lt = await ReturningCard.loadByID(id);
		var list = await BorrwingCard.loadByCardID(lt[0]["borrowing_card_id"]);
		var list1 = await BorrwingCardBook.loadByBorrowingCardID(list[0]["card_id"]);//load danh sach
		var temp = true;
		for(var i = 0; i < list1.length; i++){
			var tempid = list1[i]["book_id"];
			var list3 = await BookTitle.loadByID(tempid);
			if(list3[0]["quantity"] == 0){
				temp = false;
			}
		}
		if(temp === false)
		{
			res.json(false);
		}
		else{
			for(var i = 0; i < list1.length; i++){
				var tempid = list1[i]["book_id"];
				var list3 = await BookTitle.loadByID(tempid);
				var bookTitleEntity = {
					id: list3[0]["id"],
					name: list3[0]["name"],
					author: list3[0]["author"],
					quantity: list3[0]["quantity"] - 1,
					category_id: list3[0]["category_id"],
					image: list3[0]["image"],
					description: list3[0]["description"],
					created_at: list3[0]["created_at"],
					updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
					view: list3[0]["view"]
				}
				await BookTitle.update(bookTitleEntity);
				
			}
			await ReturningCard.delete(id);
			res.json(true);
		}
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.borrowing_card_id = 1;
        req.body.penalty_cost = 123;
        req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await BorrwingCard.loadByID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
		var returning_cardEntity = {
			id : id,
            borrowing_card_id: req.body.borrowing_card_id,
            penalty_cost: req.body.penalty_cost,
            returned_at: req.body.returned_at,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await ReturningCard.update(returning_cardEntity);
		return res.json(true);
	},
};