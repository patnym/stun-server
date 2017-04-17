const mongoose = require('mongoose');


var user = mongoose.Schema(
    {
        //name of client
        username: { type: String },
        //password
        password: { type: String}
        //email?
        //role?
    }
);

module.exports = mongoose.model("User", user);