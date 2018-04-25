var app = angular.module('personalTrainer').directive('passwordValidation', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: false, 
    link: function(scope, element, attr, ctrl) {
      function myValidation(value) {
        var Regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (Regex.test(value)) {
          ctrl.$setValidity('good-password', true);

        } else {
          ctrl.$setValidity('weak-password', false);
        }
        return value;
      }
      ctrl.$parsers.push(myValidation);
      ctrl.$formatters.push(myValidation);
    }
  };
});