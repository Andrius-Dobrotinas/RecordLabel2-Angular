"use strict";

(function () {

    var application = angular.module("RecordLabel")
        .factory("authService", ["$http", "$rootScope", function($http, $rootScope) {

        // TODO: check if there is an active session on application startup

        var godMode = false;
        var authError = undefined;

        return {
            authenticate: function(creds) {
                $http.post("/api/authentication/authenticate", creds)
                    .then(function() {
                        godMode = true;
                        authError = undefined;
                    })
                    .catch(function(e) {
                        godMode = false;
                        if (e.status === 401) {
                            // TODO: see if there's a better way to handle this
                            authError = "Bad credentials";
                        } else {
                            // TODO: implement a proper error message service
                            //$rootScope.errors.push(e);
                        }
                    });
            },
            getAuthError: function() {
                return authError;
            },
            isGodMode: function() {
                return godMode;
            }
        };
    }]);

})();