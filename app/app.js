'use strict';

const personalTrainer = angular.module('personalTrainer', ['ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial']);

personalTrainer.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/',
    {
        templateUrl: /*!*/ 'HTML/main.html',
        controller: 'mainController',
        controllerAs: 'ctrl'
    })
    .when('/menu',
    {
        templateUrl: /*!*/ 'HTML/menu.html',
        controller: 'menuController',
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