angular.module('personalTrainer').
controller('editMenuController', function($scope, $http) {
    const ctrl = this;
    ctrl.selectedMenu = null;
    ctrl.menuIndex = 0;

    ctrl.load = function() {
        $http.get('http://localhost/PersonalTrainerServer/Menu')
            .then(function(response){
                ctrl.menus = response.data;
                ctrl.selectedMenu = ctrl.menus[ctrl.menuIndex];
            });
    }

    ctrl.nextMenu = function() {
        ctrl.selectedMenu = ctrl.menus[++ctrl.menuIndex];
    }
    ctrl.prevMenu = function() {
        ctrl.selectedMenu = ctrl.menus[--ctrl.menuIndex];
    }
    
    ctrl.load();
    return ctrl;
});