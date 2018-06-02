angular.module('personalTrainer').
service('userService', function($http, consts) {
    const srv = this;
    
    let user = null;
    let userID = null;
    let menuHelper = null;

    srv.cacheUserFunc = function(){
        user = JSON.parse(window.localStorage.getItem("user"));
        (user != null)?userID = user.UserID:0;
    }

    srv.setMenu = function(menu) {
        menuHelper = menu;
    }

    srv.getMenu = function() {
        return menuHelper;
    }

    srv.hasLogged = function() {
        return (user != null)?true: false;
    }

    srv.getUser = function(usrId, onDoneFunc) {
        if(angular.isUndefinedOrNull(usrId)) {
            onDoneFunc(user);
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

    srv.logout = function() {
        window.localStorage.removeItem('user');
        user = null;
        userID = null;
        menuHelper = null;
    }

    srv.login = function(props ,onDoneFunc) {
        if(angular.isUndefinedOrNull(user)) {
            srv.logout();
                console.log('login user');
                $http.post(`${consts.loginApi}`, props).then(function({data}) {
                    console.log(data);
                    user = data;
                    if (user != null){                      
                        window.localStorage.setItem("user", JSON.stringify(user));
                    }
                    (user != null)?userID = user.UserID:0;
                    onDoneFunc(data);
                });

        }
        else {
            console.log('we have the user here!')
            onDoneFunc(user);
        }
    }

    return srv;
});