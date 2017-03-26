
var RecordLabel = RecordLabel || {};

/**
 * Creates a new instance of this class with default error message
 * @constructor
 * @classdesc extracts an error from http response object
 * @param defaultMessage {string} message to be displayed in cases
 * when response does not contain a message
 */
RecordLabel.ResponseErrorExtractor = function(defaultMessage) {
    var defaultMsg = defaultMessage;

    this.getError = function(responseObject) {
        var message = defaultMsg;

        if (responseObject.data) {
            if (typeof responseObject.data === "string") {
                if (responseObject.data.length > 0) {
                    message = responseObject.data;
                }
            }
            else if (responseObject.data.message
                && typeof responseObject.data.message === "string"
                && responseObject.data.message.length > 0) {
                message = responseObject.data.message;
            }
        }
        else if (responseObject.statusText
            && typeof responseObject.statusText === "string"
            && responseObject.statusText.length > 0) {
            message = responseObject.statusText;
        }

        if (!message) {
            message = defaultMessage
        }

        return new RecordLabel
            .Error(message, responseObject.status);
    }
};