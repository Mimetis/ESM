var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('speaker', { title: 'Devoxx Speakers', speakers: 'speakers' });
});

// Search
router.post('/', (req, res) => {
    var search = req.body.search;
    var oSearch = JSON.stringify({ search });

    res.render('speaker', { title: 'Devoxx Speakers', speakers: 'speakers', state: oSearch });
});

module.exports = router;
