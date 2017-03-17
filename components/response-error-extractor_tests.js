"use strict";

describe("ResponseErrorExtractor tests", function() {

    var instance;
    var responseData, responseObject;
    var errorMsg = "error message";
    var defaultMsg = "default";

    beforeEach(function() {
        instance = new RecordLabel.ResponseErrorExtractor(defaultMsg);

        responseData = {};
        responseObject = {
            data: responseData,
        };
    });

    it ("must contain get method", function() {
        expect(instance.getError).toBeTruthy();
    });

    it ("must return an instance of RecordLabel.Error", function() {
        var result = instance.getError(responseObject);

        expect(result instanceof RecordLabel.Error).toBe(true);
    });

    describe("must return error message from one of response's properties", function() {

        it ("response.data", function() {
            responseObject.data = errorMsg;
            var result = instance.getError(responseObject);

            expect(result.statusText).toBe(errorMsg);
        });

        it ("response.data.message", function() {
            responseObject.data.message = errorMsg;
            var result = instance.getError(responseObject);

            expect(result.statusText).toBe(errorMsg);
        });

        it ("response.data.message", function() {
            responseObject.data.message = errorMsg;
            var result = instance.getError(responseObject);

            expect(result.statusText).toBe(errorMsg);
        });
    });

    it ("must return default message if error message not found in response", function() {
        var result = instance.getError(responseObject);

        expect(result.statusText).toBe(defaultMsg);
    });

    it ("must return status from response.status", function() {
        var status = 500;
        responseObject.status = status;
        var result = instance.getError(responseObject);

        expect(result.status).toBe(status);
    });

});