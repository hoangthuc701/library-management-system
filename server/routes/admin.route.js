const router = require('express').Router();
const bookController = require('../controllers/book.controller');
const accountController = require('../controllers/account.controller');

router.get('/admin/Books', bookController.getByOffset);


router.get('/admin/Accounts', accountController.getByOffset);
router.get('/admin/Accounts/add',accountController.add)

module.exports = router;