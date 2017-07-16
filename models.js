const mongoose = require('mongoose'),
    {Schema} = mongoose,
    {Types: {ObjectId}} = Schema;

let serviceSchema = Schema({
    name: String,
    description: String,
    cost: Number,
    works: [{type: ObjectId, ref: 'Work'}]
});

let workSchema = Schema({
    name: String,
    description: String,
    customer: String,
    repository_url: String,
    project_url: String,
    service: {type: ObjectId, ref: 'Service'}
});

const models = {
    Service: mongoose.model('Service', serviceSchema),
    Work: mongoose.model('Work', workSchema)
};
module.exports = models;
