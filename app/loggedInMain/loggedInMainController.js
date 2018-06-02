angular.module('personalTrainer').
controller('loggedInMainController', function($scope, $location, $http, consts, userService) {
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
            else{
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
        $http.get(`${consts.GetGoalsByUserId}/${usr.UserID}`).then(function({data}){
            dashydash.orderBy(data, ['CreationDate'], ['desc']);

            ctrl.Golas.data = dashydash.map(data, 'GoalWeight');
    
            ctrl.Golas.labels = [];
            let i = 0;
    
            dashydash.forEach(ctrl.Golas.data, function(value) {
                ctrl.Golas.labels.push(`${i++}`);
            });
            
            ctrl.Golas.labels[0] = "First goal";
            ctrl.labels[ctrl.data.length - 1] = "Current goal";
        });
    });



    ctrl.progress = function () {
        $location.path("/updateweight");
    }

    ctrl.changeGoal = function() {
        $location.path("/updategoal");
    }

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