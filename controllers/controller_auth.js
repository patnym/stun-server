const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const jwt_config = require('../configs/token_config');

//Managers
const AuthManager = require('../managers/manager_auth');

//Helpers
const ResponseHelper = require('../helpers/helper_response');
const UserHelper = require('../helpers/helper_user');
const ROLES = require('../helpers/helper_roles');

//Middleware
const auth_middleware = require('../middleware/middleware_auth');
const role_middleware = require('../middleware/middleware_roles');

const router = express.Router();


/**
 * @api {post} /api/user Register a new user
 * @apiName Register User
 * @apiGroup User
 *
 * @apiPermission admin
 * 
 * @apiParam {String} username Users unique username
 * @apiParam {String} password Users unique password
 *
 * @apiSuccess {Object} user        User object
 * @apiSuccess {String} user.username   Username
 * 
 * @apiSuccessExample {json} Success-Response:
     HTTP/1.1 200 OK
     {
         username: "foo"
     }
 */
router.post("/api/user", auth_middleware, role_middleware(ROLES.admin), (req, res, next) => {
    console.log("post /api/user called with params: ", req.body);

    //Verify params
    if(req.body.username === undefined || req.body.password === undefined) {
        next(ResponseHelper.errorResponse(400, "bad input", "username or password missing"));
        return;
    }

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
 * @apiSuccess {String} token Unique authentication token.
 * 
 * @apiSuccessExample {json} Success-Response:
     {
        token: "123456789abcdefghijklmnopqrstuvwxyz"
     }
 */
router.post("/api/login", (req, res, next) => {
    console.log("post /api/login called params: ", req.body);

    AuthManager.authenticateUser(req.body.username, req.body.password)
        .then( (token) => {
            res.json(token);
        }).catch( (reason) => {
            next(reason);
        });
});

/**
 * @api {get} /api/user/:username Get a user by name
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiPermission admin
 * 
 * @apiParam {String} username  Users unique username
 *
 * @apiSuccess {Object} user            User object
 * @apiSuccess {String} user.username   Username
 * @apiSuccess {String} user._id        Unique Id
 * 
 * @apiSuccessExample {json} Success-Response:
     {
         username: "foo",
         _id: "1"
     }
 */
router.get("/api/user/:username", auth_middleware, role_middleware(ROLES.admin), (req, res, next) => {
    console.log("get /api/user/:username called username: ", req.params);

    AuthManager.getUser(req.params.username)
        .then( (user) => {
            res.json(UserHelper.removeSensitiveUserData(user, true));
        }).catch( (reason) => {
            console.log("YO");            
            next(reason);
        });
});

/**
 * @api {get} /api/users Get all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiPermission admin
 * 
 * @apiSuccess {Object[]} users         User object
 * @apiSuccess {String} user.username   Username
 * @apiSuccess {String} user._id        Unique Id
 * 
 * @apiSuccessExample {json} Success-Response:
         [
            {
                username: "foo",
                _id: "1"
            },
            {
                username: "bar",
                _id: "2"
            }

            ..
         ]
 */
router.get("/api/users", auth_middleware, role_middleware(ROLES.admin), (req, res, next) => {
    console.log("get /api/users called");

    AuthManager.getUsers()
        .then( (users) => {
            res.json(UserHelper.removeMultipleSensitiveUserData(users, true));
        }).catch( (reason) => {
            next(reason);
        });
});

router.put("/api/user", auth_middleware, role_middleware(ROLES.admin), (req, res) => {
    console.log("put /api/user called params: ", req.body);
    //NOT IMPLEMENTED
    res.status(501).send({error: "User update isnt implmented yet"});
});

//Delete user
router.delete("/api/user", auth_middleware, role_middleware(ROLES.admin), (req, res) => {
    console.log("delete /api/user called params: ", req.body);
    //NOT IMPLEMENTED
    res.status(501).send({error: "User delete isnt implmented yet"});
});

module.exports = router;