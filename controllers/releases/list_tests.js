"use strict";

describe("ReleaseListCtrl Tests", function() {
    var controllerConstructor, scope, rootScope, q;
    var batchedListSvcMock, batchedListServiceFactoryMock, releasesServiceMock, authServiceMock;

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller, $rootScope, $q) {
        controllerConstructor = $controller;
        scope = $rootScope.$new();
        rootScope = $rootScope;
        q = $q;

        scope.settings = {
            itemsPerPage: undefined
        };

        batchedListSvcMock = {
            entries: [],
            promise: undefined,
            getEntries: function() { return this.entries },
            areMoreItemsAvailable: function() {},
            loadMore: function() {},
            isLoading: function() {}
        };

        batchedListServiceFactoryMock = function(resourceService, itemsPerPage) {
            return batchedListSvcMock;
        };

        releasesServiceMock = {
            getBatch: function() {}
        };

        authServiceMock = {
            isGodMode: function() { return true; }
        }
    }));

    describe("batchedListServiceFactory invocation", function () {

        it("must invoke batchedListServiceFactory with releasesService and itemsPerPage from settings in the scope", function() {
            var factorySpy = sinon.spy(batchedListServiceFactoryMock);

            var itemsPerPage = 5;
            scope.settings.itemsPerPage = itemsPerPage;

            var ctrl = controllerConstructor("ReleaseListCtrl", {
                "$scope": scope,
                "releasesService": releasesServiceMock,
                "batchedListServiceFactory": factorySpy
            });

            expect(factorySpy.calledOnce).toBe(true);
            expect(factorySpy.getCall(0).args.length).toBe(2, "Must invoke batchedListSvc factory with two arguments");
            expect(factorySpy.getCall(0).args[0]).toBe(releasesServiceMock);
            expect(factorySpy.getCall(0).args[1]).toBe(itemsPerPage);
        });
    });

    describe("interactions with batchedListService", function () {

        var ctrl;

        beforeEach(function() {
            ctrl = controllerConstructor("ReleaseListCtrl", {
                "$scope": scope,
                "releasesService": releasesServiceMock,
                "batchedListServiceFactory": batchedListServiceFactoryMock
            });
        });

        it("must invoke loadMore on batchedListService once on initialization", function() {
            var functionSpy = sinon.spy(batchedListSvcMock, "loadMore");

            var ctrl = controllerConstructor("ReleaseListCtrl", {
                "$scope": scope,
                "releasesService": releasesServiceMock,
                "batchedListServiceFactory": batchedListServiceFactoryMock
            });

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("loadMore must invoke batchedListService.loadMore once", function() {
            var functionSpy = sinon.spy(batchedListSvcMock, "loadMore");

            /* load more is called immediately on controller instantiation, therefore
             the spy must be reset before this test
             */
            functionSpy.reset();

            ctrl.loadMore();
            expect(functionSpy.calledOnce).toBe(true);
        });

        it("ctrl.getEntries must invoke batchedListService.getEntries", function() {
            var functionSpy = sinon.spy(batchedListSvcMock, "getEntries");

            var result = ctrl.getEntries();
            expect(functionSpy.calledOnce).toBe(true);
        });

        it("ctrl.getEntries must return value returned by batchedListService.getEntries", function() {
            batchedListSvcMock.entries = [ 711, 667 ];

            var result = ctrl.getEntries();
            expect(result).toBe(batchedListSvcMock.entries);
        });

        it("areMoreItemsAvailable must invoke batchedListService.areMoreItemsAvailable once", function() {
            var functionSpy = sinon.spy(batchedListSvcMock, "areMoreItemsAvailable");

            ctrl.areMoreItemsAvailable();
            expect(functionSpy.calledOnce).toBe(true);
        });

        it("isLoading must invoke batchedListService.isLoading once", function() {
            var functionSpy = sinon.spy(batchedListSvcMock, "isLoading");

            ctrl.isLoading();

            expect(functionSpy.calledOnce).toBe(true);
        });
    });

    describe("interactions with authService", function () {

        var ctrl;

        beforeEach(function() {
            ctrl = controllerConstructor("ReleaseListCtrl", {
                "$scope": scope,
                "releasesService": releasesServiceMock,
                "batchedListServiceFactory": batchedListServiceFactoryMock,
                "authService": authServiceMock
            });
        });

        it("isGodMode must invoke authService.isGodMode once", function() {
            var functionSpy = sinon.spy(authServiceMock, "isGodMode");

            ctrl.isGodMode();

            expect(functionSpy.calledOnce).toBe(true);
        });

        it("isGodMode must return value from authService.isGodMode", function() {
            var returnedValue = ctrl.isGodMode();
            var serviceValue = authServiceMock.isGodMode();
            expect(returnedValue).toBe(serviceValue);
        });
    });


});