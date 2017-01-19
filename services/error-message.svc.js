"use strict";

(function () {

    angular.module("RecordLabel").factory("errorMessageSvc", ["$rootScope", function ($rootScope) {
        var errors = [];

        var clearErrors = function() {
            errors.length = 0;
        };

        $rootScope.$on("$locationChangeStart", function (event) {
            // Reset errors on location change but only if the action has not been cancelled by someone else
            if (event.defaultPrevented) {
                return;
            }
            clearErrors();
        });

        return {
            addError: function(error) {
                errors.push(error);
            },
            getErrors: function () {
                return errors;
            },
            clearErrors: clearErrors
        }
    }]);

})();