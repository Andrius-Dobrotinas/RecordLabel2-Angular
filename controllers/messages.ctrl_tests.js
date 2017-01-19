"use strict";

describe("MessagesCtrl Tests", function() {
    var ctrl, errorMessageSvcMock;
    var errors = [ 1, 2 ];

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller) {
        errorMessageSvcMock = {
            getErrors: function () {
                return errors;
            },
        };

        ctrl = $controller("MessagesCtrl", {
            "errorMessageSvc": errorMessageSvcMock
        });
    }));


    it("getErrors must invoke errorMessageSvc.getErrors", function() {
        spyOn(errorMessageSvcMock, "getErrors");

        errorMessageSvcMock.getErrors();

        expect(errorMessageSvcMock.getErrors).toHaveBeenCalledTimes(1);
    });

    it("getErrors must return errors returned by errorMessageSvc.getErrors", function() {
        var result = ctrl.getErrors();

        expect(result).toBe(errors);
    });

});