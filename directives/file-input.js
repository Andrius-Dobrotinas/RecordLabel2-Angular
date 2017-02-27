"use strict";

angular.module("RecordLabel").directive("fileInput", [function () {
    return {
        restrict: "EA",
        scope: {
            destination: "="
        },
        link: function(scope, element, attrs) {
            element.on('change', function() {
                scope.$apply(function() {
                    scope.destination = element[0].files.length > 0
                        ? element[0].files[0]
                        : null;
                });
            });
        }
    };
}]);