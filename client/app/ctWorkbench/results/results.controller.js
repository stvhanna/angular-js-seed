'use strict';

(function (angular) {

  function resultsCtrl($scope, ctAPIs, Constants, $stateParams, $timeout) {
    /**
     * Controller variables
     */
    var Home = this;

    $scope.tooltips = Constants.descriptions.tests;
    
    $scope.active = 0;
    $scope.test = $stateParams.test;
    $scope.unit = $stateParams.unit;
    $scope.activePin = $stateParams.pin;
    $scope.activeVoltage = $stateParams.voltage;
    
    // results QueryParams
    var queryParams = {
      test: $scope.test,
      unit: $scope.unit
    }
    
    // results
    ctAPIs.getResults.query(
    queryParams, 
    function (successResponse) {
      console.log(successResponse);
      $scope.context = successResponse.header;
      $scope.results = successResponse.results;
      $scope.pins = successResponse.info.pins;
      $scope.units = successResponse.info.sockets;
      $scope.userName = successResponse.user.UserAttributes[2]['Value'];
    }, function(errorResponse) {
      //console.log(errorResponse);
    }).$promise.then(function(sr){
      //console.log(sr);
    },function(er){
      //console.log(er);
    });
    
    // packages
    ctAPIs.getPackages.query(
    queryParams, 
    function (successResponse) {
      console.log(successResponse);
      $scope.packageMap = successResponse.results;
      
      var voltages = Object.keys($scope.packageMap);
      voltages.sort(function(a, b) {
        return parseFloat(a) - parseFloat(b);
      });

      $scope.active = 0;
      for (var x = 0; x < voltages.length; x++) {
        if (parseFloat(voltages[x]) > 0) {
          $scope.active = x;
          break;
        }
      }
      
      // highlight voltage row for the initial package stress level
      $timeout(function () {
        $scope.activeVoltageLevel = angular.element('.initial-slide')[0].innerText.replace(' V','').trim();
      }, 500);

      
      
    }, function(errorResponse) {
      //console.log(errorResponse);
    }).$promise.then(function(sr){
      //console.log(sr);
    },function(er){
      //console.log(er);
    });
    
    // determine pin map columns
    $scope.pinMapResponsive = function(samplesObj) {
      var count = Object.keys(samplesObj).length;
      var responsiveClass = null;
      if (count >= 1) {
        responsiveClass = 1;
      } else {
        responsiveClass = 2;
      }
      return responsiveClass; 
    };
    
    // highlight voltage level on change of carousel
    $scope.onSlideChanged = function(slide, direction){
      $scope.activeVoltageLevel = slide.element[0].innerText.replace(' V','').trim();
    };
    
    
  };

  angular.module('angularJsSeedApp')
    .controller('resultsCtrl', resultsCtrl)

})(angular);


angular.module('angularJsSeedApp')
  .directive('carouselControls', function() {
    return {
      require: '^uibCarousel',
      link: function(scope, element, attrs, carouselCtrl) {
        scope.goNext = function() {
          carouselCtrl.next();
        };
        scope.goPrev = function() {
          carouselCtrl.prev();
        };
      }
    };
  })
  .directive('onCarouselChange', function($parse) {
    return {
      require: '^uibCarousel',
      link: function(scope, element, attrs, carouselCtrl) {
        var fn = $parse(attrs.onCarouselChange);
        var origSelect = carouselCtrl.select;
        carouselCtrl.select = function(nextSlide, direction, nextIndex) {
          if (nextSlide !== this.currentSlide) {
            fn(scope, {
              nextSlide: nextSlide,
              direction: direction,
              nextIndex: carouselCtrl.slides.indexOf(nextSlide)
            });
          }
          return origSelect.apply(this, arguments);
        };
      }
    };
  });