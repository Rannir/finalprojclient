angular.module('personalTrainer').
<<<<<<< HEAD
controller('menuController', function($scope, $http, userService) {
=======
controller('menuController', function($scope, $http, consts, userService) {
>>>>>>> 2b62294fb3cfcad7ea1b23528e2c3f7bfebe9713
    const ctrl = this;
    ctrl.selectedMenu = null;
    ctrl.menuIndex = 0;

    ctrl.load = function() {
<<<<<<< HEAD
        $http.get('http://localhost/PersonalTrainerServer/Menu')
=======
        $http.get(`${consts.algApi}/${userService.getUser().UserID}`)
>>>>>>> 2b62294fb3cfcad7ea1b23528e2c3f7bfebe9713
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