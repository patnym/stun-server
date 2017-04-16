const mongoose = require('mongoose');


var client = mongoose.Schema(
    {
        //auth_token
        auth: { type: String },
        //name of client
        name: { type: String },
        //ip
        ip: { type: String, default: "0.0.0.0" },
        //port
        port: { type: String, default: "0000"}
    }
);

module.exports = mongoose.model("Client", client);