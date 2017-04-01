
var RecordLabel = RecordLabel || {};

/**
 * Simply creates a new instance
 * @constructor
 * @classdesc A simple key-value store
 */
RecordLabel.KeyValueStore = function() {
    var values = {};

    /**
     * Gets value that corresponds to the key
     * @returns {object}
     */
    this.get = function(key) {
        return values[key];
    };

    /**
     * Puts value in storage
     * @param key
     * @param value
     */
    this.putValue = function(key, value) {
        values[key] = value;
    };

    /**
     * Clears the store
     */
    this.reset = function() {
        values = {};
    };
};