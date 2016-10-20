'use strict';

var app = angular.module('Eventugram');

app.controller('BottomSheetController', ['$scope', '$mdBottomSheet', '$location', 'DialogService', function ($scope, $mdBottomSheet, $location, DialogService) {

    $scope.items = [
        {
            name: 'inbox',
            icon: 'inbox',
            use: function() {
                $location.path('/messages');
                $mdBottomSheet.hide();
            }
        },
        {
            name: 'add post',
            icon: 'add_a_photo',
            use: function (ev) {
                DialogService.newPost(ev);
                $mdBottomSheet.hide();
            }
        },
        {
            name: 'notifications',
            icon: 'notifications'
        }
    ];
}]);