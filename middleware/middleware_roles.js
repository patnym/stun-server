const ResponseHelper = require('../helpers/helper_response');

var role_middleware = (role) => {
  return role_middleware[role] || (role_middleware[role] = (req, res, next) => {
    if(req.role >= role) {
        next();
    } else {
        next(ResponseHelper.errorResponse(401, "Role mismatch", "User need higher permission"));
    }
  })
}

module.exports = role_middleware;