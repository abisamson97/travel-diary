const Entry = require('../models/entry');

module.exports = {
    new: newEntry,
    index
}

async function index(req, res) {
    const entries = await Entry.find({});
    res.render('entries/index', { entries });
  }

function newEntry(req, res) {
    res.render('entries/new', { title: 'Add Trip', errorMsg: ''});
}
