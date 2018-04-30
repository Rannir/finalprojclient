angular.module('personalTrainer').
controller('loggedInMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;

    ctrl.labels = ["Starting weight", "Current weight", "Goal weight"];
    ctrl.data = [userService.getUser().Goal.StartingWeight, userService.getUser().Measurement.Weight, userService.getUser().Goal.GoalWeight];
    ctrl.series = ['Goals'];

    $http.get(`${consts.MeasurementsByUser}/${userService.getUser().UserID}`).then(function({data}){
        dashydash.orderBy(data, ['CreationDate'], ['desc']);

        if(data[0].Weight == userService.getUser().Goal.StartingWeight)
            ctrl.data = dashydash.map(data, 'Weight');
        else{
            ctrl.data = dashydash.map(data, 'Weight');
            ctrl.data.unshift(userService.getUser().Goal.StartingWeight);
        }

        ctrl.labels = [];
        let i = 0;

        dashydash.forEach(ctrl.data, function(value) {
            ctrl.labels.push(`measurement ${i++}`);
        });
        
        ctrl.labels[0] = ["Starting weight"];

        ctrl.labels[ctrl.data.length - 1] = "Current weight";
        
        ctrl.data.push(userService.getUser().Goal.GoalWeight);
        ctrl.labels.push("Goal weight");
    });

    ctrl.progress = function () {
        $location.path("/updateweight");
    }
    
    return ctrl;
});