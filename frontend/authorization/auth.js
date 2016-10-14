angular.module("Eventugram.auth", ["ngRoute"])

    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptor");
    }]);