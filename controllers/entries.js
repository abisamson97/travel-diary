const Entry = require('../models/entry');

module.exports = {
    new: newEntry,
    index,
    create, 
    show,
    update,
    edit
}
async function edit(req, res) {
  try {
    const entry = await Entry.findById(req.params.id).exec();
    
    if (!entry) {
      return res.redirect('/entries');
    }

    res.render('entries/edit', { title: 'Update Trip', entry });
  } catch (err) {
    console.error(err);
    res.redirect('/entries');
  }
}

function update(req, res) {
  Entry.findOneAndUpdate(
    {_id: req.params.id, userRecommending: req.user._id},
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    {new: true},
    function(err, entry) {
      if (err || !entry) return res.redirect('/entries');
      res.redirect(`/entries/${entry._id}`);
    }
  );
}

async function create(req, res) {
  const entryData = {
    location: req.body.location,
    lodging: req.body.lodging,
    activities: req.body.activities,
    restaurants: req.body.restaurants,
  };
  for (const category in entryData) {
    if (entryData[category]) {
      // Create an entry for this category.
      try {
        await Entry.create({
          [category]: entryData[category],
          comments: [], // Initialize with empty comments.
        });
        res.redirect('/entries/new'); 
      } catch (err) {
        console.log(err);
        res.render('entries/new', { errorMsg: err.message });
      }
    }
  }

  res.redirect('/entries/new'); // Redirect back to the "New Trip" page.
}
    // try {
    //     await Entry.create(req.body);
    //     res.redirect('/entries/new');
    //   } catch (err) {
    //     console.log(err);
    //     res.render('entries/new', { errorMsg: err.message });
    //   }
    // }
    
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
