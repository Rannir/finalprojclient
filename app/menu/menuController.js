angular.module('personalTrainer').
controller('menuController', function($scope, $http, consts, userService) {
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
        if (ctrl.menuIndex < consts.maxMenu)
            ctrl.selectedMenu = ctrl.menus[++ctrl.menuIndex];
    }
    ctrl.prevMenu = function() {
        if (ctrl.menuIndex > consts.minMenu)
            ctrl.selectedMenu = ctrl.menus[--ctrl.menuIndex];
    }
    ctrl.chooseMenu = function() {
    }
    
    ctrl.load();
    return ctrl;
});