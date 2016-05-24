"use strict"
whModule.controller('MyAccountController',function($scope,$modalInstance,$rootScope,RequestFactory,UserSession,$route,$modal)
{
    $scope.QSDTC=new Date();
    $scope.userSession=UserSession.getSession();
    $scope.openVasModal=UserSession.openVasModal;
    if($scope.userSession==null)
    {
        alert("please login first");
        return;
    }else{
        //$scope.w_id=userSession.w_id;
        //$scope.username=userSession.username;
    }

    $scope.submit=function()
    {

    };
    $scope.cancel=function()
    {
        $modalInstance.dismiss('cancel');
    };
});
whModule.controller('UserController',function($scope,$rootScope,RequestFactory,UserSession,$route,$modal){
    //login variables
    $scope.username="";
    $scope.password="";
    $scope.w_id="";
    $scope.token="";
    $scope.isLoggedIn=false;
    $scope.openVasModal=UserSession.openVasModal;
    $scope.manageMyAccount=function()
    {
        var modalOptions={
            animation: true,
            backdrop:"static",
            templateUrl: 'templates/modal-myaccount.html',
            controller: 'MyAccountController',
            size: 100,
            windowClass: 'myaccount-modal-window',
            resolve:{
                //startQs:function(){
                //    return $scope.startQs;
                //}
                //cancel: function()
                //{
                //    return this.dismiss("cancel");
                //}
            }
        };
        var modalInstance = $modal.open(modalOptions);
        modalInstance.result.then(function () {
        }, function () {
            //$route.reload();
        });
    };
    $scope.logoff=function()
    {
        $scope.isLoggedIn=false;
        $scope.username="";
        $scope.password="";
        $scope.w_id="";
        $scope.token="";
        UserSession.logoff();
        $route.reload();
    }
    $scope.joinNow=function()
    {
        var modalOptions={
            animation: true,
            //backdrop:"static",
            templateUrl: 'templates/signup.html',
            controller: 'SignupController',
            size: 100,
            windowClass: 'vas-modal-window',
            resolve:{
                //startQs:function(){
                //    return $scope.startQs;
                //}
                //cancel: function()
                //{
                //    return this.dismiss("cancel");
                //}
            }
        };
        var modalInstance = $modal.open(modalOptions);
        modalInstance.result.then(function () {
        }, function () {
            //$route.reload();
        });
    };
    $scope.getToken=function()
    {
        if($scope.username=="")
        {
            alert("please enter your username before continue");
            return;
        }
        if($scope.password=="")
        {
            alert("please enter your password before continue");
            return;
        }
        var expire_in_seconds=60*60;
        var root = {"username":$scope.username,"password":$scope.password,"expire_in_seconds":expire_in_seconds};
        var returnResult=angular.toJson(root);
        console.log(returnResult);
        var res=RequestFactory.PostJsonToW_GetUserToken(returnResult);
        res.success(function(data, status, headers, config) {
            var jsonResult=angular.fromJson(data);
            if(jsonResult.result=="succeed")
            {
                //alert("Login Succesful! Token:"+jsonResult.token);
                $scope.w_id=jsonResult.user.w_id;
                $scope.token=jsonResult.token;
                $scope.isLoggedIn=true;
                UserSession.initSession($scope.username,$scope.w_id,$scope.token);
                $route.reload();
            }else{
                alert("Login Failed!");
            }
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };


    $scope.init=function()
    {
        console.log("init");
        if(UserSession.checkExistingCookie()!=null)
        {
            var sessionRes=UserSession.checkExistingCookie();
            $scope.username=sessionRes['username'];
            $scope.w_id=sessionRes['w_id'];
            $scope.token=sessionRes['token'];
            $scope.isLoggedIn=true;
        }else{
            return;
        }
    }
})
whModule.service('UserSession', function($rootScope,$cookies,$modal){
    var w_id=null;
    var username=null;
    var token=null;
    var isLoggedIn=false;
    var mode=null;
    var initSession=function(username, w_id,token,mode)
    {
        this.username=username;
        this.w_id=w_id;
        this.token=token;
        this.mode = mode;
        if(this.mode!=null&&this.mode=="clinician")
        {
        //not to save cookie
        }else{
            //default action
            $cookies.put('username', this.username);
            $cookies.put('token', this.token);
            $cookies.put('w_id', this.w_id);
        }
        this.isLoggedIn=true;
    }
    var checkExistingCookie=function()
    {

        if(!this.isLoggedIn&&$cookies.get('username')!=null&&$cookies.get('token')!=null&&$cookies.get('w_id')!=null)
        {
            this.username=$cookies.get('username');
            this.w_id=$cookies.get('w_id');
            this.token=$cookies.get('token');
            this.isLoggedIn=true;
            if(this.mode!=null&&this.mode!="clinician") {
                console.log("checkAndPopupVAS- 1");
                this.checkAndPopupVAS();
            }
            return {"username":this.username, "token": this.token,"w_id":this.w_id};
        }else if(this.isLoggedIn) {
            if(this.mode!=null&&this.mode!="clinician") {
                console.log("checkAndPopupVAS- 2");
                this.checkAndPopupVAS();
            }
            return {"username":this.username, "token": this.token,"w_id":this.w_id};
        }
        else
        {
            this.username=null;
            this.w_id=null;
            this.token=null;
            this.mode=null;
            $cookies.remove("username");
            $cookies.remove("token");
            $cookies.remove("w_id");
            this.isLoggedIn=false;
            return null;
        }
    }
    var logoff=function()
    {
        this.username=null;
        this.w_id==null;
        this.token==null;
        this.mode=null;
        $cookies.remove("username");
        $cookies.remove("token");
        $cookies.remove("w_id");
        $cookies.remove("lastVASPopupTime");
        this.isLoggedIn=false;
    }
    var getSession=function()
    {
        if(this.username!=null&&this.token!=null&&this.w_id!=null)
        {
            if(this.mode!=null&&this.mode!="clinician") {
                console.log("checkAndPopupVAS- 3");
                this.checkAndPopupVAS();
            }
            return {"username":this.username, "token": this.token,"w_id":this.w_id};
        }else{
            return null;
        }
    };

    var checkAndPopupVAS=function()
    {
        var lastVASPopupTime=$cookies.get("lastVASPopupTime");

        if(lastVASPopupTime==null)
        {
            if(this.isLoggedIn==true)
            {
                lastVASPopupTime=new Date().getTime();//update last popup time
                $cookies.put("lastVASPopupTime",lastVASPopupTime);
                console.log(lastVASPopupTime);
                this.openVasModal(); //first time login

            }
        }else if((new Date().getTime()-lastVASPopupTime)>(1000*60*10)){

            lastVASPopupTime=new Date().getTime();//update last popup time
            $cookies.put("lastVASPopupTime",lastVASPopupTime);
            console.log(lastVASPopupTime);
            this.openVasModal(); //first time login
        }else{

        }
    }

    var openVasModal=function() //VAS scale modal
    {
        var modalOptions={
            animation: true,
            //backdrop:"static",
            templateUrl: 'templates/modal-vas.html',
            controller: 'VASController',
            size: 100,
            windowClass: 'vas-modal-window',
            resolve:{
                //startQs:function(){
                //    return $scope.startQs;
                //}
                //cancel: function()
                //{
                //    return this.dismiss("cancel");
                //}
            }
        };
        var modalInstance = $modal.open(modalOptions);
        modalInstance.rendered.then(function(){
            $rootScope.$broadcast('rzSliderForceRender');//Force refresh sliders on render. Otherwise bullets are aligned at left side.
        });
        modalInstance.result.then(function () {
        }, function () {
            //$route.reload();
        });
    };
    return{
        initSession:initSession,
        getSession:getSession,
        checkExistingCookie:checkExistingCookie,
        logoff:logoff,
        openVasModal:openVasModal,
        checkAndPopupVAS:checkAndPopupVAS
    }

})