'use strict';

var app = angular.module('Eventugram');

app.service('PostService', ['$http', function ($http) {
    this.getFollowingPosts = function () {
        return $http.get('/api/post/friends/')
            .then(function (response) {
                return response.data;
            })
    };

    this.getOnePost = function (id) {
        var defaultImage = '/assets/images/DefaultProf.png';
        var post = {};
        return $http.get('/api/post/posts/' + id)
            .then(function (response) {
                post = response.data;

                if (post.user.profileImage !== defaultImage) {
                    return $http.get('/api/user/profileimage/get/' + post.user._id)
                        .then(function (response) {
                            post.user.profileImage = response.data.profileImage;
                            return post;
                        });
                } else {
                    return user;
                }
            });
    };

    this.addComment = function (comment, id) {
        return $http.put('/api/post/posts/' + id, comment)
            .then(function (response) {
                return response.data;
            });
    }
}]);