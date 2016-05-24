"use strict"

var whModule = angular.module('wh', ["angular-smilies","rzModule","angularSpinners","highcharts-ng","ui.bootstrap","ngAnimate", "ngAria", "ngCookies", "ngMessages", "ngResource", "ngRoute", "ngSanitize", "ngTouch"]);
whModule.config(function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/surveys', {
            templateUrl: 'templates/surveys.html',
            controller: 'SurveyController'
        })
        .when('/timeline', {
            templateUrl: 'templates/timeline.html',
            controller: 'timelineCtrl'
        })
        .when('/diary', {
            templateUrl: 'templates/mydiary.html',
            controller: 'MyDiaryCtrl'
        })
        /*   .when('/', {
         redirectTo: 'surveys'
         })*/
        .otherwise({
            redirectTo: '/surveys'
        });
    $locationProvider.html5Mode(false);
});

/*whModule.run(function($rootScope, $location,UserSession) {
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if ($rootScope.loggedInUser == null) {
                // no logged user, redirect to /login
                if ( next.templateUrl === "partials/login.html") {
                } else {
                    $location.path("/login");
                }
            }
        });
    });*/

whModule.controller('SurveyController', function ($cookies,$location,qsConfig,$scope, Question,$rootScope,RequestFactory,$modal,viewService,UserSession,$route,spinnerService) {

    $rootScope.Utils = {
        keys : Object.keys
    }
    $scope.showThisContent = function() {
        if (viewService.getView().Section=='Surveys'){
            console.log("section=surveys");
            //$scope.randomData = patientEvents.getPatientEvents($scope.dataToView);
            return true;
        }
        else
            return false;
    }

	$scope.scope=$scope;
    $scope.model=null;

    $scope.MS_UID=null;
    $scope.currentQs="";
    $scope.startQs="";
    $scope.qsEnabled=false;
    $scope.LastQuestionnaires={};
    $scope.UserSessionService=UserSession;
    $scope.qHistories={}; //Questionnaire summary results
    $scope.qTimeSeries={}; //Questionnaire summary results
    $scope.qsStartEnabled={};
    //$scope.pdds_start_enabled=true;




    $scope.getYears = function () {
        return $scope.yearsOption;
    }
    $scope.updateStartQS_Button=function (qname) //update start QS button status
    {
        if(qsConfig.allow_same_day_survey)
        {
            $scope.qsStartEnabled[qname]=true;
            return;
        }
        if(qname=="MSQOL-54")
        {
            var mhc=$scope.qHistories["Mental Health Composite"];
            var phc=$scope.qHistories["Physical Health Composite"];
            if(mhc!=null&&phc!=null&&mhc.QSDTC!=null)
            {
                if(new Date(mhc.QSDTC.toDateString())==new Date().toDateString())
                {

                }else{
                    $scope.qsStartEnabled[qname]=true;
                }
            }else{
                $scope.qsStartEnabled[qname]=true;
            }
        }else if(qname=="PROMIS")
        {

            var gmhc=$scope.qHistories["Global Mental Health component"];
            //var gphc=$scope.qHistories["Global Physical Health component"];
            console.log(gmhc);
            if(gmhc!=null&&gmhc[0]!=null&&gmhc[0].QSDTC!=null)
            {

                if(new Date(gmhc[0].QSDTC).toDateString()==new Date().toDateString())
                {
                    $scope.qsStartEnabled[qname]=false;
                }else{
                    $scope.qsStartEnabled[qname]=true;
                }
            }else{
                $scope.qsStartEnabled[qname]=true;
                console.log(qname);
            }
        }else if(qname=="PDDS")
        {
            var pdds=$scope.qHistories["Patient Determined Disease Step"];

            if(pdds!=null&&pdds[0]!=null&&pdds[0].QSDTC!=null)
            {

                if(new Date(pdds[0].QSDTC).toDateString()==new Date().toDateString())
                {
                    console.log("equalll");
                    $scope.qsStartEnabled[qname]=false;
                }else{
                    $scope.qsStartEnabled[qname]=true;
                }
            }else{
                console.log("others");
                $scope.qsStartEnabled[qname]=true;
            }
        }else if(qname=="QoL")
        {
            var qol=$scope.qHistories["QoL"];

            if(qol!=null&&qol[0]!=null&&qol[0].QSDTC!=null)
            {

                if(new Date(qol[0].QSDTC).toDateString()==new Date().toDateString())
                {
                    $scope.qsStartEnabled[qname]=false;
                }else{
                    $scope.qsStartEnabled[qname]=true;
                }
            }else{
                $scope.qsStartEnabled[qname]=true;
            }
        }
    };

    $scope.getLastQuestionnaires=function(UID,QSCAT,QSTEST){
        var params={"USUBJID":UID, "QSCAT":QSCAT, "QSTEST":QSTEST};
        //spinnerService.show('qsResultsSpinner');
        var resGet=RequestFactory.GetJson(params);
        var recordSet=[];
        resGet.success(function(data, status, headers, config) {
            var resJson=angular.fromJson(data);
            var valueList=[];
            var timeseries=[];
            for(var i=0;i<resJson.RecordSet.length;i++)
            {
                var recordItems=resJson.RecordSet[i].RecordItems;
                var tempQSSTRESC=null;
                var tempDTC=null;
                for(var j=0;j<recordItems.length;j++)
                {
                    //store QSSTRESC value first
                    if(recordItems[j].fieldName=="QSSTRESC") {
                        tempQSSTRESC = recordItems[j].value;
                    }
                    if(recordItems[j].fieldName=="QSDTC") {
                        tempDTC = recordItems[j].value;
                    }
                }
                if(tempQSSTRESC!=null&&tempDTC!=null)
                {
                    valueList.push({"QSDTC":tempDTC,"QSSTRESC":tempQSSTRESC});
                    timeseries.push([new Date(tempDTC).getTime(),parseFloat(tempQSSTRESC)]);
                }
            }
            valueList.sort(function(a,b){ //sort by DTC
                return new Date(b.QSDTC) - new Date(a.QSDTC); //sort by DTC
            });
            $scope.qHistories[QSTEST]=valueList;
            $scope.qTimeSeries[QSTEST]=timeseries;
            $scope.updateStartQS_Button(QSCAT);
        });
        resGet.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
            return null;
        });

    };
    $scope.switchBack=function()
    {
        $scope.MS_UID=null;
        UserSession.logoff();
    }
    $scope.checkPatient=function()
    {
        if($scope.MS_UID==undefined||$scope.MS_UID==null||$scope.MS_UID<2)
        {
            alert("Please enter OPTIMISE Patient ID");
            return;
        }
            $scope.mode="clinician";
            console.log("clinician mode");
            //$scope.MS_UID=$location.search().w_id;
            var expire_in_seconds=60*60*24;
            $location.search().w_id=$scope.MS_UID;
            var root = {"mode":"clinician","w_id":$scope.MS_UID};
            var returnResult=angular.toJson(root);
            console.log(returnResult);
            var res=RequestFactory.PostJsonToW_GetUserToken(returnResult);
            res.success(function(data, status, headers, config) {
                var jsonResult=angular.fromJson(data);
                console.log(jsonResult);
                if(jsonResult.result=="succeed")
                {
                    console.log("Login Succesful! Token:"+jsonResult.token);
                    $cookies.remove("username");
                    $cookies.remove("token");
                    $cookies.remove("w_id");
                    $scope.w_id=jsonResult.user.w_id;
                    $scope.token=jsonResult.token;
                    $scope.username="";
                    $scope.isLoggedIn=true;
                    UserSession.initSession($scope.username,$scope.w_id,$scope.token,$scope.mode);
                    $scope.initQSList();
                    //$route.reload();
                }else{
                    alert("Login Failed!");
                }

            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
    }

    $scope.isQsStarted=function ()
    {
        if($scope.startQs=="")
        {
            return false;
        }else {
            return true;
        }
    };
    $scope.initialise=function()
    {
        $scope.currentDate = new Date();
        $scope.yearsOption = [];
        $scope.MS_UID=$location.search().w_id;
        for (var y = 1950; y <= $scope.currentDate.getFullYear(); y++) {
            $scope.yearsOption.push(y);
        }
        if(($scope.mode==null||$scope.mode!="clinician"||$location.search().w_id==undefined)&&UserSession.checkExistingCookie()!=null)
        {
            viewService.setView('Surveys');
            console.log("setView(Surveys)");
            var sessionRes=UserSession.checkExistingCookie();
            $scope.MS_UID=sessionRes['w_id'];
            console.log($scope.MS_UID);
            $scope.initQSList();
        }else{
            viewService.setView('Surveys');
            console.log("return from here");
            return;
        }
       /* if($scope.MS_UID==null)
        {
            return;
        }*/

        $scope.qsStartEnabled["MSQOL-54"]=null;
        $scope.qsStartEnabled["PROMIS"]=null;
        $scope.qsStartEnabled["PDDS"]=null;
        $scope.qsStartEnabled["QoL"]=null;

    };
    $scope.initQSList=function()
    {
        $scope.getLastQuestionnaires($scope.MS_UID,"MSQOL-54","Mental Health Composite");
        $scope.getLastQuestionnaires($scope.MS_UID,"MSQOL-54","Physical Health Composite");
        $scope.getLastQuestionnaires($scope.MS_UID,"PROMIS","Global Mental Health component");
        $scope.getLastQuestionnaires($scope.MS_UID,"PROMIS","Global Physical Health component");
        $scope.getLastQuestionnaires($scope.MS_UID,"PDDS","Patient Determined Disease Step");
        $scope.getLastQuestionnaires($scope.MS_UID,"QoL","QoL");
        //$scope.jumpToQ($scope.currentQs);
    };

    $scope.jumpToQ=function(qname)
    {
        function sortFunction(a, b)
        {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }
        $scope.currentQs=qname;
        $scope.startQs="";
        if($scope.MS_UID==null)
        {
            return;
        }
        if(qname=="MSQOL-54")
        {
            $scope.getLastQuestionnaires($scope.MS_UID,qname,"Mental Health Composite");
            $scope.getLastQuestionnaires($scope.MS_UID,qname,"Physical Health Composite");
        }else if(qname=="PROMIS")
        {
            $scope.getLastQuestionnaires($scope.MS_UID,qname,"Global Mental Health component");
            $scope.getLastQuestionnaires($scope.MS_UID,qname,"Global Physical Health component");
        }else if(qname=="PDDS")
        {
            $scope.getLastQuestionnaires($scope.MS_UID,qname,"Patient Determined Disease Step");
        }

        var seriesData=[];

        if(qname=="MSQOL-54")
        {
            if($scope.qTimeSeries["Physical Health Composite"]==null||$scope.qTimeSeries["Mental Health Composite"]==null)
            {return;}
            seriesData=[{"name":"Physical Health Composite",
                "data": $scope.qTimeSeries["Physical Health Composite"].sort(sortFunction)
            },{"name":"Mental Health Composite",
                "data": $scope.qTimeSeries["Mental Health Composite"].sort(sortFunction)
            }];
        }else if(qname=="PROMIS")
        {
            if($scope.qTimeSeries["Global Physical Health component"]==null||$scope.qTimeSeries["Global Mental Health component"]==null)
            {return;}
            seriesData=[{"name":"Global Physical Health component",
                "data": $scope.qTimeSeries["Global Physical Health component"].sort(sortFunction)
            },{"name":"Global Mental Health component",
                "data": $scope.qTimeSeries["Global Mental Health component"].sort(sortFunction)
            }];
        }
        else if(qname=="PDDS")
        {
            if($scope.qTimeSeries["Patient Determined Disease Step"]==null)
            {return;}
            seriesData=[{"name":"Patient Determined Disease Step",
                "data": $scope.qTimeSeries["Patient Determined Disease Step"].sort(sortFunction)
            }];
        }

        console.log(seriesData);
        //console.log(seriesData.length);
        if(seriesData.length>0) {
            $scope.chartconfig = {
                options: {
                    chart: {
                        type: 'line'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: false
                            },
                            marker: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    }
                },
                series: seriesData,

                title: {
                    text: 'Timeline', style: {"fontSize": "12px"}
                },
                loading: false,
                xAxis: {
                    title: {text: 'Date and Time'},
                    type: 'datetime'
                },
                yAxis: {
                    title: {text: 'Score'}
                },
                useHighStocks: false,
                //size (optional) if left out the chart will default to size of the div or something sensible.
                //size: {
                //    width: 400,
                //    height: 300
                //},
                //function (optional)
                func: function (chart) {
                    //setup some logic for the chart
                }
            };
        }

   /*     $scope.$watchCollection('qTimeSeries',function()
        {
           });
*/
    };


    $scope.startFillQs=function(qname,size)
    {
        var userSession=UserSession.getSession();
        if(userSession==null)
        {
            alert("please login first");
            return;
        }
        console.log(qname);
        console.log(UserSession.getSession().w_id);
        $scope.startQs=qname;
        console.log($scope.qsStartEnabled);
        if($scope.qsStartEnabled[qname]==null)
        {
            alert("Loading surveys, wait a few seconds and try again");
            return;
        }

        if(!$scope.qsStartEnabled[qname])
        {
            alert("You have already completed this survey recently.");
            return;
        }
        var templateToUse="templates/QS-modal-template.html";
        if($scope.startQs=="PDDS")
        {
            templateToUse="templates/QS-modal-pdds.html";
        }
        var modalOptions={
            animation: true,
            backdrop:"static",
            templateUrl: templateToUse,
            controller: 'QSController',
            size: size,
            windowClass: 'qs-modal-window',
            resolve:{
                startQs:function(){
                    return $scope.startQs;
                }
                //cancel: function()
                //{
                //    return this.dismiss("cancel");
                //}
            }
        };
        var modalInstance = $modal.open(modalOptions);
        modalInstance.result.then(function () {
        }, function () {
            $route.reload();
        });
    }
    $scope.convertToDisplayDate=function(DTC)
    {
       return new Date(DTC).toDateString();
    }
    $scope.convertDaysDiffString=function(DTC)
    {
        if(DTC==null)
        {
            return "Not Yet Submitted";
        }
        var diff=Math.floor(Math.abs(new Date()-new Date(DTC))/(1000*60*60*24));
        //console.log(diff);
        if(diff==0)
        {
            return "(Today)";
        }else if(diff==1)
        {
            return "("+diff+" day ago"+")";
        }
        else
        {
            return "("+diff+" days ago"+")";
        }
    }



    //initialisation
    //$scope.initialise();


});



