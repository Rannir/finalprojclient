angular.module('personalTrainer').
controller('editMenuController', function($scope, $http, consts, userService) {
    const ctrl = this;

    ctrl.load = function() {
        // ctrl.user = userService.getUser();        
        // ctrl.menu = user.menu;

        $http.get(`http://localhost/PersonalTrainerServer/Menu/1`)
            .then(function(response){
                ctrl.menu = user.response.data;
            });

        // $http.get(`${consts.nautritionGoalsApi}/`+ user.UserID)
        //     .then(function(response){
        //         ctrl.nautritionGoals = new nautritionGoalsRange(response.data);
        // });
        $http.get(`${consts.nautritionGoalsApi}/`+ user.UserID)
            .then(function(response){
                ctrl.nautritionGoals = new nautritionGoalsRange(response.data);
        });
    }

    ctrl.loadReplacements = function(food) {
        ctrl.replacements = [];
        //ctrl.replacements.push(food);

        $http.get(`${consts.foodApi}/`+ food.FoodId)
            .then(function(response){
                for (const simFood in response.data) {
                    ctrl.replacements.push(food);
                }
            });
    }

    function showAlert() {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Pay Attention')
            .textContent('You can change items on your menu, but you can\'t exceed the nutrition ranges shown below.')
            .ariaLabel('Alert Dialog')
            .ok('Got it!')
        );
      };

    ctrl.onChange = function() {
        ctrl.menu.MenuID = 0;
    }

    function nautritionGoalsRange(ng){
        this.minProteins = ng.proteins - 20;
        this.maxProteins = ng.process + 20;
        this.minFats = ng.fats - 10;
        this.maxFats = ng.fats + 10;
        this.minCalories = ng.calories - 50;
        this.maxCalories = ng.calories + 50;
        this.minCarbohydrates = ng.carbohydrates - 20;
        this.maxCarbohydrates = ng.carbohydrates + 20;
    }
    
    ctrl.load();
    return ctrl;
});