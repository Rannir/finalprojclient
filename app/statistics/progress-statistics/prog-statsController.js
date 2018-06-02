angular.module('personalTrainer').
controller('progStatsController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    
    ctrl.options = {
        fill: false,
        lineTension: 0
    };
    
    userService.getUser(null, function(usr){
        ctrl.usr = usr;

        ctrl.labels = ["Starting weight", "Current weight", "Goal weight"];
        ctrl.data = [usr.Goal.StartingWeight, usr.Measurement.Weight, usr.Goal.GoalWeight];
        ctrl.series = ['Goals'];
        ctrl.Golas = {};
        ctrl.Golas.series = ['Goals'];
        $http.get(`${consts.MeasurementsByUser}/${usr.UserID}`).then(function({data}){
            dashydash.orderBy(data, ['CreationDate'], ['desc']);
    
            if(data[0].Weight == usr.Goal.StartingWeight)
                ctrl.data = dashydash.map(data, 'Weight');
            else {
                ctrl.data = dashydash.map(data, 'Weight');
                ctrl.data.unshift(usr.Goal.StartingWeight);
            }
    
            ctrl.labels = [];
            let i = 0;
    
            dashydash.forEach(ctrl.data, function(value) {
                ctrl.labels.push(`${i++}`);
            });
            
            ctrl.labels[0] = "Starting weight";
    
            ctrl.labels[ctrl.data.length - 1] = "Current weight";
            
            ctrl.data.push(usr.Goal.GoalWeight);
            ctrl.labels.push("Goal weight");
        });
    });
    
    return ctrl;
});