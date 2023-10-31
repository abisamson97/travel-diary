const Entry = require('../models/entry');

module.exports = {
    create
}

async function create(req, res) {
    const entry = await Entry.findById(req.params.id);
    entry.comments.push(req.body);
    try {
        await entry.save();
      } catch (err) {
        console.log(err);
      }
      res.redirect(`/entries/${entry._id}`);
    }