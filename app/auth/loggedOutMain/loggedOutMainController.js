angular.module('personalTrainer').
controller('loggedOutMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.register = function () {
        $location.path("/register");
    }
    
    ctrl.login = function () {
        //userService.getUser({ id: 1 } ,function() {
            $location.path("/main");
        //});
    }

    return ctrl;
});