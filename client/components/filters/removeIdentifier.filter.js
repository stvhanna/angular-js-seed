'use strict';

(function (angular) {

  angular.module('angularJsSeedApp').filter('removeIdentifier', function() {
    return function(input) {
      if (input != undefined) {
        return input.substring(input.indexOf(':') + 2);
      }
    };
  });

})(angular)