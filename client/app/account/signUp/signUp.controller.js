'use strict';

(function (angular) {

  function signUpCtrl($scope, Auth, $state, $window) {

    /**
     * controller varibles
     */
    var SignUp = this;
    SignUp.user = {};
    SignUp.errors = {};

    /**
     * Signup user
     * @param form
     */
    SignUp.register = function (form) {
      
      if (form.$valid) {
        
        $scope.loading = true; // change to "processing"
        
        // submit
        Auth.signup(SignUp.user.name, SignUp.user.company, SignUp.user.email, SignUp.user.password)
        
        // success
        $scope.$on('signup-success', function(event, data){
          $scope.loading = false;
          $scope.error = false;
          $scope.success = true;
          $scope.$apply();
        });
        
        // error
        $scope.$on('signup-error', function(event, data){
          $scope.loading = false;
          $scope.error = data.message;
          $scope.$apply();
        });
        
      }
      
    };

  }

  angular.module('angularJsSeedApp')
    .controller('SignUpCtrl', signUpCtrl);;

})(angular)
