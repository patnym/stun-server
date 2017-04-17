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
router.authorizedRoute.post("/api/client", (req, res) => {
    console.log("/api/register called name: ", req.body.name);  
    ClientManager.createClient(req.body.name, Auth.generateToken())
        .then( (client) => {
            res.send(ResponseHelper.jsonPayload(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Update path
router.authorizedRoute.put("/api/client", (req, res) => {
    console.log("/api/ping called with body: ", req.body);

    ClientManager.updateClientById(req.body.id,
        {   name: req.body.name,
            ip: req.body.ip,
            port: req.body.port })
        .then( (client) => {
            res.send(ResponseHelper.jsonPayload(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Get client by id path
router.authorizedRoute.get("/api/client/:id", (req, res) => {
    console.log("/api/client/id/:id called id: ", req.params.id);
    ClientManager.getClientById(req.params.id)
        .then( (client) => {
            res.send(ResponseHelper.jsonPayload(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Get clients path
router.authorizedRoute.get("/api/clients", (req, res) => {
    console.log("/api/getclients called");

    ClientManager.getClients()
    .then( (clients) => {
        res.send(ResponseHelper.jsonPayload(clients));
    }).catch( (reason) => {
        res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
    });

});

//Delete client by id
router.authorizedRoute.delete("/api/client/:id", (req, res) => {
    console.log("/api/deleteclient/id/:id called id: ", req.params.id);

    ClientManager.deleteClientById(req.params.id)
        .then( (client) => {
            res.send(ResponseHelper.jsonPayload(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

//Ping route, this is where clients ping to register new IP's
router.unauthorizedRoute.post("/api/ping", (req, res) => {
    console.log("/api/ping/:id/:token called params: ", req.body);

    //Validate token


    //Update
    ClientManager.updateClientById(req.body.id,
        {   ip: req.body.ip })
        .then( (client) => {
            res.send(ResponseHelper.jsonPayload(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonError(reason.name));
        });
});

module.exports = router;