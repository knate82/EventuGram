angular.module("Eventugram.auth", [])

    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptor");
    }]);