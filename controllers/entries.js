const Entry = require('../models/entry');

module.exports = {
    new: newEntry
}

function newEntry(req, res) {
    res.render('entries/new', { title: 'Add Trip', errorMsg: ''});
}