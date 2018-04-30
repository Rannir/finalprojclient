
angular.module('personalTrainer').controller('menuController', function($scope, $http, consts, userService, $location) {
    const ctrl = this;
    ctrl.selectedMenu = null;
    ctrl.menuIndex = 0;

    ctrl.load = function() {
        $http.get(`${consts.algApi}/${userService.getUser().UserID}`)
            .then(function(response){
                ctrl.menus = response.data;
                ctrl.selectedMenu = ctrl.menus[ctrl.menuIndex];
            });
    }

    ctrl.nextMenu = function() {
        if (ctrl.menuIndex < consts.maxMenu)
            ctrl.selectedMenu = ctrl.menus[++ctrl.menuIndex];
    }
    ctrl.prevMenu = function() {
        if (ctrl.menuIndex > consts.minMenu)
            ctrl.selectedMenu = ctrl.menus[--ctrl.menuIndex];
    }

    ctrl.chooseMenu = function() {
        var value = {
            UserId : userService.getUser().UserID,
            Menu : ctrl.menus[ctrl.menuIndex]
        }

        var url;
        if  (ctrl.menus[ctrl.menuIndex].MenuID != 0)
        {
            url= `${consts.insertApi}`;
        }
        else
        {
            url= `${consts.insertNewApi}`;
        }

        $http.post(url, value).then(function({data}) {
           
        });


    }

    ctrl.editMenu = function() {
        userService.getUser().menu = ctrl.menus[ctrl.menuIndex];
        $location.path("/editMenu");
    }
    
    ctrl.load();
    return ctrl;
});