const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {type: String, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String,
      userAvatar: String
}, {
    timestamps: true
});

const entrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    location: {type: String},
    lodging: {type: String},
    activities: {type: String},
    restaurants: {type: String},
    comments: [commentSchema],
}, {
    timestamps: true
});



module.exports = mongoose.model('Entry', entrySchema);