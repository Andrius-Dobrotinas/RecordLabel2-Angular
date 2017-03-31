"use strict";

describe("ReleaseEditCtrl Tests", function() {
    var controllerConstructor, scope, rootScope, q, routeParamsWithId,
        routeParamsEmpty;

    var resourceErrorHandlerMock, resourcePostSvcMock,
        constantsServiceMock, releasesServiceMock, artistsServiceMock,
        mediaTypesServiceMock, imagesResourceMock, releaseTemplate,
        arrayStorageMock, arrayStorageSvcMock, formValidationServiceMock;

    var constantsGetPromise, mediaTypesQueryPromise, artistsGetListPromise,
        imagesQueryPromise, releasesGetForEditPromise, releasesGetTemplatePromise;

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller, $rootScope, $q) {
        controllerConstructor = $controller;
        scope = $rootScope.$new();
        rootScope = $rootScope;
        q = $q;

        resourceErrorHandlerMock = function(promise) {
            return promise;
        };

        resourcePostSvcMock = function(promise) {
            return promise;
        };

        constantsServiceMock = {
            get: function() {}
        };

        releasesServiceMock = {
            getForEdit: function() {},
            getTemplate: function() {}
        };

        artistsServiceMock = {
            getList: function() {}
        };

        mediaTypesServiceMock = {
            query: function() {}
        };

        imagesResourceMock = {
            query: function() {}
        };

        arrayStorageMock = {
            getAll: function() {},
            addArray: function() {},
            reset: function() {}
        };

        arrayStorageSvcMock = {
            get: function() {
                return arrayStorageMock;
            }
        };

        formValidationServiceMock = {
            isInvalidForRequired: function() {},
            isEmptyForRequired: function() {}
        };

        releaseTemplate = { artistId: 1, mediaId: 2 };

        routeParamsWithId = { id: "1" };
        routeParamsEmpty = {};

        constantsGetPromise = TestUtilities.injectPromiseIntoServiceMock(q, constantsServiceMock, "get");
        mediaTypesQueryPromise = TestUtilities.injectPromiseIntoServiceMock(q, mediaTypesServiceMock, "query");
        artistsGetListPromise = TestUtilities.injectPromiseIntoServiceMock(q, artistsServiceMock, "getList");
        releasesGetForEditPromise = TestUtilities.injectPromiseIntoServiceMock(q, releasesServiceMock, "getForEdit");
        releasesGetTemplatePromise = TestUtilities.injectPromiseIntoServiceMock(q, releasesServiceMock, "getTemplate");
        imagesQueryPromise = TestUtilities.injectPromiseIntoServiceMock(q, imagesResourceMock, "query");
    }));

    /**
     * Instantiates a controller with default mocks or optionally uses those
     * supplied in the arguments object
     */
    function createController(argsObject) {
        if (!argsObject) argsObject = {};

        return controllerConstructor("ReleaseEditCtrl",
            {
                "$scope": argsObject["$scope"]
                    ? argsObject["$scope"] : scope,

                "$routeParams": argsObject["$routeParams"]
                    ? argsObject["$routeParams"] : routeParamsWithId,

                "releasesService": argsObject["releasesService"]
                    ? argsObject["releasesService"] : releasesServiceMock,

                "artistsService": argsObject["artistsService"]
                    ? argsObject["artistsService"] : artistsServiceMock,

                "mediaTypesService": argsObject["mediaTypesService"]
                    ? argsObject["mediaTypesService"] : mediaTypesServiceMock,

                "constantsService": argsObject["constantsService"]
                    ? argsObject["constantsService"] : constantsServiceMock,

                "resourceErrorHandler": argsObject["resourceErrorHandler"]
                    ? argsObject["resourceErrorHandler"] : resourceErrorHandlerMock,

                "resourcePostSvc": argsObject["resourcePostSvc"]
                    ? argsObject["resourcePostSvc"] : resourcePostSvcMock,

                "formValidationService": argsObject["formValidationService"]
                    ? argsObject["formValidationService"] : formValidationServiceMock,

                "arrayStorageSvc": argsObject["arrayStorageSvc"]
                    ? argsObject["arrayStorageSvc"] : arrayStorageSvcMock,

                "imagesResource": argsObject["imagesResource"]
                    ? argsObject["imagesResource"] : imagesResourceMock
            });
    }

    describe("on controller startup", function() {

        describe("always", function() {

            it("must call constantsService.get once when editing", function() {
                var serviceFunctionSpy = sinon.spy(constantsServiceMock, "get");

                var ctrl = createController();

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must call constantsService.get once when creating new", function() {
                var serviceFunctionSpy = sinon.spy(constantsServiceMock, "get");

                var ctrl = createController({ $routeParams: routeParamsEmpty });

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must use resourceErrorHandler for constantsService.get", function() {
                var resourceErrorHandlerMockSpy = sinon.spy(resourceErrorHandlerMock);

                var ctrl = createController( {
                    resourceErrorHandler: resourceErrorHandlerMockSpy });

                expect(resourceErrorHandlerMockSpy
                    .calledWith(constantsGetPromise.promise)).toBe(true);
                expect(scope.constants).toBe(constantsGetPromise.promise,
                    "constants variable must be assigned a value returned from the service");
            });

            it("must call mediaTypesService.query once when editing", function() {
                var serviceFunctionSpy = sinon.spy(mediaTypesServiceMock, "query");

                var ctrl = createController();

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must call mediaTypesService.query once when creating new", function() {
                var serviceFunctionSpy = sinon.spy(mediaTypesServiceMock, "query");

                var ctrl = createController({ $routeParams: routeParamsEmpty });

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must use resourceErrorHandler for mediaTypesService.query", function() {
                var resourceErrorHandlerMockSpy = sinon.spy(resourceErrorHandlerMock);

                var ctrl = createController({
                    resourceErrorHandler: resourceErrorHandlerMockSpy});

                expect(resourceErrorHandlerMockSpy
                    .calledWith(mediaTypesQueryPromise.promise)).toBe(true);
                expect(scope.mediaTypes).toBe(mediaTypesQueryPromise.promise,
                    "mediaTypes variable must be assigned a value returned from the service");
            });

            it("must call artistsService.getList once when editing", function() {
                var serviceFunctionSpy = sinon.spy(artistsServiceMock, "getList");

                var ctrl = createController();

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must call artistsService.getList once creating new", function() {
                var serviceFunctionSpy = sinon.spy(artistsServiceMock, "getList");

                var ctrl = createController({ $routeParams: routeParamsEmpty });

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must use resourceErrorHandler for artistsService.getList", function() {
                var resourceErrorHandlerMockSpy = sinon.spy(resourceErrorHandlerMock);

                var ctrl = createController({
                    resourceErrorHandler: resourceErrorHandlerMockSpy});

                expect(resourceErrorHandlerMockSpy
                    .calledWith(artistsGetListPromise.promise)).toBe(true);
                expect(scope.artists).toBe(artistsGetListPromise.promise,
                    "artists variable must be assigned a value returned from the service");
            });
        });

        describe("when creating New", function() {

            it("must call releasesService.getTemplate once", function() {
                var serviceFunctionSpy = sinon.spy(releasesServiceMock, "getTemplate");

                var ctrl = createController({ $routeParams: routeParamsEmpty });

                expect(serviceFunctionSpy.calledOnce).toBe(true);
            });

            it("must NOT interact with imagesResource", function() {
                var spy = sinon.spy(imagesResourceMock, "query");

                var ctrl = createController({ $routeParams: routeParamsEmpty });

                expect(spy.calledOnce).toBe(false);
            });

        });

        describe("when Editing", function() {

            it("must call releasesService.getForEdit with object containing Id from route params", function() {
                var params = { id: routeParamsWithId.id };

                var serviceFunctionSpy = sinon.spy(releasesServiceMock, "getForEdit");

                var ctrl = createController();

                expect(serviceFunctionSpy.calledOnce).toBe(true);
                expect(serviceFunctionSpy.getCall(0).args[0]).toEqual(params);
                expect(scope.model).toBe(releasesGetForEditPromise.promise,
                    "model variable must be assigned a value returned from the service");
            });

            /**
             * TODO: This test seems terribly wrong because it depends on the implementation of
             * ReleasesService... Maybe I should create a separate service that assigns artistId
             * and mediaId null values and verify that it was called? Seems a bit overkill to
             * write a SERVICE just for THAT...
             *
             * The problem with testing this is that when data is modified in "then", it is assigned
             * to whatever that promise is assigned to. Mocking this behavior appears to be not
             * a simple task.
             */
            it("must assign nulls to retrieved model's artistId and mediaId " +
                "in order for Artist and MediaType Select element validations to work",
                inject(function($httpBackend, releasesService) {

                    var ctrl = createController({
                        $routeParams: routeParamsEmpty,
                        releasesService: releasesService
                    });

                    // TODO: inject this url
                    $httpBackend.when('GET', '/api/releases/getTemplate')
                        .respond(releaseTemplate);
                    $httpBackend.flush();

                    expect(scope.model.artistId).toBe(null);
                    expect(scope.model.mediaId).toBe(null);
                }));


            describe("imagesResource", function() {

                it("must get images via imagesResource.query", function() {
                    var spy = sinon.spy(imagesResourceMock, "query");

                    var ctrl = createController();

                    expect(spy.calledOnce).toBe(true);
                });

                it("must use resourceErrorHandler for imagesResource.query", function() {
                    var resourceErrorHandlerMockSpy = sinon.spy(resourceErrorHandlerMock);

                    var ctrl = createController(
                        { resourceErrorHandler: resourceErrorHandlerMockSpy });

                    expect(resourceErrorHandlerMockSpy
                        .calledWith(imagesQueryPromise.promise)).toBe(true);
                });

                describe("on success", function() {
                    var ctrl, arrayStorageSvcGetSpy, arrayManagerAddArraySpy;
                    var images;

                    beforeEach(function() {
                        images = [ "img1", "img2" ];
                        arrayStorageSvcGetSpy = sinon.spy(arrayStorageSvcMock, "get");
                        arrayManagerAddArraySpy = sinon.spy(arrayStorageMock, "addArray");

                        var ctrl = createController();

                        imagesQueryPromise.resolve(images);

                        scope.$apply();
                    });

                    it("must get storage from storage service", function() {
                        expect(arrayStorageSvcGetSpy.calledOnce).toEqual(true);
                    });

                    it("must pass two arguments to arrayStorageSvc.get", function() {
                        expect(arrayStorageSvcGetSpy.getCall(0).args.length).toEqual(2);
                    });

                    it("must pass object id as first argument to arrayStorageSvc.get", function() {
                        var param = routeParamsWithId.id;

                        expect(arrayStorageSvcGetSpy.getCall(0).args[0]).toEqual(param);
                    });

                    it("must pass scope as second argument arrayStorageSvc.get", function() {
                        expect(arrayStorageSvcGetSpy.getCall(0).args[1]).toBe(scope);
                    });

                    it("must add images to storage", function() {
                        expect(arrayManagerAddArraySpy.calledOnce).toBe(true);
                    });

                    it("must place images from response to storage", function() {
                        expect(arrayManagerAddArraySpy.getCall(0).args[0]).toBe(images);
                    });
                });

            });

        });

    });

    describe("getters", function() {

        describe("isNew", function() {

            it("must indicate NOT New when route params contain Id property with value", function() {
                var ctrl = createController();

                expect(ctrl.isNew).toBe(false);
            });

            it("must indicate New when route params don't contain Id property with value", function() {
                var ctrl = createController({ $routeParams: routeParamsEmpty });

                expect(ctrl.isNew).toBe(true);
            });
        });

        describe("isLoading tests", function() {

            describe("must indicate FALSE when...", function() {

                it("...all promises are resolved in case of EDIT", function() {
                    var ctrl = createController();

                    constantsGetPromise.resolve();
                    artistsGetListPromise.resolve();
                    mediaTypesQueryPromise.resolve();

                    releasesGetForEditPromise.resolve();
                    imagesQueryPromise.resolve();

                    scope.$apply();

                    expect(ctrl.isLoading()).toBe(false);
                });

                it("...all promises are resolved in case of NEW", function() {
                    var ctrl = createController({ $routeParams: routeParamsEmpty});

                    constantsGetPromise.resolve();
                    artistsGetListPromise.resolve();
                    mediaTypesQueryPromise.resolve();

                    releasesGetTemplatePromise.resolve(releaseTemplate);

                    scope.$apply();

                    expect(ctrl.isLoading()).toBe(false);
                });
            });

            describe("must indicate TRUE when at least one promise is not resolved", function() {

                var ctrl;

                describe("when NOT isNew", function() {

                    beforeEach(function() {
                        ctrl = createController();
                    });

                    it("releases.getForEdit", function() {
                        constantsGetPromise.resolve();
                        artistsGetListPromise.resolve();
                        mediaTypesQueryPromise.resolve();

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });

                    it("mediaTypes.query", function() {
                        var ctrl = createController();

                        constantsGetPromise.resolve();
                        artistsGetListPromise.resolve();
                        releasesGetForEditPromise.resolve();

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });

                    it("artists.getList", function() {
                        var ctrl = createController();

                        constantsGetPromise.resolve();
                        mediaTypesQueryPromise.resolve();
                        releasesGetForEditPromise.resolve();

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });

                    it("constants.get", function() {
                        var ctrl = createController();

                        artistsGetListPromise.resolve();
                        mediaTypesQueryPromise.resolve();
                        releasesGetForEditPromise.resolve();

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });

                    it("images.query)", function() {
                        var ctrl = createController();

                        artistsGetListPromise.resolve();
                        mediaTypesQueryPromise.resolve();
                        releasesGetForEditPromise.resolve();
                        constantsGetPromise.resolve();

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });
                });

                describe("when isNew", function() {

                    beforeEach(function() {
                        ctrl = createController({ $routeParams: routeParamsEmpty});
                    });

                    it("mediaTypes.query", function() {
                        constantsGetPromise.resolve();
                        artistsGetListPromise.resolve();
                        //releasesGetForEditPromise.resolve();
                        releasesGetTemplatePromise.resolve(releaseTemplate);

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });

                    it("artists.getList", function() {
                        constantsGetPromise.resolve();
                        mediaTypesQueryPromise.resolve();
                        //releasesGetForEditPromise.resolve();
                        releasesGetTemplatePromise.resolve(releaseTemplate);

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });

                    it("constants.get", function() {
                        artistsGetListPromise.resolve();
                        mediaTypesQueryPromise.resolve();
                        //releasesGetForEditPromise.resolve();
                        releasesGetTemplatePromise.resolve(releaseTemplate);

                        scope.$apply();

                        expect(ctrl.isLoading()).toBe(true);
                    });
                });







            });

            it("must indicate TRUE when no promises are resolved", function() {
                var ctrl = createController();

                expect(ctrl.isLoading()).toBe(true);
            });
        });

    });

    describe("form tests", function() {

        it("isInvalidForRequired must invoke formValidationService.isInvalidForRequired with the passed in argument", function() {
            var isInvalidForRequiredSpy = sinon.spy(formValidationServiceMock, "isInvalidForRequired");
            var formField = { value: "Slayer" };

            var ctrl = createController();

            ctrl.isInvalidForRequired(formField);

            expect(isInvalidForRequiredSpy.calledOnce).toBe(true);
            expect(isInvalidForRequiredSpy.getCall(0).args[0]).toBe(formField);
        });

        it("isEmptyForRequired must invoke formValidationService.isEmptyForRequired with the passed in argument", function() {
            var isEmptyForRequiredSpy = sinon.spy(formValidationServiceMock, "isEmptyForRequired");
            var formField = { value: "Slayer"};

            var ctrl = createController();

            ctrl.isEmptyForRequired(formField);

            expect(isEmptyForRequiredSpy.calledOnce).toBe(true);
            expect(isEmptyForRequiredSpy.getCall(0).args[0]).toBe(formField);
        });
    });

});