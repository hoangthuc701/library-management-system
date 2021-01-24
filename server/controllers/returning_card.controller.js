const ReturningCard = require('../models/returning_card.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const BorrwingCard = require('../models/borrowing_card.model');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listReturningCard = await ReturningCard.loadByOffset((p - 1) * 10);
        var quantity = await ReturningCard.quantity();
		res.json({list: listReturningCard, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await ReturningCard.loadByID(id))
	},
	add: async (req, res) => {
		//test data
		req.body.borrowing_card_id = 1;
        req.body.penalty_cost = 1;
        req.body.returned_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
        var list = await BorrwingCard.loadByID(req.body.borrowing_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
        
		var returning_cardEntity = {
            borrowing_card_id: req.body.borrowing_card_id,
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
		await ReturningCard.delete(id);
		res.json(true);
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