const mongoose = require('mongoose');


var user = mongoose.Schema(
    {
        //name of client
        username: { type: String },
        //password
        password: { type: String},
        //email?
        //role?

        //clients
        clients : [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
        ]
    }
);

module.exports = mongoose.model("User", user);