"use strict";

(function () {

    angular.module("RecordLabel").factory("resourcePostSvc", ["$location", "errorMessageSvc", "infoMsgSvc",
        function ($location, errorMessageSvc, infoMsgSvc) {

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
                        if (!e.statusText) {
                            e.statusText = "An error has been encountered while making a request to server";
                        }
                        errorMessageSvc.addError(e);
                    }
                });

                return promise;
            }
        }]);

})();