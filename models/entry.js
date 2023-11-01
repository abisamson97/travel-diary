const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {type: String, required: true}
}, {
    timestamps: true
})

const entrySchema = new Schema({
    location: {type: String, required: true},
    lodging: {type: String},
    activities: {type: String},
    restaurants: {type: String},
    comments: [commentSchema],
}, {
    timestamps: true
});



module.exports = mongoose.model('Entry', entrySchema);