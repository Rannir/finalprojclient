
angular.module('personalTrainer').controller('mainController', function($scope, userService, $location, $http, consts) {
    $scope.logout = function() {
        userService.logout();
        $location.path("/");
    }

    $scope.hasLogged = function() {
        return userService.hasLogged();
    }


    $scope.editMenu = function() {
        userService.getUser(null, function(usr){

            $http.get(`${consts.menuApi}/` + usr.Goal.MenuID)
                .then(function(response){
                    userService.setMenu(response.data);
                    $location.path("/editMenu");
            });
        });
    }
});