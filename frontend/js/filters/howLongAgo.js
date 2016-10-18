'use strict';

var app = angular.module('Eventugram');

app.filter('howLongAgo', function () {
   return function(time) {
       return new Date(time) - new Date();
   };
});