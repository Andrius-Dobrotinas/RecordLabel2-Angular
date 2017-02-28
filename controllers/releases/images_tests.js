"use strict";

describe("ReleaseImagesCtrl Tests", function() {
    var ctrl, routeParamsMock, errorMessageSvcMock, filePostSvcMock;
    var imagesUploadUrl = "url/";

    beforeEach(module("RecordLabel"));

    beforeEach(inject(function($controller) {
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
        ctrl = createController($controller);
    }));

    function createController($controller) {
        return $controller("ReleaseImagesCtrl", {
            "$routeParams": routeParamsMock,
            "errorMessageSvc": errorMessageSvcMock,
            "filePostSvc": filePostSvcMock,
            "imagesUploadUrl": imagesUploadUrl
        });
    }

    describe("initial state", function() {

        it("filesToUpload must be an array", function() {
            expect(ctrl.filesToUpload instanceof Array).toBe(true);
        });

        it("filesToUpload must be an empty array", function() {
            expect(ctrl.filesToUpload.length).toBe(0);
        });

        it("images array must be an array", function() {
            expect(ctrl.images instanceof Array).toBe(true);
        });

        it("images must be an empty array", function() {
            expect(ctrl.images.length).toBe(0);
        });

        it("isUploadMode must be false", function() {
            var result = ctrl.isUploadMode();

            expect(result).toBe(false);
        });

    });

    describe("changeMode", function() {

        it("must change mode to upload when passed in true", function() {
            ctrl.changeMode(true);

            var result = ctrl.isUploadMode();

            expect(result).toBe(true);
        });

        it("must change mode to upload when passed in true", function() {
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

        it("must clear errors before posting files", function() {
            var spy = sinon.spy(errorMessageSvcMock, "clearErrors");

            ctrl.uploadFiles();

            expect(spy.calledOnce).toBe(true);
        });

        it("must invoke uploadFiles on filePostSvc", function() {
            var spy = sinon.spy(filePostSvcMock, "post");

            ctrl.uploadFiles();

            expect(spy.calledOnce).toBe(true);
        });

        it("must invoke uploadFiles on filePostSvc with at least two arguments", function() {
            var spy = sinon.spy(filePostSvcMock, "post");

            ctrl.uploadFiles();

            expect(spy.getCall(0).args.length).toBeGreaterThanOrEqual(2);
        });

        it("must pass file array to uploadFiles", function() {
            var spy = sinon.spy(filePostSvcMock, "post");

            var file1 = { file: "file1" };
            ctrl.filesToUpload.push(file1);

            ctrl.uploadFiles();

            var fileArray = spy.getCall(0).args[0];
            expect(fileArray).toBe(ctrl.filesToUpload);
        });

        it("must pass url with id to uploadFiles", function() {
            var spy = sinon.spy(filePostSvcMock, "post");

            var expectedUrl = imagesUploadUrl + routeParamsMock.id;

            ctrl.uploadFiles();

            var fileArray = spy.getCall(0).args[1];
            expect(fileArray).toBe(expectedUrl);
        });

    });

    describe("after upload", function() {

        it("on upload success, must add img urls to images array", inject(function($controller) {
            var imgArray =  [ "url/img1", "url/img2" ];
            var response = {
                data: imgArray,
                status: 400
            };

            filePostSvcMock = {
                post: function(url, data, success, failure) {
                    success(response);
                }
            };
            ctrl = createController($controller);

            ctrl.uploadFiles();

            expect(ctrl.images).toEqual(imgArray);
        }));

        it("after upload success, mode must NOT upload", inject(function($controller) {
            filePostSvcMock = {
                post: function(url, data, success, failure) {
                    success({ data: []});
                }
            };
            ctrl = createController($controller);

            ctrl.changeMode(true);

            ctrl.uploadFiles();

            expect(ctrl.isUploadMode()).toEqual(false);
        }));

        it("on upload failure, must add error to errorMessageSvc", inject(function($controller) {
            var spy = sinon.spy(errorMessageSvcMock, "addError");

            var response = {
                data: {
                    message: "error message"
                },
                status: 500
            };

            var expectedErrorObject = new RecordLabel.Error(response.data.message, response.status);

            filePostSvcMock = {
                post: function(url, data, success, failure) {
                    failure(response);
                }
            };
            ctrl = createController($controller);

            ctrl.uploadFiles();

            expect(spy.calledOnce).toBe(true);
            expect(spy.getCall(0).args.length).toBe(1);
            expect(spy.getCall(0).args[0]).toEqual(expectedErrorObject);
        }));

    });

});