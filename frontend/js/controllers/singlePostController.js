'use strict';

var app = angular.module('Eventugram');

app.controller('SinglePostController', ['$scope', '$routeParams', 'PostService', function($scope, $routeParams, PostService) {

    PostService.getOnePost($routeParams.postId)
        .then(function(response){
            $scope.singlePost = response;
        })

}]);