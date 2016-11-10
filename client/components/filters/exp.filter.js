'use strict';

(function (angular) {

  angular.module('angularJsSeedApp').filter('exp', function() {
    return function(input) {
      var float = parseFloat(input, 10);
      return float.toExponential(2);
    };
  });
  
})(angular)