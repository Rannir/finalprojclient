angular.module('personalTrainer').
controller('mainController', function($scope, $location) {
    const ctrl = this;

    ctrl.register = function () {
        $location.path("/register");
    }

   
    return ctrl;
});