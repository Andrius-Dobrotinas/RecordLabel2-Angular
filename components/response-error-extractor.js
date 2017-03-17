
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

        if (responseObject.data
            && typeof responseObject.data === "string"
            && responseObject.data.length > 0)
        {
            message = responseObject.data;
        }

        if (responseObject.data.message
            && typeof responseObject.data.message === "string"
            && responseObject.data.message.length > 0)
        {
            message = responseObject.data.message;
        }
        if (responseObject.statusText
            && typeof responseObject.statusText === "string"
            && responseObject.statusText.length > 0)
        {
            message = responseObject.statusText;
        }
        if (!message) {
            message = defaultMessage
        }

        return new RecordLabel
            .Error(message, responseObject.status);
    }
};