"use strict";

(function () {

    angular.module("RecordLabel").controller("ReleaseEditCtrl",
        ["$scope", "$routeParams", "releasesService", "artistsService", "mediaTypesService",
            "constantsService", "resourceErrorHandler", "resourcePostSvc",
            "formValidationService", "errorMessageSvc", "arrayStorageSvc", "imagesResource",
        function ReleaseEditCtrl($scope, $routeParams, releasesService, artistsService,
                                 mediaTypesService, constantsService, resourceErrorHandler,
                                 resourcePostSvc, formValidationService, errorMessageSvc,
                                 arrayStorageSvc, imagesResource) {
            var ctrl = this;
            var id = $routeParams.id;
            ctrl.isNew = id ? false : true;

            $scope.model;

            $scope.validationErrors = [];
            $scope.constants = resourceErrorHandler(constantsService.get());
            $scope.artists = resourceErrorHandler(artistsService.getList());
            $scope.mediaTypes = resourceErrorHandler(mediaTypesService.query());
            var images;

            // Get images
            if (!ctrl.isNew) {
                images = resourceErrorHandler(imagesResource.query({id: id}));

                images.$promise.then(function(images) {
                    arrayStorageSvc.get(id, $scope)
                        .addArray(images);
                });
            }

            ctrl.isLoading = function() {
                return !($scope.model.$resolved
                    && $scope.constants.$resolved
                    && $scope.artists.$resolved
                    && $scope.mediaTypes.$resolved
                    && (!images || images.$resolved));
            };

            // Get an existing model or a template, depending on the action (new or edit),
            if (!ctrl.isNew) {
                $scope.model = resourceErrorHandler(releasesService.getForEdit({ id: id }));
            } else {
                $scope.model = resourceErrorHandler(releasesService.getTemplate());

                // Set Release template Artist and MediaType Ids to null in order for
                // Select element validations to work
                $scope.model.$promise.then(function (data) {
                    data.artistId = null;
                    data.mediaId = null;
                })
            }

            $scope.update = function (form) {
                errorMessageSvc.clearErrors();

                if (form.$valid) {
                    $scope.validationErrors.length = 0;
                    if (ctrl.isNew) {
                        resourcePostSvc(releasesService
                            .create($scope.model), "/Releases", $scope.validationErrors);
                    }
                    else {
                        resourcePostSvc(releasesService
                            .update($scope.model), "/Releases", $scope.validationErrors);
                    }
                } else {
                    errorMessageSvc.addError(
                        new RecordLabel.Error("Data cannot be submitted because there are validation errors!"));

                    // Mark fields as dirty so that the UI displayed messages for each
                    for (let field in form) {
                        if (field.charAt(0) !== "$") {
                            form[field].$setDirty();
                        }
                    }
                }
            };

            $scope.addReference = function () {
                $scope.model.references.push(angular.copy($scope.constants.defaultReference));
            };

            $scope.deleteReference = function (index) {
                $scope.model.references.splice(index, 1);
            };

            $scope.addTrack = function () {
                $scope.model.tracks.push(angular.copy($scope.constants.defaultTrack));
            };

            $scope.deleteTrack = function (index) {
                $scope.model.tracks.splice(index, 1);
            };

            /**
             * Checks if a field has an invalid NON-empty value
             * @param formField
             * @returns {boolean}
             */
            ctrl.isInvalidForRequired = function (formField) {
                return formValidationService.isInvalidForRequired(formField);
            };

            /**
             * Checks if a field is empty
             * @param formField
             * @returns {boolean}
             */
            ctrl.isEmptyForRequired = function (formField) {
                return formValidationService.isEmptyForRequired(formField);
            };
        }]);

})();