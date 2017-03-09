"use strict";

(function() {

    /**
     *  Used for storing data while, optionally tying its lifetime with
     *  lifetime of a scope
     */
    angular.module("RecordLabel").factory("storageSvc", function() {

        var instances = {};

        /**
         * Creates instances of storage whose lifetime is optionally tied to
         * a specific scope.
         * @param {string|integer} id unique store id
         * @param {ng-scope=} scope scope object to whose lifetime this store is to be tied.
         * If scope is specified, the will be destroyed on scope destruction.
         */
        var getInstance = function(id, scope) {
            if (!instances[id]) {
                instances[id] = new RecordLabel.ArrayStorage();
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
        var instanceExists = function(id) {
            return instances[id] != undefined;
        };

        return {
            get: getInstance,
            exists: instanceExists
        };
    });

})();