whModule.factory('Question', function () {
    return function(USUBJID, QSCAT) {
        this.STUDYID="OPTIMISE";
        this.USUBJID= USUBJID;
        //var id = new Date().getTime() + Math.floor((Math.random() * 100) + 1);
        this.QSSEQ= new Date().getTime() + Math.floor((Math.random() * 100) + 1);
        this.QSSEQW="";
        this.QSTESTCD= "";   // Question short name
        this.QSTEST= "";  // Question Name eg. EDSS-Pyramidal
        this.QSCAT= QSCAT;     // Category eg. EDSS
        this.QSORRES= "";   //Finding in Original Units
        this.QSSTRESC= ""; //Character Result/Finding in Standard Format
        this.QSSTRESN= ""; // ￼Numeric Finding in Standard Units
        this.VISITNUM= "";
        this.VISIT= "";
        this.QSDTC= "";
        this.DOMAIN="QS";
        this.displayLabel='';
        this.displayDate='';
        this.convSC="";
        this.qsTYPE="";
        this.VISIT= "";
    }
})






/*whModule.directive('msqol54Entry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/QS-modal-template.html'
    };
})*/

whModule.directive('defaultInfoEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/default-info.html'
    };
});
whModule.directive('msqol54InfoEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/msqol54-info.html'
    };
});
whModule.directive('promisInfoEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/promis-info.html'
    };
});
whModule.directive('pddsInfoEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/pdds-info.html'
    };
});
whModule.directive('neuroQolInfoEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/neuro-qol-info.html'
    };
});

whModule.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);

whModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

whModule.directive('surveyList', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'templates/surveysClinic.html'
    };}
    );