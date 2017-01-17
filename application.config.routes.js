"use strict";

(function () {

    angular.module("RecordLabel")
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider.caseInsensitiveMatch = true;
            $routeProvider.when("/Releases", {
                templateUrl: "Angular/controllers/releases/list.html",
                controller: "ReleaseListCtrl",
                controllerAs: "ctrl"
            })
            .when("/Releases/New", {
                templateUrl: "Angular/controllers/releases/edit.html",
                controller: "ReleaseEditCtrl",
                controllerAs: "ctrl",
                access: { GodModeOnly: true }
            })
            .when("/Releases/Edit/:id", {
                templateUrl: "Angular/controllers/releases/edit.html",
                controller: "ReleaseEditCtrl",
                controllerAs: "ctrl",
                access: { GodModeOnly: true }
            })
            .when("/Releases/:id", {
                templateUrl: "Angular/controllers/releases/view.html",
                controller: "ReleaseViewCtrl",
                controllerAs: "ctrl"
            })
            .otherwise({
                redirectTo: "/Releases"
            });

            // To remove the exclamation mark after the # sign
            $locationProvider.hashPrefix("");
        });

})();