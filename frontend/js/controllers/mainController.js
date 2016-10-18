'use strict';

var app = angular.module('Eventugram');

app.controller('MainController', ['$scope', 'HttpService', '$mdBottomSheet', function($scope, HttpService, $mdBottomSheet) {
    $scope.showGridBottomSheet = function() {
        $mdBottomSheet.show({
            templateUrl: '/js/controllers/bottomSheetController/bottomSheet.html',
            controller: 'BottomSheetController',
            clickOutsideToClose: true
        });
    };


}]);
