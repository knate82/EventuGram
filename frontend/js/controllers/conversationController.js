'use strict';

var app = angular.module('Eventugram');

app.controller('ConversationController', ['$scope', '$routeParams', '$timeout', 'MessageService', 'UserService', function ($scope, $routeParams, $timeout,MessageService, UserService) {

    function scrollToBottom() {
        document.getElementById('sendMessage').scrollIntoView()
    }
    $timeout(scrollToBottom, 200);

    MessageService.getOneConversation($routeParams.id)
        .then(function (response) {
            var conversation = $scope.conversation = response;
            $scope.recipient = (conversation.users[0]._id === UserService.getUserId()) ?
                conversation.users[1] : conversation.users[0];
            $scope.user = (conversation.users[0]._id === UserService.getUserId()) ?
                conversation.users[0] : conversation.users[1];
        });

    $scope.sendNewMessage = function (userId) {
        $scope.messageObj.message.recipient = userId;
        $scope.messageObj.message.user = $scope.user;
        $scope.conversation.messages.push($scope.messageObj);

        console.log($scope.messageObj);
        MessageService.sendNewMessage($scope.messageObj)
            .then(function (response) {
                console.log(response);
            });
    };

}]);