angular.module('personalTrainer').
controller('loggedOutMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.register = function () {
        $location.path("/register");
    }
    
    ctrl.login = function () {
        userService.getUser({ id: 4 } ,function() {
            $location.path("/login");
        });
    }

    return ctrl;
});