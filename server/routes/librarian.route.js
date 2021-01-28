const router = require('express').Router();
const readerCardController = require('../controllers/reader_card.controller');

router.get('/librarian/readerCard',readerCardController.getByOffset);
router.get('/librarian/readerCard/getinfo/:id',readerCardController.getByID);
router.get('/librarian/readerCard/add',readerCardController.add);
router.get('/librarian/readerCard/del/:id',readerCardController.delete);
router.get('/librarian/readerCard/edit/:id',readerCardController.update);
module.exports = router;