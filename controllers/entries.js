const Entry = require('../models/entry');

module.exports = {
    new: newEntry,
    index,
    create, 
    show,
    edit,
    update,
    delete: deleteEntry
}

async function deleteEntry(req, res) {
  try {
    const deletedEntry = await Book.findOneAndDelete(req.params.id);

    if (!deletedBook) {
      return res.redirect('/books');
    }

  } catch (err) {
    console.error(err);
  }
}

async function update(req, res) {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true })

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
    const entry = await Entry.findById(req.params.id).exec();
    
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
        await Entry.create(req.body);
        res.redirect('/entries/new');
      } catch (err) {
        console.log(err);
        res.render('entries/new', { errorMsg: err.message });
      }
    }
  // const entryData = {
  //   location: req.body.location,
  //   lodging: req.body.lodging,
  //   activities: req.body.activities,
  //   restaurants: req.body.restaurants,
  // };
  // for (const category in entryData) {
  //   if (entryData[category]) {
  //     // Create an entry for this category.
  //     try {
  //       await Entry.create({
  //         [category]: entryData[category],
  //         comments: [], // Initialize with empty comments.
  //       });
  //       res.redirect('/entries/new'); 
  //     } catch (err) {
  //       console.log(err);
  //       res.render('entries/new', { errorMsg: err.message });
  //     }
  //   }
  // }

//   res.redirect('/entries/new'); // Redirect back to the "New Trip" page.
// }
  
    
async function index(req, res) {
    const entries = await Entry.find({});
    res.render('entries/index', { title: 'My Trips', entries });
  }

function newEntry(req, res) {
    res.render('entries/new', { title: 'Add Trip', errorMsg: ''});
}
