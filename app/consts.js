const serverUrl = 'http://localhost/PersonalTrainerServer';

angular.module('personalTrainer').
constant('consts', {
    userApi: `${serverUrl}/user`
    userApi: `${serverUrl}/user`,
    registerApi: `${serverUrl}/user/Register`,
    loginApi: `${serverUrl}/user/Login`
});