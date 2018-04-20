angular.module('personalTrainer').
controller('mainController', function($scope, $location, $http) {
    const ctrl = this;
    
    ctrl.register = function () {
        $location.path("/register");
    }
    
    ctrl.login = function () {
        $location.path("/login");
    }

   $http.get('http://localhost/PersonalTrainerServer/user/4').then(function({data}) {
       console.log(data);
   });

    return ctrl;
});