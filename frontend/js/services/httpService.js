'use strict';

var app = angular.module('Eventugram');

app.service('HttpService', ['$http', function ($http) {
    var defaultImage = '/assets/images/DefaultProf.png';

    this.getUserProfile = function () {
        var user = {};
        return $http.get('/api/user/profile')
            .then(function (response) {
                user = response.data;

                if (user.profileImage !== defaultImage) {
                    return $http.get('/api/user/profileimage/get/' + user._id)
                        .then(function (response) {
                            user.profileImage = response.data.profileImage;

                            return user;
                        })
                } else {
                    return user;
                }
            });
    };

    this.getOnePost = function (id) {
        var post = {};
        return $http.get('/api/post/' + id)
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

    this.getAllUsers = function () {
        return $http.get('/api/user/getAll')
            .then(function (response) {
                return response.data;
            })
    };

    this.getOtherUsersProfile = function (id) {
        var user = {};
        return $http.get('/api/user/' + id)
            .then(function (response) {
                user = response.data;
                if (user.profileImage) {
                    if (user.profileImage !== defaultImage) {
                        return $http.get('/api/user/profileimage/get/' + user._id)
                            .then(function (response) {
                                user.profileImage = response.data.profileImage;

                                return user;
                            })
                    } else {
                        return user;
                    }
                }
            });
    };

    this.addFriend = function (id) {
        return $http.patch('/api/user/friend/add/' + id)
            .then(function (response) {
                return response.data;
            });
    };

    this.checkFollowStatus = function (id) {
        return $http.get('/api/user/friend/' + id)
            .then(function (response) {
                return response.data;
            })
    };

    this.editUserProfile = function (updatedUser) {
        return $http.put('/api/user/profile', updatedUser).then(function (response) {
            console.log(response.data);
            return response.data;
        })
    };
}]);