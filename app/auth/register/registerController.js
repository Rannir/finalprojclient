angular.module('personalTrainer').controller('registerController', function($scope) {
    const ctrl = this;

    ctrl.model = {};

    ctrl.section = 1;

    ctrl.moveSection = function(){
        this.section +=1;
    }

    return ctrl;
});