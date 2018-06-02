angular.module('personalTrainer').
controller('goalStatsController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;
    ctrl.showSorryMessage = true;
    
    userService.getUser(null, function(usr){
        ctrl.usr = usr;
        
        ctrl.options = {
            fill: false,
            lineTension: 0
        };

        $http.get(`${consts.GetGoalsByUserId}/${usr.UserID}`).then(function({data}){
            dashydash.orderBy(data, ['CreationDate'], ['desc']);

            ctrl.data = dashydash.map(data, 'GoalWeight');

            if(ctrl.data.length > 1)
                ctrl.showSorryMessage = false;
            else
                return 0;
    
            ctrl.labels = [];
            let i = 0;
    
            dashydash.forEach(ctrl.data, function(value) {
                ctrl.labels.push(`Goal ${1 + (i++)}`);
            });
            
            ctrl.labels[0] = "First goal";
            ctrl.labels[ctrl.data.length - 1] = "Current goal";
        });
    });

    return ctrl;
});