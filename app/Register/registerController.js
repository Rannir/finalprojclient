angular.module('personalTrainer').
controller('registerController', function($scope) {
    const ctrl = this;
    this.section = 1;
    this.moveSection = function(){
        this.section +=1;
    }
    return ctrl;
});