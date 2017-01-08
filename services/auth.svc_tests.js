"use strict";

describe("authService Tests", function() {
    var q, backend, svc;
    var creds;

    beforeEach(module("RecordLabel"));

    beforeEach(function() {
        creds = {
            username : "asd",
            password : "pwd"
        };
    });

    describe("initial state", function(){
        beforeEach(inject(function(authService) {
            svc = authService;
        }));

        it("getAuthError must return UNDEFINED initially", function() {
            expect(svc.getAuthError()).toBe(undefined);
        });

        it("isGodMode must return UNDEFINED initially", function() {
            expect(svc.isGodMode()).toBe(false);
        });
    });

    describe("posting an authentication request", function(){
        var q, httpMock;

        beforeEach(module(function($provide) {
            httpMock = {
                post: function(args) {
                    this.postArgs = args;
                    return q.defer().promise;
                },
                postArgs: undefined
            };

            $provide.factory('$http', function() { return httpMock });
        }));

        beforeEach(inject(function($q, authService) {
            q = $q;
            svc = authService;
        }));

        it("must post a request to server once", function() {
            var spy = sinon.spy(httpMock, "post");

            svc.authenticate(creds);

            expect(spy.calledOnce).toBe(true);
        });

        it("must pass Authentication header to $http.post", function() {
            var spy = sinon.spy(httpMock, "post");

            svc.authenticate(creds);

            expect(spy.getCall(0).args[2]).toBeTruthy();
            expect(spy.getCall(0).args[2].headers).toBeTruthy();
            expect(spy.getCall(0).args[2].headers["Authorization"]).toBeTruthy();
        });

        it("Authentication header passed to $http.post must contain Basic auth type", function() {
            var spy = sinon.spy(httpMock, "post");

            svc.authenticate(creds);

            var authHeader = spy.getCall(0).args[2].headers["Authorization"];
            expect(authHeader.indexOf("Basic")).toBe(0);
        });

        it("Authentication header passed to $http.post must contain proper base64 encoded username and password",
            function() {
                var spy = sinon.spy(httpMock, "post");

                var credsBase64 = btoa(creds.username + ":" + creds.password);
                var expectedAuthHeader = "Basic " + credsBase64;

                svc.authenticate(creds);

                var authHeader = spy.getCall(0).args[2].headers["Authorization"];

                expect(authHeader).toEqual(expectedAuthHeader);
            });
    });

    describe("handling response to authentication request", function(){

        beforeEach(inject(function($httpBackend, authService) {
            backend = $httpBackend;
            svc = authService;
        }));

        it("must set godMode to true on successful authentication", function() {
            backend.when('POST', '/api/authentication/authenticate').respond(200);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.isGodMode()).toBe(true);
        });

        it("must set authError to undefined on successful authentication", function() {
            backend.when('POST', '/api/authentication/authenticate').respond(200);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.getAuthError()).toBe(undefined);
        });

        it("must set godMode to false on 401 (failed auth)", function() {
            backend.when('POST', '/api/authentication/authenticate').respond(401);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.isGodMode()).toBe(false);
        });

        it("must set authError to 'Bad credentials' on 401 (failed auth)", function() {
            backend.when('POST', '/api/authentication/authenticate').respond(401);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.getAuthError()).toBe("Bad credentials");
        });
    });

});