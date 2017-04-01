"use strict";

(function() {

    /**
     * Used for sharing simple values between controllers, optionally tying
     * their lifetime with lifetime of a scope
     */
    angular.module("RecordLabel").factory("keyValueStorageSvc", function() {
        return new RecordLabel.StorageManager(RecordLabel.KeyValueStore);
    });

})();