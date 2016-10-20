'use strict';

var app = angular.module('Eventugram');

app.filter('howLongAgo', function () {
   return function(time) {
       var now = moment();
       var then = moment(time);
       return then.from(now);
   };
});