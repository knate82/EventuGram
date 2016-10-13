angular.module("Eventugram.auth")

.service("UserService", ["$http", "TokenService", "$location", function($http, TokenService, $location){
    this.loggedInUser = {};
    
    this.signup = function(userObj){
        return $http.post("/auth/signup", userObj).then(function(response){
            if(response.data._id && response.data.username === userObj.username){
                $location.path("/login");
            } else {
                alert("Problem with signup.  Please try again.");
            }
        })
    }
    
    this.signin = function(userObj){
        return $http.post("/auth/login", userObj).then(function(response){
            if(response.data.token){
                this.loggedInUser = response.data.user;
                TokenService.saveToken(response.data.token);
            } else {
                alert("Login Failed.");
            }
        })
    }
    
    this.logout = function(){
        TokenService.removeToken();
        this.loggedInUser = {};
    }
}])