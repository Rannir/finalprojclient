angular.module('personalTrainer').
service('userService', function($http, consts) {
    const srv = this;
    
    let user = null;

    srv.getUser = function() {
        return user;
    }

    srv.login = function(props ,onDoneFunc) {
        if(angular.isUndefinedOrNull(user)) {
            console.log('login user');
            $http.post(`${consts.loginApi}`, props).then(function({data}) {
                console.log(data);
                user = data;
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