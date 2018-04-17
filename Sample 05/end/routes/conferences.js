var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('conferences', { title: 'Devoxx Conferences', conferences: 'conferences' });
});

module.exports = router;
