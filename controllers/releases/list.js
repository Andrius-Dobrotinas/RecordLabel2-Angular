"use strict";

(function () {

    angular.module("RecordLabel").controller("ReleaseListCtrl",
        ["$scope", "releasesService", "batchedListServiceFactory", "authService",
        function ReleaseListCtrl($scope, releasesService, batchedListServiceFactory, authService) {
            var ctrl = this;

            var svc = batchedListServiceFactory(releasesService, $scope.settings.itemsPerPage);
            svc.loadMore();

            ctrl.getEntries = function () {
                return svc.getEntries();
            };

            ctrl.areMoreItemsAvailable = function () {
                return svc.areMoreItemsAvailable();
            };

            ctrl.isLoading = function () {
                return svc.isLoading();
            };

            ctrl.loadMore = function () {
                svc.loadMore();
            };

            ctrl.isGodMode = function() {
                return authService.isGodMode();
            };
        }]);

})();