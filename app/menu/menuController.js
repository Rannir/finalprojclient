angular.module('personalTrainer').
controller('menuController', function($scope, $http, userService) {
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
    ctrl.editMenu = function() {
        userService.getUser().menu = ctrl.menus[ctrl.menuIndex];
        $location.path("/editMenu");
    }
    
    ctrl.load();
    return ctrl;
});