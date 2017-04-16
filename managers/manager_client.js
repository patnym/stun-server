//Client model
const Client = require('../models/model_client');

//Helpers
const ResponseHelper = require('../helpers/helper_response');

var climan = class ClientManager {

    /**
     * Create
     * Read
     * Update
     * Delete
     */

    //Add client
    createClient(name, token) {
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
        return new Promise( (resolve, reject) => {

            Client.findById(id, (err, res) => {
                if(err) {
                    err.status = 500;
                    reject(err);
                } else if(!res) {
                    var response = ResponseHelper.errorResponse(404, "No client matches input id");
                    reject(response);
                } else {
                    resolve(res);
                }
            });

        });
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