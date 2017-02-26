"use strict";

(function () {

    angular.module("RecordLabel")
        .run(["$rootScope", "metadataService", "settingsService", "infoMsgSvc", "authService",
            function ($rootScope, metadataService, settingsService, infoMsgSvc, authService) {
                 $rootScope.infoMessage;

                 // Populate global metadata list because we'll need it a lot
                 $rootScope.metadataList = metadataService.query();

                // Check if the user is currently authenticated on server
                authService.checkAuthenticationState();

                 // Synchronous call to get settings. Settings must be retrieved before any other requests are made
                 // because they contain ItemsPerPage value.
                settingsService.getSettingsSync();

                // TODO: move this to a separate messages service or something
                 $rootScope.$on('$locationChangeStart', function (event) {
                     if (event.defaultPrevented) {
                         return;
                     }
                     infoMsgSvc.changeLocation();
                 });
            }]);

})();