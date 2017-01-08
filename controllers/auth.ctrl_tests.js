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

            var value = ctrl.getAuthError();

            expect(value).toEqual(authServiceMock.getAuthError());
        });

        it("isGodMode must call authService.isGodMode", function() {
            var functionSpy = sinon.spy(authServiceMock, "isGodMode");

            ctrl.isGodMode();

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("isGodMode must return value returned by authService.isGodMode", function() {
            var functionSpy = sinon.spy(authServiceMock, "isGodMode");

            var value = ctrl.isGodMode();

            expect(value).toEqual(authServiceMock.isGodMode());
        });

        it("authenticate must call authService.authenticate", function() {
            var functionSpy = sinon.spy(authServiceMock, "authenticate");

            ctrl.authenticate();

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("must pass scope.model to authService.authenticate as argument", function() {
            var functionSpy = sinon.spy(authServiceMock, "authenticate");

            var model = scope.model;

            ctrl.authenticate();

            expect(functionSpy.getCall(0).args[0]).toBe(model);
        });
    });

    it("initAuth must change authInitiated to TRUE", function() {
        ctrl.initAuthentication();

        expect(ctrl.isAuthInitiated()).toBe(true);
    });

    it("scope.model.password must be undefined after call to authenticate", function() {
        var functionSpy = sinon.spy(authServiceMock, "authenticate");

        scope.model.password = "pwd";
        ctrl.authenticate();

        expect(scope.model.password).toBe(undefined);
    });

});