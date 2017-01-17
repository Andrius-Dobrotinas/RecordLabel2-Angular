"use strict";

(function () {

    angular.module("RecordLabel")
        .run(["$rootScope", "metadataService", "infoMsgSvc", function ($rootScope, metadataService, infoMsgSvc) {
             $rootScope.errors = [];
             $rootScope.infoMessage;

             // Populate global metadata list because we'll need it a lot
             $rootScope.metadataList = metadataService.query();

             // Default settings, in case ajax request for settings doesn't come through
             $rootScope.settings = {
             itemsPerPage: 10
             };

             // Synchronous call to get settings. Settings must be retrieved before any other requests are be made
             // because they contain ItemsPerPage param.
             $.ajax({
                 url: "api/settings/get",
                 async: false
             }).done(function (data) {
             $rootScope.settings.itemsPerPage = data.itemsPerPage;
             });

            // TODO: move this to a separate messages service or something
             $rootScope.$on('$locationChangeStart', function (event) {
                 if (event.defaultPrevented) {
                     return;
                 }
                 $rootScope.errors.length = 0;
                 infoMsgSvc.changeLocation();
             });
        }]);

})();