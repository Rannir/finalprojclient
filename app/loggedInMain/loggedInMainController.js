angular.module('personalTrainer').
controller('loggedInMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.labels = ["Starting weight", "Current weight", "Goal weight"];
    ctrl.data = [80, 83, 85];
    //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    ctrl.series = ['Goals'];

    ctrl.progress = function () {
        $location.path("/updateweight");
    }
    
    return ctrl;
});