const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_config = require('../configs/token_config');

//Managers
const AuthManager = require('../managers/manager_auth');

//Helpers
const ResponseHelper = require('../helpers/helper_response');

const router = {};
router.middleware = express.Router();
router.unauthorizedRoute = express.Router();
router.authorizedRoute = express.Router();

//Create
router.unauthorizedRoute.post("/api/user", (req, res) => {
    console.log("post /api/user called with params: ", req.body);

    AuthManager.createUser(req.body.username, req.body.password)
        .then( (user) => {
            res.send(ResponseHelper.jsonMessage("User successfully registered"));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Log in
router.unauthorizedRoute.post("/api/login", (req, res) => {
    console.log("post /api/login called");

    AuthManager.authenticateUser(req.body.username, req.body.password)
        .then( (token) => {
            res.send(ResponseHelper.jsonPayload(token));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Get user
router.authorizedRoute.get("/api/user/:username", (req, res) => {
    console.log("get /api/user/:username called username: ", req.params);

    AuthManager.getUser(req.params.username)
        .then( (user) => {
            res.send(ResponseHelper.jsonPayload(user.username));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Get users
router.authorizedRoute.get("/api/users", (req, res) => {
    console.log("get /api/users called");

    AuthManager.getUsers()
        .then( (users) => {
            res.send(ResponseHelper.jsonPayload(users));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Update user
router.authorizedRoute.put("/api/user", (req, res) => {
    console.log("put /api/user called params: ", req.body);
    //NOT IMPLEMENTED
    res.status(501).send(ResponseHelper.jsonError("User update isnt implmented yet"));
});

//Delete user
router.authorizedRoute.delete("/api/user", (req, res) => {
    console.log("delete /api/user called params: ", req.body);
    //NOT IMPLEMENTED
    res.status(501).send(ResponseHelper.jsonError("User delete isnt implmented yet"));
});

//Middleware token validation
router.middleware = (req, res, next) => {
    console.log("validation middleware used");
    const token = req.body.token || req.params.token || req.query.token;

    if(token){
        try {
            const decoded = jwt.verify(token, jwt_config.key);
            if(decoded === jwt_config.payload) {
                //Good token, continue!
                console.log("Authorization granted");
                next();
            }
        } catch (err) {
            res.status(401).send(ResponseHelper.jsonError(err.name));
        }
    } else {
        res.status(400).send(ResponseHelper.jsonError("No token in request"));
    }
}

module.exports = router;