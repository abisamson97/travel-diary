var express = require('express');
var router = express.Router();
const passport = require('passport');

var port = process.env.PORT || 8000;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travel Diary' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;
