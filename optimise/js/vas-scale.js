"use strict"

whModule.controller('VASController',function (qsConfig,$scope,$modalInstance,$route,RequestFactory,UserSession,Question){
    $scope.vasScale = 5;
    $scope.QSDTC=new Date();
    $scope.manual_date_entry=qsConfig.manual_date_entry;
    $scope.translate=function(value)
    {
        return value;
       /* if(value==1)
        {
            return "0"
        }
       else{
            return value;
        }*/
    };
    $scope.submit=function()
    {
        var guid=function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        var vasScaleQ = new Question($scope.USUBJID, "VAS");
        vasScaleQ.QSTEST = "VAS";
        vasScaleQ.QSSTRESC = $scope.vasScale;
        vasScaleQ.displayLabel = 'VAS';
        vasScaleQ.displayDate = $scope.QSDTC.toDateString();
        vasScaleQ.QSDTC=$scope.QSDTC;
        vasScaleQ.QSSEQW = 0;
        vasScaleQ.QSGRPID=guid();
        var questionnaires = [];
        questionnaires.push(vasScaleQ);
        var recordSet = [];
        var recordItems = [];
        if(questionnaires.length<1)
        {
            alert("Sorry, there is some error with your questionnaire, please contact admin. ");
            return;
        }
        for(var i=0;i<questionnaires.length;i++)
        {
            var aRecord=questionnaires[i];
            var keys = Object.keys(aRecord);
            var keysAndItems = [];
            for (var k = 0; k < keys.length; k++){
                var keyAndItem = {"fieldName":keys[k], "value": aRecord[keys[k]]};
                keysAndItems.push(keyAndItem);
            }
            var newRecordItem = {"RecordItems":keysAndItems};
            recordSet.push(newRecordItem);
        }
        var root = {"RecordSet":recordSet};
        var returnResult=angular.toJson(root);
        console.log(returnResult);
        var res=RequestFactory.PostJson(returnResult);
        res.success(function(data, status, headers, config) {
            //alert("Your answers have successfully been submitted!");
            $scope.cancel();
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.cancel=function()
    {
        $modalInstance.dismiss('cancel');
    };
    $scope.init=function()
    {

        if(UserSession.checkExistingCookie()!=null)
        {
            var sessionRes=UserSession.checkExistingCookie();
            $scope.USUBJID=sessionRes['w_id'];
            console.log($scope.USUBJID);
        }else{
            return;
        }
    }
    $scope.init();
});
