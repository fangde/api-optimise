"use strict"

whModule.controller('SignupController',function($scope,$rootScope,RequestFactory,UserSession,$route,$modalInstance){
$scope.t_and_c="unchecked";
    $scope.username="";
    $scope.first_name="";
    $scope.last_name="";
    $scope.password="";
    $scope.email="";
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            if($scope.t_and_c!="checked")
            {
                alert("You must agree to our terms and conditions before continue. ")
            }
            else{
                var root = {"username":$scope.username,"password":$scope.password,"email":$scope.email};
                var jsonRoot=angular.toJson(root);
                console.log(jsonRoot);
                var res=RequestFactory.PostJsonToW_Users(jsonRoot);
                res.success(function(data, status, headers, config) {
                    console.log(data);
                var jsonResult=angular.fromJson(data);
                    console.log(jsonResult);
                    if(jsonResult.result=="succeed")
                    {
                        alert("Register Succesful!");
                        //$scope.w_id=jsonResult.user.w_id;
                        //$scope.token=jsonResult.token;
                        //$scope.isLoggedIn=true;
                        //UserSession.initSession($scope.username,$scope.w_id,$scope.token);
                        //$route.reload();
                    }else{
                        alert("Register Failed!");
                    }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });
            }

        }

    };
$scope.termClick=function()
{
    if($scope.t_and_c=="unchecked")
    {
        $scope.t_and_c="checked";
    }else {
        $scope.t_and_c = "unchecked";
    }
};
    $scope.cancel=function()
    {
        $modalInstance.dismiss('cancel');
    };

});

whModule.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("unique", n);
            });
        }
    };
}]);

