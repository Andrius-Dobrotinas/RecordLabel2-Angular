"use strict";

describe("ReleaseViewCtrl Tests", function() {
	var controllerConstructor, scope, rootScope, q, referenceUrlTrustService;
	var routeParams, mockModel;
	var resourceErrorHandlerMock, releasesServiceMock;
	
	beforeEach(module("RecordLabel"));

	// Mock $sce service that referenceUrlTrustService is dependant on
	beforeEach(module(function($provide) {
		$provide.service("$sce", function() {
            this.trustAsResourceUrl = function() {}
		});
	}));
	
	beforeEach(inject(function($controller, $rootScope, $q, _referenceUrlTrustService_) {
		controllerConstructor = $controller;
		scope = $rootScope.$new();
		rootScope = $rootScope;
		q = $q;
		referenceUrlTrustService = _referenceUrlTrustService_;

		resourceErrorHandlerMock = function(promise) {
			return promise;
		};

		releasesServiceMock = {
			get: function() {}
		};

		routeParams = { id: 2 };

		mockModel = sinon.stub({
			id: 711,
            title: "The Ramones",
			youtubeReferences: [ { target: "https://youtube.com/asd" } ]
		});
		
		/*$httpBackend.whenGET("/api/metadata/get").respond(function(method, url) {
			return null;
		});*/
	}));

	it("must call releasesService.get with an object containing id property" +
        " with value from routeParams", function() {
		var promiseObj = TestUtilities
            .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");
		var releasesServiceSpy = sinon.spy(releasesServiceMock, "get");

		var ctrl = controllerConstructor("ReleaseViewCtrl", {
		"$scope": scope, "$routeParams": routeParams,
			"releasesService": releasesServiceMock,
			"resourceErrorHandler": resourceErrorHandlerMock,
			"referenceUrlTrustService": referenceUrlTrustService
		});

		var params = { id: routeParams.id };

		expect(releasesServiceSpy.calledOnce).toBe(true);
		expect(releasesServiceSpy.getCall(0).args[0]).toEqual(params);
	});

	it("must use resourceErrorHandler", function() {
		var resourceErrorHandlerSpy = sinon.spy(resourceErrorHandlerMock);
		var promiseObj = TestUtilities
            .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");

		var ctrl = controllerConstructor("ReleaseViewCtrl", {
			"$scope": scope, "$routeParams": routeParams,
			"releasesService": releasesServiceMock,
			"resourceErrorHandler": resourceErrorHandlerSpy,
			"referenceUrlTrustService": referenceUrlTrustService
		});

		expect(resourceErrorHandlerSpy.calledWith(promiseObj.promise)).toBe(true);
	});

	it("must assign model from the backend to scope.model", function() {
		var promiseObj = TestUtilities
            .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");

		var ctrl = controllerConstructor("ReleaseViewCtrl", {
			"$scope": scope, "$routeParams": routeParams,
			"releasesService": releasesServiceMock,
			"resourceErrorHandler": resourceErrorHandlerMock,
			"referenceUrlTrustService": referenceUrlTrustService
		});

		promiseObj.resolve(mockModel);
		rootScope.$apply();

		expect(scope.model).toBe(mockModel);
	});

    it("must add youtubeReferences to scope.model", function() {
        var promiseObj = TestUtilities
            .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");

        var ctrl = controllerConstructor("ReleaseViewCtrl", {
            "$scope": scope, "$routeParams": routeParams,
            "releasesService": releasesServiceMock,
            "resourceErrorHandler": resourceErrorHandlerMock,
            "referenceUrlTrustService": referenceUrlTrustService
        });

        promiseObj.resolve(mockModel);
        rootScope.$apply();

        expect(scope.model["youtubeReferences"]).toBe(mockModel.youtubeReferences);
    });

	it("must use referenceUrlTrustService for model.youtubeReferences " +
        "when the property is trueish", function() {
		var promiseObj = TestUtilities
            .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");
		var trustUrlsStub = sinon.stub(referenceUrlTrustService, "trustUrls");

		var ctrl = controllerConstructor("ReleaseViewCtrl", {
			"$scope": scope, "$routeParams": routeParams,
			"releasesService": releasesServiceMock,
			"resourceErrorHandler": resourceErrorHandlerMock,
			"referenceUrlTrustService": referenceUrlTrustService
		});

		promiseObj.resolve(mockModel);
		rootScope.$apply();

		expect(trustUrlsStub.calledWith(mockModel.youtubeReferences)).toBe(true);
	});

	it("must not use referenceUrlTrustService for model.youtubeReferences " +
        "when the property is falsish", function() {
		var promiseObj = TestUtilities
            .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");
		var trustUrlsStub = sinon.stub(referenceUrlTrustService, "trustUrls");

		var ctrl = controllerConstructor("ReleaseViewCtrl", {
			"$scope": scope, "$routeParams": routeParams,
			"releasesService": releasesServiceMock,
			"resourceErrorHandler": resourceErrorHandlerMock,
			"referenceUrlTrustService": referenceUrlTrustService
		});

		mockModel.youtubeReferences = null;

		promiseObj.resolve(mockModel);
		rootScope.$apply();

		expect(trustUrlsStub.called).toBe(false);
	});

	describe("IsLoading tests", function() {
		it("must must report that it's loading", function () {
			var promiseObj = TestUtilities
                .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");

			var ctrl = controllerConstructor("ReleaseViewCtrl", {
				"$scope": scope, "$routeParams": routeParams,
				"releasesService": releasesServiceMock,
				"resourceErrorHandler": resourceErrorHandlerMock,
				"referenceUrlTrustService": referenceUrlTrustService
			});

			expect(ctrl.isLoading()).toBe(true);
		});

		it("must must report that it's not loading", function () {
			var promiseObj = TestUtilities
                .injectPromiseIntoServiceMock(q, releasesServiceMock, "get");

			var ctrl = controllerConstructor("ReleaseViewCtrl", {
				"$scope": scope, "$routeParams": routeParams,
				"releasesService": releasesServiceMock,
				"resourceErrorHandler": resourceErrorHandlerMock,
				"referenceUrlTrustService": referenceUrlTrustService
			});

			promiseObj.resolve();

			expect(ctrl.isLoading()).toBe(false);
		});
	});
});