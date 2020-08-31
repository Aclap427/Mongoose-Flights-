var express = require('express');
var router = express.Router();
let destinationsCtrl = require('../controllers/destinations');

router.post('/flights/:id/destinations', destinationsCtrl.create);

module.exports = router;