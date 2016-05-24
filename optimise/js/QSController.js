/**
 * Created by Leon on 12/08/2015.
 */
"use strict"
whModule.controller('QSController',function (qsConfig,$scope,$modalInstance,SurveyServices, Question,$rootScope,startQs,msqol54Factory,promisFactory,$route,RequestFactory,UserSession){

    $scope.startQs=startQs;
    $rootScope.Utils = {
        keys : Object.keys
    };
    $scope.answeredQestions={};
    $scope.pddScore=null;
    $scope.addAnsweredQestion=function(q_no,value){
        $scope.answeredQestions[q_no]=value;
    };
    $scope.reset=function()
    {
        $scope.answeredQestions={};
        $scope.startQs=startQs;
        SurveyServices.resetSurveyServices();
    }
    $scope.cancel=function()
    {
        $modalInstance.dismiss('cancel');
        $scope.reset();
    };
    $scope.currentGroup=0;
    if($scope.startQs=="MSQOL-54")
    {
        $scope.reset();
        $scope.questions=msqol54_static_questions;
    }else if($scope.startQs=="PROMIS")
    {
        $scope.reset();
        $scope.questions=PROMIS_static_questions;
    }else if($scope.startQs=="QoL")
    {
        $scope.reset();
        $scope.questions=QoL_static_questions;
    }
    else if($scope.startQs=="PDDS")
    {
        $scope.reset();
    }
    else{
        alert("error!");
    }


    $scope.nextGroup=function() {

        var totalQuestionsShowed=0;
        for (var i = 0; i <= $scope.currentGroup; i++){
            totalQuestionsShowed=totalQuestionsShowed+$scope.questions[i].questions.length;
        }
        //console.log(totalQuestionsShowed);

        if(!qsConfig.allow_skip&&$rootScope.Utils.keys($scope.answeredQestions).length<totalQuestionsShowed)
        {
            alert("Please make sure you have answered all the questions. ");
            return;
        }
        //alert($scope.questions[$scope.currentGroup].length);
        $scope.currentGroup=Math.min($scope.currentGroup+1, $scope.questions.length-1);
    };
    $scope.sendAllAnswers = function(questionnaires)
    {
        var recordSet = [];
        var recordItems = [];
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
            alert("Your answers have successfully been submitted!");
            $scope.cancel();
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

        return returnResult;
    }
    $scope.submit = function() {

        if($scope.startQs=="MSQOL-54") {
            var results = msqol54Factory.calculateScore($scope.QSDTC,SurveyServices.getAllQuestionnaires());
            console.log(results);

            var physicalCompositeScore = new Question($scope.USUBJID, "MSQOL-54");
            physicalCompositeScore.QSTEST = "Physical Health Composite";
            physicalCompositeScore.QSSTRESC = results.physicalHealthComposite;
            physicalCompositeScore.displayLabel = 'MSQOL-54';
            physicalCompositeScore.displayDate = $scope.QSDTC.toDateString();
            physicalCompositeScore.qsTYPE="MSQOL-54";
            SurveyServices.addQuestion($scope.QSDTC, physicalCompositeScore, $scope.QSDTC.toDateString());

            var mentalCompositeScore = new Question($scope.USUBJID, "MSQOL-54");
            mentalCompositeScore.QSTEST = "Mental Health Composite";
            mentalCompositeScore.QSSTRESC = results.mentalHealthComposite;
            mentalCompositeScore.displayLabel = 'MSQOL-54';
            mentalCompositeScore.displayDate = $scope.QSDTC.toDateString();
            mentalCompositeScore.qsTYPE="MSQOL-54";//only for final scoring
            SurveyServices.addQuestion($scope.QSDTC, mentalCompositeScore, $scope.QSDTC.toDateString());
            $scope.sendAllAnswers(SurveyServices.getAllQuestionnaires());
        }else if($scope.startQs=="PROMIS")
        {
            var results = promisFactory.calculateScores($scope.QSDTC,SurveyServices.getAllQuestionnaires());
            console.log(results);
            var physicalCompositeScore = new Question($scope.USUBJID, "PROMIS");
            physicalCompositeScore.QSTEST = "Global Physical Health component";
            physicalCompositeScore.QSSTRESC = results.physicalHealthComposite;
            physicalCompositeScore.displayLabel = 'PROMIS';
            physicalCompositeScore.displayDate = $scope.QSDTC.toDateString();
            physicalCompositeScore.qsTYPE="PROMIS";//only for final scoring
            SurveyServices.addQuestion($scope.QSDTC, physicalCompositeScore, $scope.QSDTC.toDateString());
            var mentalCompositeScore = new Question($scope.USUBJID, "PROMIS");
            mentalCompositeScore.QSTEST = "Global Mental Health component";
            mentalCompositeScore.QSSTRESC = results.mentalHealthComposite;
            mentalCompositeScore.displayLabel = 'PROMIS';
            mentalCompositeScore.displayDate = $scope.QSDTC.toDateString();
            mentalCompositeScore.qsTYPE="PROMIS";//only for final scoring
            SurveyServices.addQuestion($scope.QSDTC, mentalCompositeScore, $scope.QSDTC.toDateString());
            $scope.sendAllAnswers(SurveyServices.getAllQuestionnaires());
        }else if($scope.startQs="PDDS")
        {
            if($scope.pddScore==null)
            {
                alert("Please make sure you have selected an answer");
                return;
            }
            console.log($scope.pddScore);
            var PDDS_Score=new Question($scope.USUBJID, "PDDS");
            PDDS_Score.QSTEST = 'Patient Determined Disease Step';
            PDDS_Score.QSSTRESC = $scope.pddScore;
            PDDS_Score.displayLabel = 'PDDS';
            PDDS_Score.displayDate = $scope.QSDTC.toDateString();
            PDDS_Score.qsTYPE="PDDS";//only for final scoring
            SurveyServices.addQuestion($scope.QSDTC, PDDS_Score, $scope.QSDTC.toDateString());
            $scope.sendAllAnswers(SurveyServices.getAllQuestionnaires());
        }
        else{
            $scope.sendAllAnswers(SurveyServices.getAllQuestionnaires());
        }

    }

    $scope.isLastButton = function() {

        if ($scope.currentGroup == ($scope.questions.length-1))
            return true;
        else
            return false;
    }

    $scope.prevGroup=function() {
        $scope.currentGroup=Math.max($scope.currentGroup-1, 0);
    };
    $scope.manual_date_entry=qsConfig.manual_date_entry;
    $scope.QSDTC = new Date();
    //$scope.QSDTC.setDate(15);
    $scope.USUBJID = null; //DEMO001

    $scope.getNextButtonText = function() {
        if ($scope.currentGroup == 18)
            return 'Submit';
        else
            return 'Next';
    }

    var editQuestion = function (question, QSSTRESC,convSC) {
        // fill in relevant answers for the question
        if(qsConfig.global_same_date)
        {
        //do nothing.
        }else{
            //update edited date
            question.QSDTC = new Date();
        }
        question.QSSTRESC = QSSTRESC;
        question.convSC=convSC;

        // send request to database
        SurveyServices.editQuestion(question, 'QSSTRESC', question.QSSTRESC);
    }

    $scope.addMSQOL = function (QSTEST, QSSTRESC,convSC)
    {
        // get date of questionaiire
        var visitDate = new Date($scope.QSDTC);

        var MSQOLResOnDate = SurveyServices.getQuestionByTest(QSTEST, visitDate.toDateString());    // get questions taken on this date

        // if found in array
        if (MSQOLResOnDate != null) {  // if existing record
            // edit instance
            editQuestion(MSQOLResOnDate, QSSTRESC,convSC);
        }
        // else add to array
        else {
            var newQuestion = new Question($scope.USUBJID, $scope.startQs);
            newQuestion.displayLabel=$scope.startQs;
            newQuestion.QSTEST = QSTEST;
            newQuestion.QSSTRESC = QSSTRESC;
            newQuestion.convSC=convSC;
            SurveyServices.addQuestion(visitDate, newQuestion, $scope.QSDTC.toDateString());
        }
        $scope.addAnsweredQestion(QSTEST,QSSTRESC);
        SurveyServices.printQuestions();
        //msqol54Services.sendAllAnswers();
    }
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

whModule.service('SurveyServices', function (Question ,RequestFactory,msqol54Factory) {

    var guid=function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    var questionnaires = [];
    var QSGRPID=guid();
    var getAllQuestionnaires=function(){
        return questionnaires;
    };
    var resetSurveyServices=function(){
        questionnaires = [];
    }
    var editQuestion = function(question, resName, resValue) {
        var USUBJID = {fieldName: "USUBJID", value: question.USUBJID};
        var SEQ = {fieldName:"QSSEQW", value: question.QSSEQW};
        var RECTOCHANGE = {fieldName:resName, value: resValue};
        question.QSSTRESC=resValue;
        questionnaires[question.QSSEQW]=question;
        var idRecord = [USUBJID, SEQ];
        var valueRecord = [RECTOCHANGE];
        //editRecord(idRecord, valueRecord);
    }
/*
    var editRecord = function (idRecord, valueRecord) {
        var jsonBody = formatForPostEdit(idRecord, valueRecord);
        console.log(jsonBody);
        Edit.save(jsonBody);
    };*/

    var formatForPostEdit = function (idRecord, valueRecord) {
        // {"CurrentRecord":[{"fieldName":"USUBJID","value":"Test"},{"fieldName":"VSSEQ","value":0}],"NewRecord":[{"fieldName":"VSORRES","value":"110"}]}
        // {"CurrentRecord":[{"fieldName":"USUBJID","value":"Test"},{"fieldName":"VSTEST","value":"Height"},{"fieldName":"VSORRES","value":"110"}],"NewRecord":[{"fieldName":"VSORRES","value":"110"}]}

        var root = {"CurrentRecord":idRecord, "NewRecord":valueRecord};
        //console.log(angular.toJson(root));
        return angular.toJson(root);
    }

    var addQuestion = function (QSDTC, question,displayDate) {
        question.QSSEQW = questionnaires.length;
        question.QSDTC = QSDTC;
        question.displayDate = displayDate;
        question.QSGRPID=QSGRPID;
        questionnaires.push(question);
        //saveRecord(question); //no need to save everytime. only send save request when all questions are done.
    }

 /*   var saveRecord = function (newRecord) {
        var jsonBody = formatForPostSave(newRecord);
        //console.log(jsonBody);
        Record.save(jsonBody);
    };*/
/*
    var formatForPostSave = function (aRecord) {

        var keys = Object.keys(aRecord);
        var recordSet = [];
        var recordItems = [];
        var keysAndItems = [];
        var newRecordItem = {"RecordItems":keysAndItems};
        recordSet.push(newRecordItem);
        var root = {"RecordSet":recordSet};

        for (var k = 0; k < keys.length; k++){
            var keyAndItem = {"fieldName":keys[k], "value": aRecord[keys[k]]};
            keysAndItems.push(keyAndItem);
        }

        //console.log(angular.toJson(root));
        return angular.toJson(root);
    }*/

    var sendAllAnswers = function()
    {
        var recordSet = [];
        var recordItems = [];
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
            alert("Your answers have successfully been submitted!");
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

        return returnResult;
    }

    var deleteQuestion = function (question) {
        var index = questionnaires.indexOf(question);
        if (index > -1) {
            questionnaires.splice(index, 1);
            for (var v = 0; v < questionnaires.length; v++)
            {
                questionnaires[v].QSSEQW = v;
            }
        }
        //if (!viewService.workOffline())
        //    records.deleteRecord(question);
    }

    var getQuestionByTest = function (QSTEST, QSDTC) {
        for (var q = 0; q < questionnaires.length; q++) {
            if (questionnaires[q].QSTEST == QSTEST) {
                return questionnaires[q];
            }
        }
        return null;
    }

    var getQuestionsByCat = function (QSCAT, QSDTC) {
        var questionsFromCategory = [];
        for (var q = 0; q < questionnaires.length; q++) {
            if (questionnaires[q].QSCAT == QSCAT) {
                questionsFromCategory.push(questionnaires[q]);
            }
        }
        return questionsFromCategory;
    }

    var printQuestions = function() {
        console.log(questionnaires);
    }

    return {
        resetSurveyServices:resetSurveyServices,
        editQuestion: editQuestion,
        addQuestion: addQuestion,
        getQuestionByTest: getQuestionByTest,
        getQuestionsByCat: getQuestionsByCat,
        deleteQuestion: deleteQuestion,
        //populateQuestionnaires: populateQuestionnaires,
        printQuestions:printQuestions,
        //calculateScore: calculateScore,
        sendAllAnswers:sendAllAnswers,
        guid:guid,
        getAllQuestionnaires:getAllQuestionnaires
    }
});
whModule.factory('promisFactory',function(){
    var getQuestionByTest = function (QSTEST, QSDTC,questionnaires) {
        //console.log(questionnaires);
        for (var q = 0; q < questionnaires.length; q++) {
            if (questionnaires[q].QSTEST == QSTEST) {
                return questionnaires[q];
            }
        }
        return null;
    }
    var calculateScores = function(QSDTC,questionnaires) {
        var dateOfQuestion = QSDTC.toDateString();
        console.log(dateOfQuestion);
        var physicalhealthcomponents=0;
        var mentalhealthcomponents=0;
        var physical_questionCodes = ["Global03","Global06","Global07","Global08"];
        var mental_questionCodes = ["Global02","Global04","Global05","Global10"];
        var total = 0;
        for (var q = 0; q < physical_questionCodes.length; q++) {
            var QSTEST = physical_questionCodes[q];
            var question = getQuestionByTest(QSTEST, dateOfQuestion,questionnaires);
            if (question != null) {
                physicalhealthcomponents=physicalhealthcomponents+question.convSC;
                }else{
                alert("error in calculating physical health scores for PROMIS:"+QSTEST);
                return;
            }
        }
        for (var q = 0; q <mental_questionCodes.length; q++) {
            var QSTEST = mental_questionCodes[q];
            var question = getQuestionByTest(QSTEST, dateOfQuestion,questionnaires);
            if (question != null) {
                mentalhealthcomponents=mentalhealthcomponents+question.convSC;
            }else{
                alert("error in calculating mental health scores for PROMIS:"+QSTEST);
                return;
            }
        }
        return {"physicalHealthComposite":physicalhealthcomponents, "mentalHealthComposite": mentalhealthcomponents};
    };
    return{
        calculateScores:calculateScores,
        getQuestionByTest:getQuestionByTest
    }

});

whModule.factory('msqol54Factory',function(){
    var getQuestionByTest = function (QSTEST, QSDTC,questionnaires) {
        //console.log(questionnaires);
        for (var q = 0; q < questionnaires.length; q++) {
            if (questionnaires[q].QSTEST == QSTEST) {
                return questionnaires[q];
            }
        }
        return null;
    }
    var getPhysicalHealth = function(QSDTC,questionnaires) {
        var total = 0;
        for (var q = 3; q <= 12; q++) {
            var QSTEST = 'MSQOL54-Q'+(q-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 0;
                        break;
                    };
                    case (2): {
                        total = total + 50;
                        break;
                    }
                    case (3): {
                        total = total + 100;
                        break;
                    }
                }
            }
        }
        return (total/10.0);
    }

    var getRoleLimitationsPhysical = function(QSDTC,questionnaires) {
        var total = 0;
        for (var q = 13; q <= 16; q++) {
            var QSTEST = 'MSQOL54-Q'+(q-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 0;
                        break;
                    };
                    case (2): {
                        total = total + 100;
                        break;
                    }
                }
            }
        }
        return (total/4.0);
    }

    var getRoleLimitationsEmotional = function(QSDTC,questionnaires) {
        var total = 0;
        for (var q = 17; q <= 19; q++) {
            var QSTEST = 'MSQOL54-Q'+(q-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 0;
                        break;
                    };
                    case (2): {
                        total = total + 100;
                        break;
                    }
                }
            }
        }
        return (total/3.0);
    }

    var getPain = function(QSDTC,questionnaires) {
        var questionNumber = [21,22,52];
        var total = 0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 100;
                        break;
                    };
                    case (2): {
                        if (questionNumber[q]==21)
                            total = total + 80;
                        else
                            total = total + 75;
                        break;
                    }
                    case (3): {
                        if (questionNumber[q]==21)
                            total = total + 60;
                        else
                            total = total + 50;
                        break;
                    }
                    case (4): {
                        if (questionNumber[q]==21)
                            total = total + 40;
                        else
                            total = total + 25;
                        break;
                    }
                    case (5): {
                        if (questionNumber[q]==21)
                            total = total + 20;
                        else
                            total = total + 0;
                        break;
                    }
                    case (6): {
                        if (questionNumber[q]==21)
                            total = total + 0;
                        else
                            total = total + 0;
                        break;
                    }
                }
            }
        }
        return (total/3.0);
    }

    var getEmotionalWellBeing = function(QSDTC,questionnaires) {
        var questionNumber = [24,25,26,28,30];
        var total = 0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                switch (question.QSSTRESC) {
                    case (1): {
                        if ((questionNumber[q]==26)||(questionNumber[q]==30))
                            total = total + 100;
                        else
                            total = total + 0;
                        break;
                        break;
                    };
                    case (2): {
                        if ((questionNumber[q]==26)||(questionNumber[q]==30))
                            total = total + 80;
                        else
                            total = total + 20;
                        break;
                    }
                    case (3): {
                        if ((questionNumber[q]==26)||(questionNumber[q]==30))
                            total = total + 60;
                        else
                            total = total + 40;
                        break;
                    }
                    case (4): {
                        if ((questionNumber[q]==26)||(questionNumber[q]==30))
                            total = total + 40;
                        else
                            total = total + 60;
                        break;
                    }
                    case (5): {
                        if ((questionNumber[q]==26)||(questionNumber[q]==30))
                            total = total + 20;
                        else
                            total = total + 80;
                        break;
                    }
                    case (6): {
                        if ((questionNumber[q]==26)||(questionNumber[q]==30))
                            total = total + 0;
                        else
                            total = total + 100;
                        break;
                    }
                }
            }
        }
        return (total/5.0);
    }

    var getEnergy = function(QSDTC,questionnaires) {
        var questionNumber = [23,27,29,31,32];
        var total = 0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+ 1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        if ((questionNumber[q]==29)||(questionNumber[q]==31))
                            total = total + 0;
                        else
                            total = total + 100;
                        break;
                        break;
                    };
                    case (2): {
                        if ((questionNumber[q]==29)||(questionNumber[q]==31))
                            total = total + 20;
                        else
                            total = total + 80;
                        break;
                    }
                    case (3): {
                        if ((questionNumber[q]==29)||(questionNumber[q]==31))
                            total = total + 40;
                        else
                            total = total + 60;
                        break;
                    }
                    case (4): {
                        if ((questionNumber[q]==29)||(questionNumber[q]==31))
                            total = total + 60;
                        else
                            total = total + 40;
                        break;
                    }
                    case (5): {
                        if ((questionNumber[q]==29)||(questionNumber[q]==31))
                            total = total + 80;
                        else
                            total = total + 20;
                        break;
                    }
                    case (6): {
                        if ((questionNumber[q]==29)||(questionNumber[q]==31))
                            total = total + 100;
                        else
                            total = total + 0;
                        break;
                    }
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getHealthPerception = function(QSDTC,questionnaires) {
        var questionNumber = [1,35,36,37];
        var total = 0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+ 1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        if ((questionNumber[q]==34)||(questionNumber[q]==36))
                            total = total + 0;
                        else
                            total = total + 100;
                        break;
                        break;
                    };
                    case (2): {
                        if ((questionNumber[q]==34)||(questionNumber[q]==36))
                            total = total + 25;
                        else
                            total = total + 75;
                        break;
                    }
                    case (3): {
                        if ((questionNumber[q]==34)||(questionNumber[q]==36))
                            total = total + 50;
                        else
                            total = total + 50;
                        break;
                    }
                    case (4): {
                        if ((questionNumber[q]==34)||(questionNumber[q]==36))
                            total = total + 75;
                        else
                            total = total + 25;
                        break;
                    }
                    case (5): {
                        if ((questionNumber[q]==34)||(questionNumber[q]==36))
                            total = total + 100;
                        else
                            total = total + 0;
                        break;
                    }
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getSocialFunction = function(QSDTC,questionnaires) {
        var questionNumber = [20,33,51];
        var total = 0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+ 1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        if (questionNumber[q]==33)
                            total = total + 0;
                        else
                            total = total + 100;
                        break;
                        break;
                    };
                    case (2): {
                        if (questionNumber[q]==33)
                            total = total + 25;
                        else
                            total = total + 75;
                        break;
                    }
                    case (3): {
                        if (questionNumber[q]==33)
                            total = total + 50;
                        else
                            total = total + 50;
                        break;
                    }
                    case (4): {
                        if (questionNumber[q]==33)
                            total = total + 75;
                        else
                            total = total + 25;
                        break;
                    }
                    case (5): {
                        if (questionNumber[q]==33)
                            total = total + 100;
                        else
                            total = total + 0;
                        break;
                    }
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getCognitiveFunction = function(QSDTC,questionnaires) {
        var questionNumber = [42,43,44,45];
        var total = 0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+ 1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 0;
                        break;
                    };
                    case (2): {
                        total = total + 20;
                        break;
                    }
                    case (3): {
                        total = total + 40;
                        break;
                    }
                    case (4): {
                        total = total + 60;
                        break;
                    };
                    case (5): {
                        total = total + 80;
                        break;
                    }
                    case (6): {
                        total = total + 100;
                        break;
                    }
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getHealthDistress = function(QSDTC,questionnaires) {
        var questionNumber = [38, 39, 40, 41];
        var total = 0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+ 1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 0;
                        break;
                    };
                    case (2): {
                        total = total + 20;
                        break;
                    }
                    case (3): {
                        total = total + 40;
                        break;
                    }
                    case (4): {
                        total = total + 60;
                        break;
                    };
                    case (5): {
                        total = total + 80;
                        break;
                    }
                    case (6): {
                        total = total + 100;
                        break;
                    }
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getSexualFunction = function(QSDTC,questionnaires) {
        var questionNumber = [46, 47, 48, 49];
        var total = 0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 100.0;
                        break;
                    };
                    case (2): {
                        total = total + 66.7;
                        break;
                    }
                    case (3): {
                        total = total + 33.3;
                        break;
                    }
                    case (4): {
                        total = total + 0.0;
                        break;
                    };
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getChangeInHealth = function(QSDTC,questionnaires) {
        var questionNumber = [2];
        var total = 0.0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 100.0;
                        break;
                    };
                    case (2): {
                        total = total + 75.0;
                        break;
                    }
                    case (3): {
                        total = total + 50.0;
                        break;
                    }
                    case (4): {
                        total = total + 25.0;
                        break;
                    };
                    case (5): {
                        total = total + 0.0;
                        break;
                    };
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getSatisfactionWithSexualFunction = function(QSDTC,questionnaires) {
        var questionNumber = [50];
        var total = 0.0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        total = total + 100.0;
                        break;
                    };
                    case (2): {
                        total = total + 75.0;
                        break;
                    }
                    case (3): {
                        total = total + 50.0;
                        break;
                    }
                    case (4): {
                        total = total + 25.0;
                        break;
                    };
                    case (5): {
                        total = total + 0.0;
                        break;
                    };
                }
            }
        }
        return (total/numQuestionsAnswered);
    }

    var getOverallQOL = function(QSDTC,questionnaires) {
        var questionNumber = [53,54];
        var total = 0.0;
        var numQuestionsAnswered = 0.0;
        for (var q = 0; q <= questionNumber.length; q++) {
            var QSTEST = 'MSQOL54-Q'+(questionNumber[q]-1);
            var question = getQuestionByTest(QSTEST, QSDTC,questionnaires);
            if (question != null) {
                numQuestionsAnswered = numQuestionsAnswered+ 1.0;
                switch (question.QSSTRESC) {
                    case (1): {
                        if (questionNumber[q]==53)
                            total = total + 10;
                        else
                            total = total + 0;
                        break;
                        break;
                    };
                    case (2): {
                        if (questionNumber[q]==53)
                            total = total + 20.0;
                        else
                            total = total + 16.7;
                        break;
                    }
                    case (3): {
                        if (questionNumber[q]==53)
                            total = total + 30.0;
                        else
                            total = total + 33.3;
                        break;
                    }
                    case (4): {
                        if (questionNumber[q]==53)
                            total = total + 40;
                        else
                            total = total + 50.0;
                        break;
                    }
                    case (5): {
                        if (questionNumber[q]==53)
                            total = total + 50;
                        else
                            total = total + 66.7;
                        break;
                    }
                    case (6): {
                        if (questionNumber[q]==53)
                            total = total + 60;
                        else
                            total = total + 83.3;
                        break;
                    }
                    case (7): {
                        if (questionNumber[q]==53)
                            total = total + 70;
                        else
                            total = total + 100.0;
                        break;
                    }
                }
            }
        }
        return (total/numQuestionsAnswered);
    }
    var calculateScore = function(QSDTC,questionnaires) {
        console.log("qqqq");
        console.log(questionnaires);
        var dateOfQuestion = QSDTC.toDateString();
        var physicalHealth = getPhysicalHealth(dateOfQuestion,questionnaires);
        var roleLimitationsPhysical = getRoleLimitationsPhysical(dateOfQuestion,questionnaires);
        var roleLimitationsEmotional = getRoleLimitationsEmotional(dateOfQuestion,questionnaires);
        var pain = getPain(dateOfQuestion,questionnaires);
        var emotionalWellBeing = getEmotionalWellBeing(dateOfQuestion,questionnaires);
        var energy = getEnergy(dateOfQuestion,questionnaires);
        var healthPerception = getHealthPerception(dateOfQuestion,questionnaires);
        var socialFunction = getSocialFunction(dateOfQuestion,questionnaires);
        var cognitiveFunction = getCognitiveFunction(dateOfQuestion,questionnaires);
        var healthDistress = getHealthDistress(dateOfQuestion,questionnaires);
        var sexualFunction = getSexualFunction(dateOfQuestion,questionnaires);
        var changeInHealth = getChangeInHealth(dateOfQuestion,questionnaires);
        var satisfactionWithSexualFunction = getSatisfactionWithSexualFunction(dateOfQuestion,questionnaires);
        var overallQOL = getOverallQOL(dateOfQuestion,questionnaires);

        var physicalHealthComposite = 0.0;
        physicalHealthComposite = physicalHealthComposite+(physicalHealth*0.17);
        physicalHealthComposite = physicalHealthComposite+(healthPerception*0.17);
        physicalHealthComposite = physicalHealthComposite+(energy*0.12);
        physicalHealthComposite = physicalHealthComposite+(roleLimitationsPhysical*0.12);
        physicalHealthComposite = physicalHealthComposite+(pain*0.11);
        physicalHealthComposite = physicalHealthComposite+(sexualFunction*0.08);
        physicalHealthComposite = physicalHealthComposite+(socialFunction*0.12);
        physicalHealthComposite = physicalHealthComposite+(healthDistress*0.11);

        var mentalHealthComposite = 0.0;
        mentalHealthComposite = mentalHealthComposite+(healthDistress*0.14);
        mentalHealthComposite = mentalHealthComposite+(overallQOL*0.18);
        mentalHealthComposite = mentalHealthComposite+(emotionalWellBeing*0.29);
        mentalHealthComposite = mentalHealthComposite+(roleLimitationsEmotional*0.24);
        mentalHealthComposite = mentalHealthComposite+(cognitiveFunction*0.15);
        return {"physicalHealthComposite":physicalHealthComposite, "mentalHealthComposite": mentalHealthComposite};
    }
    return {
        calculateScore:calculateScore,
        getQuestionByTest: getQuestionByTest,
        getPhysicalHealth: getPhysicalHealth,
        getRoleLimitationsPhysical: getRoleLimitationsPhysical,
        getRoleLimitationsEmotional: getRoleLimitationsEmotional,
        getPain: getPain,
        getEmotionalWellBeing:getEmotionalWellBeing,
        getEnergy:getEnergy,
        getHealthPerception:getHealthPerception,
        getSocialFunction: getSocialFunction,
        getCognitiveFunction: getCognitiveFunction,
        getHealthDistress: getHealthDistress,
        getSexualFunction: getSexualFunction,
        getChangeInHealth: getChangeInHealth,
        getSatisfactionWithSexualFunction: getSatisfactionWithSexualFunction,
        getOverallQOL:getOverallQOL
    }
});

