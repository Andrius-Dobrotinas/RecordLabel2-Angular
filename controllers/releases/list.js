"use strict";

(function () {

    angular.module("RecordLabel").controller("ReleaseListCtrl",
        ["$scope", "releasesService", "batchedListServiceFactory", "authService", "settingsService",
        function ReleaseListCtrl($scope, releasesService, batchedListServiceFactory, authService, settingsService) {
            var ctrl = this;

            var svc = batchedListServiceFactory(releasesService, settingsService.getItemsPerPage());
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