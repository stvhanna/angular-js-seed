'use strict';

(function (angular) {

  function testsCtrl($scope, ctAPIs, Constants, $stateParams) {
    /**
     * Controller variables
     */
    var Home = this;
    
    // tooltip
    $scope.tooltips = Constants.descriptions.tests;
    
    // params
    $scope.activeProject = $stateParams.project;
    $scope.activeTest =  $stateParams.test;
    
    var queryParams = {
      project: $scope.activeProject
    }
    
    ctAPIs.getTests.query(
    queryParams, 
    function (successResponse) {
      console.log(successResponse);
      $scope.context = successResponse.header;
      $scope.tests = successResponse.results;
      $scope.userName = successResponse.user.UserAttributes[2]['Value'];
    }, function(errorResponse) {
      //console.log(errorResponse);
    }).$promise.then(function(sr){
      //console.log(sr);
    },function(er){
      //console.log(er);
    });
    
    
  };

  angular.module('angularJsSeedApp')
    .controller('testsCtrl', testsCtrl)

})(angular)
