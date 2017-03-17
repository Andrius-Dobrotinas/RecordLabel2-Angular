"use strict";

(function () {

    angular.module("RecordLabel")
        .factory("resourceErrorHandler",
            ["responseErrorExtractSvc", "errorMessageSvc",
                function (responseErrorExtractSvc, errorMessageSvc)
            {
                return function (promise) {
                    promise.$promise.catch(function (e) {
                        errorMessageSvc.addError(
                            responseErrorExtractSvc.getError(e));
                    });
                    return promise;
                };
            }]);

})();