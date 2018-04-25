angular.module('personalTrainer').
controller('loggedOutMainController', function($scope, $location, $http, consts, userService) {
controller('loggedOutMainController' , function($scope, $location, $http, consts, userService, toaster) {
    const ctrl = this;
    
    ctrl.model = {Email:"", Password:""};
    ctrl.register = function () {
        $location.path("/register");
    }
    
    ctrl.login = function () {
        userService.getUser({ id: 4 } ,function() {
            $location.path("/main");
        userService.login( ctrl.model ,function(user) {
            (user !=null)?$location.path("/main"): toaster.pop('error', "", "user doesnt exist");
        });
    }

    return ctrl;
});