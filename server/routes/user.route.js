const router = require('express').Router();
const accountController = require('../controllers/account.controller');

router.get('/user/register',accountController.add);
router.get('/user/login',accountController.login);
router.get('/user/logout',accountController.logout);

module.exports = router;