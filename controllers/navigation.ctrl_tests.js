"use strict";

describe("NavigationCtrl Tests", function() {
    var rootScope, authServiceMock, ctrl, route;
    var errorMessageSvcMock;
    var isGodModeFalse = function() { return false; };
    var isGodModeTrue = function() { return true; };

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope;

        authServiceMock = {
            isGodMode: isGodModeFalse
        };

        errorMessageSvcMock = {
            addError: function() {}
        };

        ctrl = $controller("NavigationCtrl", {
            "$rootScope": $rootScope,
            "authService": authServiceMock,
            "errorMessageSvc": errorMessageSvcMock
        });

        route = {
            access: {
                GodModeOnly: true
            }
        };
    }));

    describe("when access is restricted", function() {

        beforeEach(function() {
            route.access.GodModeOnly = true;
        });

        it("must check if in God mode", function() {
            spyOn(authServiceMock, "isGodMode");
            rootScope.$broadcast("$routeChangeStart", route);

            expect(authServiceMock.isGodMode).toHaveBeenCalledTimes(1);
        });

        it("must prevent default behavior when not in God mode", function() {
            var event = rootScope.$broadcast("$routeChangeStart", route);

            expect(event.defaultPrevented).toBe(true);
        });

        it("must register an error message when not in God mode", function() {
            spyOn(errorMessageSvcMock, "addError");

            rootScope.$broadcast("$routeChangeStart", route);

            expect(errorMessageSvcMock.addError).toHaveBeenCalledTimes(1);
        });

        it("must NOT prevent default behavior when in God mode", function() {
            authServiceMock.isGodMode = isGodModeTrue;
            var event = rootScope.$broadcast("$routeChangeStart", route);

            expect(event.defaultPrevented).toBe(false);
        });

        it("must NOT register any error messages when in God mode", function() {
            spyOn(errorMessageSvcMock, "addError");
            authServiceMock.isGodMode = isGodModeTrue;

            rootScope.$broadcast("$routeChangeStart", route);

            expect(errorMessageSvcMock.addError).not.toHaveBeenCalled();
        });
    });

    describe("when access is not restricted", function() {

        beforeEach(function() {
            route.access.GodModeOnly = false;
        });

        it("must NOT check if in God mode", function() {
            spyOn(authServiceMock, "isGodMode");
            var event = rootScope.$broadcast("$routeChangeStart", route);

            expect(authServiceMock.isGodMode).not.toHaveBeenCalled();
        });

        it("must NOT prevent default behavior", function() {
            var event = rootScope.$broadcast("$routeChangeStart", route);

            expect(event.defaultPrevented).toBe(false);
        });

        it("must NOT register any error messages", function() {
            spyOn(errorMessageSvcMock, "addError");
            var event = rootScope.$broadcast("$routeChangeStart", route);

            expect(errorMessageSvcMock.addError).not.toHaveBeenCalled();
        });
    });

});