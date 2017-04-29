const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const jwt_config = require('../configs/token_config');
const bcrypt_config = require('../configs/bcrypt_config');
const User = require('../models/model_user');
const ResponseHelper = require('../helpers/helper_response');

const ClientManager = require('./manager_client');

var auth = class AuthorazatitonManager {

    //Generate a token used to save clients
    generateToken() {
        return randomstring.generate();
    }

    //Create, read, update, delete
    createUser(username, password) {
        return new Promise( (resolve, reject) => {
            //Check if user exists first
            this.getUser(username).then( (user) => {
                //User exists, throw error
                reject(ResponseHelper.errorResponse(403, "User by that name already exists"));
            }).catch( (reason) => {
                //This means the user didnt exist, continue if status code is 404
                if(reason.status !== 404) {
                    reject(reason);
                }

                bcrypt.hash(password, bcrypt_config.saltRounds, (err, hash) => {
                    if(err) {
                        console.error(err);
                        reject(ResponseHelper.errorResponse(500, err.name, err.message, err));
                    } else {
                        //Create user
                        const user = new User( { username: username, password: hash } ); 

                        user.save( (err, user) => {
                            if(err) {
                                console.error(err);
                                reject(ResponseHelper.errorResponse(500, err.name));
                            } else {
                                resolve(user);
                            }
                        });
                    }
                });
            });
        });
    }

    //Get a user - flag includePassword true to include password in output
    getUser(username, includePassword) {
        return new Promise( (resolve, reject) => {
            
            User.findOne( { username: username }, (err, user) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else if(!user) {
                    reject(ResponseHelper.errorResponse(404, "User not found"));
                } else {
                    user.password = includePassword ? user.password : '';
                    resolve(user);
                }
            });
        });
    }

    getUserById(id) {
        return new Promise( (resolve, reject) => {
            User.findById(id, (err, user) => {
                if(err) {
                    console.error(err);
                    reject(err);
                } else {
                    if(!user) {
                        reject(ResponseHelper.errorResponse(500, "User by id could not be found"));
                    } else {
                        resolve(user);
                    }
                }
            });
        });
    }

    //Get all users
    getUsers() {
        return new Promise( (resolve, reject) => {

            User.find( (err, users) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else if(users.length === 0) {
                    console.log("No users found");
                    reject(ResponseHelper.errorResponse(501, "No users exist"));
                } else {
                    resolve(users);
                }
            });
        });
    }

    //Update user info
    updateUser(id, params) {
        return new Promise( (resolve, reject) => {

            User.findByIdAndUpdate(id, params, (err, user) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else {
                    resolve(user);
                }
            })
        });
    }

    //Adds a new client by id to user by id
    addClient(id, clientId) {
        return new Promise( (resolve, reject) => {
            console.log("id is: ", id);
            this.getUserById(id).then( (user) =>{

                user.clients.push(clientId);

                user.save( (err, user) => {
                    if(err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }).catch( (reason) => {
                console.error(reason);
                reject(reason);
            });
        })
    }

    //Remove a client by id from user by id
    removeClient(id, clientId) {
        return new Promise( (resolve, reject) => {

            this.getUserById(id).then ( (user) => {

                var index = user.clients.indexOf(userId);

                if(!index) {
                    console.error("ManagerAuth: Client not in array");
                    reject(ResponseHelper.errorResponse(500, "clientId not in array"));
                } else {
                    user.clients.splice(index, 1);

                    user.save( (err, user) => {
                        if(err) {
                            console.error(err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    //Remove user
    removeUser(id) {
        return new Promise( (resolve, reject) => {

            User.findByIdAndRemove(id, (err, user) => {
                if(err) {
                    console.error(err);
                    reject(ResponseHelper.errorResponse(500, err.name));
                } else {
                    resolve(user);
                }
            });
        });
    }

    //Returns a jwt token if authenticated
    authenticateUser(username, password) {
        return new Promise( (resolve, reject) => {
            //Get password from database
            this.getUser(username, true)
                .then( (user) => {
                    //Compare
                    bcrypt.compare(password, user.password, (err, same) => {
                        if(err) {
                            console.error(err);
                            reject(ResponseHelper.errorResponse(500, err.name));
                        } else if(!same) {
                            console.info("Bad password");
                            reject(ResponseHelper.errorResponse(422, "Bad credentials"));
                        } else {
                            //TODO(Nyman): Later we send the role of the user aswell
                            resolve( { token: jwt.sign( 
                                { 
                                    user: user._id
                                }, jwt_config.key) } );
                        }
                    });                
                }).catch( (reason) => {
                    reject(reason);
                }); 
        });
    }



};

module.exports = new auth();