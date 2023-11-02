const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/entries/:id/comments', ensureLoggedIn, commentsCtrl.create);

router.delete('/entries/:id/comments/:id', commentsCtrl.delete);

module.exports = router;