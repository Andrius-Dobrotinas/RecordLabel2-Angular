"use strict";

(function () {

    angular.module("RecordLabel").controller("AuthCtrl",
        ["$scope", "authService",
        function ReleaseEditCtrl($scope, authService) {
            var ctrl = this;

            var authInitiated = false;

            $scope.model = {
                username : undefined,
                password : undefined
            };

            ctrl.isAuthInitiated = function() {
                return authInitiated;
            };

            ctrl.getAuthError = function() {
                return authService.getAuthError();
            };

            ctrl.isGodMode = function() {
                return authService.isGodMode();
            };

            ctrl.initAuthentication = function() {
                authInitiated = true;
            };

            ctrl.isLoginButtonEnabled = function() {
                return !(!$scope.model.username || !$scope.model.password);
            };

            ctrl.authenticate = function() {
                var creds = {
                    username: $scope.model.username,
                    password: $scope.model.password
                };
                authService.authenticate(creds);
                $scope.model.username = undefined;
                $scope.model.password = undefined;
            };

            ctrl.logout = function() {
                authService.endSession();
            };

    }])
})();