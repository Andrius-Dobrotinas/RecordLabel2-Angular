
var RecordLabel = RecordLabel || {};

/**
 * Creates a new Error.
 * @constructor
 * @classdesc represents an error with status text and, optionally, status code
 * @param {string} statusText error description
 * @param {int=} status http error code
 */
RecordLabel.Error = function(statusText, statusCode) {
    this.statusText = statusText;
    this.status = statusCode;
};