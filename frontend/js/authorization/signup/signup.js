angular.module("Eventugram.auth")

    .controller('SignupController', ['$scope', 'UserService', function ($scope, UserService) {
        $scope.signup = function () {
            UserService.signup($scope.newUser)
                .then(function (response) {
                    if (response) {
                        if (response.duplicate) {
                            if (response.duplicate) {
                                if (response.duplicate === 'username') {
                                    $scope.usernameError = response.message;
                                    $scope.emailError = '';
                                } else {
                                    $scope.emailError = response.message;
                                    $scope.usernameError = '';
                                }
                            }
                        }
                    }
                });
        };
    }]);