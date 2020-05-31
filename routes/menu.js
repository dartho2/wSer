const express = require('express');
const router = express.Router();
const authMid = require('../middleware/authorization');
const productService = require("../service/menuService.js");
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// list
router.get('/',(req, res, next) => {
    productService.getAll()
        .then(menu => res.json(menu))
        .catch(err => next(err));
});




module.exports = router;