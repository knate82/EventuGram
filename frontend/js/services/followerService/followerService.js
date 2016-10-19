'use strict';

var app = angular.module('Eventugram');

app.service('FollowerService', ['$http', function ($http) {

    this.toggleFollow = function (id) {
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

}]);