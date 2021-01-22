const router = require('express').Router();
const accountController = require('../controllers/account.controller');
const bookController = require('../controllers/book.controller');


router.get('/admin/Books', bookController.getByOffset);


module.exports = router;