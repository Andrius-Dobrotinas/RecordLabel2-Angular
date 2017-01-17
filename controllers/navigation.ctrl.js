"use strict";

(function () {

    angular.module("RecordLabel").controller("NavigationCtrl",
        ["$rootScope", "authService",
        function ReleaseEditCtrl($rootScope, authService) {

            var checkRoute = function(event, route) {
                if (route.access && route.access.GodModeOnly && !authService.isGodMode()) {
                    $rootScope.errors.push({
                        statusText: "You must log in in order to go there" }
                    );
                    event.preventDefault();
                }
            };

            $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
                checkRoute(event, nextRoute);
            });

    }])
})();