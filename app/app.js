'use strict';

const personalTrainer = angular.module('personalTrainer', ['ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial']);

personalTrainer.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/',
    {
        templateUrl: /*!*/ 'html/main.html',
        controller: 'mainController',
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