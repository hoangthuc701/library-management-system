const router = require('express').Router();
const readerCardController = require('../controllers/reader_card.controller');
const accountController = require('../controllers/account.controller');
router.get('/librarian/accept/:userID',readerCardController.accept);
router.get('/librarian/reject/:userID',readerCardController.reject);

router.get('/librarian/awaiting', accountController.awaiting);

router.get('/librarian/readerCard',readerCardController.getByOffset);
router.get('/librarian/readerCard/getinfo/:id',readerCardController.getByID);
router.post('/librarian/readerCard/add',readerCardController.add);
router.get('/librarian/readerCard/del/:id',readerCardController.delete);
router.post('/librarian/readerCard/edit/:id',readerCardController.update);
module.exports = router;