'use strict';

(function (angular) {

  function detailsCtrl($scope, ctAPIs, Constants, $stateParams) {
    /**
     * Controller variables
     */
    var Home = this;  

    $scope.random = Math.floor((Math.random()*999));
    $scope.test = $stateParams.test;
    $scope.unit = $stateParams.unit;
    $scope.pin = $stateParams.pin;
    $scope.voltage = $stateParams.voltage;
    $scope.methodId = $stateParams.method;
    
    var queryParams = {
      test: $scope.test,
      unit: 0,
      pin: $scope.pin,
      voltage: $scope.voltage
    }
    
    ctAPIs.getMethods.query(
    queryParams, 
    function (successResponse) {
      console.log(successResponse);
      $scope.context = successResponse.header;
      $scope.methods = successResponse.results;
      $scope.userName = successResponse.user.UserAttributes[2]['Value'];
      
      if ($scope.methodId == '' || $scope.methodId == undefined) {
        $scope.methodId = successResponse.results[0].id;
        $scope.sample = successResponse.results[0].socket;
        console.log('method from first method', $scope.methodId);
      }
      
      $scope.getDetails($scope.methodId);
      
    }, function(errorResponse) {
      //console.log(errorResponse);
    }).$promise.then(function(sr){
      //console.log(sr);
    },function(er){
      //console.log(er);
    });
    
    $scope.getDetails = function(methodId){
      ctAPIs.getDetails.query(
      { method: methodId }, 
      function(successResponse) {
        console.log(successResponse);
        //$scope.context = successResponse.header;
        $scope.details = successResponse.results[0];
        $scope.preData = successResponse.preData;
        $scope.postData = successResponse.postData;
        
        if ($scope.context.pin.description) {
          $scope.pinType = '('+$scope.context.pin.description+')'
        } else {
          $scope.pinType = ''
        }
        
        $scope.chartTitle = 'Pin '+$scope.context.pin.pin+' '+$scope.pinType+' @ '+$scope.context.stressLevel.description+' on Sample '+$scope.sample+'';
        
        var lineColor = '#ffa300';
          if ($scope.details.curveStatus == "Fail") {
              lineColor = '#eb1010';
          } else if ($scope.details.curveStatus == "Pass") {
              lineColor = '#119f00';
          } else if ($scope.details.curveStatus == "Flagged") {
              lineColor = '#29acd3';
          }

        var series1 = [];
        var series2 = [];

        for (var i = 0; i < $scope.preData.length; i++) {
          series1.push([parseFloat($scope.preData[i].volt), parseFloat($scope.preData[i].current)]);
          //console.log('[' + $scope.preData[i].volt + ',' + $scope.preData[i].current + ']');
        }

        //console.log(series1);

        for (var i = 0; i < $scope.postData.length; i++) {
          series2.push([parseFloat($scope.postData[i].volt), parseFloat($scope.postData[i].current)]);
          //console.log('[' + $scope.postData[i].volt + ',' + $scope.postData[i].current + ']');
        }
        
        /*
        $scope.chartConfig = {
            type : 'line',
            series : [
              { values : [54,23,34,23,43] },
              { values : [10,15,16,20,40] },
            ]
        };
        */
        
        
        $scope.chartConfig = {
          type: "line",
          "title": {
            "text": $scope.chartTitle,
              fontSize: 18,
              fontFamily: 'Open Sans',
              fontWeight: 'normal'
          },
          "subtitle": {
            "text": $scope.details.description
          },
          labels:[
            {
              text: "iT2 Technologies",
              x: "75%",
              y: "95%",
              color: "#F1A520",
              fontSize: 14,
              fontFamily: 'Open Sans',
              fontWeight: 'normal'
            }
          ],
          plotarea: {
            marginLeft: 80
          },
          scaleX: {
            minValue: series1[0][0] - 0.2,
            maxValue: series1[series1.length - 1][0] + 0.2,
              fontFamily: 'Open Sans',
            step: 0.2,
            refLine: {
              visible: true,
              lineWidth: 2
            },
            guide: {
              visible: true
            },
            zooming: true,
            "label":{
                "text":"Volts (V)",
              fontFamily: 'Open Sans'
            }
          },
          scrollX: {},
          scaleY: {
            refLine: {
              visible: true,
              lineWidth: 2
            },
            "exponent":true,
              fontFamily: 'Open Sans',
            zooming: true,
            "label":{
                "text":"Current (A)",
              fontFamily: 'Open Sans'
            }
          },
          scrollY: {},
          plot: {
            tooltip: {
              "text":"%t: ( %k V , %v A )"
            },
            aspect:"spline" 
          },
          series: [{
            values: series1,
            text: "Pre",
            lineColor: "#000",
            marker:{
                backgroundColor: "#000"
            }
          }, {
            values: series2,
            text: "Post",
            lineColor: lineColor,
            marker:{
                backgroundColor: lineColor
            }
          }]
        };
        
        
      }, function(errorResponse) {
        //console.log(errorResponse);
      }).$promise.then(function(sr){
        //console.log(sr);
      },function(er){
        //console.log(er);
      });
    };
    
    
  };

  angular.module('angularJsSeedApp')
    .controller('detailsCtrl', detailsCtrl)

})(angular)
