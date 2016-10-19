'use strict';

var app = angular.module('Eventugram');

app.controller('MainController', ['$scope', '$mdBottomSheet', 'PostService', 'UserService', function ($scope, $mdBottomSheet, PostService, UserService) {
    $scope.showGridBottomSheet = function () {
        $mdBottomSheet.show({
            templateUrl: '/js/controllers/bottomSheetController/bottomSheet.html',
            controller: 'BottomSheetController',
            clickOutsideToClose: true
        });
    };

    (function getPosts() {
        PostService.getFollowingPosts()
            .then(function (response) {
                $scope.posts = response;
                console.log(response)
            });
    }());

    $scope.addComment = function (post, id, index) {
        PostService.addComment(post.newComment, id)
            .then(function (response) {
                if (response) {
                    var comment = {
                        user: {
                            username: UserService.getUsername()
                        },
                        comment: response
                    };
                    $scope.posts[index].comments.unshift(comment);
                }
            });
        post.newComment = '';
    }
}]);
