angular.module('personalTrainer').
controller('loggedInMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;

    ctrl.labels = ["Starting weight", "Current weight", "Goal weight"];
    ctrl.data = [userService.getUser().Goal.StartingWeight, userService.getUser().Measurement.Weight, userService.getUser().Goal.GoalWeight];
    ctrl.series = ['Goals'];

    ctrl.progress = function () {
        $location.path("/updateweight");
    }
    
    return ctrl;
});