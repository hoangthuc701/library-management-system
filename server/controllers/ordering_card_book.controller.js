const OrderingCardBook = require('../models/ordering_card_book.model');
const functUtils = require('../middlewares/UtilityFunction');
const dateUtils = require('../middlewares/dateUtils');
const OrderingCard = require('../models/ordering_card.model');

module.exports = {
	getByOffset: async (req, res) => {
		var p = 1;
		var list = [];
		if (req.query.p)
			p = req.query.p;
	
        var listOrdering_card_book = await OrderingCardBook.loadByOffset((p - 1) * 10);
        var quantity = await OrderingCardBook.quantity();
		res.json({list: listOrdering_card_book, quantity: quantity, rangeOfPages:functUtils.rangeOfPagination(Math.ceil(quantity[0]["quantity"] / 10), p)});
	},
	getByID: async(req,res) => {
		var id = req.params.id;
		res.json(await OrderingCardBook.loadByID(id))
	},
	add: async (req, res) => {
		//test data
        req.body.ordering_card_id = 1;
        req.body.book_title_id = 1;
        req.body.cost = 12;

        var list = await OrderingCard.loadByID(req.body.ordering_card_id);
		if (list.length == 0) {
			return res.json(false);
        }
        
		var Ordering_card_bookEntity = {
            ordering_card_id: req.body.ordering_card_id,
            book_title_id: req.body.book_title_id,
            cost: req.body.cost,
			created_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime()),
			updated_at: ''
		}
		await OrderingCardBook.insert(Ordering_card_bookEntity);
		return res.json(true);
	},
	delete: async(req,res) => {
		var id = req.params.id;
		await OrderingCardBook.delete(id);
		res.json(true);
	},
	update: async (req, res) => {
		const id = +req.params.id || -1;
		//test 
		req.body.ordering_card_id = 1;
        req.body.book_title_id = 1;
        req.body.cost = 123;
        req.body.created_at = dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime());
        //validation -- check duplicate user
		var list = await OrderingCard.loadByID(req.body.ordering_card_id);
		if (list.length == 0) {
			return res.json(false);
		}
		var Ordering_card_bookEntity = {
			id : id,
			ordering_card_id: req.body.ordering_card_id,
            book_title_id: req.body.book_title_id,
            cost: req.body.cost,
			created_at: req.body.created_at,
			updated_at: dateUtils.formatDateTimeSQL(dateUtils.getCurrentDateTime())
		}
		await OrderingCardBook.update(Ordering_card_bookEntity);
		return res.json(true);
	},
};