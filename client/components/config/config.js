/**
 * Created by princesoni on 11/13/15.
 */
'use strict';

(function (angular) {
  //configuration object
  function config() {
    var configuration =  {
      ENV: 'DEVELOPMENT',

      ENVIRONMENTS: {

        STAGING: {
          URL: 'http://localhost:9000'
        },

        PRODUCTION: {
          URL: 'http://localhost:9000'
        },

        DEVELOPMENT: {
          URL: 'http://localhost:9000'
        }
      },

      getHost: function () {
        return this.ENVIRONMENTS[this.ENV] && this.ENVIRONMENTS[this.ENV].URL;
      }

    }
    return configuration;
  }

  //factory declaration
  angular.module('angularJsSeedApp')
    .factory('Config', config)

})(angular);
