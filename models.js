const mongoose = require('mongoose');

let serviceSchema = mongoose.Schema({
    name: String,
    description: String,
    cost: Number
});

const models = {
    Service: mongoose.model('Service', serviceSchema)
};
module.exports = models;
