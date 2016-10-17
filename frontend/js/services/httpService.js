'use strict';

var app = angular.module('Eventugram');

app.service('HttpService', ['$http', function ($http) {
    this.getUserProfile = function () {
        var user = {};
        var defaultImage = '/assets/images/DefaultProf.png';
        return $http.get('/api/user/profile')
            .then(function (response) {
                user = response.data;
                return user;
            })
            .then(function(user) {
                if (user.profileImage !== defaultImage) {
                    return $http.get('/api/user/profileimage/get/' + user._id)
                        .then(function(response) {
                            user.profileImage = response.data.profileImage;

                            return user;
                        })
                } else {
                    return user;
                }
            })
    }
    
    this.editUserProfile = function(updatedUser){
        return $http.put('/api/user/profile', updatedUser).then(function(response){
            console.log(response.data);
            return response.data;
        })
    }
    
}]);