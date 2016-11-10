/**
 * Created by princesoni on 11/13/15.
 */
'use strict';

(function (angular) {

  function constants() {

    return {
      //User roles
      roles: {
        BUSINESS_USER: 'businessUser',
        USER: 'user'
      },
      popup: {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR'
      },
      AWS: {
        cognito: {
          region: 'us-east-1',
          userPool: 'us-east-1_6wwNUqebd', //'us-east-1_rs9nCcej6', 'us-east-1_iB5TXnHDi',
          client: '16u42d9tfuhhmjt8objbmo1av6', //'1tq9gkc08edaqv5ijcoj3tv56c', '2q47ro0uvdfk1nq4u8465g75uo'
        }
      },
      APIs: {
        base: 'http://dev-ui-api.it2.io/api/v1/',
        projects: 'get_projects',
        tests: 'get_tests/:project',
        results: 'get_results/:test/:unit',
        packages: 'get_packages/:test',
        methods: 'get_details/:test/:unit/:pin/:voltage',
        details: 'get_curve/:method',
      },
      descriptions: {
        projects: {
          icDeviceName: 'IC product or test chip name',
          project: 'A name that describes your project such as "Special HBM" or "Custom Test"',
          date: 'Date and time of when the test was analyzed',
          packageType: 'Your IC packages such as BGA, QFN, QFP, or DIP',
          stressType: 'The stress typed used such as HBM, CDM, or MM',
          technology: 'Semiconductor process technology for the IC e.g. 130 nm, 45 nm etc.',
          failureShiftPercentage: '<img class="img-responsive" src="../../assets/images/diagram-shift-percent-criteria.png">',
          noiseFloor: 'Random fluctuation level in the measured current in Amps',
          pass: 'Condition when the calculated post-stress shift of the IV curve trace is within the Min shift level',
          fail: 'Condition when the calculated shift is equal to or greater than the Max shift level set by the user',
          caution: 'Condition when the calculated shift of the IV curve trace is between the Min and the Max shift levels',
          flag: 'Condition when a possible artifact or an anomaly is detected in the IV curve trace data',
          notes: 'Optional and can include any additional notes like Stress Method such as "Step Stress" or "Spiral Test"'
        },
        tests: {
          file: 'Raw data file name uploaded for analysis',
          minStress: 'Minimum stress voltage subjected to the device pins',
          maxStress: 'Maximum stress voltage subjected to the device pins',
          pass: 'Condition when the calculated post-stress shift of the IV curve trace is within the Min shift level',
          fail: 'Condition when the calculated shift is equal to or greater than the Max shift level set by the user',
          caution: 'Condition when the calculated shift of the IV curve trace is between the Min and the Max shift levels',
          flag: 'Condition when a possible artifact or an anomaly is detected in the IV curve trace data',
          comment: 'System generated comment regarding the analysis results'
        }
      },
      // errors
      errors: {
        // sign up
        signup: {
          invalidInput: 'InvalidParameterException',
        },
        // login
        login: {
          userNotConfirmed: 'UserNotConfirmedException',
          userNotConfirmedMessage: 'Your account is being provisioned. You will be notified once your account is ready for use.',
          passwordResetRequired: 'PasswordResetRequiredException',
          passwordResetRequiredMessage: 'Please reset your password and try logging in again.',
          incorrectCredentials: 'NotAuthorizedException',
          incorrectCredentialsMessage: 'Your Email Address or Password are incorrect. Please try again.',
          userNotFound: 'UserNotFoundException',
          userNotFoundMessage: 'Your account is not found. Please sign up to continue.',
          unknownProblemMessage: 'An unknown problem occurred while logging in. Please contact us if this issue persists.'
        }
      }
    }
  }

  //factory declaration
  angular.module('angularJsSeedApp')
    .factory('Constants', constants);

})(angular);
