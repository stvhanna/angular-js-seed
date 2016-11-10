'use strict';

(function (angular) {

  angular.module('angularJsSeedApp').filter('limitObjectFromTo', function() {
    return function(obj, limitFrom, limitTo) {
      var newObj = {},
        i = 0;
      for (var p in obj) {
        if (i >= limitFrom) newObj[p] = obj[p];
        if (++i === limitTo) break;
      }
      return newObj;
    };
  });

})(angular)