'use strict';

(function (angular) {

  angular.module('angularJsSeedApp').filter('num', function() {
    return function(input) {
      return parseFloat(input, 10);
    };
  });
  
})(angular)