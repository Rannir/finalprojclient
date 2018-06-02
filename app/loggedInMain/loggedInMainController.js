angular.module('personalTrainer').
controller('loggedInMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.editMenu = function() {
        userService.getUser(null, function(usr){

            $http.get(`${consts.menuApi}/` + usr.Goal.MenuID)
                .then(function(response){
                    userService.setMenu(response.data);
                    $location.path("/editMenu");
            });
        });
    }
    
    return ctrl;
});