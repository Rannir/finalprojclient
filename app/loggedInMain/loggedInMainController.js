angular.module('personalTrainer').
controller('loggedInMainController', function($scope, $location, $http, consts, userService) {
    const ctrl = this;

    userService.getUser({ id: 4 } ,function(usr) {
        console.log(usr);
        // $http.get(`${consts.algApi}/4`).then(function({data}) {
        //     console.log(data);
        // });
    });

    return ctrl;
});