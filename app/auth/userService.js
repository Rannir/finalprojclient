angular.module('personalTrainer').
service('userService', function($http, consts) {
    const srv = this;
    
    let user = null;

    srv.getUser = function(props ,onDoneFunc) {
        if(angular.isUndefinedOrNull(user)) {
            console.log('getting user from server');
            $http.get(`${consts.userApi}/${props.id}`).then(function({data}) {
                user = data;
                onDoneFunc(user);
            });
        }
        else {
            console.log('we have the user here!')
            onDoneFunc(user);
        }
    }

    srv.login = function(props ,onDoneFunc) {
        if(angular.isUndefinedOrNull(user)) {
            console.log('login user');
            $http.post(`${consts.loginApi}`, props).then(function({data}) {
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