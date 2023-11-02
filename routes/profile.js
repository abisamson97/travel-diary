const express = require('express');
const router = express.Router();

router.get('/profile', function(req, res, next) {
    const user = req.user;
    res.render('profile', { title: 'My Profile' });
  });

  module.exports = router;