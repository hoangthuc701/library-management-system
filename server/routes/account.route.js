const router = require('express').Router();
const accountController = require('../controllers/account.controller');

router.get('/Accounts', accountController.getByOffset);

module.exports = router;
