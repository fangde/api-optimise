//"use strict"


whModule.controller('timelineCtrl', function ($scope, UserSession,RequestFactory,viewService,$rootScope) {
        viewService.setView('Timeline');
        $scope.testData = "1";
        $scope.getTestData=function()
        {
            return $scope.testData;
        };
       //Questionnaire summary results
        $scope.getLastQuestionnaires=function(UID,QSCAT,QSTEST){
            var params={"USUBJID":UID, "QSCAT":QSCAT, "QSTEST":QSTEST};
            //spinnerService.show('qsResultsSpinner');
            var resGet=RequestFactory.GetJson(params);
            var recordSet=[];
            resGet.success(function(data, status, headers, config) {
                var chartData=[];
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
                        //valueList.push({"QSDTC":tempDTC,"QSSTRESC":tempQSSTRESC});
                        timeseries.push([new Date(tempDTC).getTime(),parseFloat(tempQSSTRESC)]);
                        chartData.push({
                            date: new Date(tempDTC).getTime(),
                            visits: parseFloat(tempQSSTRESC)
                        });
                    }
                }
                chartData.sort(function(a,b){ //sort by DTC
                    return new Date(a.date) - new Date(b.date); //sort by DTC
                });
                $scope.qTimeSeries[QSTEST]=chartData;
                //console.log($scope.qTimeSeries);
                $scope.drawGraph(QSTEST);

            });
            resGet.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
                return null;
            });

        };


        $scope.drawGraph = function (QSTEST)
        {

            //console.log($scope.qTimeSeries);
            if(!$scope.isPDDS_Drawn&&QSTEST=="Patient Determined Disease Step")
            {
                //not drawn
                //console.log($scope.qTimeSeries["Patient Determined Disease Step"]);
                if($scope.qTimeSeries["Patient Determined Disease Step"]==null)
                {
                    //empty results
                    console.log("empty results pdds");
                }else{
                    $scope.isPDDS_Drawn=true;
                    console.log("drawn pdds");
                    var chartData=$scope.qTimeSeries["Patient Determined Disease Step"];
                    //draw it
                    var chartConfig={
                       /* titles: [{
                            text: "Timeline",
                            size: 16
                        }],*/
                        "type": "serial",
                        "theme": "light",
                        //"marginRight": 80,
                        //"autoMarginOffset": 20,
                        //"marginTop": 7,
                        "dataProvider": chartData,
                        "valueAxes": [{
                            "axisAlpha": 0.2,
                            "dashLength": 1,
                            "position": "left"
                        }],
                        "mouseWheelZoomEnabled": false,
                        "graphs": [{
                            "id": "pdds",
                            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Score: [[value]]</span></b>",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "title": "red line",
                            "valueField": "visits",
                            "useLineColorForBulletBorder": true
                        }],
                      /*  "chartScrollbar": {
                            "autoGridCount": true,
                            "graph": "pdds",
                            "scrollbarHeight": 50
                        },*/
                        "chartCursor": {
                            zoomable:false
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            minPeriod:"mm",
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },

                        "export": {
                            "enabled": true
                        }
                    };

                    var divToSelect="timelineDIV"+$scope.charts.length;
                    var chartInstance=AmCharts.makeChart(divToSelect,chartConfig);
                   /* if($scope.charts.length==0)
                    {
                        var chartScrollbar = new AmCharts.ChartScrollbar();
                        //chartScrollbar.autoGridCount=true;
                        chartScrollbar.graph="pdds";
                        chartScrollbar.scrollbarHeight=50;
                        chartInstance.addChartScrollbar(chartScrollbar);
                        console.log("addingChartScollBar PDDS")
                    }*/
                    console.log(divToSelect);

                    $scope.charts.push(chartInstance);
                    $scope.chartsOrder.push("PDDS");

                }
            }
            if(!$scope.isMsqol54_Drawn&&(QSTEST=="Physical Health Composite"||QSTEST=="Mental Health Composite"))
            {
                if($scope.qTimeSeries["Physical Health Composite"]==null||$scope.qTimeSeries["Mental Health Composite"]==null)
                {
                    //not yet
                }else{
                    $scope.isMsqol54_Drawn=true;
                    var chartData=$scope.qTimeSeries["Physical Health Composite"];
                    var chartData=$scope.qTimeSeries["Mental Health Composite"];
                    var chartConfig={
                        titles: [{
                            text: "MSQOL-54",
                            size: 16
                        }],
                        "type": "serial",
                        "theme": "light",
                        //"marginRight": 80,
                        //"autoMarginOffset": 20,
                        //"marginTop": 7,
                        "dataProvider": chartData,
                        "valueAxes": [{
                            "axisAlpha": 0.2,
                            "dashLength": 1,
                            "position": "left"
                        }],

                        "mouseWheelZoomEnabled": false,
                        "graphs": [{
                            "id": "msqol-54",
                            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Score: [[value]]</span></b>",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "title": "red line",
                            "valueField": "visits",
                            "useLineColorForBulletBorder": true
                        }],
                       /* "chartScrollbar": {
                            "autoGridCount": true,
                            "graph": "g1",
                            "scrollbarHeight": 40
                        },*/
                        "chartCursor": {
                            zoomable:false
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            minPeriod:"mm",
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },
                        "valueAxes": [
                            {
                                "title": "Axis title"
                            }
                        ],
                        "legend": {
                            "useGraphSettings": true
                        },
                        "export": {
                            "enabled": true
                        }
                    };
                    var divToSelect="timelineDIV"+$scope.charts.length;
                    $scope.charts.push(AmCharts.makeChart(divToSelect,chartConfig));
                                     //chartInstance.addListener("zoomed", syncZoom);
                    console.log("drawn msqol54");
                }
            }
            if(!$scope.isPromis_Drawn&&(QSTEST=="Global Physical Health component"||QSTEST=="Global Mental Health component"))
            {
                if($scope.qTimeSeries["Global Physical Health component"]!=null&&$scope.qTimeSeries["Global Mental Health component"]!=null)
                {
                    $scope.isPromis_Drawn=true;
                    var chartData=$scope.qTimeSeries["Global Physical Health component"];
                    var chartData2=$scope.qTimeSeries["Global Mental Health component"];
                    var chartConfig={
                        "type": "serial",
                        "theme": "light",
                        //"marginRight": 80,
                        //"autoMarginOffset": 20,
                        //"marginTop": 7,
                        "dataProvider": chartData,
                        "valueAxes": [{
                            "axisAlpha": 0.2,
                            "dashLength": 1,
                            "position": "left"
                        }],
                        "mouseWheelZoomEnabled": false,
                        "graphs": [{
                            "id": "promis",
                            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Score: [[value]]</span></b>",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "title": "red line",
                            "valueField": "visits",
                            "useLineColorForBulletBorder": true
                        }],
                       /* "chartScrollbar": {
                            "autoGridCount": true,
                            "graph": "promis",
                            "scrollbarHeight": 40
                        },*/
                        //"chartScrollbar": {
                        //    "autoGridCount": true,
                        //    "graph": "g1",
                        //    "scrollbarHeight": 40
                        //},
                        "chartCursor": {
                            zoomable:false
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            minPeriod:"mm",
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },
                        "export": {
                            "enabled": true
                        }
                    };
                    var divToSelect="timelineDIV"+$scope.charts.length;
                    var chartInstance=AmCharts.makeChart(divToSelect,chartConfig);
                   /* if($scope.charts.length==0) {
                        console.log("addingChartScollBar Promis")
                        var chartScrollbar = new AmCharts.ChartScrollbar();
                        //chartScrollbar.autoGridCount = true;
                        chartScrollbar.graph = "promis";
                        chartScrollbar.scrollbarHeight = 50;
                        chartInstance.addChartScrollbar(chartScrollbar);
                    }*/
                    $scope.charts.push(chartInstance);
                    $scope.chartsOrder.push("Promis");
                    //chartInstance.addListener("zoomed", syncZoom);
                    //chartInstance.addListener("init", addCursorListeners);
                    console.log("drawn promis");
                    //return;
                }else{
                  //return;
                }
            }

            if(!$scope.isVAS_Drawn&&(QSTEST=="VAS"))
            {
                if($scope.qTimeSeries["VAS"]!=null)
                {
                    $scope.isVAS_Drawn=true;
                    var chartData=$scope.qTimeSeries["VAS"];
                    console.log(chartData);
                    var chartConfig={
                        "type": "serial",
                        "theme": "light",
                        //"marginRight": 80,
                        //"autoMarginOffset": 20,
                        //"marginTop": 7,
                        "dataProvider": chartData,
                        "valueAxes": [{
                            "axisAlpha": 0.2,
                            "dashLength": 1,
                            "position": "left"
                        }],
                        "mouseWheelZoomEnabled": false,
                        "graphs": [{
                            "id": "vas",
                            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>Score: [[value]]</span></b>",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "title": "red line",
                            "valueField": "visits",
                            "useLineColorForBulletBorder": true
                        }],
                       /* "chartScrollbar": {
                            "autoGridCount": true,
                            "graph": "vas",
                            "scrollbarHeight": 40
                        },*/
                        //"chartScrollbar": {
                        //    "autoGridCount": true,
                        //    "graph": "g1",
                        //    "scrollbarHeight": 40
                        //},
                        "chartCursor": {
                            zoomable:false
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            minPeriod:"mm",
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },
                        "export": {
                            "enabled": true
                        }
                    };
                    var divToSelect="timelineDIV"+$scope.charts.length;
                    var chartInstance=AmCharts.makeChart(divToSelect,chartConfig);
                    /* if($scope.charts.length==0) {
                     console.log("addingChartScollBar Promis")
                     var chartScrollbar = new AmCharts.ChartScrollbar();
                     //chartScrollbar.autoGridCount = true;
                     chartScrollbar.graph = "promis";
                     chartScrollbar.scrollbarHeight = 50;
                     chartInstance.addChartScrollbar(chartScrollbar);
                     }*/
                    $scope.charts.push(chartInstance);
                    $scope.chartsOrder.push("VAS");
                    //chartInstance.addListener("zoomed", syncZoom);
                    //chartInstance.addListener("init", addCursorListeners);
                    console.log("drawn vas");
                    //return;
                }else{
                    //return;
                }
            }

            if($scope.isPDDS_Drawn&&$scope.isPromis_Drawn&&$scope.isVAS_Drawn)
            {
                console.log("setting zoom");
                var charts=$scope.charts;
                console.log("chartLength:"+charts.length);
                for (var x in charts) {
                    //charts[x].addListener("zoomed", syncZoom);
                    //charts[x].addListener("init", addCursorListeners);
                }
            }
            function addCursorListeners(event) {
                //event.chart.chartCursor.addListener("changed", handleCursorChange);
                //event.chart.chartCursor.addListener("onHideCursor", handleHideCursor);
            }

            function syncZoom(event) {
                for (x in charts) {
                    if (charts[x].ignoreZoom) {
                        charts[x].ignoreZoom = false;
                    }
                    if (event.chart != charts[x]) {
                        charts[x].ignoreZoom = true;
                        charts[x].zoomToDates(event.startDate, event.endDate);
                    }
                }
            }
            function handleCursorChange(event) {
                for (var x in charts) {
                    if (event.chart != charts[x]) {
                        if (event.position) {
                            charts[x].chartCursor.isZooming(event.target.zooming);
                            charts[x].chartCursor.selectionPosX = event.target.selectionPosX;
                            charts[x].chartCursor.forceShow = true;
                            charts[x].chartCursor.setPosition(event.position, false, event.target.index);
                        }
                    }
                }
            }

            function handleHideCursor() {
                for (var x in charts) {
                    if (charts[x].chartCursor.hideCursor) {
                        charts[x].chartCursor.forceShow = false;
                        charts[x].chartCursor.hideCursor(false);
                    }
                }
            }


            //zoomChart();

            // this method is called when chart is first inited as we listen for "rendered" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                //chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
            }
        }
        $scope.initialise=function()
        {
            $scope.qTimeSeries={};
            if(UserSession.checkExistingCookie()!=null)
            {
                var sessionRes=UserSession.checkExistingCookie();
                $scope.MS_UID=sessionRes['w_id'];
                console.log($scope.MS_UID);
            }else{
                return;
            }
            /* if($scope.MS_UID==null)
             {
             return;
             }*/
        /*    $scope.getLastQuestionnaires($scope.MS_UID,"MSQOL-54","Mental Health Composite");
            $scope.getLastQuestionnaires($scope.MS_UID,"MSQOL-54","Physical Health Composite");*/
            $scope.getLastQuestionnaires($scope.MS_UID,"PROMIS","Global Mental Health component");
            $scope.getLastQuestionnaires($scope.MS_UID,"PROMIS","Global Physical Health component");
            $scope.getLastQuestionnaires($scope.MS_UID,"PDDS","Patient Determined Disease Step");
            $scope.getLastQuestionnaires($scope.MS_UID,"VAS","VAS");
            //$scope.drawGraph();
            //$scope.jumpToQ($scope.currentQs);
        };

        $scope.isPDDS_Drawn=false;
        $scope.isMsqol54_Drawn=false;
        $scope.isPromis_Drawn=false;
        $scope.isVAS_Drawn=false;
        $scope.chartsOrder=[];
        $scope.charts = [];
        $scope.initialise();
    }
    );