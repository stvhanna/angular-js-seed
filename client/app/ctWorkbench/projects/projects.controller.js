'use strict';

(function (angular) {

  function projectsCtrl($scope, ctAPIs, Constants, $sce, $stateParams, Auth) {
    /**
     * Controller variables
     */
    
    // active
    $scope.activeProject = $stateParams.project;
      
    // tooltip
    $scope.tooltips = Constants.descriptions.projects;
    $scope.failureShiftPercentageImage = $sce.trustAsHtml(Constants.descriptions.projects.failureShiftPercentage);
    
    $scope.projects = [];
    
    // get projects
    var queryParams = {};
    ctAPIs.getProjects.query(
    queryParams, 
    function (successResponse) {
      //console.log(successResponse);
      $scope.projects = successResponse.results;
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
    .controller('projectsCtrl', projectsCtrl)

})(angular)
