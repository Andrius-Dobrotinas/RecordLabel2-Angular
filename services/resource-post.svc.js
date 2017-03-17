"use strict";

(function () {

    angular.module("RecordLabel")
        .factory("resourcePostSvc",
            ["$location", "errorMessageSvc", "infoMsgSvc", "responseErrorExtractSvc",
        function ($location, errorMessageSvc, infoMsgSvc, responseErrorExtractSvc) {

            return function (promise, redirectTo, errorArray) {
                promise.$promise.then(function () {
                    infoMsgSvc.setMessage("Successfully saved!");
                    $location.url(redirectTo);
                })
                .catch(function (e) {
                    if (e.data && e.data.modelState) {
                        for (let field in e.data.modelState) {
                            e.data.modelState[field].forEach(function (error) {
                                errorArray.push({ field: field, error: error });
                                console.log(field, error);
                            });
                        }
                    } else {
                        errorMessageSvc.addError(
                            responseErrorExtractSvc.getError(e));
                    }
                });

                return promise;
            }
        }]);

})();