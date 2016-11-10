'use strict';

(function (angular) {

function loginCtrl($scope, Auth, $state, $window, $rootScope, $timeout) {

  /**
   * controller variables
   */
    var Login = this;
  
  /**
   *Login user
   * @param form
   */
    Login.login = function(form) {
      
      console.log('logging in');
      
      $scope.loading = true;
      
      // valid form
      if (form.$valid) {
        
        // submit
        Auth.login(Login.user.email, Login.user.password);
        
        // hide loading
        $scope.$on('hide-loading', function(){
          $scope.loading = false;
          $scope.$apply();
        });
        
        // on success
        $scope.$on('login-success', function(){
          console.log('go to projects');
          $state.go('projects');
        });
        
        // show error
        $scope.$on('login-error', function(event, data){
          $scope.error = data.message;
          $scope.$apply();
        });
        
        
      }
        
    };

  }

  angular.module('angularJsSeedApp')
    .controller('LoginCtrl',loginCtrl);
})(angular);
