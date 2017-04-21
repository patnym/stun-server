
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

    errorResponse(status, name, message, err) {
        return { status: status, name: name, message: message || '', err: err || '' };
    }
}

module.exports = new responses;