const router = require('express').Router();
const bookController = require('../controllers/book.controller');
const accountController = require('../controllers/account.controller');
const bookTitleController = require('../controllers/book_title.controller');

router.get('/admin/Books', bookController.getByOffset);

router.get('/admin/BookTitles', bookTitleController.getByOffset);
router.get('/admin/BookTitles/:id', bookTitleController.getByID);
router.get('/admin/BookTitles/del/:id', bookTitleController.delete);


router.get('/admin/Accounts', accountController.getByOffset);
router.get('/admin/Accounts/add',accountController.add)
router.get('/admin/Accounts/edit/:id',accountController.update)
module.exports = router;