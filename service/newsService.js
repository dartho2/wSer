const News = require("../model/news");
const resolveErrorType = require('../error').resolveErrorType;
const logger = require('../libs/logger');

const productService = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            News.find()
                .then(resolve)
                .catch(err => reject(err))
        });
    }};
   

module.exports = productService;