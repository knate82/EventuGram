'use strict';

var app = angular.module('Eventugram');

app.controller('ProfileController', ['$scope', 'UserService', 'DialogService', 'HttpService', '$location', function ($scope, UserService, DialogService, HttpService, $location) {
    function getUserProfile() {
        HttpService.getUserProfile()
            .then(function (response) {
                $scope.user = response;

                $scope.posts = response.posts;
                console.log($scope.user)
            });
    }
    getUserProfile();
    $scope.openDialog = function (ev, imageUrl) {
        DialogService.changeProfileImage(ev, imageUrl)
            .then(function () {
                getUserProfile();
            });
    };

    $scope.viewPost = function(id) {
        $location.path('/singlePost/' + id);
    }
}]);