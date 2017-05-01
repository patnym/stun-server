const jwt = require('jsonwebtoken');
const jwt_config = require('../configs/token_config');

//Middleware token validation
var auth_middleware = (req, res, next) => {
    console.log("middleware used");
    //Get Authorization header
    const header = req.get('authorization');
    if(!header) {
        next(ResponseHelper.errorResponse(400, "Missing authorization header"));
        return;
    }

    //Extract token and type
    const params = header.split(" ");
    //Handle bearer
    if(params[0].toLowerCase() == "bearer") {
        
        const token = params[1];

        if(token){
            try {
                jwt.verify(token, jwt_config.key, (err, decoded) => {
                    if(err) {
                        next(err);
                        return;
                    }

                    console.log("Auth granted payload is: " , decoded);
                    req.user = decoded.user;
                    req.role = decoded.role;
                    console.log(req.user);
                    next();
                });
            } catch (err) {
                next(err);
            }
        } else {
            next(ResponseHelper.errorResponse(400, "No token in request"));
        }
    } else {
        next(ResponseHelper.errorResponse(400, "Only handles Bearer type authorization header"));
    }

}

module.exports = auth_middleware;