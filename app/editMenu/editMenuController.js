angular.module('personalTrainer').
controller('editMenuController', function($scope, $http, userService) {
    const ctrl = this;

    ctrl.load = function() {
        ctrl.menu = userService.getUser().menu;
    }

    ctrl.loadReplacements = function(food) {
        ctrl.replacements = [];
        ctrl.replacements.add(food);
    }
    
    ctrl.load();
    return ctrl;
});