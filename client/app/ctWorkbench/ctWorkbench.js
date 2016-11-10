'use strict';

(function (angular) {

angular.module('angularJsSeedApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects/?project',
        templateUrl: 'app/ctWorkbench/projects/projects.html',
        controller: 'projectsCtrl',
        controllerAs: 'projects',
        authenticate: true
      })
      .state('tests', {
        url: '/tests/?project&test',
        templateUrl: 'app/ctWorkbench/tests/tests.html',
        controller: 'testsCtrl',
        controllerAs: 'tests',
        authenticate: true
      })
      .state('results', {
        url: '/results/?test&unit&pin&voltage',
        templateUrl: 'app/ctWorkbench/results/results.html',
        controller: 'resultsCtrl',
        controllerAs: 'results',
        authenticate: true
      })
      .state('details', {
        url: '/details/?test&unit&pin&voltage&method',
        templateUrl: 'app/ctWorkbench/details/details.html',
        controller: 'detailsCtrl',
        controllerAs: 'details',
        authenticate: true
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/ctWorkbench/settings/settings.html',
        controller: 'settingsCtrl',
        controllerAs: 'settings',
        authenticate: true
      })
      .state('analyzeiv', {
        url: '/analyzeiv',
        templateUrl: 'app/ctWorkbench/analyzeiv/analyzeiv.html',
        controller: 'analyzeivCtrl',
        controllerAs: 'analyzeiv',
        authenticate: true
      })
  });

})(angular)