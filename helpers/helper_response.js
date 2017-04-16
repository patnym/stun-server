
var responses = class ResponseHelper {

    jsonResponse(message, error) {
        return { message: message || '', error: error || '' };
    }

    errorResponse(status, name, message) {
        return { status: status, name: name, message: message || ''};
    }
}

module.exports = new responses;