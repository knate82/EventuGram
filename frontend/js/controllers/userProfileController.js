'use strict';

var app = angular.module('Eventugram');

app.controller('UserProfileController', ['$scope', '$routeParams', '$location', 'FollowerService', 'ProfileService', 'UserService', function ($scope, $routeParams, $location, FollowerService, ProfileService, UserService) {


    $scope.getUser = function () {
        ProfileService.getOtherUsersProfile($routeParams.userId)
            .then(function (user) {
                console.log(user)
                $scope.user = user;
            });
    };
    $scope.getUser();

    $scope.checkFollowStatus = function (id) {
        FollowerService.checkFollowStatus(id)
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

    $scope.toggleFollow = function (user) {
        var loggedInUserId = UserService.getUserId();

        if (user.followers.indexOf(loggedInUserId) < 0)
            user.followers.push(loggedInUserId);
        else
            user.followers.splice(user.followers.indexOf(loggedInUserId), 1);

        FollowerService.toggleFollow(user._id)
            .then(function (response) {
                if (response.code === 0)
                    $scope.button = 'following';
                else
                    $scope.button = 'follow';
            })
    };

    $scope.viewPost = function (id) {
        $location.path('/singlePost/' + id);
    }
}]);