const Menu = require("../model/menu");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const productService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            Menu.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    }};
   

module.exports = productService;