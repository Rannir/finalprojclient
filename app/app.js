'use strict';

const personalTrainer = angular.module('personalTrainer', ['toaster', 'ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial', 'chart.js']);


personalTrainer.config(['$routeProvider', '$httpProvider', ($routeProvider, $httpProvider) => {

    $httpProvider.interceptors.push(['$injector', function($injector){
        return {
            response: function(response) {
              $injector.get('userService').cacheUserFunc();
              return response;
            }}
    }])
    
    $routeProvider.when('/',
    {
        templateUrl: /*!*/ 'HTML/landing.html',
        
    }).when('/login',
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
    .when('/menu',
    {
        templateUrl: /*!*/ 'HTML/menu.html',
        controller: 'menuController',
        controllerAs: 'ctrl'
    })
    .when('/editMenu',
    {
        templateUrl: /*!*/ 'HTML/editMenu.html',
        controller: 'editMenuController',
        controllerAs: 'ctrl'
    })
    .when('/updateweight',
    {
        templateUrl: /*!*/ 'HTML/update-weight.html',
        controller: 'updateWeightController',
        controllerAs: 'ctrl'
    })
    .when('/updategoal',
    {
        templateUrl: /*!*/ 'HTML/update-goal.html',
        controller: 'updategoalController',
        controllerAs: 'ctrl'
    })
}]);

// personalTrainer.factory("userPersistenceService", [
// 	"$cookies", function($cookies) {
// 		var user = "";
 
// 		return {
// 			setCookieData: function(user) {
// 				user = user;
// 				$cookies.put("user", user);
// 			},
// 			getCookieData: function() {
// 				user = $cookies.get("user");
// 				return user;
// 			},
// 			clearCookieData: function() {
// 				user = "";
// 				$cookies.remove("user");
// 			}
// 		}
// 	}
// ]);

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