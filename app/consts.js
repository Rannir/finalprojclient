const serverUrl = 'http://localhost/PersonalTrainerServer';

angular.module('personalTrainer').
constant('consts', {
    userApi: `${serverUrl}/user`,
    algApi: `${serverUrl}/alg`,
    registerApi: `${serverUrl}/api/user/Register`,
    insertOrUpdateUser: `${serverUrl}/api/user/InsertOrUpdate`,
    menuApi: `${serverUrl}/menu`,
    loginApi: `${serverUrl}/api/user/Login`,
    insertNewApi: `${serverUrl}/api/menu/InsertNew`,
    insertApi: `${serverUrl}/api/menu/Insert`,
    maxMenu: 4,
    minMenu:0
});