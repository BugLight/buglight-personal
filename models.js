const mongoose = require('mongoose'),
    {Schema} = mongoose,
    {Types: {ObjectId}} = Schema;

let serviceSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    cost: {
        type: Number,
        min: 0
    },
    works: [{type: ObjectId, ref: 'Work'}]
});

let workSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    customer: {
        type: String,
        required: true
    },
    repository_url: {
        type: String,
        match: /^https?:\/\/\w+(\.\w+)+[\/.\w-]*$/
    },
    project_url: {
        type: String,
        match: /^https?:\/\/\w+(\.\w+)+[\/.\w-]*$/
    },
    service: {
        type: ObjectId,
        ref: 'Service',
        required: true
    }
});

const models = {
    Service: mongoose.model('Service', serviceSchema),
    Work: mongoose.model('Work', workSchema)
};
module.exports = models;
