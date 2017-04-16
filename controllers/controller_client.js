const express = require('express');
const router = express.Router();

//Managers
const Auth = require('../managers/manager_auth');
const ClientManager = require('../managers/manager_client');

//Helpers
const ResponseHelper = require('../helpers/helper_response');

//Client model
const Client = require('../models/model_client');


//Register path - Will create a new client and save to allow future pings
router.post("/api/client", (req, res) => {
    console.log("/api/register called name: ", req.body.name);  
    ClientManager.createClient(req.body.name, Auth.generateToken())
        .then( (client) => {
            res.send(ResponseHelper.jsonResponse(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonResponse(null, reason.name));
        });
});

//Ping path - Will ping with a token and save the new ip
router.put("/api/client", (req, res) => {
    console.log("/api/ping called with body: ", req.body);

    //TODO: Add authentication step before this, make it middleware instead??

    ClientManager.updateClientById(req.body.id,
        {   name: req.body.name,
            ip: req.body.ip,
            port: req.body.port })
        .then( (client) => {
            res.send(ResponseHelper.jsonResponse(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonResponse(null, reason.name));
        });
});

//Get client by id path
router.get("/api/client/:id", (req, res) => {
    console.log("/api/client/id/:id called id: ", req.params.id);
    ClientManager.getClientById(req.params.id)
        .then( (client) => {
            res.send(ResponseHelper.jsonResponse(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonResponse(null, reason.name));
        });
});

//Get clients path
router.get("/api/clients", (req, res) => {
    console.log("/api/getclients called");

    ClientManager.getClients()
    .then( (clients) => {
        res.send(ResponseHelper.jsonResponse( { clients: clients } ));
    }).catch( (reason) => {
        res.status(reason.status).send(ResponseHelper.jsonResponse(null,  reason.name));
    });

});

//Delete client by id
router.delete("/api/client/:id", (req, res) => {
    console.log("/api/deleteclient/id/:id called id: ", req.params.id);

    ClientManager.deleteClientById(req.params.id)
        .then( (client) => {
            res.send(ResponseHelper.jsonResponse(client));
        }).catch( (reason) => {
            res.status(reason.status).send(ResponseHelper.jsonResponse(null, reason.name));
        });
});

module.exports = router;