whModule.factory('qolFactory',function(){
    var getQuestionByTest = function (QSTEST, QSDTC,questionnaires) {
        //console.log(questionnaires);
        for (var q = 0; q < questionnaires.length; q++) {
            if (questionnaires[q].QSTEST == QSTEST) {
                return questionnaires[q];
            }
        }
        return null;
    }
    var calculateScores = function(QSDTC,questionnaires) {
        var dateOfQuestion = QSDTC.toDateString();
        console.log(dateOfQuestion);
        var Communication=0;
        var AbilityToParticipateInSocialRolesAndActivities=0;
        var Anxiety=0;
        var Depression=0;
        var EmotionalandBehavioralDyscontrol=0;
        var Fatigue=0;
        var LowerExtremityFunction=0;
        var PositiveAffectandWellBeing=0;
        var SleepDisturbance=0;
        var UpperExtremityFunction=0;
        var Stigma=0;
        var SatisfactionwithSocialRolesandActivities=0;
        var CognitionFunction=0;


        var physical_questionCodes = ["Global03","Global06","Global07","Global08"];
        var mental_questionCodes = ["Global02","Global04","Global05","Global10"];
        var total = 0;
        for (var q = 0; q < physical_questionCodes.length; q++) {
            var QSTEST = physical_questionCodes[q];
            var question = getQuestionByTest(QSTEST, dateOfQuestion,questionnaires);
            if (question != null) {
                //physicalhealthcomponents=physicalhealthcomponents+question.convSC;
            }else{
                alert("error in calculating physical health scores for PROMIS:"+QSTEST);
                return;
            }
        }
        for (var q = 0; q <mental_questionCodes.length; q++) {
            var QSTEST = mental_questionCodes[q];
            var question = getQuestionByTest(QSTEST, dateOfQuestion,questionnaires);
            if (question != null) {
                //mentalhealthcomponents=mentalhealthcomponents+question.convSC;
            }else{
                alert("error in calculating mental health scores for PROMIS:"+QSTEST);
                return;
            }
        }
        return {"physicalHealthComposite":physicalhealthcomponents, "mentalHealthComposite": mentalhealthcomponents};
    };
    return{
        calculateScores:calculateScores,
        getQuestionByTest:getQuestionByTest
    }

})