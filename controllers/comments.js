const Entry = require('../models/entry');

module.exports = {
    create
}

async function create(req, res) {
    
    const entry = await Entry.findById(req.params.id);
    console.log(req.user._id);
    req.body.user = await req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    console.log(req.body);
    
    entry.comments.push(req.body);
    try {
         await entry.save();
      } catch (err) {
        console.log(err);
      }
      res.redirect(`/entries/${entry._id}`);
    }

