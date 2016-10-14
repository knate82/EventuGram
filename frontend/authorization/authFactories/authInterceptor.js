angular.module("Eventugram.auth")

.factory("AuthInterceptor", function($location, $q, TokenService){
    return {
        request: function(config){
            var token = TokenService.getToken();
            if(token){
                config.headers = config.headers || {};
                config.headers.authorization = "Bearer " + token;
            }
            return config;
        },
        responseError: function(){
            if(response.status === 401){
                TokenService.removeToken();
            }
            $q.reject(response);
        }
    };
})