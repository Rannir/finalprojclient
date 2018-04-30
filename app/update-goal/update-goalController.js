angular.module('personalTrainer').
controller('updategoalController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.update = function () {
        const usr = userService.getUser();
        usr.Goal.GoalWeight = ctrl.GoalWeight;
        usr.Goal.BodyFat = ctrl.BodyFat;
        usr.Goal.StartingWeight = usr.Measurement.Weight;
        usr.Goal.MenuID = 0;
        usr.Goal.GoalID = 0;
        usr.Goal.CreationDate = null;
        $http.post(`${consts.insertOrUpdateUser}`, usr).then(function({data}) {
            $location.path("/menu");
        });
    }

    return ctrl;
});