'use strict';

(function (angular) {

  function analyzeivCtrl($scope, $filter, $http, $interval, $timeout, ctAPIs, Constants, $stateParams) {
    
    $scope.percent = 30;
    $scope.minpercent = 30;

    $scope.pre = [{
      "volt": -0.7,
      "current": -0.001
    }, {
      "volt": -0.6,
      "current": -0.000001
    }, {
      "volt": -0.5,
      "current": -0.00000002
    }, {
      "volt": -0.4,
      "current": -0.000000001
    }, {
      "volt": -0.3,
      "current": -0.000000001
    }, {
      "volt": -0.2,
      "current": -0.000000001
    }, {
      "volt": -0.1,
      "current": -0.000000001
    }, {
      "volt": 0,
      "current": 0.000000001
    }, {
      "volt": 0.5,
      "current": 0.000000001
    }, {
      "volt": 1,
      "current": 0.000000001
    }, {
      "volt": 1.5,
      "current": 0.000000001
    }, {
      "volt": 2,
      "current": 0.000000001
    }, {
      "volt": 2.5,
      "current": 0.00000002
    }, {
      "volt": 3,
      "current": 0.00001
    }, {
      "volt": 3.5,
      "current": 0.001
    }];
    $scope.post = [{
      "volt": -0.7,
      "current": -0.001
    }, {
      "volt": -0.6,
      "current": -0.000001
    }, {
      "volt": -0.5,
      "current": -0.00000002
    }, {
      "volt": -0.4,
      "current": -0.000000001
    }, {
      "volt": -0.3,
      "current": -0.000000001
    }, {
      "volt": -0.2,
      "current": -0.000000001
    }, {
      "volt": -0.1,
      "current": -0.000000001
    }, {
      "volt": 0,
      "current": 0.000000001
    }, {
      "volt": 0.5,
      "current": 0.000000001
    }, {
      "volt": 1,
      "current": 0.000000002
    }, {
      "volt": 1.5,
      "current": 0.000000002
    }, {
      "volt": 2,
      "current": 0.000000001
    }, {
      "volt": 2.5,
      "current": 0.000000022
    }, {
      "volt": 3,
      "current": 0.00001
    }, {
      "volt": 3.5,
      "current": 0.00098
    }];

    /*
    $interval(function() {
      console.log($scope.pre);
    }, 1000);
    */

    $scope.noiseFloor = '';

    $interval(function() {
      if ($scope.noiseFloor == '') {
        $scope.maxTolerance = null
      } else {
        $scope.maxTolerance = $scope.noiseFloor
      }
    }, 100);

    $scope.save = function() {
      console.log(JSON.stringify($scope.pre));
      console.log(JSON.stringify($scope.post));
      // posting test data to get results from engine
      $http({
        url: 'http://dev-eng-api.esdit2.com/api/v2/calculate_pin',
        //url: 'http://localhost:8080/api/v1/calculate_pin',
        method: 'POST',
        cache: false,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({
          "shiftPercent": $scope.percent,
          "baselineZero": 0.000000000000001,
          "shiftPercentMin": $scope.minpercent,
          "maxTolerance": $scope.maxTolerance, // if blank, send null
          "pinType": "io",
          "pre": $scope.pre,
          "post": $scope.post
        })
      }).success(function(data) {
        console.log(data);
        $scope.results = data[0];
        console.log($scope.results);

        var lineColor = 'orange';
        if ($scope.results.curveStatus == "Fail") {
          lineColor = 'red';
        } else if ($scope.results.curveStatus == "Pass") {
          lineColor = 'green';
        } else if ($scope.results.curveStatus == "Flagged") {
          lineColor = '#29ACD3';
        }

        if ($scope.results.curveStatus == "CPass") {
          $scope.results.curveStatus = "Caution"
        }

        $scope.chartPreSet = [];
        $scope.chartPostSet = [];
        $scope.chartVolt = [];

        $scope.returnData = $scope.results['responseTable'];

        angular.forEach($scope.returnData, function(value, key) {

          var preClass = ($scope.returnData[key].preCurrent == $scope.maxTolerance ? 'orange' : ($scope.returnData[key].preCurrent < $scope.maxTolerance ? 'green' : 'red'));
          $scope.returnData[key]['preAmpClass'] = preClass;

          var postClass = ($scope.returnData[key].postCurrent == $scope.maxTolerance ? 'orange' : ($scope.returnData[key].postCurrent < $scope.maxTolerance ? 'green' : 'red'));
          $scope.returnData[key]['postAmpClass'] = postClass;

          var shiftPerClass = ($scope.returnData[key].shiftPercent == 0 ? 'green' : (Math.abs($scope.returnData[key].shiftPercent) < $scope.percent ? 'orange' : 'red'));
          $scope.returnData[key]['shiftPercentClass'] = shiftPerClass;
          //$scope.chartPreSet.push($scope.returnData[key].preCurrent);
          //$scope.chartVolt.push($scope.returnData[key].volt);
          //$scope.chartPostSet.push($scope.returnData[key].postCurrent);
        });

        /*
        angular.forEach($scope.pre, function (value, key) {
            if ( $scope.chartVolt.indexOf(value.volt) === -1 ) {
                $scope.chartVolt.push(value.volt);
            }
        });

        angular.forEach($scope.post, function (value, key) {
            if ( $scope.chartVolt.indexOf(value.volt) === -1 ) {
                $scope.chartVolt.push(value.volt);
            }
        });

        $scope.chartVolt.sort(function(a, b){return parseFloat(a)-parseFloat(b)});

        angular.forEach($scope.chartVolt, function (value, key) {
            var hasOne = false;
            for (index = 0; index < $scope.pre.length; ++index) {
                if ( $scope.pre[index].volt == value ) {
                    $scope.chartPreSet.push($scope.pre[index].current);
                    hasOne = true;
                    break;
                }
            }

            if ( !hasOne )
                $scope.chartPreSet.push(null);

            hasOne = false;
            for (index = 0; index < $scope.post.length; ++index) {
                if ( $scope.post[index].volt === value ) {
                    $scope.chartPostSet.push($scope.post[index].current);
                    hasOne = true;
                    break;
                }
            }

            if ( !hasOne )
                $scope.chartPostSet.push(null);

        });
        */

        var series1 = [];
        var series2 = [];

        for (var i = 0; i < $scope.pre.length; i++) {
          series1.push([$scope.pre[i].volt, $scope.pre[i].current]);
        }

        for (var i = 0; i < $scope.post.length; i++) {
          series2.push([$scope.post[i].volt, $scope.post[i].current]);
        }

        var myConfig = {
          type: "line",
          labels: [{
            text: "iT2 Technologies",
            x: "75%",
            y: "95%",
            color: "#F1A520",
            fontSize: 14,
            fontFamily: 'Open Sans',
            fontWeight: 'normal'
          }],
          plotarea: {
            marginLeft: 80
          },
          scaleX: {
            minValue: -0.8,
            maxValue: $scope.chartVolt[$scope.chartVolt.length],
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
            "label": {
              "text": "Volts (V)",
              fontFamily: 'Open Sans'
            }
          },
          scrollX: {},
          scaleY: {
            refLine: {
              visible: true,
              lineWidth: 2
            },
            "exponent": true,
            fontFamily: 'Open Sans',
            zooming: true,
            "label": {
              "text": "Current (A)",
              fontFamily: 'Open Sans'
            }
          },
          scrollY: {},
          plot: {
            tooltip: {
              "text": "%t: ( %k v , %v I )"
            },
            aspect: "spline"
          },
          watermark: {
            url: "",
            label: {
              text: "Don't rip me off!",
              "offset-y": 10
            },
            x: 200,
            y: 200,
          },
          legend: {},
          series: [{
            values: series1,
            text: "Pre",
            lineColor: "#000",
            marker: {
              backgroundColor: "#000"
            }
          }, {
            values: series2,
            text: "Post",
            lineColor: lineColor,
            marker: {
              backgroundColor: lineColor
            }
          }]
        };

        zingchart.render({
          id: 'chartSpace',
          data: myConfig,
          height: 400,
          width: "100%"
        });

        /*
        var chartisOptions = {
            // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
            high: 2,
            // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
            low: -2
        }

        console.log('chartPreSet');
        console.log($scope.chartPreSet);
        console.log('chartPostSet');
        console.log($scope.chartPostSet);

        var chart = new Chartist.Line("#chartSpace", {
          labels: $scope.chartVolt,
          series: [
            $scope.chartPreSet,
            $scope.chartPostSet
          ]
        }, {
          fullWidth: true,
          chartPadding: {
            right: 10
          },
          lineSmooth: Chartist.Interpolation.cardinal({
            fillHoles: true,
          }),
          low: 0
        }, chartisOptions);

        /*
        $("#chartSpace").shieldChart({
            theme: "light",
            zoomMode: "xy",
            exportOptions: {
                image: false,
                print: false
            },
            axisX: {
                categoricalValues: $scope.chartVolt,
                title: {
                    text: "Volt"
                }
            },
            axisY: {
                title: {
                    text: "Current"
                }
            },
            primaryHeader: {
                text: "Curve Trace"
            },
            dataSeries: [{
                seriesType: "spline",
                collectionAlias: "Pre-stress",
                data: $scope.chartPreSet,
                color: "black"
            }, {
                seriesType: "spline",
                collectionAlias: "Post-stress",
                data: $scope.chartPostSet,
                color: lineColor
            }]

        });
        */
      });

      // preparing chart data
      $scope.preset = [],
        $scope.postset = [];

      $scope.chartPreSet = [];
      $scope.chartPostSet = [];
      $scope.chartVolt = [];
      angular.forEach($scope.pre, function(value, key) {
        $scope.preset.push([value.volt, value.current]);
        $scope.chartPreSet.push(value.current);
        $scope.chartVolt.push(value.volt);
        console.log(value.current);
      });
      angular.forEach($scope.post, function(value, key) {
        $scope.postset.push([value.volt, value.current]);

        $scope.chartPostSet.push(value.current);
      });
      console.log(JSON.stringify($scope.preset));
      console.log(JSON.stringify($scope.postset));

      // rendering chart


      console.log($scope.chartPostSet);



    }; // save

    // clear
    $scope.clearAll = function() {
      angular.forEach($scope.pre, function(value, key) {
        value.volt = '';
        value.current = '';
      });
      angular.forEach($scope.post, function(value, key) {
        value.volt = '';
        value.current = '';
      });
    }
    $scope.clearPreVolt = function() {
      angular.forEach($scope.pre, function(value, key) {
        value.volt = '';
      });
    }
    $scope.clearPreCurrent = function() {
      angular.forEach($scope.pre, function(value, key) {
        value.current = '';
      });
    }
    $scope.clearPostVolt = function() {
      angular.forEach($scope.post, function(value, key) {
        value.volt = '';
      });
    }
    $scope.clearPostCurrent = function() {
      angular.forEach($scope.post, function(value, key) {
        value.current = '';
      });
    }

    // add row
    $scope.addRow = function() {
      $scope.pre.push({
        volt: '',
        current: ''
      });
      $scope.post.push({
        volt: '',
        current: ''
      });
    };

    $scope.runPostParser = function() {
      $scope.post = [];
      console.log('postParse: ' + $scope.postParse);
      var aPostParse = $scope.postParse.split("\n");
      console.log(aPostParse);
      for (i = 0; i < aPostParse.length; i++) {
        aPostParse[i] = aPostParse[i].replace("\t", " ");
        var aSplit = aPostParse[i].split(" ");

        if (aSplit.length >= 2) {
          console.log(aSplit);
          $scope.post.push({
            volt: parseFloat(aSplit[0]),
            current: parseFloat(aSplit[1])
          });
          console.log($scope.post);
        }
      }

      $scope.postParse = "";
    };

    $scope.runPreParser = function() {
      $scope.pre = [];
      console.log('preParse: ' + $scope.preParse);
      var aPreParse = $scope.preParse.split("\n");
      console.log(aPreParse);
      for (i = 0; i < aPreParse.length; i++) {
        aPreParse[i] = aPreParse[i].replace("\t", " ");
        var aSplit = aPreParse[i].split(" ");

        if (aSplit.length >= 2) {
          console.log(aSplit);
          $scope.pre.push({
            volt: parseFloat(aSplit[0]),
            current: parseFloat(aSplit[1])
          });
          console.log($scope.post);
        }
      }

      $scope.preParse = "";
    };
    
    
  };

  angular.module('angularJsSeedApp')
    .controller('analyzeivCtrl', analyzeivCtrl)

})(angular)
