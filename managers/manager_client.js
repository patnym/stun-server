//Client model
const Client = require('../models/model_client');

//Helpers
const ResponseHelper = require('../helpers/helper_response');

//Managesr
const AuthManager = require('./manager_auth');

var climan = class ClientManager {

    //Add client
    createClient(name, token, userId) {
        return new Promise( (resolve, reject) => {

            var client = new Client( { auth: token, name: name } );

            client.save( (err, client) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else {
                    resolve(client);                    
                }
            });
        });
    }

    //get client
    getClientById(id) {
        return new Promise( (resolve, reject) => {

            Client.findById(id, (err, client) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else if(!client) {
                    reject(ResponseHelper.errorResponse(404, "No clients matches input id"));
                } else {
                    resolve(client);
                }
            });
        });
    }

    //get clients
    getClients() {
        return new Promise( (resolve, reject) => {

            Client.find( (err, clients) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else if(clients.length == 0) {
                    reject(ResponseHelper.errorResponse(404, "No client exists"));
                } else {
                    resolve(clients);
                }
            });
        });
    }

    //update client
    updateClientById(id, params) {
        return new Promise( (resolve, reject) => {
            
            this.getClientById(id).then( (client) => {
                
                client.name = params.name || client.name;
                client.ip = params.ip || client.ip;
                client.port = params.port || client.port;

                client.save( (err, client) => {
                    if(err) {
                        console.error(err);
                        reject(ResponseHelper.errorResponse(500, err.name));
                    } else {
                        resolve(client);
                    }
                });
            }).catch( (reason) => {
                reject(reason);
            })
        });
    }

    //delete client
    deleteClientById(id) {
        return new Promise( (resolve, reject) => {

            Client.findByIdAndRemove(id, (err, client) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else {
                    resolve(client);
                }
            });
        });
    }

}

module.exports = new climan();