angular.module('personalTrainer').controller('registerController', function($scope, $http,$location, consts) {
    const ctrl = this;

    ctrl.model = {FirstName:"", LastName:"", Birthday:null, Height:null, Gender:null, Email:"", Password:"", confirmPassword:"",
        Measurement :{Weight:null, BodyFat:null}, Goal:{GoalWeight:null, BodyFat:null, StartingWeight:null}};

    ctrl.section = 1;
    var Regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    ctrl.moveSection = function(sectionName){
        if(sectionName == 1)
        {
            if (ctrl.checkValid(1))
            {
                this.section +=1;
            }
            else
                userForm.$setSubmitted;
        }
        else if(sectionName == 2)
        {
            if (ctrl.checkValid(2))
            { 
                this.section +=1;
            }
            else
                userForm.$setSubmitted;
        }
        
    }

    ctrl.checkValid =function(sectionName)
    {
        if(sectionName == 1)
        {
            ( ctrl.model.Password!= ctrl.model.confirmPassword)
            ?$scope.userForm.confirmPassword.$setValidity('The confirm password dont match to password', false):
            $scope.userForm.confirmPassword.$setValidity('', true);
            return userForm.firstName.checkValidity() &&  userForm.lastName.checkValidity() &&
                   userForm.email.checkValidity() && userForm.password.checkValidity()  && userForm.confirmPassword.checkValidity() &&
                   ctrl.model.Password == ctrl.model.confirmPassword &&
                   Regex.test(ctrl.model.Password) && Regex.test(ctrl.model.confirmPassword);
        }
        else if(sectionName == 2)
        {
            return userForm.height.checkValidity() && ctrl.model.Gender != null &&
            userForm.meWeight.checkValidity() && userForm.meBodyFat.checkValidity()  && userForm.birthday.checkValidity();
        }
        else if(sectionName == 3)
        {
            return userForm.goalWeight.checkValidity() && userForm.goalBodyFat.checkValidity() ;
        }
    }

    ctrl.register = function(){
        if (ctrl.checkValid(3))
        {
            ctrl.model.Goal.StartingWeight = ctrl.model.Measurement.Weight;
            $http.post(`${consts.registerApi}`, ctrl.model).then(function({data}) {
                $location.path("/menu");
            });
        }
        else
        {
            userForm.$setSubmitted;
        }
    }

    return ctrl;
});