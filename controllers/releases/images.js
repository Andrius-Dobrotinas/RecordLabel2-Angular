"use strict";

(function() {

    angular.module("RecordLabel").controller("ReleaseImagesCtrl", ["$routeParams", "errorMessageSvc",
        "filePostSvc", "imagesUploadUrl", "storageSvc",
        function ReleaseImagesCtrl($routeParams, errorMessageSvc, filePostSvc, imagesUploadUrl, storageSvc) {
            var ctrl = this;
            var id = $routeParams.id;
            var uploadMode = false;

            ctrl.filesToUpload = [];

            // TODO: replace ctrl.images with this storage thing
            var imgStore = storageSvc.get(id);
            ctrl.getImages = function() {
                return imgStore.getAll();
            };

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
                        imgStore.addArray(response.data);
                        ctrl.changeMode(false);
                        ctrl.filesToUpload.length = 0;
                    },
                    function(response) {
                        // TODO: implement proper extraction of error message from response
                        // particularly, Spring's "file too large" exception won't get handled
                        // properly here
                        errorMessageSvc.addError(
                            new RecordLabel.Error(response.data.message, response.status));
                    });
            };
    }]);
})();