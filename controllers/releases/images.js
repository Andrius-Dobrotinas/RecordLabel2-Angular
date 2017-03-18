"use strict";

(function() {

    angular.module("RecordLabel").controller("ReleaseImagesCtrl",
        ["$routeParams", "errorMessageSvc", "responseErrorExtractSvc",
            "filePostSvc", "imagesUploadUrl", "storageSvc", "$http", "setCoverUrl",
        function ReleaseImagesCtrl($routeParams, errorMessageSvc,
               responseErrorExtractSvc, filePostSvc, imagesUploadUrl,
               storageSvc, $http, setCoverUrl)
        {
            var ctrl = this;
            var id = $routeParams.id;
            var uploadMode = false;

            ctrl.filesToUpload = [];

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
                        // TODO: make sure Spring's "file too large" exception is handled properly
                        errorMessageSvc.addError(
                            responseErrorExtractSvc.getError(response));
                    });
            };

            ctrl.deleteImage = function(id) {
                if (confirm("Do you really want to delete this image?")) {
                    // TODO
                }
            };

            /**
             * Shows confirmation dialog asking if image should be set as cover and,
             * in case of positive answer, calls ctrl.setAsCover
             * @param img
             */
            ctrl.setAsCoverWithQuestion = function(img) {
                if (confirm("Do you want to set this image as cover fror this item?")) {
                    ctrl.setAsCover(img);
                }
            };

            // TODO: set this to current cover value (if any)
            ctrl.currentCoverId = undefined;

            /**
             * Simply posts a request to set image as cover for the current object
             * @param img
             */
            ctrl.setAsCover = function(img) {
                errorMessageSvc.clearErrors();

                $http
                    .post(setCoverUrl
                        // TODO: post object and image ids:
                        // + "?objectId=" + id + "&imageId=" + img.id /*, {
                      /*  objectId: +id,
                        imageId: img.id
                    }, {
                        //transformRequest: angular.identity,
                        headers: { 'Content-Type': "application/x-www-form-urlencoded" }
                    }*/)
                    .then(function() {
                        ctrl.currentCoverId = img.id;
                    })
                    .catch(function(e) {
                        errorMessageSvc.addError(
                            responseErrorExtractSvc.getError(e));
                    });
            };
    }]);
})();