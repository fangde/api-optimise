//"use strict"


whModule.controller('timelineCtrl', function ($scope, UserSession, RequestFactory, viewService, $rootScope) {
        viewService.setView('Timeline');
        $scope.UserSessionService=UserSession;
        //Questionnaire summary results
        $scope.getLastQuestionnaires = function (UID, QSCAT, QSTEST) {
            var params = {"USUBJID": UID, "QSCAT": QSCAT, "QSTEST": QSTEST};
            //spinnerService.show('qsResultsSpinner');
            var resGet = RequestFactory.GetJson(params);
            var recordSet = [];
            resGet.success(function (data, status, headers, config) {
                var chartData = [];
                var resJson = angular.fromJson(data);
                var valueList = [];
                var timeseries = [];
                for (var i = 0; i < resJson.RecordSet.length; i++) {
                    var recordItems = resJson.RecordSet[i].RecordItems;
                    var tempQSSTRESC = null;
                    var tempDTC = null;
                    for (var j = 0; j < recordItems.length; j++) {
                        //store QSSTRESC value first
                        if (recordItems[j].fieldName == "QSSTRESC") {
                            tempQSSTRESC = recordItems[j].value;
                        }
                        if (recordItems[j].fieldName == "QSDTC") {
                            tempDTC = recordItems[j].value;
                        }
                    }
                    if (tempQSSTRESC != null && tempDTC != null) {
                        //valueList.push({"QSDTC":tempDTC,"QSSTRESC":tempQSSTRESC});
                        valueList.push({"QSDTC":tempDTC,"QSSTRESC":tempQSSTRESC});
                        timeseries.push([new Date(tempDTC).getTime(), parseFloat(tempQSSTRESC)]);
                    }
                }
                function sortFunction(a, b) {
                    if (a[0] === b[0]) {
                        return 0;
                    }
                    else {
                        return (a[0] < b[0]) ? -1 : 1;
                    }
                }

                timeseries.sort(function (a, b) {
                    if (a[0] === b[0]) {
                        return 0;
                    }
                    else {
                        return (a[0] < b[0]) ? -1 : 1;
                    }
                });
                valueList.sort(function(a,b){ //sort by DTC
                    return new Date(b.QSDTC) - new Date(a.QSDTC); //sort by DTC
                });
                $scope.qHistories[QSTEST]=valueList;
                $scope.qTimeSeries[QSTEST] = timeseries;
                console.log($scope.qHistories);
                $scope.drawGraph(QSTEST);

            });
            resGet.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
                return null;
            });

        };


        $scope.drawGraph = function (QSTEST) {


            function sortFunction(a, b) {
                if (a[0] === b[0]) {
                    return 0;
                }
                else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            }

            if ($scope.qTimeSeries["Physical Health Composite"] == null && $scope.qTimeSeries["Mental Health Composite"] == null) {

            } else {
                var seriesData = [{
                    "name": "Physical Health Composite",
                    "data": $scope.qTimeSeries["Physical Health Composite"]
                }, {
                    "name": "Mental Health Composite",
                    "data": $scope.qTimeSeries["Mental Health Composite"]
                }];
                console.log("msqol54...");
                console.log(seriesData);
                $scope.MSQOL54_Chart = {
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
                        text: 'MSQOL-54', style: {"fontSize": "12px"}
                    },
                    loading: false,
                    xAxis: {
                        title: {text: 'Date and Time'},
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {text: 'Score'},
                        max: 100,
                        min:0,
                        endOnTick:false
                    },
                    useHighStocks: false,

                    func: function (chart) {
                        //setup some logic for the chart
                    }

                }
            }

            if ($scope.qTimeSeries["Global Physical Health component"] == null && $scope.qTimeSeries["Global Mental Health component"] == null) {

            } else {
                var seriesData = [{
                    "name": "Global Physical Health component",
                    "data": $scope.qTimeSeries["Global Physical Health component"]
                }, {
                    "name": "Global Mental Health component",
                    "data": $scope.qTimeSeries["Global Mental Health component"]
                }];
                $scope.PROMIS_Chart = {
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
                        text: 'PROMIS', style: {"fontSize": "12px"}
                    },
                    loading: false,
                    xAxis: {
                        title: {text: 'Date and Time'},
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {text: 'Score'},
                        max: 20,
                        min:0,
                        endOnTick:false
                    },
                    useHighStocks: false,

                    func: function (chart) {
                        //setup some logic for the chart
                    }

                }
            }


            if ($scope.qTimeSeries["Patient Determined Disease Step"] == null) {

            } else {
                var seriesData = [{
                    "name": "Patient Determined Disease Step",
                    "data": $scope.qTimeSeries["Patient Determined Disease Step"]
                }];
                $scope.PDDS_Chart = {
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
                        text: 'PDDS', style: {"fontSize": "12px"}
                    },
                    loading: false,
                    xAxis: {
                        title: {text: 'Date and Time'},
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {text: 'Score'},
                        max: 9,
                        min:0,
                        endOnTick:true
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

                }

                //console.log(seriesData.length);
                if (seriesData.length > 0) {
                }

            }

            if ($scope.qTimeSeries["VAS"] == null) {

            } else {
                var seriesData = [{
                    "name": "VAS",
                    "data": $scope.qTimeSeries["VAS"]
                }];
                $scope.VAS_Chart = {
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
                        text: 'VAS', style: {"fontSize": "12px"}
                    },
                    loading: false,
                    xAxis: {
                        title: {text: 'Date and Time'},
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {text: 'Score'},
                        max: 10,
                        min:0,
                        endOnTick:false
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

                }

                //console.log(seriesData.length);
                if (seriesData.length > 0) {
                }

            }
        };

        $scope.initialise = function () {
            $scope.qTimeSeries = {};
            $scope.qHistories={};
            if (UserSession.checkExistingCookie() != null) {
                var sessionRes = UserSession.checkExistingCookie();
                $scope.MS_UID = sessionRes['w_id'];
                console.log($scope.MS_UID);
            } else {
                return;
            }
            /* if($scope.MS_UID==null)
             {
             return;
             }*/
            $scope.getLastQuestionnaires($scope.MS_UID,"MSQOL-54","Mental Health Composite");
             $scope.getLastQuestionnaires($scope.MS_UID,"MSQOL-54","Physical Health Composite");
            $scope.getLastQuestionnaires($scope.MS_UID, "PROMIS", "Global Mental Health component");
            $scope.getLastQuestionnaires($scope.MS_UID, "PROMIS", "Global Physical Health component");
            $scope.getLastQuestionnaires($scope.MS_UID, "PDDS", "Patient Determined Disease Step");
            $scope.getLastQuestionnaires($scope.MS_UID, "VAS", "VAS");
            //$scope.drawGraph();
            //$scope.jumpToQ($scope.currentQs);
        };

        $scope.isPDDS_Drawn = false;
        $scope.isMsqol54_Drawn = false;
        $scope.isPromis_Drawn = false;
        $scope.isVAS_Drawn = false;
        $scope.chartsOrder = [];
        $scope.charts = [];
        $scope.initialise();
    }
);