"use strict";

(function () {

    angular.module("RecordLabel").controller("ReleaseViewCtrl",
        ["$scope", "$routeParams", "releasesService", "resourceErrorHandler", "referenceUrlTrustService",
            function ReleaseViewCtrl($scope, $routeParams, releasesService, resourceErrorHandler, referenceUrlTrustService) {
                var ctrl = this;
                $scope.model;

                var promise = resourceErrorHandler(releasesService.get({ id: $routeParams.id }));
                promise.$promise.then(takeCareOfResponse);

                function takeCareOfResponse (model) {
                    if (model.youtubeReferences) {
                        referenceUrlTrustService.trustUrls(model.youtubeReferences);
                    }
                    $scope.model = model.release;
                    $scope.model.youtubeReferences = model.youtubeReferences;
                }

                ctrl.isLoading = function () {
                    return !promise.$resolved;
                }
            }]);
})();