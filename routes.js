const express = require('express'),
    mongoose = require('mongoose'),
    models = require('./models'),
    router = express.Router();

mongoose.connect(process.env.DB_HOST);

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;
