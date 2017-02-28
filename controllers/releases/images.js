"use strict";

(function() {

    angular.module("RecordLabel").controller("ReleaseImagesCtrl", ["$routeParams", "errorMessageSvc",
        "filePostSvc", "imagesUploadUrl",
        function ReleaseImagesCtrl($routeParams, errorMessageSvc, filePostSvc, imagesUploadUrl) {
            var ctrl = this;
            var id = $routeParams.id;

            ctrl.filesToUpload = [];
            ctrl.images = [];

            var uploadMode = false;

            ctrl.isUploadMode = function() {
                return uploadMode;
            };

            ctrl.changeMode = function(upload) {
                uploadMode = upload;
            };

            ctrl.anyFilesAdded = function() {
                // TODO: It should check whether any files have actually been selected
                return ctrl.filesToUpload.length > 0;
            };

            ctrl.addFile = function() {
                ctrl.filesToUpload.push({
                    file: undefined,
                });
            };

            ctrl.uploadFiles = function() {
                errorMessageSvc.clearErrors();
                var url = imagesUploadUrl + id;

                filePostSvc.post(ctrl.filesToUpload, url,
                    function(response) {
                        ctrl.images = ctrl.images.concat(response.data);
                        ctrl.changeMode(false);
                    },
                    function(response) {
                        /* TODO: implement proper extraction of error message from response
                         particularly, Spring's "file too large" exception won't get handled
                         properly here */
                        errorMessageSvc.addError(
                            new RecordLabel.Error(response.data.message, response.status));
                    });
            };
    }]);
})();