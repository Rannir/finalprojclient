angular.module('personalTrainer').
controller('updateWeightController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.update = function () {
        $location.path("/main");
    }

    return ctrl;
});