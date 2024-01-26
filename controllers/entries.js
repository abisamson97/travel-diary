const Entry = require('../models/entry');

module.exports = {
    new: newEntry,
    index,
    create, 
    show,
    edit,
    update,
    delete: deleteEntry,
}

async function deleteEntry(req, res) {
  try {
    const result = await Entry.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (result.deletedCount === 0) {
      return res.redirect('/entries');
    }

    res.redirect('/entries');
  } catch (err) {
    console.error(err);
    res.redirect('/entries');
  }
}



async function update(req, res) {
  try {
    const entry = await Entry.findByIdAndUpdate(
      { _id: req.params.id, user: req.user._id }, 
      req.body, 
      { new: true })

    if (!entry) {
      return res.redirect('/entries');
    }

    res.redirect(`/entries/${entry._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/entries');
  }
}

async function show(req, res) {
  const entry = await Entry.findById(req.params.id);
  res.render('entries/show', { title: 'Trip Details', entry})
}

async function edit(req, res) {
  try {
    const entry = await Entry.findById({ _id: req.params.id, user: req.user._id }).exec();
    
    if (!entry) {
      return res.redirect('/entries');
    }

    res.render('entries/edit', { title: 'Update Trip', entry });
  } catch (err) {
    console.log(err);
    res.redirect('/entries');
  }
}



async function create(req, res) {
    try {
        const entryData = {
          location: req.body.location,
          lodging: req.body.lodging,
          activities: req.body.activities,
          restaurants: req.body.restaurants,
          user: req.user._id,
        };

        const entry = await Entry.create(entryData);
        req.session.flash = { title: 'Add Trip', errorMsg: '' };

        res.redirect(`/entries/${entry._id}`);
      } catch (err) {
        console.log(err);
        res.render('entries/new', { errorMsg: err.message });
      }
    }
  
async function index(req, res) {
    const entries = await Entry.find({});
    res.render('entries/index', { title: 'My Trips', entries });
  }

function newEntry(req, res) {
    res.render('entries/new', { title: 'Add Trip', errorMsg: ''});
}
