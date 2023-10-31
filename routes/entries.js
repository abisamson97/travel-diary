const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.get('/', entriesCtrl.index);

router.get('/new', entriesCtrl.new);

router.get('/:id', entriesCtrl.show);

router.post('/', entriesCtrl.create);



module.exports = router;

