"use strict";

(function() {

    angular.module("RecordLabel").controller("ReleaseImagesCtrl", ["$routeParams", "errorMessageSvc",
        "filePostSvc", "imagesUploadUrl",
        function ReleaseImagesCtrl($routeParams, errorMessageSvc, filePostSvc, imagesUploadUrl) {
            var ctrl = this;
            var id = $routeParams.id;

            ctrl.filesToUpload = [];

            var uploadMode = false;

            ctrl.isUploadMode = function() {
                return uploadMode;
            };

            ctrl.changeMode = function(upload) {
                uploadMode = upload;
            };

            ctrl.anyFilesAdded = function() {
                // TODO: It should check if any files have actually been selected
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
                    function(data) {
                        // TODO

                    },
                    function(data) {
                        // TODO

                    });
            };
    }]);
})();