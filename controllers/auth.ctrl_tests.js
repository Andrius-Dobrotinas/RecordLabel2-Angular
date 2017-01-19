"use strict";

describe("AuthCtrl Tests", function() {
    var scope, authServiceMock, ctrl;

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        authServiceMock = {
            authenticate: function() { return "getAuthenticate return value"; },
            getAuthError: function() { return "getAuthError return value"; },
            isGodMode: function() { return "isGodMode return value"; }
        };

        ctrl = $controller("AuthCtrl", {
            "$scope": scope,
            "authService": authServiceMock,
        });
    }));

    describe("initial state", function() {

        it("isAuthInitiated must indicate FALSE initially", function() {
            expect(ctrl.isAuthInitiated()).toBe(false);
        });
    });

    describe("proxy methods", function() {

        it("getAuthError must call authService.getAuthError", function() {
            var functionSpy = sinon.spy(authServiceMock, "getAuthError");

            ctrl.getAuthError();

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("getAuthError must return value returned by authService.getAuthError", function() {
            var functionSpy = sinon.spy(authServiceMock, "getAuthError");

            var expected = authServiceMock.getAuthError();
            var value = ctrl.getAuthError();

            expect(value).toEqual(expected);
        });

        it("isGodMode must call authService.isGodMode", function() {
            var functionSpy = sinon.spy(authServiceMock, "isGodMode");

            ctrl.isGodMode();

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("isGodMode must return value returned by authService.isGodMode", function() {
            var functionSpy = sinon.spy(authServiceMock, "isGodMode");

            var expected = authServiceMock.isGodMode();
            var value = ctrl.isGodMode();

            expect(value).toEqual(expected);
        });

        it("authenticate must call authService.authenticate", function() {
            var functionSpy = sinon.spy(authServiceMock, "authenticate");

            ctrl.authenticate();

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("must pass a copy of scope.model to authService.authenticate as argument", function() {
            var functionSpy = sinon.spy(authServiceMock, "authenticate");

            var model = scope.model;

            ctrl.authenticate();

            expect(functionSpy.getCall(0).args[0]).toEqual(model);
        });

        it("argument passed to authService.authenticate must not be scope.model", function() {
            var functionSpy = sinon.spy(authServiceMock, "authenticate");

            var model = scope.model;

            ctrl.authenticate();

            expect(functionSpy.getCall(0).args[0]).not.toBe(model);
        });
    });

    describe("isLoginButtonEnabled tests", function() {

        it("isLoginButtonEnabled must indicate FALSE initially", function() {
            expect(ctrl.isLoginButtonEnabled()).toBe(false);
        });

        it("isLoginButtonEnabled must indicate FALSE when only username is entered", function() {
            scope.model.username = "asd";
            expect(ctrl.isLoginButtonEnabled()).toBe(false);
        });

        it("isLoginButtonEnabled must indicate FALSE when only password is entered", function() {
            scope.model.password = "pwd";
            expect(ctrl.isLoginButtonEnabled()).toBe(false);
        });

        it("isLoginButtonEnabled must indicate TRUE when both username and password are entered", function() {
            scope.model.username = "asd";
            scope.model.password = "pwd";
            expect(ctrl.isLoginButtonEnabled()).toBe(true);
        });
    });

    it("initAuth must change authInitiated to TRUE", function() {
        ctrl.initAuthentication();

        expect(ctrl.isAuthInitiated()).toBe(true);
    });

    it("scope.model.username must be set to UNDEFINED after call to authenticate", function() {
        scope.model.username = "asd";
        ctrl.authenticate();

        expect(scope.model.username).toBe(undefined);
    });

    it("scope.model.password must be set to UNDEFINED after call to authenticate", function() {
        scope.model.password = "pwd";
        ctrl.authenticate();

        expect(scope.model.password).toBe(undefined);
    });

});