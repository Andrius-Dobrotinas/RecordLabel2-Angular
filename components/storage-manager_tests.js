"use strict";

describe("StorageManager tests", function() {

    beforeEach(module("RecordLabel"));

    var svc, mockFunction;

    beforeEach(function() {
        mockFunction = function() {};
        svc = new RecordLabel.StorageManager(mockFunction);
    });

    it ("must contain get method", function() {
        expect(svc.get).toBeTruthy();
    });

    it ("must exists get method", function() {
        expect(svc.exists).toBeTruthy();
    });

    describe("get method", function() {

        it ("must create and return an instance of supplied function", function() {
            mockFunction = sinon.spy();
            svc = new RecordLabel.StorageManager(mockFunction);

            var store = svc.get("id");

            expect(mockFunction.calledOnce).toBe(true);
        });

        it ("must add the instance to the store", function() {
            var id = "id";

            var store = svc.get(id);
            var result = svc.exists(id);

            expect(result).toBe(true);
        });

        it ("must return the same instance for the same id", function() {
            var id = "id";

            var store = svc.get(id);
            var store2 = svc.get(id);

            expect(store).toBe(store2);
        });

        it ("must retain instance in the store even when adding new instances", function() {
            var id = "id";
            var idOther = "other id";

            var store = svc.get(id);
            var storeOther = svc.get(idOther);
            var result = svc.exists(id);

            expect(result).toBe(true);
        });

        it ("must be able to add more instances to the store", function() {
            var id = "id";
            var idOther = "other id";

            var store = svc.get(id);
            var storeOther = svc.get(idOther);
            var result = svc.exists(idOther);

            expect(result).toBe(true);
        });
    });

    describe("instance removal from the underlying array on scope destruction", function() {

        var scope;

        beforeEach(inject(function($rootScope) {
            scope = $rootScope.$new();
        }));

        it ("must remove instance on scope destruction", function() {
            var id = "id";

            var store = svc.get(id, scope);

            scope.$broadcast("$destroy");

            var result = svc.exists(id);

            expect(result).toBe(false);
        });
    })
});