const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');
const shoppingCart = require('../controllers/shopping_cart.controller');
const returningCardController = require('../controllers/returning_card.controller')

router.post('/user/register',accountController.add);
router.post('/user/login',accountController.login);
router.get('/user/logout',accountController.logout);
router.get('/user/registerReaderCard', accountController.readerCard);

router.get('/user/shoppingCart/addcart/:id',shoppingCart.addcart);
router.get('/user/shoppingCart/delCart/:id',shoppingCart.removeFromCart);
router.get('/user/processCart', accountController.processCart);
router.get('/user/returningCard',returningCardController.add);
module.exports = router;