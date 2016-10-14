angular.module("Eventugram.auth")

    .controller("LoginController", ["$scope", 'UserService', function ($scope, UserService) {

        $scope.signin = function () {
            UserService.signin($scope.user);
        };
    }]);