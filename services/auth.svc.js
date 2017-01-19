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
                            e.statusText = "Bad credentials";
                        } else if (e.statusText.length === 0) {
                            e.statusText = "An unexpected error has been encountered";
                        }
                        authError = e.statusText;
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