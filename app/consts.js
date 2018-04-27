const serverUrl = 'http://localhost/PersonalTrainerServer';

angular.module('personalTrainer').
constant('consts', {
    userApi: `${serverUrl}/user`,
    algApi: `${serverUrl}/alg`,
    registerApi: `${serverUrl}/user/Register`,
    loginApi: `${serverUrl}/user/Login`
});