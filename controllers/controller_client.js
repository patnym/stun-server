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


//Create a new client
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

//Update path
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

//Get client by id path
router.authorizedRoute.get("/api/client/:id", (req, res, next) => {
    console.log("/api/client/id/:id called id: ", req.params.id);

    ClientManager.getClientById(req.params.id)
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {
            next(reason);
        });
});

//Get clients path
router.authorizedRoute.get("/api/clients", (req, res, next) => {
    console.log("/api/getclients called");

    ClientManager.getClients()
    .then( (clients) => {
        res.json(clients);
    }).catch( (reason) => {
        next(reason);
    });

});

//Delete client by id
router.authorizedRoute.delete("/api/client/:id", (req, res, next) => {
    console.log("/api/deleteclient/id/:id called id: ", req.params.id);

    ClientManager.deleteClientById(req.params.id)
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {send
            next(reason);
        });
});

//Ping route, this is where clients ping to register new IP's
router.unauthorizedRoute.post("/api/ping", (req, res, next) => {
    console.log("/api/ping/:id/:token called params: ", req.body);

    //Validate token


    //Update
    ClientManager.updateClientById(req.body.id,
        {   ip: req.body.ip })
        .then( (client) => {
            res.json(client);
        }).catch( (reason) => {
            next(reason);
        });
});

module.exports = router;