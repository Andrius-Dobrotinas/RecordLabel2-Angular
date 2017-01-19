"use strict";

(function () {

    angular.module("RecordLabel").controller("NavigationCtrl",
        ["$rootScope", "authService", "errorMessageSvc",
        function ($rootScope, authService, errorMessageSvc) {

            var checkRoute = function(event, route) {
                if (route.access && route.access.GodModeOnly && !authService.isGodMode()) {
                    errorMessageSvc.addError({
                        statusText: "You must log in in order to go there" });
                    event.preventDefault();
                }
            };

            $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
                checkRoute(event, nextRoute);
            });

    }])
})();