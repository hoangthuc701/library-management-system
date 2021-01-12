const router = require('express').Router();
const bookController = require('../controllers/book.controller');

router.get('/book/all', bookController.getAll);

module.exports = router;
