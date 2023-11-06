const Entry = require('../models/entry');

module.exports = {
    create,
    delete: deleteComment
};

async function deleteComment(req, res) {
  try {
    const entry = await Entry.findOne({
      'comments._id': req.params.id,
      'comments.user': req.user._id,
    });
    console.log(entry);
    if (!entry) {
      return res.redirect(`/entries/${entry._id}`);
    }
    entry.comments.remove(req.params.id);
    await entry.save();
    res.redirect(`/entries/${entry._id}`);
  } catch (err) {
    console.error(err);
  }
}


async function create(req, res) {
    
    const entry = await Entry.findById(req.params.id);
    req.body.user = await req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    entry.comments.push(req.body);
    try {
         await entry.save();
      } catch (err) {
        console.log(err);
      }
      res.redirect(`/entries/${entry._id}`);
    }

