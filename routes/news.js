const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const productService = require("../service/newsService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// list
router.get('/',(req, res, next) => {
    productService.getAll()
        .then(news => res.json(news))
        .catch(err => next(err));
});




module.exports = router;