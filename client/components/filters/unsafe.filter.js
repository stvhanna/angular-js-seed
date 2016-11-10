'use strict';

(function (angular) {

  angular.module('angularJsSeedApp').filter('unsafe', function($sce) {
    return $sce.trustAsHtml;
  });

})(angular)