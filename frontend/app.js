'use strict';

var app = angular.module('Eventugram', ["ngRoute", "ngMaterial", "ngMessages", "Eventugram.auth", "ngFileUpload"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "./templates/login.html",
            controller: "LoginController"
        })
        .when("/", {
            templateUrl: "./templates/signup.html",
            controller: "SignupController"
        })
        .when("/main", {
            templateUrl: "./templates/main.html",
            controller: "MainController"
        })
        .when("/profile", {
            templateUrl: "./templates/profile.html",
            controller: "ProfileController"
        })
        .when("/profile/edit", {
            templateUrl: "./templates/editProfile.html",
            controller: "ProfileController"
        })
        .when("/friends", {
            templateUrl: "./templates/friends.html"
        })
        .when("/user/:userId", {
            templateUrl: "./templates/friendProfile.html",
            controller: "UserProfileController"
        })
        .when("/singlePost/:postId", {
            templateUrl: "./templates/singlePost.html",
            controller: "SinglePostController"
        })
        .otherwise("/");
});

app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('grey', {
            'default': '800',
            'hue-1': '600',
            'hue-2': '400',
            'hue-3': 'A100'
        })
        .accentPalette('indigo', {
            'default': '400',
            'hue-1': '600'
        });
}]);