const express = require('express');
const router = {};
router.unauthorizedRoute = express.Router(); //All routes that require no authorization
router.authorizedRoute = express.Router(); //All routes that require authorization

//Managers
const Auth = require('../managers/manager_auth');
const ClientManager = require('../managers/manager_client');

//Helpers
const ResponseHelper = require('../helpers/helper_response');

//Client model
const Client = require('../models/model_client');


/**
 * @api {post} /api/client?token=:token Register a new client
 * @apiName RegisterClient
 * @apiGroup Client
 *
 * @apiPermission admin
 * 
 * @apiParam {String} name      Client name
 * @apiParam {String} token     Authentication token
 * 
 * @apiSuccess {Object} client         Client object
 * @apiSuccess {String} client._id     Unique Id
 * @apiSuccess {String} client.auth    Unique identifier token
 * @apiSuccess {String} client.name    Client name
 * @apiSuccess {String} client.port    Client port
 * @apiSuccess {String} client.ip      Client ip
 * 
 * @apiSuccessExample {json} Success-Response:
     {
        auth: "YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r",
        name: "foobar",
        _id: "58fb78b60446283b97c3d6fe",
        port: "0000",
        ip: "0.0.0.0"
     }
 */
router.authorizedRoute.post("/api/client", (req, res, next) => {
    console.log("/api/register called name: ", req.body.name);      

    if(req.body.name === undefined) {
        next(ResponseHelper.errorResponse(400, "bad params", "name missing"));
        return;
    }

    ClientManager.createClient(req.body.name, Auth.generateToken())
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {
            next(reason);
        });
});

/**
 * @api {put} /api/client?token=:token Update an existing client
 * @apiName UpdateClient
 * @apiGroup Client
 *
 * @apiPermission admin
 * 
 * @apiParam {String} name      Client name
 * @apiParam {String} ip        Client ip
 * @apiParam {String} port      Client port
 * @apiParam {String} token     Authentication token
 * 
 * @apiSuccess {Object} client         Client object
 * @apiSuccess {String} client._id     Unique Id
 * @apiSuccess {String} client.auth    Unique identifier token
 * @apiSuccess {String} client.name    Client name
 * @apiSuccess {String} client.port    Port to connec to this client
 * @apiSuccess {String} client.ip      Ip of this client
 * 
 * @apiSuccessExample {json} Success-Response:
     {
        auth: "YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r",
        name: "foobar",
        _id: "58fb78b60446283b97c3d6fe",
        port: "0000",
        ip: "0.0.0.0"
     }
 */
router.authorizedRoute.put("/api/client", (req, res, next) => {
    console.log("/api/ping called with body: ", req.body);

    ClientManager.updateClientById(req.body.id,
        {   name: req.body.name,
            ip: req.body.ip,
            port: req.body.port })
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {
            next(reason);
        });
});

/**
 * @api {get} /api/client/:id?token=:token Get client by id
 * @apiName GetClient
 * @apiGroup Client
 *
 * @apiPermission admin
 * 
 * @apiParam {String} id        Unique Id
 * @apiParam {String} token     Authentication token
 * 
 * @apiSuccess {Object} client         Client object
 * @apiSuccess {String} client._id     Unique Id
 * @apiSuccess {String} client.auth    Unique identifier token
 * @apiSuccess {String} client.name    Client name
 * @apiSuccess {String} client.port    Port to connec to this client
 * @apiSuccess {String} client.ip      Ip of this client
 * 
 * @apiSuccessExample {json} Success-Response:
     {
        auth: "YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r",
        name: "foobar",
        _id: "58fb78b60446283b97c3d6fe",
        port: "0000",
        ip: "0.0.0.0"
     }
 */
router.authorizedRoute.get("/api/client/:id", (req, res, next) => {
    console.log("/api/client/id/:id called id: ", req.params.id);

    ClientManager.getClientById(req.params.id)
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {
            next(reason);
        });
});

/**
 * @api {get} /api/clients?token=:token Get all clients
 * @apiName GetClients
 * @apiGroup Client
 *
 * @apiPermission admin
 * 
 * @apiParam {String} token     Authentication token
 * 
 * @apiSuccess {Object[]} clients      Array of Client objects
 * @apiSuccess {String} client._id     Unique Id
 * @apiSuccess {String} client.auth    Unique identifier token
 * @apiSuccess {String} client.name    Client name
 * @apiSuccess {String} client.port    Port to connec to this client
 * @apiSuccess {String} client.ip      Ip of this client
 * 
 * @apiSuccessExample {json} Success-Response:
     [  
        {
            auth: "YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r",
            name: "foo",
            _id: "58fb78b60446283b97c3d6fe",
            port: "0000",
            ip: "0.0.0.0"
        },
        {
            auth: "57ajPqrDGVDRUD4rYYInLOPOQJnQNNSp",
            name: "bar",
            _id: "46283b97c3d6fe58fb78b604",
            port: "1111",
            ip: "8.8.8.8"
        }

        ..
     ]
 */
router.authorizedRoute.get("/api/clients", (req, res, next) => {
    console.log("/api/getclients called");

    ClientManager.getClients()
    .then( (clients) => {
        res.json(clients);
    }).catch( (reason) => {
        next(reason);
    });

});

/**
 * @api {delete} /api/client?token=:token Delete a client
 * @apiName DeleteClient
 * @apiGroup Client
 *
 * @apiPermission admin
 * 
 * @apiParam {String} id        Unique Id
 * @apiParam {String} token     Authentication token
 * 
 * @apiSuccess {Object[]} client       Client object
 * @apiSuccess {String} client._id     Unique Id
 * @apiSuccess {String} client.auth    Unique identifier token
 * @apiSuccess {String} client.name    Client name
 * @apiSuccess {String} client.port    Port to connec to this client
 * @apiSuccess {String} client.ip      Ip of this client
 * 
 * @apiSuccessExample {json} Success-Response:
    {
        auth: "YYInLOPOQJnQNNSp57ajPqrDGVDRUD4r",
        name: "foo",
        _id: "58fb78b60446283b97c3d6fe",
        port: "0000",
        ip: "0.0.0.0"
    }
 */
router.authorizedRoute.delete("/api/client/:id", (req, res, next) => {
    console.log("/api/deleteclient/id/:id called id: ", req.params.id);

    ClientManager.deleteClientById(req.params.id)
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {send
            next(reason);
        });
});

/**
 * @api {delete} /api/client?token=:token Ping end-point
 * @apiName PingClient
 * @apiGroup Client
 *
 * @apiPermission client
 * 
 * @apiParam {String} token     Unique client based authentication token
 * 
 * @@apiSuccess {Number} status Status code
 * 
 * @apiSuccessExample {json} Success-Response:
     {
         status: 200
     } 
 */
router.unauthorizedRoute.post("/api/ping", (req, res, next) => {
    console.log("/api/ping/:id/:token called params: ", req.body);

    //Validate token


    //Update
    ClientManager.updateClientById(req.body.id,
        {   ip: req.body.ip })
        .then( (client) => {
            res.send({ status: 200 });
        }).catch( (reason) => {
            next(reason);
        });
});

module.exports = router;