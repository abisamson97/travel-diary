const Entry = require('../models/entry');

module.exports = {
    new: newEntry,
    index,
    create, 
    show
}

async function create(req, res) {
    try {
        await Entry.create(req.body);
        res.redirect('/entries/new');
      } catch (err) {
        console.log(err);
        res.render('entries/new', { errorMsg: err.message });
      }
    }
    
async function index(req, res) {
    const entries = await Entry.find({});
    res.render('entries/index', { title: 'My Trips', entries });
  }

  async function show(req, res) {
    const entry = await Entry.findById(req.params.id);
    res.render('entries/show', { title: 'Trip Details', entry})
}

function newEntry(req, res) {
    res.render('entries/new', { title: 'Add Trip', errorMsg: ''});
}
