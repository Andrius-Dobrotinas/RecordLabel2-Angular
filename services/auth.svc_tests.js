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

    describe("posting authentication request", function(){
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

        it("must pass credentials object $http.post", function() {
            var spy = sinon.spy(httpMock, "post");

            svc.authenticate(creds);

            expect(spy.getCall(0).args[1]).toEqual(creds);
        });

    });

    describe("handling response to authentication request", function(){
        var authUrl;

        beforeEach(inject(function($httpBackend, authService, authenticationUrl) {
            backend = $httpBackend;
            svc = authService;
            authUrl = authenticationUrl;
        }));

        it("must set GodMode to true on successful authentication", function() {
            backend.when('POST', authUrl).respond(200);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.isGodMode()).toBe(true);
        });

        it("must set authError to undefined on successful authentication", function() {
            backend.when('POST', authUrl).respond(200);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.getAuthError()).toBe(undefined);
        });

        it("must set GodMode to false on 401 (failed auth)", function() {
            backend.when('POST', authUrl).respond(401);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.isGodMode()).toBe(false);
        });

        it("must set authError to 'Bad credentials' on 401 (failed auth)", function() {
            backend.when('POST', authUrl).respond(401);

            svc.authenticate(creds);
            backend.flush();

            expect(svc.getAuthError()).toBe("Bad credentials");
        });
    });

    describe("checking state of authentication", function(){
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

            svc.checkAuthenticationState();

            expect(spy.calledOnce).toBe(true);
        });

    });

    describe("handling response to authentication request", function(){
        var checkUrl;

        beforeEach(inject(function($httpBackend, authService, checkAuthStateUrl) {
            backend = $httpBackend;
            svc = authService;
            checkUrl = checkAuthStateUrl;
        }));

        it("must set GodMode to true when response is true", function() {
            backend.when('POST', checkUrl).respond(true);

            svc.checkAuthenticationState(creds);
            backend.flush();

            expect(svc.isGodMode()).toBe(true);
        });

        it("must set GodMode to false when response is false", function() {
            backend.when('POST', checkUrl).respond(false);

            svc.checkAuthenticationState(creds);
            backend.flush();

            expect(svc.isGodMode()).toBe(false);
        });

    });

});