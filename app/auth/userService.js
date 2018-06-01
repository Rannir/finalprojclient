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

    srv.logout = function() {
       // $scope.hasLogged = false;
        window.localStorage.removeItem('user');
    }

    srv.login = function(props ,onDoneFunc) {
        // var cacheUser = JSON.parse(window.localStorage.getItem("user"));
        if(angular.isUndefinedOrNull(user)) {
            srv.logout();
           // if (cacheUser == null){
                console.log('login user');
                $http.post(`${consts.loginApi}`, props).then(function({data}) {
                    console.log(data);
                    user = data;
                    if (user != null){                      
                        window.localStorage.setItem("user", JSON.stringify(user));
                    }
                    (user != null)?userID = user.UserID:0;
                    onDoneFunc(data);
                    $scope.hasLogged = true;
                });
            // }
            // else{
            //     user = cacheUser;
            //     (user != null)?userID = user.UserID:0;
            // }

        }
        else {
            $scope.hasLogged = true;
            console.log('we have the user here!')
            onDoneFunc(user);
        }
    }

    return srv;
});