'use strict';

var app = angular.module('Eventugram');

app.service('DialogService', ['$mdDialog', 'Upload', function ($mdDialog) {

    var self = this;
    this.changeProfileImage = function (ev, imageUrl) {
        var template = '/js/services/dialogService/dialogTemplates/changeProfilePicture.html';
        self.data = imageUrl;
        return $mdDialog.show({
            controller: DialogController,
            templateUrl: template,
            parent: angular.element(profile),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false
        });
    };

    function DialogController($scope, $mdDialog, Upload) {

        $scope.uploadImage = function (file) {
            Upload.upload({
                url: '/api/user/profileimage/change',
                data: {
                    file: file
                }
            }).then(function (response) {
                console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.data);
            }, function (response) {
                console.log('Error status: ' + response.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.closeDialog();
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        $scope.imageUrl = self.data;
        $scope.closeDialog = function () {
            $mdDialog.hide();
        }
    }
}]);
