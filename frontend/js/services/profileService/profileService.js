'use strict';

var app = angular.module('Eventugram');

app.service('ProfileService', ['$http', function ($http) {
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

    this.editUserProfile = function (updatedUser) {
        return $http.put('/api/user/profile', updatedUser).then(function (response) {
            console.log(response.data);
            return response.data;
        })
    };

}]);