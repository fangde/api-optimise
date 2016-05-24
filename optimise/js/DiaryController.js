"use strict"
whModule.controller('MyDiaryCtrl', function (qsConfig,$scope, $rootScope,RequestFactory,$modal,viewService,UserSession,$route,spinnerService) {
    $scope.message="";
    $scope.UserSession=UserSession;
    $rootScope.$broadcast('rzSliderForceRender');
    $scope.diaries=[];

    $scope.setPage = function (pageNo) {
        $scope.bigCurrentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.bigCurrentPage);
        $scope.listDiary($scope.itemsPerPage,$scope.itemsPerPage*($scope.bigCurrentPage-1));
    };

    $scope.maxSize = 5; //total pages nav shown
    $scope.bigTotalItems = 0;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage=3;

    $scope.postDiary=function(){
        var root = {"text":$scope.message};
        var returnResult=angular.toJson(root);
        var res=RequestFactory.Diary(returnResult,"post");
        res.success(function(data, status, headers, config) {
            var jsonResult=angular.fromJson(data);
            if(jsonResult.result=="succeed")
            {
                $scope.diaries=[];
                $scope.listDiary();
                //$route.reload();
            }else{
                alert("Post Failed!");
            }
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    }
    $scope.listDiary=function(limit, skip)
    {
        $scope.diaries=[];
        var query ={};
        if(limit!=null&&skip!=null) {
            query = {"limit": limit, "skip": skip};
        }
        //var queryRoot=angular.toJson(root);

        var res=RequestFactory.Diary(query,"get");
        res.success(function(data, status, headers, config) {
            var jsonResult=angular.fromJson(data);
            if(jsonResult.result=="succeed")
            {
                console.log(jsonResult);
                for(var i=0;i<jsonResult.diaries.length;i++)
                {
                    var datetime=new Date(1000*jsonResult.diaries[i].created_date_long);
                    //console.log(datetime.toDateString());
                    $scope.diaries.push([datetime.toDateString()+" "+datetime.toLocaleTimeString(),jsonResult.diaries[i].text]);
                }
                //$scope.totalItems=$scope.totalItems;
                $scope.bigTotalItems=jsonResult.totalRecords;
                console.log($scope.diaries);
                //$route.reload();
            }else{
                alert("list Failed!");
            }
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.listDiary($scope.itemsPerPage,$scope.itemsPerPage*($scope.bigCurrentPage-1));

})