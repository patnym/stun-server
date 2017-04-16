//Client model
const Client = require('../models/model_client');

var climan = class ClientManager {

    /**
     * Create
     * Read
     * Update
     * Delete
     */

    //add client
    createClient(name, token) {
        console.info("Calling create client");

        return new Promise( (resolve, reject) => {
            //Create client
            var client = new Client( { auth: token, name: name } );

            client.save( (err, client) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(client);
                }
            });
        });
    }

    //get client
    getClientById(id) {

    }

    getClientByName(name) {

    } 

    //get clients
    getClients() {

    }

    //update client
    updateClientById(id, params) {

    }

    //delete client
    deleteClientById(id) {

    }

}

module.exports = new climan();