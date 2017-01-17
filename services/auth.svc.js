"use strict";

(function () {

    var application = angular.module("RecordLabel")
        .factory("authService", ["$http", function($http) {

        // TODO: check if there is an active session on application startup

        var GodMode = false;
        var authError = undefined;

        return {
            authenticate: function(creds) {
                $http.post("/api/authentication/authenticate", creds)
                    .then(function() {
                        GodMode = true;
                        authError = undefined;
                    })
                    .catch(function(e) {
                        GodMode = false;
                        if (e.status === 401) {
                            // TODO: see if there's a better way to handle this
                            authError = "Bad credentials";
                        } else {
                            // TODO: implement a proper error message service
                            //$rootScope.errors.push(e);
                        }
                    });
            },
            endSession: function() {
                $http.post("/api/authentication/endsession")
                    .finally(function() {
                        GodMode = false;
                    })
            },
            getAuthError: function() {
                return authError;
            },
            isGodMode: function() {
                return GodMode;
            }
        };
    }]);

})();