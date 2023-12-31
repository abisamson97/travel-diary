const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/entries/:id/comments', commentsCtrl.create);

router.delete('/comments/:id', commentsCtrl.delete);

module.exports = router;