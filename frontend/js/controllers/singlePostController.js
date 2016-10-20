'use strict';

var app = angular.module('Eventugram');

app.controller('SinglePostController', ['$scope', '$routeParams', 'PostService', 'UserService', function ($scope, $routeParams, PostService, UserService) {

    (function () {
        PostService.getOnePost($routeParams.postId)
            .then(function (response) {
                $scope.post = response;
                console.log(response)
            })
    }());

    $scope.addComment = function (post, id) {
        PostService.addComment(post.newComment, id)
            .then(function (response) {
                if (response) {
                    var comment = {
                        user: {
                            username: UserService.getUsername()
                        },
                        comment: response
                    };
                    $scope.post.comments.push(comment);
                }
            });
        post.newComment = '';
    };

}]);