"use strict";

describe("settingsService Tests", function() {
    var svc;

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function(settingsService) {
        svc = settingsService;
    }));

    describe("getSettingsSync Tests", function() {
        var xhr, requests;

        beforeEach(function () {
            requests = [];
            xhr = sinon.useFakeXMLHttpRequest();
            xhr.onCreate = function (x) {
                requests.push(x);
            }
        });

        afterEach(function () {
            xhr.restore();
        });

        it("must make an ajax request", function() {
            svc.getSettingsSync();
            expect(requests.length).toBe(1);
        });

        it("make request to the right service", function() {
            svc.getSettingsSync();
            // TODO: move this to a constant
            expect(requests[0].url).toBe("api/settings/get");
        });

        it("request must be synchronous", function() {
            svc.getSettingsSync();
            expect(requests[0].async).toBe(false);
        });

        it("request method must be GET", function() {
            svc.getSettingsSync();
            expect(requests[0].method).toBe("GET");
        });

    });

    describe("getter methods", function() {
        var server;

        beforeEach(function () {
            server = sinon.fakeServer.create();
        });

        afterEach(function () {
            server.restore();
        });

        it("getItemsPerPage must return... default value initially", function() {
            var result = svc.getItemsPerPage();
            expect(result).toBe(10); // TODO: probably use constants?
        });

        it("getItemsPerPage must return... the value of items per page received from the back end", function() {
            var response = { itemsPerPage: 5 };
            var serializerResponse = JSON.stringify(response);
            server.respondWith("GET", "api/settings/get",
                [200, { "Content-Type": "application/json" }, serializerResponse]);

            svc.getSettingsSync();

            var result = svc.getItemsPerPage();
            expect(result).toBe(response.itemsPerPage);
        });

    });
});