'use strict';

var app = angular.module('Eventugram');

app.directive('navbar', ['UserService', function (UserService) {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/navbar/navbar.html',
        link: function (scope) {
            scope.userService = UserService;
        },
        controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
            $scope.querySearch = function (query) {
                return $http.get("/api/user/getAll", {params: {username: query}})
                    .then(function (response) {
                        return response.data;
                    })
            };

            $scope.goToProfile = function(id) {
                if (!id)
                    return;
                $location.path('/user/' + id);
            };
        }]
    }
}]);