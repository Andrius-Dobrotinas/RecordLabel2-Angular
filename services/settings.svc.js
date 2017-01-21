"use strict";

(function () {

    angular.module("RecordLabel").factory("settingsService", function() {
        var settings = {
            // Default settings, in case ajax request for settings doesn't come through
            itemsPerPage: 10
        };

        var getSettings = function(async) {
            $.ajax({
                url: "api/settings/get",
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
    });

})();