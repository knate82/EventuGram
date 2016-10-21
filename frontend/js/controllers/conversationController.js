'use strict';

var app = angular.module('Eventugram');

app.controller('ConversationController', ['$scope', '$routeParams', '$timeout', 'MessageService', 'UserService', function ($scope, $routeParams, $timeout, MessageService, UserService) {

    function scrollToBottom() {
        var chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    $timeout(scrollToBottom, 100);

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
        var message = angular.copy($scope.messageObj);
        $scope.conversation.messages.push(message);
        newMessageForm.reset();

        MessageService.sendNewMessage($scope.messageObj)
            .then(function (response) {
                scrollToBottom();
            });
    };
}]);