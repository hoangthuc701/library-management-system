const router = require('express').Router();

router.get('/home/hello', async (req,res) => {
    res.render('test');
});

module.exports = router;