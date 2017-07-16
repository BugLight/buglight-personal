const express = require('express'),
    mongoose = require('mongoose'),
    {Service, Work} = require('./models'),
    router = express.Router();

mongoose.connect(process.env.DB_HOST);
mongoose.connection.on('error', function (err) {
    console.error(err);
});

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/services/', function (req, res) {
    Service.find({}).populate('works').exec(function (err, services) {
        if (err)
            res.status(500).send('Server error');
        res.json(services);
    });
});

router.post('/services/', function (req, res) {
    // TODO: Validation
    let service = new Service(req.body);
    service.save(function (err) {
        if (err)
            res.status(500).send('Server error');
        res.json({
            message: 'Saved'
        });
    });
});

router.delete('/services/:id', function (req, res) {
    Service.remove({_id: req.params.id}, function (err) {
        if (err)
            res.status(500).send('Server error');
        res.json({
            message: 'Deleted'
        });
    });
});

router.get('/works/', function (req, res) {
    Work.find({}).populate('service').exec(function (err, works) {
        if (err)
            res.status(500).send('Server error');
        res.json(works);
    })
});

module.exports = router;
