angular.module('personalTrainer').
service('userService', function($http, consts) {
    const srv = this;
    
    let user = null;
    let userID = null;

    let menuHelper = null;

    srv.setMenu = function(menu) {
        menuHelper = menu;
    }

    srv.getMenu = function() {
        return menuHelper;
    }

    srv.getUser = function(usrId, onDoneFunc) {
        if(angular.isUndefinedOrNull(usrId)) {
            getusr(userID, onDoneFunc);
        }
        else {
            getusr(usrId, onDoneFunc);
        }
    }

    const getusr = function(usrid, onDoneFunc) {
        $http.get(`${consts.getUser}/${usrid}`).then(function({data}) {
            userID = data.UserID;
            onDoneFunc(data);
        });
    }

    srv.login = function(props ,onDoneFunc) {
        if(angular.isUndefinedOrNull(user)) {
            console.log('login user');
            $http.post(`${consts.loginApi}`, props).then(function({data}) {
                console.log(data);
                user = data;
                userID = user.UserID;
                onDoneFunc(data);
                $scope.hasLogged = true;
            });
        }
        else {
            console.log('we have the user here!')
            onDoneFunc(user);
        }
    }

    return srv;
});