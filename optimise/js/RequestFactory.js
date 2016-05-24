"use strict"

whModule.factory('RequestFactory',function(UserSession,apiConfig,$http,$location,spinnerService){
    var production_environment=apiConfig.production_environment;
    var dev_URLPath=apiConfig.dev_URLPath;
    var pro_URLPath=apiConfig.pro_URLPath;

    var token=null;
    return {
        PostJsonToW_Users:function(jsonString)
        {
            var res =null;
            spinnerService.show('Spinner');
            if(production_environment) {
                res = $http.post(pro_URLPath+'wh/users.php', jsonString);
            }else{
                res= $http.post(dev_URLPath+'wh/users.php', jsonString);
            }
            res.finally(function()
            {
                spinnerService.hide('Spinner');
            });
            return res;
        },
        Diary:function(params,action)
        {
            if(UserSession.checkExistingCookie()!=null)
            {
                var sessionRes=UserSession.checkExistingCookie();
                token=sessionRes['token'];
                //console.log(token);
            }else{
                console.log("not logged in...invalid GetJson");
                return;
            }
            var res =null;
            spinnerService.show('Spinner');
            if(action=="get")
            {
                if(production_environment) {
                    res = $http.get(pro_URLPath+'wh/diary.php',{headers:{"token":token},"params":params});
                }else{
                    res= $http.get(dev_URLPath+'wh/diary.php',{headers:{"token":token},"params":params});
                }
            }else if(action=="post")
            {
                if(production_environment) {
                    res = $http.post(pro_URLPath+'wh/diary.php', jsonString,{headers:{"token":token}});
                }else{
                    res= $http.post(dev_URLPath+'wh/diary.php', jsonString,{headers:{"token":token}});
                }
            }

            res.finally(function()
            {
                spinnerService.hide('Spinner');
            });
            return res;
        },
        PostJsonToW_GetUserToken:function(jsonString)
        {
            spinnerService.show('Spinner');
            var res = null;
            if(production_environment) {
                res = $http.post(pro_URLPath+'wh/gettoken.php', jsonString);
            }else{
                res = $http.post(dev_URLPath+'wh/gettoken.php', jsonString);
            }
            res.finally(function()
            {
                spinnerService.hide('Spinner');
            });
            return res;
        },
        PostJson:function(jsonString)
        {
            if(UserSession.checkExistingCookie()!=null)
            {
                var sessionRes=UserSession.checkExistingCookie();
                token=sessionRes['token'];
                //console.log(token);
            }else{
                console.log("not logged in...invalid GetJson");
                return;
            }
            var res=null;
            if(production_environment) {
                res = $http.post(pro_URLPath+'opt.php', jsonString,{headers:{"token":token}});
            }else{
                res = $http.post(dev_URLPath+'opt.php', jsonString,{headers:{"token":token}});
            }
            return res;
        },
        UpdateJson:function(jsonString)
        {
            var res =null;
            if(production_environment) {
                res = $http.post(pro_URLPath+'opt.php?OID=2', jsonString);
            }else{
                res = $http.post(dev_URLPath+'opt.php?OID=2', jsonString);
            }
            return res;
        },
        GetJson:function(params)
        {
            if(UserSession.checkExistingCookie()!=null)
            {
                var sessionRes=UserSession.checkExistingCookie();
                token=sessionRes['token'];
                //console.log(token);
            }else{
                console.log("not logged in...invalid GetJson");
                return;
            }
            spinnerService.show('Spinner');
            var res=null;
            if(production_environment) {
                res = $http.get(pro_URLPath+'opt.php', {headers:{"token":token},"params":params});
            }else{
                res = $http.get(dev_URLPath+'opt.php', {headers:{"token":token},"params":params});
            }
            res.finally(function()
            {
                spinnerService.hide('Spinner');
            });


            return res;
        },
        DeleteJson:function(jsonString)
        {
            var res = $http.delete(pro_URLPath+'opt.php', jsonString);
            if(production_environment) {
                res = $http.delete(dev_URLPath+'opt.php', jsonString);
            }
            return res;
        }
    }
})
/*
whModule.factory('USUBJID', function ($resource) {
    //console.log("USUBJID");
    //http://146.169.35.160/api/:project
    //var resource = $resource('http://www.wiki-health.org/api/:project',{},{
    var resource = $resource('http://localhost/wikihealth/api/proxy.php:project',{},{
        //var resource = $resource('/api/:project',{},{
    });
    //console.log(resource.url);
    return resource;
});
whModule.factory('Get', function ($resource) {
    console.log("USUBJID");
    //http://146.169.35.160/api/:project
    //var resource = $resource('http://www.wiki-health.org/api/:project',{},{
    var resource = $resource('http://localhost/wikihealth/api/proxy.php:project',{},{
        //var resource = $resource('/api/:project',{},{
    });
    //console.log(resource.url);
    return resource;
});

whModule.factory('Record', function ($resource) {
    //return $resource('http://www.wiki-health.org/api/Optimise/:id',{},{
    return $resource('http://localhost/wikihealth/api/proxy.php:id',{},{
        //return $resource('/api/Optimise/:id',{},{
        'remove' : function(data) {
            var myData = data;
            return myData;
        }
    });
});

whModule.factory('Edit', function ($resource) {
    //
    //return $resource('http://www.wiki-health.org/api/Optimise?OID=2',{},{
    return $resource('http://localhost/wikihealth/api/proxy.php?OID=2',{},{
        //return $resource('/api/Optimise?OID=2',{},{
    });
});*/
