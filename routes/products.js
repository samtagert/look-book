var express = require('express');
var router = express.Router();
var productsCtrl = require('../controllers/products');

router.post('/', productsCtrl.index);

module.exports = router;