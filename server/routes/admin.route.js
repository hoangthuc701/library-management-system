const router = require('express').Router();
//controller
//...
router.get('admin/book/all', bookController.getAll);

module.exports = router;