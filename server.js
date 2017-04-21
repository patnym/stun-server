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
const client_routes = require('./controllers/controller_client');
const auth_routes = require('./controllers/controller_auth');
const error_middleware = require('./helpers/helper_route_middleware');

//Register all unauthorized paths
app.use(client_routes.unauthorizedRoute);
app.use(auth_routes.unauthorizedRoute);

//Middleware
if(app.get('env') !== 'development')
    app.use(auth_routes.middleware);

//Register all authorized paths
app.use(client_routes.authorizedRoute);
app.use(auth_routes.authorizedRoute);

//Error middleware
app.use(error_middleware);

/**
 * Setup DB connection
 */
const dbConnection = process.env.DB || 'mongodb://127.0.0.1:27017/stun';
mongoose.connect(dbConnection, null,function(err) {
    if(err) throw err;
    console.log('DB connection established at ', dbConnection);
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