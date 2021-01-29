const BookTitle = require('../models/book_title.model');
 module.exports = {
	
	addcart: async (req, res) => {
		var id = req.params.id;
		var found = false;
		req.session.cart.items.forEach(item => {
			if(item.id === id) {
				found = true;
			}
		 });
		const listBook = await BookTitle.loadByID(id);
		if (listBook[0]["quantity"] === 0 || listBook[0]["status"] === 1 || found === true){
			res.json(false);
		}
		else{
			let book = {
				id: id,
				name: listBook[0]["name"],
				author: listBook[0]["author"],
				category_id: listBook[0]["category_id"],
				image: listBook[0]["image"],
				description: listBook[0]["description"]
			}
			req.session.cart.items.push(book);
			req.session.cart.totals += 1;
			res.json(true);
		}
	},
	removeFromCart: async (req, res) => {
		var id = req.params.id;
		for(let i = 0; i < req.session.items.length; i++) {
			let item = req.session.items[i];
			if(item.id === id) {
				req.session.items.splice(i, 1);
				req.session.totals -= 1;
			}
		}
	},
 };