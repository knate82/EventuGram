angular.module("Eventugram.auth")

.service("TokenService", function(){
    var userToken = "token";
    
    this.saveToken = function(token){
        localStorage[userToken] = token;
    };
    
    this.getToken = function(token){
        return localStorage[userToken];
    };
    
    this.removeToken = function(){
        localStorage.removeItem(userToken);
    };
})