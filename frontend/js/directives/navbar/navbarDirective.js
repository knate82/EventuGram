'use strict';

var app = angular.module('Eventugram');

app.directive('navbar', ['UserService', function (UserService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/navbar/navbar.html',
        link: function(scope) {
            scope.userService = UserService;
        }
    }
}]);