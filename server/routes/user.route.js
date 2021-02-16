const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');
const shoppingCart = require('../controllers/shopping_cart.controller');


router.post('/user/register',accountController.add);
router.get('/user/login',accountController.login);
router.get('/user/logout',accountController.logout);
router.get('/user/registerReaderCard/:id', accountController.readerCard);

router.get('/user/shoppingCart/addcart/:id',shoppingCart.addcart);
router.get('/user/shoppingCart/delCart/:id',shoppingCart.removeFromCart);
router.get('/user/processCart', accountController.processCart);
module.exports = router;