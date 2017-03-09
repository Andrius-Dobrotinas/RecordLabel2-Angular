"use strict";

(function () {

    var application = angular.module("RecordLabel");

    application.factory("metadataService", ["$resource", function ($resource) {
        return $resource("/api/metadata/get");
    }]);

    application.factory("releasesService", ["$resource", function ($resource) {
        return $resource("/api/releases/:act/:id", { id: "@id", size: "@size", number: "@number" }, {
            get: { method: "GET", params: { act: "get" } },
            queryBatch: { method: "GET", params: { act: "getBatch" } },
            getForEdit: { method: "GET", params: { act: "getForEdit" } },
            getTemplate: { method: "GET", params: { act: "getTemplate" }, cache: true },
            create: { method: "POST", params: { act: "post", id: undefined } },
            update: { method: "POST", params: { act: "post" } }
        });
    }]);

    application.factory("constantsService", ["$resource", function ($resource) {
        return $resource("/api/constants/:act", { }, {
            get: { method: "GET", params: { act: "get" }, cache: true },
        });
    }]);

    application.factory("artistsService", ["$resource", function ($resource) {
        return $resource("/api/artists/:act", { id: "@id" }, {
            // Returns a list of artists with essential data only
            getList: { method: "GET", params: { act: "getList" }, isArray: true }
        });
    }]);

    application.factory("mediaTypesService", ["$resource", function ($resource) {
        return $resource("/api/mediatypes/:act", {}, {
            query: { method: "GET", params: { act: "get" }, isArray: true }
        });
    }]);

    application.factory("imagesResource", ["$resource", function ($resource) {
        return $resource("/api/images/:act/:id", { id: "@id" }, {
            query: { method: "GET", params: { act: "get" }, isArray: true }
        });
    }]);

})();