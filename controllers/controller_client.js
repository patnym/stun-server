const express = require('express');
const router = express.Router();

//Managers
const Auth = require('../managers/manager_auth');
const ClientManager = require('../managers/manager_client');

//Client model
const Client = require('../models/model_client');


//Register path - Will create a new client and save to allow future pings
//Later this should be placed in a queue
router.post("/api/register", (req, res) => {
    console.log("/api/register called name: ", req.body.name);

    ClientManager.createClient(req.body.name, Auth.generateToken())
        .then( (client) => {
            console.log("Successfully created client", client);
            res.send( { token: client.auth } );
        }).catch( (reason) => {
            console.error(reason);
            res.status(500).send(reason);
        });
});

//Ping path - Will ping with a token and save the new ip
//Arguements 
//token
//ip
//port
router.put("/api/ping", (req, res) => {
    console.log("/api/ping called ")
});

//Get client by id path
router.get("/api/getclient/id/:id", (req, res) => {
    console.log("/api/getclient/id/:id called id: ", req.params.id);

    Client.find({ _id: req.params.id }, (err, client) => {
        if(err) {
            res.status(500).send(err);
            return console.error(err);
        } else if( client.length === 0) {
            res.status(500).send( { message: "Client not found" } );
            return console.warn("Client not found");
        }

        console.log("Client found");
        res.send( { client: client[0] } );
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

//Get client by name path - Used for debugging purposes atm
router.get("/api/getclient/name/:name", (req, res) => {
    console.log("/api/getclient/name called name: ", req.params.name);

    Client.find({ name: req.params.name }, (err, client) => {
        if(err) {
            res.status(500).send(err);
            return console.error(err);
        } else if( client.length === 0) {
            res.status(500).send( { message: "Client not found" } );
            return console.warn("Client not found");
        }

        console.log("Client found");
        res.send( { client: client[0] } );
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