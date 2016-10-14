angular.module("Eventugram.auth")

    .controller('SignupController', ['$scope', 'UserService', function ($scope, UserService) {
        $scope.signup = function () {
            UserService.signup($scope.newUser);
        };
    }]);