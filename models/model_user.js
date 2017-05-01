const mongoose = require('mongoose');
const ROLES = require('../helpers/helper_roles');

var user = mongoose.Schema(
    {
        //name of client
        username: { type: String },
        //password
        password: { type: String},
        //email?
        //role?
        role: { type: Number, default: ROLES.user },
        //clients
        clients : [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
        ]
    }
);

module.exports = mongoose.model("User", user);