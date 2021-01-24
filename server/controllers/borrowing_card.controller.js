const BorrwingCard = require('../models/borrowing_card.model');
const functUtils = require('../middlewares/UtilityFunction')
const dateUtils = require('../middlewares/dateUtils')

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listBorrwingCard = await BorrwingCard.loadByOffset((p - 1) * 10);
        var quantity = await BorrwingCard.quantity();
		res.json({list: listBorrwingCard, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await BorrwingCard.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.card_id = '123';
		req.body.reader_id = 1;
		req.body.returned_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		req.body.borrowed_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());

		var Borrowing_cardEntity = {
            card_id: req.body.card_id,
            reader_id: req.body.reader_id,
            returned_date: req.body.returned_date,
            borrowed_date: req.body.borrowed_date,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await BorrwingCard.insert(Borrowing_cardEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await BorrwingCard.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.card_id = '12345';
		req.body.reader_id = 1;
		req.body.returned_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		req.body.borrowed_date = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
		var Borrowing_cardEntity = {
			id : id,
			card_id: req.body.card_id,
            reader_id: req.body.reader_id,
            returned_date: req.body.returned_date,
            borrowed_date: req.body.borrowed_date,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await BorrwingCard.update(Borrowing_cardEntity);
		return res.json(true);
	},
};