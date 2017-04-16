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
//Later this should be placed in a queue
router.post("/api/client", (req, res) => {
    console.log("/api/register called name: ", req.body.name);  
    ClientManager.createClient(req.body.name, Auth.generateToken())
        .then( (client) => {
            res.send(ResponseHelper.jsonResponse(client));
        }).catch( (reason) => {
            res.status(500).send(Responsees.jsonResponse(null, reason));
        });
});

//Ping path - Will ping with a token and save the new ip
//Arguements 
//token
//ip
//port
router.put("/api/client", (req, res) => {
    console.log("/api/ping called ")
});

//Get client by id path
router.get("/api/client/:id", (req, res) => {
    console.log("/api/client/id/:id called id: ", req.params.id);
    ClientManager.getClientById(req.params.id)
        .then( (client) => {
            res.send(ResponseHelper.jsonResponse(client));
        }).catch( (reason) => {
            console.error(reason);
            res.status(reason.status).send(ResponseHelper.jsonResponse(null, reason.name));
        });
});

//Get clients path
router.get("/api/getclients", (req, res) => {
    console.log("/api/getclients called");

    Client.find( (err, clients) => {
        if(err) {
            res.status(500).send(err);
            return console.error(err);
        } else if( clients.length === 0) {
            res.status(500).send( { message: "No clients exists" } );
            return console.warn("No clients exists");
        }

        res.send( { clients: clients } );
    });
});

//Delete client by id
router.delete("/api/deleteclient/id/:id", (req, res) => {
    console.log("/api/deleteclient/id/:id called id: ", req.params.id);

    Client.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log("Hello");
        if(err) {
            res.status(500).send(err);
            return console.error(err);
        }
        console.log(doc.name + " has been removed");
        res.send(doc);
    });
});


module.exports = router;