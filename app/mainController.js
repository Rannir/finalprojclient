
angular.module('personalTrainer').controller('mainController', function($scope, userService) {
    $scope.logout = function() {
        userService.logout();
    }
});