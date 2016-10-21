'use strict';

var app = angular.module('Eventugram');

app.controller('SinglePostController', ['$scope', '$routeParams', '$timeout', '$location', 'PostService', 'UserService', function ($scope, $routeParams, $timeout, $location, PostService, UserService) {

    (function () {
        PostService.getOnePost($routeParams.postId)
            .then(function (response) {
                $scope.post = response;
                $scope.didUserLike = function (likes) {
                    var user = UserService.getUserId();

                    if (likes.indexOf(user) >= 0)
                        return true;
                    else
                        return false;
                };

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

    $scope.likePost = function (post, id) {
        PostService.toggleLike(id);

        var liked = $scope.didUserLike(post.likes);
        var like = UserService.getUserId();
        if (!liked) {
            post.likes.push(like);
            post.doubleClick = true;
        } else {
            post.likes.splice(post.likes.indexOf(like));
        }

        $timeout(function () {
            post.doubleClick = false;
        }, 1000);
    };

    $scope.options = [
        {
            name: 'delete',
            use: function (id) {
                PostService.deletePost(id)
                    .then(function (response) {
                        $location.path('/main')
                    })
            }
        }
    ];


}]);