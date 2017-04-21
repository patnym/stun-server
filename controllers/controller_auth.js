const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const jwt_config = require('../configs/token_config');

//Managers
const AuthManager = require('../managers/manager_auth');

//Helpers
const ResponseHelper = require('../helpers/helper_response');
const UserHelper = require('../helpers/helper_user');

const router = {};
router.middleware = express.Router();
router.unauthorizedRoute = express.Router();
router.authorizedRoute = express.Router();

/**
 * @api {post} /api/user Register a new user
 * @apiName Register User
 * @apiGroup User
 *
 * @apiPermission none
 * 
 * @apiParam {String} username Users unique username
 * @apiParam {String} password Users unique password
 *
 * @apiSuccess {User} user User object
 */
router.unauthorizedRoute.post("/api/user", (req, res, next) => {
    console.log("post /api/user called with params: ", req.body);

    AuthManager.createUser(req.body.username, req.body.password)
        .then( (user) => {
            res.json(UserHelper.removeSensitiveUserData(user));
        }).catch( (reason) => {
            next(reason);
        });
});

/**
 * @api {post} /api/login Login user
 * @apiName Log in
 * @apiGroup User
 *
 * @apiPermission none
 * 
 * @apiParam {String} username Users unique username
 * @apiParam {String} password Users unique password
 *
 * @apiSuccess {JasonWebToken} Unique authentication token.
 * @@apiSuccessExample {json} Success-Response:
     {
         "message": "",
         "error": "",
         "payload":
         {
            token: "123456789abcdefghijklmnopqrstuvwxyz"
         }
     }
 */
router.unauthorizedRoute.post("/api/login", (req, res, next) => {
    console.log("post /api/login called");

    AuthManager.authenticateUser(req.body.username, req.body.password)
        .then( (token) => {
            res.json(token);
        }).catch( (reason) => {
            next(reason);
        });
});

/**
 * @api {get} /api/user/:username?token=:token Get a user by name
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiPermission admin
 * 
 * @apiParam {String} Username Users unique username
 * @apiParam {JasonWebToken} Unique authentication token
 *
 * @apiSuccess 
 */
router.authorizedRoute.get("/api/user/:username", (req, res, next) => {
    console.log("get /api/user/:username called username: ", req.params);

    AuthManager.getUser(req.params.username)
        .then( (user) => {
            res.json(UserHelper.removeSensitiveUserData(user, true));
        }).catch( (reason) => {
            console.log("YO");            
            next(reason);
        });
});

//Get users
router.authorizedRoute.get("/api/users", (req, res, next) => {
    console.log("get /api/users called");

    AuthManager.getUsers()
        .then( (users) => {
            res.json(UserHelper.removeMultipleSensitiveUserData(users, true));
        }).catch( (reason) => {
            next(reason);
        });
});

//Update user
router.authorizedRoute.put("/api/user", (req, res) => {
    console.log("put /api/user called params: ", req.body);
    //NOT IMPLEMENTED
    res.status(501).send({error: "User update isnt implmented yet"});
});

//Delete user
router.authorizedRoute.delete("/api/user", (req, res) => {
    console.log("delete /api/user called params: ", req.body);
    //NOT IMPLEMENTED
    res.status(501).send({error: "User delete isnt implmented yet"});
});

//Middleware token validation
router.middleware = (req, res, next) => {
    const token = req.body.token || req.params.token || req.query.token;

    if(token){
        try {
            const decoded = jwt.verify(token, jwt_config.key);
            if(decoded === jwt_config.payload) {
                console.log("Authorization granted");
                next();
            }
        } catch (err) {
            next(err);
        }
    } else {
        next(ResponseHelper.errorResponse(400, "No token in request"));
    }
}

module.exports = router;