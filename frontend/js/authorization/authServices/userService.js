angular.module("Eventugram.auth")

    .service("UserService", ["$http", "TokenService", "$location", function ($http, TokenService, $location) {
        var self = this;

        this.signup = function (userObj) {
            return $http.post("/auth/signup", userObj).then(function (response) {
                if (response.data._id && response.data.username === userObj.username.toLowerCase()) {
                    $location.path("/login");
                } else {
                    return response.data;
                }
            })
        };

        this.signin = function (userObj) {
            return $http.post("/auth/login", userObj).then(function (response) {
                if (response) {
                    if (response.data.token) {
                        TokenService.saveToken(response.data.token);
                        localStorage['loggedInUserId'] = response.data.user._id;
                        $location.path("/main");
                    } else {
                        return response.data;
                    }
                }
            });
        };

        this.logout = function () {
            TokenService.removeToken();
            localStorage.remove('loggedInUserId');
            $location.path('/');
        };

        this.isLoggedIn = function () {
            return !!TokenService.getToken();
        };
    }]);