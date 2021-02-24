const router = require('express').Router();

router.get('/home', async (req,res) => {
    res.render('home/home');
});

module.exports = router;