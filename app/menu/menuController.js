angular.module('personalTrainer').controller('menuController', function($scope, $http, consts, userService) {
    const ctrl = this;
    ctrl.selectedMenu = null;
    ctrl.menuIndex = 0;

    ctrl.load = function() {
        $http.get(`${consts.algApi}/${userService.getUser().UserID}`)
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