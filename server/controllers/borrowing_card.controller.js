const BorrowingCard = require('../models/borrowing_card.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const borrowingCardBook = require('../models/borrowing_card_book.model');
module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		let list = [];
		if (req.query.p)
			p = req.query.p;
		var listBorrowingCard = await BorrowingCard.loadByOffset((p - 1) * 10);
		var quantity = await BorrowingCard.quantity();
		for (let i = 0; i < listBorrowingCard.length; i++) {
			var listBorrowingCardBook = await borrowingCardBook.loadByBorrowingCardID(listBorrowingCard[i]["card_id"]);
			list.push([listBorrowingCard[i]]);
			listBorrowingCardBook.forEach((brDetail) => {
				list[i].push({brDetail});
			});
		};
		console.log(list[0][1]);
		newLocal = 'admin/BorrowingCard/list';
		res.render(newLocal, {
			List: list, quantity: quantity[0]["quantity"],
			pagi: functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p), layout: 'adminPanel'
		});
	},
	getByID: async (req, res) => {
		var id = req.params.id;
		res.json(await BorrowingCard.loadByID(id))
	},
	add: async (req, res) => {
		req.body.borrowed_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		var Borrowing_cardEntity = {
			card_id: req.body.card_id,
			reader_id: req.body.reader_id,
			returned_date: req.body.returned_date,
			borrowed_date: req.body.borrowed_date,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await BorrowingCard.insert(Borrowing_cardEntity);
		return res.json(true);
	},
	delete: async (req, res) => {
		var id = req.params.id;
		await BorrowingCard.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		var Borrowing_cardEntity = {
			id: req.body.id,
			card_id: req.body.card_id,
			reader_id: req.body.reader_id,
			returned_date: req.body.returned_date,
			borrowed_date: req.body.borrowed_date,
			//created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BorrowingCard.update(Borrowing_cardEntity);
		return res.json(true);
	},

};