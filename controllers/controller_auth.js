const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_config = require('../configs/token_config');

//Helpers
const ResponseHelper = require('../helpers/helper_response');

const router = {};
router.middleware = express.Router();
router.unauthorizedRoute = express.Router();

//Create

//Log in
router.unauthorizedRoute.post("/api/login", (req, res) => {
    console.log("/api/login called");

    const token = jwt.sign(jwt_config.payload, jwt_config.key);

    res.send(ResponseHelper.jsonPayload(token));
});

//Get user

//Update user

//Delete user

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