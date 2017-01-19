"use strict";

describe("errorMessageSvc Tests", function() {
    var svc;

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function(errorMessageSvc) {
        svc = errorMessageSvc;
    }));

    describe("initial state", function(){

        it("must contain an empty error array", function() {
            var result = svc.getErrors();
            var emptyArray = [];
            expect(result).toEqual(emptyArray);
        });
    });

    describe("methods", function() {

        it("addError must add an error object to the underlying array", function() {
            var error1 = { message: "error1" };

            svc.addError(error1);

            var result = svc.getErrors();

            expect(result.length).toBe(1);
            expect(result[0]).toBe(error1);
        });

        it("all errors must be in underlying the array after multiple invocations of addError", function() {
            var error1 = { message: "error1" };
            var error2 = { message: "error2" };
            var error3 = { message: "error3" };

            svc.addError(error1);
            svc.addError(error2);
            svc.addError(error3);

            var result = svc.getErrors();

            expect(result.length).toBe(3);
            expect(result[0]).toBe(error1);
            expect(result[1]).toBe(error2);
            expect(result[2]).toBe(error3);
        });

        it("clearErrors must remove all errors from the underlying array", function() {
            var error1 = { message: "error1" };
            var error2 = { message: "error2" };

            svc.addError(error1);
            svc.addError(error2);

            svc.clearErrors();

            var result = svc.getErrors();

            expect(result.length).toBe(0);
        });

    });

    describe("on route change", function() {
        var scope;

        beforeEach(inject(function($rootScope) {
            scope = $rootScope;
        }));

        it("must clear all errors on location change", function() {
            var error1 = { message: "error1" };

            svc.addError(error1);

            scope.$broadcast("$locationChangeStart");

            var result = svc.getErrors();

            expect(result.length).toBe(0);
        });

        it("must NOT clear errors on location change if the event has been cancelled", function() {
            var error1 = { message: "error1" };

            svc.addError(error1);

            scope.$on("$locationChangeStart", function(event) {
                event.preventDefault();
            });

            scope.$broadcast("$routeChangeStart");

            var result = svc.getErrors();

            expect(result.length).toBe(1);
        });
    });

});