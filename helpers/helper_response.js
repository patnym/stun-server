
var responses = class ResponseHelper {

    jsonResponse(message, error, payload) {
        return { message: message || '', error: error || '' , payload: payload || ''};
    }

    jsonMessage(message) {
        return this.jsonResponse(message);
    }

    jsonError(error) {
        return this.jsonResponse(null, error);
    }

    jsonPayload(payload, message) {
        return this.jsonResponse(message, null, payload);
    }

    //Internal error response
    errorResponse(status, name, message) {
        return { status: status, name: name, message: message || ''};
    }
}

module.exports = new responses;