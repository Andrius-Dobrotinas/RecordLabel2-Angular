"use strict";

(function () {

    angular.module("RecordLabel").factory("responseErrorExtractSvc",
        ["defaultErrorMsg", function(defaultErrorMsg) {

            return new RecordLabel.ResponseErrorExtractor(defaultErrorMsg);

        }])
})();