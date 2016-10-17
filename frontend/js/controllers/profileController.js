'use strict';

var app = angular.module('Eventugram');

app.controller('ProfileController', ['$scope', 'UserService', 'DialogService', 'HttpService', function ($scope, UserService, DialogService, HttpService) {
    function getUserProfile() {
        HttpService.getUserProfile()
            .then(function (response) {
                $scope.user = response;
            });
    }
    getUserProfile();
    $scope.openDialog = function (ev, imageUrl) {
        DialogService.changeProfileImage(ev, imageUrl)
            .then(function () {
                getUserProfile();
            });
    };
}]);