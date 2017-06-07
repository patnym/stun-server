// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const subdomain = require('express-subdomain');

const AuthManager = require('./managers/manager_auth')

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var httpProxy = require('http-proxy');
var proxy = httpProxy.createServer();

var router = express.Router();

router.all('*', (req, res) => {
    console.log("WTF IS HAPPENING?!");
    proxy.web(req, res, { target: 'https://91.208.174.20', secure: false });
})

app.use(subdomain('proxy', router));

/**
 * Setup statics
 */
app.use('/help',express.static(__dirname + '/doc'));
app.use('/', express.static(__dirname + '/public'));


/**
 * Setup routes
 */
const client_routes = require('./controllers/controller_client');
const auth_routes = require('./controllers/controller_auth');
const error_middleware = require('./middleware/middleware_error');

//Register all  paths
app.use(client_routes);
app.use(auth_routes);

//Error middleware
app.use(error_middleware);

/**
 * Setup DB connection
 */
const dbConnection = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stun';
mongoose.connect(dbConnection, null,function(err) {
    if(err) throw err;
    console.log('DB connection established at ', dbConnection);

    //Create a standard user if no user exists
    AuthManager.getUsers()
        .then((data) => {
            //Do nothing
        }).catch((reason) => {
            //Create standard admin
            const ROLES = require('./helpers/helper_roles');

            AuthManager.createUser('admin', 'admin', ROLES.admin);
            console.info("Created standard user");            
        });
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
