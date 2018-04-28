const serverUrl = 'http://localhost/PersonalTrainerServer';

angular.module('personalTrainer').
constant('consts', {
    userApi: `${serverUrl}/user`,
    algApi: `${serverUrl}/alg`,
    nautritionGoalsApi: `${serverUrl}/api/user/NutritionGoals`,
    registerApi: `${serverUrl}/api/user/Register`,
    menuApi: `${serverUrl}/menu`,
    similarFoodApi: `${serverUrl}/api/food/SimilarFood`,
    loginApi: `${serverUrl}/api/user/Login`
});