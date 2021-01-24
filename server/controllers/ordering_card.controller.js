const OrderingCard = require('../models/ordering_card.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listOrdering_card = await OrderingCard.loadByOffset((p - 1) * 10);
        var quantity = await OrderingCard.quantity();
		res.json({list: listOrdering_card, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await OrderingCard.loadByID(id))
	},
	add: async (req, res) => {
		//test data
        req.body.card_id = '123';
        req.body.totalcost = 1;

		var Ordering_cardEntity = {
            card_id: req.body.card_id,
            totalcost: req.body.totalcost,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await OrderingCard.insert(Ordering_cardEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await OrderingCard.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.card_id = '12345';
        req.body.totalcost = 2.0;
        req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        
		var Ordering_cardEntity = {
			id : id,
			card_id: req.body.card_id,
            totalcost: req.body.totalcost,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await OrderingCard.update(Ordering_cardEntity);
		return res.json(true);
	},
};