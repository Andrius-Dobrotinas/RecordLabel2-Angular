"use strict";

(function () {

    angular.module("RecordLabel").factory("settingsService", ["settingsUrl", "itemsPerPageDefault",
        function(settingsUrl, itemsPerPageDefault) {
            var settings = {
                // Default settings, in case ajax request for settings doesn't come through
                itemsPerPage: itemsPerPageDefault
            };

            var getSettings = function(async) {
                $.ajax({
                    url: settingsUrl,
                    async: async
                }).done(function (data) {
                    settings.itemsPerPage = data.itemsPerPage;
                });
            };

            return {
                getSettingsSync: function() {
                    getSettings(false);
                },
                getItemsPerPage: function () {
                    return settings.itemsPerPage;
                }
            }
        }]);

})();