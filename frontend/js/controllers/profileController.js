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

    $scope.editProfile = function () {
        $scope.editUser.username = $scope.editUser.userDisplayName;

        $scope.editUser.username = $scope.editUser.username.toLowerCase();

        HttpService.editUserProfile($scope.editUser).then(function (response) {
            if (response) {
                $scope.user = response;
                $location.path('/profile');
            } else {
                alert("We can not reach the server at this time.  Please try again later.");
            }
        })
    };


    $scope.viewPost = function (id) {
        $location.path('/singlePost/' + id);
    }
}]);