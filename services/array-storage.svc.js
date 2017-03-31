"use strict";

(function() {

    /**
     *  Used for sharing arrays between controllers, optionally tying their lifetime with
     *  lifetime of a scope
     */
    angular.module("RecordLabel").factory("arrayStorageSvc", function() {

        return new RecordLabel.StorageInstanceManager(RecordLabel.ArrayStorage);

    });

})();