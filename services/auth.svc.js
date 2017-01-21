"use strict";

(function () {

    angular.module("RecordLabel").factory("authService", ["$http", "authenticationUrl", "endSessionUrl",
        function($http, authenticationUrl, endSessionUrl) {

            // TODO: check if there is an active session on application startup

            var GodMode = false;
            var authError = undefined;

            return {
                authenticate: function(creds) {
                    $http.post(authenticationUrl, creds)
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
                    $http.post(endSessionUrl)
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