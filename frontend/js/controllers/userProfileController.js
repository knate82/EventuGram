'use strict';

var app = angular.module('Eventugram');

app.controller('UserProfileController', ['$scope', '$routeParams', 'HttpService', function ($scope, $routeParams, HttpService) {
    searchUserForm.reset();

    $scope.getUser = function () {
        HttpService.getOtherUsersProfile($routeParams.userId)
            .then(function (user) {
                $scope.user = user;
                $scope.profileImage = user.profileImageRaw || user.profileImage;
            });
    };
    $scope.getUser();

    $scope.checkFollowStatus = function (id) {
        HttpService.checkFollowStatus(id)
            .then(function (response) {
                if (response.message) {
                    $scope.button = 'follow'
                } else {
                    $scope.button = 'following';
                }
            })
    };

    $scope.checkFollowStatus($routeParams.userId);

    $scope.notMyProfile = function (id) {
        if (localStorage['loggedInUserId'] === id) {
            return false;
        }
        return true;
    };

    $scope.addFriend = function (id) {
        HttpService.addFriend(id)
            .then(function (response) {
                console.log(response)
                if (response.code === 0)
                    $scope.button = 'following';
                else
                    $scope.button = 'follow';
            })
    };
}]);