angular.module('personalTrainer').
controller('updateWeightController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.update = function () {
        const usr = userService.getUser();
        usr.Measurement.Weight = ctrl.Weight;
        $http.post(`${consts.insertOrUpdateUser}`, usr).then(function({data}) {
            $location.path("/main");
        });
    }

    return ctrl;
});