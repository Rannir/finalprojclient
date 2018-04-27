const serverUrl = 'http://localhost/PersonalTrainerServer';

angular.module('personalTrainer').
constant('consts', {
    userApi: `${serverUrl}/user`,
    algApi: `${serverUrl}/alg`,
    registerApi: `${serverUrl}/api/user/Register`,
    menuApi: `${serverUrl}/menu`,
    loginApi: `${serverUrl}/api/user/Login`
});