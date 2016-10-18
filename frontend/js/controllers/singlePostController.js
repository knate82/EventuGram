'use strict';

var app = angular.module('Eventugram');

app.controller('SinglePostController', ['$scope', '$routeParams', 'HttpService', function($scope, $routeParams, HttpService) {

    HttpService.getOnePost($routeParams.postId)
        .then(function(response){
            $scope.singlePost = response;
            console.log(response)
        })


}]);