"use strict";

describe("responseErrorExtractSvc tests", function() {

    beforeEach(module("RecordLabel"));

    var svc;

    beforeEach(inject(function(responseErrorExtractSvc) {
        svc = responseErrorExtractSvc;
    }));

    it ("create and return an instance of RecordLabel.ResponseErrorExtractor", function() {
        expect(svc instanceof RecordLabel.ResponseErrorExtractor).toBe(true);
    });
});