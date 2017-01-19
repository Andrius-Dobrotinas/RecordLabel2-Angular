"use strict";

(function () {

    angular.module("RecordLabel").factory("resourceErrorHandler", ["errorMessageSvc", function (errorMessageSvc) {
        return function (promise) {
            promise.$promise.catch(function (e) {
                if (!e.statusText) {
                    e.statusText = "An error has been encountered while making a request to server";
                }
                errorMessageSvc.addError(e);
            });
            return promise;
        };
    }]);

})();