﻿require('rootpath')();
const ApiError = require('./error').ApiError;
const errorHandler = require('_helpers/error-handler');
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const mongoose = require('mongoose');
const Utils = require('./utils');
const logger = require('./libs/logger');
const authMid = require('./middleware/authorization');
const loggingMid = require('./middleware/logging');
const conf = require('./configuration/configuration');

const https = require('https');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(loggingMid);

// api routes

// global error handler
app.use(errorHandler);
mongoose.connect(conf.database_uri, {useNewUrlParser: true});

// ROUTESs

const request = require('request');
const username = '915629246747733';
const password = 'EMNYQ5vwrLxDNVHBPAUe3Vh3cF8';

router.get("/images", authMid, (req, res, next) => {
    request.get('http://api.cloudinary.com:80/v1_1/duvsjgmt5/resources/image', {
        headers: {"Authorization": Buffer.from(username + ':' + password).toString('base64')}
    }, (err, response, body) => {
        if (err) {
            next(err);
        } else if (response.statusCode === 200) {
            res.status(200).json(JSON.parse(body)['resources'])
       }
    })
});

router.get('/validate_token', authMid, function (req, res) {
	    res.send('');
});
// app.use('/api/bet', require('./routes/bet'));
// app.use('/api/restaurant_items', require('./routes/restaurantItems'));
// app.use('/api/restaurants', require('./routes/restaurants'));
// app.use('/api/equipments', require('./routes/equipments'));
// app.use('/api/graphics', require('./routes/graphics'));
// app.use('/api/workers', require('./routes/workers'));
// app.use('/api/users', require('./users/users.controller'));
// app.use('/api/events', require('./routes/events'));
// app.use('/api/analystic', require('./routes/analystic'));
// app.use('/api/portals', require('./routes/portal'));
// app.use('/api/sections', require('./routes/section'));
// app.use('/api/content_items', require('./routes/contentItem'));
// app.use('/api/auth', require('./routes/authentication'));
// app.use('/api/service', require('./routes/service'));
// app.use('/api', require('./routes/health'));
// app.use('/api/carnets', require('./routes/carnets'));
// app.use('/api/dish', require('./routes/dish'));
app.use('/api/menu', require('./routes/menu'));
// ERROR HANDLER //////////////////////////////////////////

router.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.type.http_status).json(err);
    } else {
        res.status(500).json(err);
    }
});

app.use('/api', router);

// const httpsCredentials = getHttpsCredentials();
const httpsCredentials = 0;
console.log(httpsCredentials);
const server = httpsCredentials ? https.createServer(credentials, app) : app;
server.listen(conf.port, () => {
    logger.info(`HTTP${httpsCredentials ? 'S' : ''} server started on port: ${conf.port} with env: ${conf.env}`);
    logger.debug(JSON.stringify(conf, null, 3))
});



