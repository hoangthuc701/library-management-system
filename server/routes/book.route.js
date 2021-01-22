const router = require('express').Router();
const bookController = require('../controllers/book.controller');

router.get('/Books', bookController.getByOffset);

module.exports = router;
