const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
    location: {type: String, required: true},
    lodging: {type: String},
    activities: {type: String},
    restaurants: {type: String}
}, {
    timestamps: true
});

const commentSchema = new Schema({
    content: {type: String, required: true}
})

module.exports = mongoose.model('Entry', entrySchema);