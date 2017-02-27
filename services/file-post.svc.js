"use strict";

(function () {

    angular.module("RecordLabel").factory("filePostSvc", ["$http",
        function($http) {

            var post = function(filesToUpload, url, success, failure) {

                // Create a form
                var formData = new FormData();
                filesToUpload.forEach(function(entry) {
                    formData.append('file', entry.file);
                });

                $http.post(url, formData, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(success, failure);
            };

            return {
                post: post
            }
        }]);

})();