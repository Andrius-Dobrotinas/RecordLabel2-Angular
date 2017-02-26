"use strict";

(function () {

    angular.module("RecordLabel").controller("NavigationCtrl",
        ["$rootScope", "authService", "errorMessageSvc",
        function ($rootScope, authService, errorMessageSvc) {

            var checkRoute = function(event, route) {
                /* TODO: unfortunately, this will return give an error when going straight
                to restricted page (without first opening a non-restricted page) because
                authentication check on server will not have completed by this stage.
                Playing with setTimeout didn't help here.
                 */
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