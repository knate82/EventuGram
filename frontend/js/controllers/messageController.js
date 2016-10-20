'use strict';

var app = angular.module('Eventugram');

app.controller('MessageController', ['$scope', 'MessageService', 'ProfileService', 'UserService', function ($scope, MessageService, ProfileService, UserService) {

    function getProfileInfo() {
        ProfileService.getFollowing()
            .then(function (response) {
                $scope.allUsers = response.following.map(function(a) {
                    return a;
                });
            });
    }

    getProfileInfo();

    $scope.recipientSearch = function (query) {
        return $scope.allUsers;
    };

    $scope.sendMessage = function(userId) {
        console.log(userId)
    }
}]);