const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');

router.get('/user/register',accountController.add);
router.get('/user/login',accountController.login);
router.get('/user/logout',accountController.logout);
router.get('/user/search',bookTitleController.search);

module.exports = router;