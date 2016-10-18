'use strict';

var app = angular.module('Eventugram');

app.controller('BottomSheetController', ['$scope', '$mdBottomSheet', '$location', 'DialogService', function ($scope, $mdBottomSheet, $location, DialogService) {
    $scope.items = [
        {name: 'inbox', icon: 'inbox'},
        {
            name: 'add post', icon: 'add_a_photo', use: function (ev) {
            DialogService.newPost(ev);
        }
        },
        {name: 'notifications', icon: 'notifications'}
    ];

    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
}]);