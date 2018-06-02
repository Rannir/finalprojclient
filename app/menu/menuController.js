
angular.module('personalTrainer').controller('menuController', function($scope, $http, consts, userService, $location) {
    const ctrl = this;
    ctrl.selectedMenu = null;
    ctrl.menuIndex = 0;

    ctrl.load = function() {
        userService.getUser(null, function(usr){
            ctrl.loader = true;
            $http.get(`${consts.algApi}/${usr.UserID}`)
                .then(function(response){
                    ctrl.menus = response.data;
                    ctrl.selectedMenu = ctrl.menus[ctrl.menuIndex];
                    ctrl.loader = false;
                });
        });
    }

    function distinctMenuItems(){
        for (const i in ctrl.menus) {
            if (ctrl.menus.hasOwnProperty(i)) {
                //const element = ;
                
            }
        }
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
        userService.getUser(null, function(usr){
            var value = {
                UserId : usr.UserID,
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
        });


    }

    ctrl.editMenu = function() {
        userService.getUser(null, function(usr){
            usr.menu = ctrl.menus[ctrl.menuIndex];
            var menuHelper = {
                UserID: usr.UserID, 
                menu: ctrl.menus[ctrl.menuIndex]
            };

            $http.post(`${consts.insertApi}`, menuHelper).then(function({data}) {
                userService.setMenu(ctrl.menus[ctrl.menuIndex]);
                $location.path("/editMenu");
            });
        });
    }
    
    ctrl.load();
    return ctrl;
});