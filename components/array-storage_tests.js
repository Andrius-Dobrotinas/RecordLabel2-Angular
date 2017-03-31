"use strict";

describe("ArrayStorage tests", function() {

    var instance;
    var emptyArray;

    beforeEach(function() {
        instance = new RecordLabel.ArrayStorage();
        emptyArray = [];
    });

    it ("must be empty initially", function() {
        var result = instance.getAll();

        expect(result).toEqual(emptyArray);
    });

    it ("addArray must add items from the supplied array to the underlying one", function() {
        var arr = [ "one", "two", "three" ];

        instance.addArray(arr);
        var result = instance.getAll();

        expect(result).toEqual(arr);
    });

    it ("addArray must not add anything when non-array is supplied", function() {
        var nonArr = "four";

        instance.addArray(nonArr);
        var result = instance.getAll();

        expect(result).toEqual(emptyArray);
    });

    it ("reset must clear the underlying array", function() {
        var arr = [ "one", "two", "three" ];

        instance.addArray(arr);
        instance.reset();
        var result = instance.getAll();

        expect(result).toEqual(emptyArray);
    });
});