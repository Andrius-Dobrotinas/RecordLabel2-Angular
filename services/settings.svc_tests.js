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

        it("make request to the right service", inject(function(settingsUrl) {
            svc.getSettingsSync();

            expect(requests[0].url).toBe(settingsUrl);
        }));

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

        it("getItemsPerPage must return... default value initially", inject(function(itemsPerPageDefault) {
            var result = svc.getItemsPerPage();
            expect(result).toBe(itemsPerPageDefault);
        }));

        it("getItemsPerPage must return... the value of items per page received from the back end", inject(function(settingsUrl) {
            var response = { itemsPerPage: 5 };
            var serializerResponse = JSON.stringify(response);
            server.respondWith("GET", settingsUrl,
                [200, { "Content-Type": "application/json" }, serializerResponse]);

            svc.getSettingsSync();

            var result = svc.getItemsPerPage();
            expect(result).toBe(response.itemsPerPage);
        }));

    });
});