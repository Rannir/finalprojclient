const serverUrl = 'http://localhost/PersonalTrainerServer';

angular.module('personalTrainer').
constant('consts', {
    userApi: `${serverUrl}/user`,
    algApi: `${serverUrl}/alg`,
    registerApi: `${serverUrl}/api/user/Register`,
    menuApi: `${serverUrl}/menu`,
    loginApi: `${serverUrl}/api/user/Login`,
    isUserExistsApi: `${serverUrl}/api/user/IsUserExists`,
    insertNewApi: `${serverUrl}/api/menu/InsertNew`,
    insertApi: `${serverUrl}/api/menu/Insert`,
    maxMenu: 4,
    minMenu:0
});