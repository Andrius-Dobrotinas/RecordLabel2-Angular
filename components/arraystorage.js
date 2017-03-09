
var RecordLabel = RecordLabel || {};

/**
 * Simply creates a new instance
 * @constructor
 * @classdesc Encapsulates an array and provides a way to manage it
 * in a simpler way
 */
RecordLabel.ArrayStorage = function() {
    var array = [];

    /**
     * Gets all items from the underlying array
     * @returns {Array}
     */
    this.getAll = function() {
        return array;
    };

    /**
     * Adds an array of items to the underlying array
     * @param entries
     */
    this.addArray = function(entries) {
        if (entries instanceof Array) {
            array = array.concat(entries);
        }
    };

    /**
     * Removes all items from the array
     */
    this.reset = function() {
        array.length = 0;
    };
};