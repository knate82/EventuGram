'use strict';

var app = angular.module('Eventugram');

app.controller('MainController', ['$scope', '$rootScope', '$mdBottomSheet', '$timeout', 'PostService', 'UserService', function ($scope, $rootScope, $mdBottomSheet, $timeout, PostService, UserService) {
    $scope.showGridBottomSheet = function () {
        $mdBottomSheet.show({
            templateUrl: '/js/controllers/bottomSheetController/bottomSheet.html',
            controller: 'BottomSheetController',
            clickOutsideToClose: true
        });
    };

    function getPosts() {
        PostService.getFollowingPosts()
            .then(function (response) {
                $scope.posts = response;
                console.log(response)
            });
    };
    getPosts();

    $rootScope.$on('refreshPosts', getPosts);

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
                    $scope.posts[index].comments.push(comment);
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

    $scope.didUserLike = function (likes) {
        var user = UserService.getUserId();
        if (likes.indexOf(user) >= 0)
            return true;
        else
            return false;
    };

    $scope.options = [
        {
            name: 'delete',
            use: function (id) {
                PostService.deletePost(id)
                    .then(function (response) {
                        getPosts();
                    })
            }
        }
    ];

}]);
