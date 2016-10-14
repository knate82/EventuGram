'use strict';

var app = angular.module('Eventugram', ["ngRoute", "ngMaterial", "Eventugram.auth"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "LoginController"
        })
        .when("/", {
            templateUrl: "templates/signup.html",
            controller: "SignupController"
        })
        .when("/main", {
            templateUrl: "templates/main.html"
        })
        .when("/profile", {
            templateUrl: "templates/profile.html"
        })
        .when("/friends", {
            templateUrl: "templates/friends.html"
        })
        .when("/:friendId", {
            templateUrl: "templates/friendProfile.html"
        })
        .otherwise("/");
});

app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('pink', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('purple', {
            'default': '200'
        });
}]);