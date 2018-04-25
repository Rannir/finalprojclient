'use strict';

const personalTrainer = angular.module('personalTrainer', ['ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial']);
const personalTrainer = angular.module('personalTrainer', ['toaster', 'ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial']);

personalTrainer.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/',
    {
        templateUrl: /*!*/ 'HTML/loggedOutMain.html',
        controller: 'loggedOutMainController',
        controllerAs: 'ctrl'
    }).when('/register',
    {
        templateUrl: /*!*/ 'HTML/register.html',
        controller: 'registerController',
        controllerAs: 'ctrl'
    }).when('/main',
    {
        templateUrl: /*!*/ 'HTML/loggedInMain.html',
        controller: 'loggedInMainController',
        controllerAs: 'ctrl'
    })
}]);

personalTrainer.config = {
    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY',
        'chromeOptions': {
            'args': ['lang=utf8']
        }
    }
}