
var RecordLabel = {};

/**
 * Creates a new Error.
 * @class
 * @param {string} statusText error description
 * @param {int} status http error code
 */
RecordLabel.Error = function(statusText, status) {
    this.statusText = statusText;
    this.status = status;
};