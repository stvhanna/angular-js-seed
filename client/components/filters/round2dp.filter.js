'use strict';

(function (angular) {

  angular.module('angularJsSeedApp').filter('round2dp', function() {
    return function(input) {
      return parseFloat(input).toFixed(4);
    };
  });
  
})(angular)