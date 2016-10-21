'use strict';

var app = angular.module('Eventugram');

app.filter('howLongAgo', function () {
   return function(time, timeSentOnly) {
       var now = moment();
       var then = moment(time);
       if (timeSentOnly)
           return then.calendar();
       return then.from(now);
   };
});