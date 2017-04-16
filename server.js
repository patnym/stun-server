// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Setup routes
 */
app.use(require('./controllers/controller_client'));

/**
 * Setup DB connection
 */
const dbConnection = process.env.DB || 'mongodb://127.0.0.1:27017/stun';
mongoose.connect(dbConnection, null,function(err) {
    if(err) throw err;

    console.log('DB connection established');
})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

exports.app = app;