
var RecordLabel = RecordLabel || {};

/**
 * Simply creates a new instance
 * @constructor
 * @classdesc creates, stores and manages instances of the supplied function/object
 */
RecordLabel.StorageManager = function(newInstanceFunction) {

    var instances = [];

    /**
     * Creates instances of storage whose lifetime is optionally tied to
     * a specific scope.
     * @param {string|integer} id unique store id
     * @param {ng-scope=} scope scope object to whose lifetime this store is to be tied.
     * If scope is specified, the will be destroyed on scope destruction.
     */
    this.get = function(id, scope) {
        if (!instances[id]) {
            instances[id] = new newInstanceFunction();
        }

        // Delete instance on scope destruction
        if (scope) {
            scope.$on("$destroy", function() {
                instances[id] = undefined;
            });
        }

        return instances[id];
    };

    /**
     * Checks if an instance with a given Id exists
     * @param id id of an instance
     * @returns {boolean}
     */
    this.exists = function(id) {
        return instances[id] != undefined;
    };
};