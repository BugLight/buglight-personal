const express = require('express'),
    passport = require('passport'),
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
            res.send(500);
        else {
            res.json(services);
        }
    });
});

router.post('/services/', function (req, res) {
    Service.create(req.body, function (err) {
        if (err) {
            if (err.name === 'ValidationError')
                res.status(400).json({
                    message: 'Validation Error',
                    errors: Object.keys(err.errors)
                });
            else
                res.send(500);
        } else {
            res.json({
                message: 'Saved'
            });
        }
    });
});

router.delete('/services/:id', function (req, res) {
    Service.remove({_id: req.params.id}, function (err) {
        if (err) {
            if (err.name === 'CastError')
                res.send(404);
            else
                res.send(500);
        } else {
            res.json({
                message: 'Deleted'
            });
        }
    });
});

router.get('/works/', function (req, res) {
    Work.find({}).populate('service').exec(function (err, works) {
        if (err)
            res.send(500);
        else {
            res.json(works);
        }
    })
});

router.post('/works/', function (req, res) {
    Work.create(req.body, function (err, work) {
        if (err) {
            if (err.name === 'ValidationError')
                res.status(400).json({
                    message: 'Validation Error',
                    errors: Object.keys(err.errors)
                });
            else
                res.send(500);
        } else {
            Service.update({_id: work.service}, {$push: {works: work._id}}, function (err) {
                if (err)
                    res.send(500);
                else {
                    res.json({
                        message: 'Saved'
                    });
                }
            });
        }
    });
});

router.delete('/works/:id', function (req, res) {
    Work.findByIdAndRemove(req.params.id, function (err, work) {
        if (err) {
            if (err.name === 'CastError')
                res.send(404);
            else
                res.send(500);
        } else {
            Service.update({_id: work.service}, {$pull: {works: work._id}}, function (err) {
                if (err)
                    res.send(500);
                else {
                    res.json({
                        message: 'Deleted'
                    });
                }
            });
        }
    });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(200);
});

module.exports = router;
