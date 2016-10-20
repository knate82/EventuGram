'use strict';

var app = angular.module('Eventugram');

app.controller('MessageController', ['$scope', '$location', 'MessageService', 'ProfileService', function ($scope, $location, MessageService, ProfileService) {

    function getProfileInfo() {
        ProfileService.getFollowing()
            .then(function (response) {
                $scope.allUsers = response.following.map(function (a) {
                    return a;
                });
            });
    }

    function getConversations() {
        MessageService.getConversations()
            .then(function(response) {
                $scope.conversations = response;
            })
    }

    if ($location.path() === '/messages')
        getConversations();

    if ($location.path() === '/newmessage')
        getProfileInfo();


    $scope.messageObj = {};


    $scope.recipientSearch = function () {
        return $scope.allUsers;
    };

    $scope.selectUser = function (recipient) {
        $scope.newMessage = !$scope.newMessage;
        $scope.recipient = recipient;
    };

    $scope.sendMessage = function (userId) {
        $scope.messageObj.message.recipient = userId;
        console.log($scope.messageObj.message);

        MessageService.sendNewMessage($scope.messageObj)
            .then(function (response) {
                $location.path('/messages');
                console.log(response);
            });
    };

    $scope.viewConversation = function(id) {
        $location.path('/conversation/' + id)
    }

}]);