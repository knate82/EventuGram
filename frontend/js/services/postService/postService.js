'use strict';

var app = angular.module('Eventugram');

app.service('PostService', ['$http', function ($http) {
    this.getFollowingPosts = function () {
        return $http.get('/api/post/')
            .then(function (response) {
                return response.data;
            })
    };

    this.getOnePost = function (id) {
        return $http.get('/api/post/' + id)
            .then(function (response) {
                return response.data;
            });
    };

    this.addComment = function (comment, id) {
        return $http.put('/api/post/' + id + '/comment', comment)
            .then(function (response) {
                return response.data;
            });
    };

    this.toggleLike = function (id) {
        return $http.put('/api/post' + id + '/like/');
    }
}]);