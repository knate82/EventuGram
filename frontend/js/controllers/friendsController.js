angular.module('Eventugram')

.controller('FriendsController', ['$scope', 'ProfileService', function($scope, ProfileService){
  $scope.getFriends = function(){
    ProfileService.getFollowing().then(function(response){
      $scope.user = response;
      console.log($scope.user);
    })
  };
  $scope.getFriends();
}]);
