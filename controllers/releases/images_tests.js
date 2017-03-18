"use strict";

describe("ReleaseImagesCtrl Tests", function() {
    var controllerConstructor, routeParamsMock, errorMessageSvcMock,
        filePostSvcMock, imgStorageMock, storageSvcMock,
        responseErrorExtractSvcMock;
    var ctrl, imagesUploadUrl = "url/";

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller) {
        controllerConstructor = $controller;

        routeParamsMock = {
            id: "1"
        };

        errorMessageSvcMock = {
            addError: function(e) {},
            clearErrors: function() {}
        };

        filePostSvcMock = {
            post: function() {}
        };

        imgStorageMock = {
            getAll: function() {},
            addArray: function() {},
            reset: function() {}
        };

        storageSvcMock = {
            get: function() {
                return imgStorageMock;
            }
        };

        responseErrorExtractSvcMock = {
            getError: function() {

            }
        };

        ctrl = createController();
    }));

    /**
     * Creates controller with default mocks
     */
    function createController(http) {
        var args = {
            "$routeParams": routeParamsMock,
            "errorMessageSvc": errorMessageSvcMock,
            "filePostSvc": filePostSvcMock,
            "imagesUploadUrl": imagesUploadUrl,
            "storageSvc": storageSvcMock,
            "responseErrorExtractSvc": responseErrorExtractSvcMock
        };
        if (http) {
            args["$http"] = http;
        }

        return controllerConstructor("ReleaseImagesCtrl", args);
    }

    describe("on controller startup", function() {

        describe("image storage", function() {

            var images, storageSvcGetSpy, imgStorageAddArraySpy;

            beforeEach(function() {
                images = [ "img1", "img2" ];
                storageSvcGetSpy = sinon.spy(storageSvcMock, "get");
                imgStorageAddArraySpy = sinon.spy(imgStorageMock, "addArray");
                ctrl = createController();
            });

            it("must get storage from storage service", function() {
                expect(storageSvcGetSpy.calledOnce).toBe(true);
            });

            it("must pass one argument to storageSvc.get", function() {
                expect(storageSvcGetSpy.getCall(0).args.length).toEqual(1);
            });

            it("must pass object id as first argument to storageSvc.get", function() {
                var param = routeParamsMock.id;

                expect(storageSvcGetSpy.getCall(0).args[0]).toEqual(param);
            });

        });

    });

    describe("initial state", function() {

        it("filesToUpload must be an array", function() {
            expect(ctrl.filesToUpload instanceof Array).toBe(true);
        });

        it("filesToUpload must be an empty array", function() {
            expect(ctrl.filesToUpload.length).toBe(0);
        });

        it("isUploadMode must be false", function() {
            var result = ctrl.isUploadMode();

            expect(result).toBe(false);
        });

    });

    describe("methods", function() {

        describe("changeMode", function() {

            it("must change mode to UPLOAD when TRUE is passed in", function() {
                ctrl.changeMode(true);

                var result = ctrl.isUploadMode();

                expect(result).toBe(true);
            });

            it("must change mode to NOT UPLOAD when FALSE is passed in", function() {
                ctrl.changeMode(false);

                var result = ctrl.isUploadMode();

                expect(result).toBe(false);
            });

        });

        describe("addFile", function() {

            it("must add an entry to the filesToUpload array", function() {
                var result = ctrl.addFile();

                expect(ctrl.filesToUpload.length).toBe(1);
            });

            it("must add an object with empty file to the filesToUpload array", function() {
                var file = {
                    file: undefined,
                };

                var result = ctrl.addFile();

                expect(ctrl.filesToUpload[0]).toEqual(file);
            });

        });

        describe("uploadFiles", function() {

            var filePostSvcMockPostSpy;

            beforeEach(function() {
                filePostSvcMockPostSpy = sinon.spy(filePostSvcMock, "post");
            });

            it("must clear errors before posting files", function() {
                var spy = sinon.spy(errorMessageSvcMock, "clearErrors");

                ctrl.uploadFiles();

                expect(spy.calledOnce).toBe(true);
            });

            it("must invoke uploadFiles on filePostSvc", function() {
                ctrl.uploadFiles();

                expect(filePostSvcMockPostSpy.calledOnce).toBe(true);
            });

            it("must invoke uploadFiles on filePostSvc with at least" +
                " two arguments", function()
            {
                ctrl.uploadFiles();

                expect(filePostSvcMockPostSpy.getCall(0).args.length)
                    .toBeGreaterThanOrEqual(2);
            });

            it("must pass file array to uploadFiles", function() {
                var file1 = { file: "file1" };
                ctrl.filesToUpload.push(file1);

                ctrl.uploadFiles();

                var fileArray = filePostSvcMockPostSpy.getCall(0).args[0];

                expect(fileArray).toBe(ctrl.filesToUpload);
            });

            it("must pass url with id to uploadFiles", function() {
                var expectedUrl = imagesUploadUrl + routeParamsMock.id;

                ctrl.uploadFiles();

                var fileArray = filePostSvcMockPostSpy.getCall(0).args[1];

                expect(fileArray).toBe(expectedUrl);
            });

            describe("after file upload", function() {

                describe("on successful upload", function() {

                    var imgArray, response;

                    beforeEach(function() {
                        imgArray =  [
                            { id: 1, url: "url/img1" },
                            { id: 2, url: "url/img2" }
                        ];
                        response = {
                            data: imgArray
                        };

                        filePostSvcMock = {
                            post: function(url, data, success) {
                                success(response);
                            }
                        };

                        ctrl = createController();
                    });

                    it("must add images from response to imgStorage", function() {
                        var imgStorageAddArraySpy = sinon.spy(imgStorageMock, "addArray");

                        ctrl.uploadFiles();

                        expect(imgStorageAddArraySpy.calledOnce).toEqual(true);
                        expect(imgStorageAddArraySpy.getCall(0).args.length).toEqual(1);
                        expect(imgStorageAddArraySpy.getCall(0).args[0]).toEqual(response.data);
                    });

                    it("must clear filesToUpload array", function() {
                        ctrl.filesToUpload.push({ file: "file" });

                        ctrl.uploadFiles();

                        expect(ctrl.filesToUpload.length).toEqual(0);
                    });

                    it("mode must NOT equal UPLOAD", function() {
                        ctrl.changeMode(true);

                        ctrl.uploadFiles();

                        expect(ctrl.isUploadMode()).toEqual(false);
                    });
                });

                describe("on upload failure", function() {

                    var response;

                    beforeEach(function () {
                        response = {
                            msg: "msg"
                        };

                        filePostSvcMock = {
                            post: function(url, data, success, failure) {
                                failure(response);
                            }
                        };

                        ctrl = createController();
                    });

                    it("must extract error from response via responseErrorExtractSvc", function() {
                        var spy = sinon.spy(responseErrorExtractSvcMock, "getError");

                        ctrl.uploadFiles();

                        expect(spy.calledOnce).toBe(true);
                        expect(spy.getCall(0).args.length).toBe(1);
                        expect(spy.getCall(0).args[0]).toBe(response);
                    });

                    it("must invoke errorMessageSvc.addError", function() {
                        var spy = sinon.spy(errorMessageSvcMock, "addError");

                        ctrl.uploadFiles();

                        expect(spy.calledOnce).toBe(true);
                        expect(spy.getCall(0).args.length).toBe(1);
                    });

                    it("must add error returned by responseErrorExtractSvcMock" +
                        " to errorMessageSvc", function()
                    {
                        var spy = sinon.spy(errorMessageSvcMock, "addError");

                        var expectedMsg = { statusText: "great!" };
                        responseErrorExtractSvcMock.getError = function() {
                            return expectedMsg
                        };

                        ctrl.uploadFiles();

                        expect(spy.getCall(0).args[0]).toBe(expectedMsg);
                    });
                });

            });

        });

        describe("getImages", function() {

            it("must call storage.getAll", function() {
                var spy = sinon.spy(imgStorageMock, "getAll");

                ctrl.getImages();

                expect(spy.calledOnce).toBe(true);
            });
        });

        describe("setAsCover", function() {

            var img, imgId, url;

            beforeEach(inject(function(setCoverUrl) {
                imgId = 711;
                img = { id: imgId };
                url = setCoverUrl;

                ctrl = createController();
            }));

            it("must clear error messages", function() {
                var spy = sinon.spy(errorMessageSvcMock, "clearErrors");

                ctrl.setAsCover(img);

                expect(spy.calledOnce).toBe(true);
            });

            it("must post a request to covers services", inject(function($q) {
                var httpMock = {
                    post: function(args) {
                        this.postArgs = args;
                        return $q.defer().promise;
                    },
                };

                var spy = sinon.spy(httpMock, "post");

                ctrl = createController(httpMock);

                ctrl.setAsCover(img);

                expect(spy.calledOnce).toBe(true);
            }));

            it("on success, must set currentCoverId to the id of image " +
                "that was passed in", inject(function($httpBackend)
                {
                    $httpBackend.when("POST", url)
                        .respond("we're cool");

                    ctrl.setAsCover(img);

                    $httpBackend.flush();

                    expect(ctrl.currentCoverId).toBe(imgId);
                }));

            describe("on failue", function() {

                var backend;

                beforeEach(inject(function($httpBackend) {
                    backend = $httpBackend;

                    backend.when("POST", url)
                        .respond(500);
                }));

                it("must extract error from response via responseErrorExtractSvc",
                    function()
                {
                    var spy = sinon.spy(responseErrorExtractSvcMock, "getError");

                    ctrl.setAsCover(img);

                    backend.flush();

                    expect(spy.calledOnce).toBe(true);
                });

                it("must invoke errorMessageSvc.addError", function() {
                    var spy = sinon.spy(errorMessageSvcMock, "addError");

                    ctrl.setAsCover(img);

                    backend.flush();

                    expect(spy.calledOnce).toBe(true);
                    expect(spy.getCall(0).args.length).toBe(1);
                });

                it("must add error returned by responseErrorExtractSvcMock" +
                    " to errorMessageSvc", function()
                {
                    var spy = sinon.spy(errorMessageSvcMock, "addError");

                    var expectedMsg = { statusText: "great!" };
                    responseErrorExtractSvcMock.getError = function() {
                        return expectedMsg
                    };

                    ctrl.setAsCover(img);

                    backend.flush();

                    expect(spy.getCall(0).args[0]).toBe(expectedMsg);
                });
            })

        });

    });

});