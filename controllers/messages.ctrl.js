"use strict";

(function() {

    angular.module("RecordLabel").controller("MessagesCtrl", ["errorMessageSvc", function(errorMessageSvc) {
        var ctrl = this;

        ctrl.getErrors = function () {
            return errorMessageSvc.getErrors();
        };

    }]);
})();