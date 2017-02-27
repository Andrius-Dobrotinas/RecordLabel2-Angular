"use strict";

describe("filePostSvc Tests", function() {
    var backend, svc;
    var url = "url/";
    var file, files;
    var successFunc, failureFunc;

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($httpBackend, filePostSvc) {
        backend = $httpBackend;
        svc = filePostSvc;

        file = {
            file: "file1"
        };
        files = [ file ];

        successFunc = sinon.spy(function(response) { });
        failureFunc = sinon.spy(function(response) { });
    }));

    describe("making request", function(){

        it("must make a POST request", function() {
            var requestMethod;

            backend.when('POST', url).respond(function(method, url, data) {
                requestMethod = method;
                return [200];
            });

            svc.post(files, url);
            backend.flush();

            expect(requestMethod).toBe("POST");
        });

        it("must post some data", function() {
            var postedData;

            backend.when('POST', url).respond(function(method, url, data) {
                postedData = data;
                return [200];
            });

            svc.post(files, url);
            backend.flush();

            expect(postedData).toBeTruthy();
        });

        // TODO: find a way to inspect multipart encoded form data
        it("posted data must be of type FormData", function() {
            var postedData;

            backend.when('POST', url).respond(function(method, url, data) {
                postedData = data;
                return [200];
            });

            svc.post(files, url);
            backend.flush();

            expect(postedData instanceof FormData).toBe(true);
        });

        it("Content-Type in request header must be undefined", function() {
            var requestHeaders;

            backend.when('POST', url).respond(function(method, url, data, headers) {
                requestHeaders = headers;
                return [200];
            });

            svc.post(files, url);
            backend.flush();

            expect(requestHeaders["Content-Type"]).toBe(undefined);
        });

    });

    describe("on successful request", function(){

        it("must invoke success callback on success", function() {
            backend.when('POST', url).respond(200);

            svc.post(files, url, successFunc, null);
            backend.flush();

            expect(successFunc.calledOnce).toBe(true);
        });

        it("must NOT invoke failure callback on success", function() {
            backend.when('POST', url).respond(200);

            svc.post(files, url, successFunc, failureFunc);
            backend.flush();

            expect(failureFunc.called).toBe(false);
        });

        it("must invoke success callback with response object", function() {
            var responseData = { data: "data" };

            backend.when('POST', url).respond(function(method, url, data) {
                return [200, responseData];
            });

            svc.post(files, url, successFunc);
            backend.flush();

            expect(successFunc.getCall(0).args.length).toBe(1);

            expect(successFunc.getCall(0).args[0].data).toEqual(responseData);
        });

    });

    describe("on non-successful request", function(){

        it("must invoke failure callback on failure", function() {
            backend.when('POST', url).respond(400);

            svc.post(files, url, successFunc, failureFunc);
            backend.flush();

            expect(failureFunc.calledOnce).toBe(true);
        });

        it("must invoke failure callback on failure", function() {
            backend.when('POST', url).respond(100);

            svc.post(files, url, null, failureFunc);
            backend.flush();

            expect(failureFunc.calledOnce).toBe(true);
        });

        it("must invoke failure callback on failure", function() {
            backend.when('POST', url).respond(300);

            svc.post(files, url, null, failureFunc);
            backend.flush();

            expect(failureFunc.calledOnce).toBe(true);
        });

        it("must invoke failure callback on failure", function() {
            backend.when('POST', url).respond(500);

            svc.post(files, url, null, failureFunc);
            backend.flush();

            expect(failureFunc.calledOnce).toBe(true);
        });


        it("must NOT invoke success callback on failure", function() {
            backend.when('POST', url).respond(400);

            svc.post(files, url, successFunc, failureFunc);
            backend.flush();

            expect(successFunc.called).toBe(false);
        });

        it("must invoke failure callback with response object", function() {
            var responseData = { data: "data" };

            backend.when('POST', url).respond(function(method, url, data) {
                return [400, responseData];
            });

            svc.post(files, url, null, failureFunc);
            backend.flush();

            expect(failureFunc.getCall(0).args.length).toBe(1);

            expect(failureFunc.getCall(0).args[0].data).toEqual(responseData);
        });

    });

});