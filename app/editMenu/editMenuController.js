angular.module('personalTrainer').
controller('editMenuController', function($scope, $http, consts, userService, $mdDialog, $location) {
    const ctrl = this;
    ctrl.exceedProteins = ctrl.exceedFats = ctrl.exceedCarbohydrates = ctrl.exceedCalories = false;

    ctrl.load = function() {
        ctrl.menu = userService.getUser().menu;
        
        $http.get(`${consts.nautritionGoalsApi}/`+ 1)
                    .then(function(response2){
                        ctrl.nautritionGoals = new nautritionGoalsRange(response2.data);
                        $http.get(`${consts.similarFoodApi}`)
                            .then(function(response3){
                                ctrl.FoodByMealType = response3.data;
                                
                                // The md-select directive eats keydown events for some quick select
                                // logic. Since we have a search input here, we don't need that logic.
                                $('.menuTable').find('input').on('keydown', function(ev) {
                                    ev.stopPropagation();
                                });

                                showAlert();
                        });
                });        
    }

    ctrl.clearSearchTerm = function() {
        ctrl.searchTerm = '';
    };
      

    ctrl.Finish = function() {
        userService.getUser().menu = ctrl.menu;
        $location(Menu)
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

        var TotalProtien = 0, TotalFats = 0, TotalCarbohydrates = 0, TotalCalories = 0;

        for (const index in ctrl.menu.Breakfast) {
            TotalProtien += ctrl.menu.Breakfast[index].Protein;
            TotalFats += ctrl.menu.Breakfast[index].Fat;
            TotalCarbohydrates += ctrl.menu.Breakfast[index].Carbohydrates;
            TotalCalories += ctrl.menu.Breakfast[index].Calories;
        }
        for (const index in ctrl.menu.Lunch) {
            TotalProtien += ctrl.menu.Lunch[index].Protein;
            TotalFats += ctrl.menu.Lunch[index].Fat;
            TotalCarbohydrates += ctrl.menu.Lunch[index].Carbohydrates;
            TotalCalories += ctrl.menu.Lunch[index].Calories;
        }
        for (const index in ctrl.menu.Dinner) {
            TotalProtien += ctrl.menu.Dinner[index].Protein;
            TotalFats += ctrl.menu.Dinner[index].Fat;
            TotalCarbohydrates += ctrl.menu.Dinner[index].Carbohydrates;
            TotalCalories += ctrl.menu.Dinner[index].Calories;
        }

        ctrl.exceedProteins = ctrl.exceedFats = ctrl.exceedCarbohydrates = ctrl.exceedCalories = false;

        if(TotalProtien > ctrl.nautritionGoals.maxProteins || TotalProtien < ctrl.nautritionGoals.minProteins){
            ctrl.exceedProteins = true;
        }
        if(TotalFats > ctrl.nautritionGoals.maxFats || TotalFats < ctrl.nautritionGoals.minFats){
            ctrl.exceedFats = true;
        }
        if(TotalCarbohydrates > ctrl.nautritionGoals.maxCarbohydrates || TotalCarbohydrates < ctrl.nautritionGoals.minCarbohydrates){
            ctrl.exceedCarbohydrates = true;
        }
        if(TotalCalories > ctrl.nautritionGoals.maxCalories || TotalCalories < ctrl.nautritionGoals.minCalories){
            ctrl.exceedCalories = true;
        }
    }

    function nautritionGoalsRange(ng){
        this.minProteins = ng.Proteins - 35;
        this.maxProteins = ng.Proteins + 35;
        this.minFats = ng.Fats - 10;
        this.maxFats = ng.Fats + 10;
        this.minCalories = ng.Calories - 200;
        this.maxCalories = ng.Calories + 200;
        this.minCarbohydrates = ng.Carbohydrates - 40;
        this.maxCarbohydrates = ng.Carbohydrates + 40;
    }
    
    ctrl.load();
    return ctrl;
});