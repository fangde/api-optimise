/**
 * Created with IntelliJ IDEA.
 * User: myyong
 * Date: 13/02/2015
 * Time: 14:14
 * To change this template use File | Settings | File Templates.
 */

var recordModule = angular.module('Optimise.record',['ngResource']);

recordModule.factory('Record', function ($resource) {
    return $resource('http://localhost/wikihealth/api/proxy.php:id',{},{
    //return $resource('/api/Optimise/:id',{},{
        'remove' : function(data) {
            var myData = data;
            return myData;
        }
    });
});

recordModule.factory('Edit', function ($resource) {
        return $resource('http://localhost/wikihealth/api/proxy.php?OID=2',{},{
        //return $resource('/api/Optimise?OID=2',{},{
    });
});

recordModule.factory('USUBJID', function ($resource) {
    var resource = $resource('http://localhost/wikihealth/api/proxy.php',{},{
    //var resource = $resource('/api/http://146.169.35.160/api/OPTIMISE?USUBJID=OPT001&DOMAIN=EX?format=json:project',{},{
    });
    //console.log(resource.url);
    return resource;
});

recordModule.factory('USERID', function ($resource) {
    var resource = $resource('http://192.99.243.218/api/wh/gettoken4c.php',{},{
        //var resource = $resource('/api/http://146.169.35.160/api/OPTIMISE?USUBJID=OPT001&DOMAIN=EX?format=json:project',{},{
    });
    //console.log(resource.url);
    return resource;
});

/*
recordModule.factory('Delete', function ($resource) {
    //return $resource('http://146.169.35.160/api/Optimise/');
    var uri = 'http://146.169.35.160/api/Optimise/{"RecordItems":[{"fieldName":"USUBJID","value":"OPT001"},{"fieldName":"QSSEQ","value":0}]}';
    //console.log
    var myResource = $resource(uri,{},{
    });
    console.log(myResource.url);
    return myResource;
});
*/

recordModule.service('records', ['Record','Edit', 'USUBJID', '$http', function (Record, Edit, USUBJID, $http) {

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
    }

    var getSeqName = function (DOMAIN) {
        var seqFieldName = '';
        switch (DOMAIN) {
            case 'QS': {
                seqFieldName = 'QSSEQ';
                break;
            }
            case 'SV': {
                seqFieldName = 'VISITNUM';
                break;
            }
            case 'FA': {
                seqFieldName = 'FASEQ';
                break;
            }
            case 'CE': {
                seqFieldName = 'CESEQ';
                break;
            }
            case 'PR': {
                seqFieldName = 'PRSEQ';
                break;
            }
            case 'EX': {
                seqFieldName = 'EXSEQ';
                break;
            }
            case 'REL': {
                seqFieldName = 'RELID';
                break;
            }
            case 'DM': {
                seqFieldName = 'USUBJID';
                break;
            }
            case 'LB': {
                seqFieldName = 'LBSEQ';
                break;
            }
            case 'IS': {
                seqFieldName = 'ISSEQ';
                break;
            }
            case 'NV': {
                seqFieldName = 'NVSEQ';
                break;
            }
            case 'VS': {
                seqFieldName = 'VSSEQ';
                break;
            }
        };
        return seqFieldName;
    }

    var getEventID = function(event) {
        switch (DOMAIN) {
            case 'QS': {
                return event.DOMAIN+"_"+event.QSSEQ;
            }
            case 'SV': {
                return event.DOMAIN+"_"+event.VISITNUM;
            }
            case 'FA': {
                return event.DOMAIN+"_"+event.FASEQ;
            }
            case 'CE': {
                return event.DOMAIN+"_"+event.CESEQ;
            }
            case 'PR': {
                return event.DOMAIN+"_"+event.PRSEQ;
            }
            case 'EX': {
                return event.DOMAIN+"_"+event.EXSEQ;
            }
            case 'REL': {
                return event.DOMAIN+"_"+event.RELID;
            }
            case 'DM': {
                return event.DOMAIN+"_"+event.USUBJID;
            }
            case 'LB': {
                return event.DOMAIN+"_"+event.LBSEQ;
            }
            case 'IS': {
                return event.DOMAIN+"_"+event.ISSEQ;
            }
            case 'NV': {
                return event.DOMAIN+"_"+event.NVSEQ;
            }
            case 'VS': {
                return event.DOMAIN+"_"+event.VSSEQ;
            }
        };
    }

    /*
    var getResName = function (DOMAIN) {
        var seqFieldName = '';
        switch (DOMAIN) {
            case 'VS': {
                seqFieldName = 'VSORRES';
                break;
            }
        };
        return seqFieldName;
    }*/

    var formatForPostEdit = function (idRecord, valueRecord) {
        // {"CurrentRecord":[{"fieldName":"USUBJID","value":"Test"},{"fieldName":"VSSEQ","value":0}],"NewRecord":[{"fieldName":"VSORRES","value":"110"}]}
        // {"CurrentRecord":[{"fieldName":"USUBJID","value":"Test"},{"fieldName":"VSTEST","value":"Height"},{"fieldName":"VSORRES","value":"110"}],"NewRecord":[{"fieldName":"VSORRES","value":"110"}]}

        var root = {"CurrentRecord":idRecord, "NewRecord":valueRecord};
        //console.log(angular.toJson(root));
        return angular.toJson(root);
    }


    var formatForDelete = function (aRecord) {
        var keys = Object.keys(aRecord);
        var recordSet = [];
        var recordItems = [];
        var keysAndItems = [];
        var newRecordItem = {"RecordItems":keysAndItems};
        recordSet.push(newRecordItem);
        //var root = {"RecordSet":recordSet};

        for (var k = 0; k < keys.length; k++){
            //console.log(keys[k]);

            switch (keys[k]) {
                case 'QSSEQ': {
                    var keyAndItem = {"fieldName":"QSSEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'VISITNUM': {
                    var keyAndItem = {"fieldName":"VISITNUM", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'FASEQ': {
                    var keyAndItem = {"fieldName":"FASEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'PRSEQ': {
                    var keyAndItem = {"fieldName":"PRSEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'RELID': {
                    var keyAndItem = {"fieldName":"RELID", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'CESEQ': {
                    var keyAndItem = {"fieldName":"CESEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'VSSEQ': {

                    var keyAndItem = {"fieldName":"VSSEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'MHSEQ': {

                    var keyAndItem = {"fieldName":"MHSEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'APMHSEQ': {

                    var keyAndItem = {"fieldName":"APMHSEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
                case 'EXSEQ': {

                    var keyAndItem = {"fieldName":"EXSEQ", "value": aRecord[keys[k]]};
                    keysAndItems.push(keyAndItem);
                    break;
                }
            };

        }
        //console.log(newRecordItem);
        return angular.toJson(newRecordItem);
    }

    var formatForDeleteGivenDomain = function (seqFieldName, seqValue) {

        var recordSet = [];
        var keysAndItems = [];
        var newRecordItem = {"RecordItems":keysAndItems};
        recordSet.push(newRecordItem);

        var keyAndItem;

        keyAndItem = {"fieldName":seqFieldName, "value": seqValue};
        keysAndItems.push(keyAndItem);

        //console.log(angular.toJson(newRecordItem));
        return angular.toJson(newRecordItem);
    }

    var printAll = function () {
        Record.get(function(recordSet) {
            angular.forEach(recordSet, function(recordItems) {
                angular.forEach(recordItems, function(items) {
                    angular.forEach(items, function(item) {
                        angular.forEach(item, function(i) {
                            console.log(i);
                        })
                    })
                })
            });
        });
    }

    var saveRecord = function (newRecord) {
        var jsonBody = formatForPostSave(newRecord);
        //console.log(jsonBody);
        Record.save(jsonBody);
    };

    var editRecord = function (idRecord, valueRecord) {
        var jsonBody = formatForPostEdit(idRecord, valueRecord);
        Edit.save(jsonBody);
    };

    var deleteRecord = function(recordToDelete) {
        var jsonBody = formatForDelete(recordToDelete);
        //console.log(recordToDelete);
        //console.log(jsonBody);

        $http({url: 'http://localhost/wikihealth/api/proxy.php',
        //$http({url: '/api/Optimise/',
            method: 'DELETE',
            data: jsonBody,
            headers: {"Content-Type": "application/json;charset=utf-8"}}).then(function(res) {
            console.log(res.data);
        }, function(error) {
            console.log(error);
        });

    }

    /*
    var deleteRecordGivenJSON = function(jsonBody) {
        $http({url: 'http://146.169.35.160/api/Optimise/',
        //$http({url: '/api/Optimise/',
            method: 'DELETE',
            data: jsonBody,
            headers: {"Content-Type": "application/json;charset=utf-8","token":"long token code"}}).then(function(res) {
                console.log(res.data);
            }, function(error) {
                console.log(error);
            });
    }
     */

    var deleteRecordGivenJSON = function(jsonBody) {
        $http({url: 'http://localhost/wikihealth/api/proxy.php',
            //$http({url: '/api/Optimise/',
            method: 'DELETE',
            data: jsonBody,
            headers: {"Content-Type": "application/json;charset=utf-8"}}).then(function(res) {
                console.log(res.data);
            }, function(error) {
                console.log(error);
            });
    }

    var getRecordSet = function($scope, subjectID) {
        //console.log(subjectID);
        USUBJID.get({ USUBJID:subjectID}, function(data) {
            //angular.forEach(data.RecordSet, function(recordSet) {
            /*
            var recordSet = data.RecordSet;
            data.$promise.then(function(recordSet) {
                $scope.records = data.RecordSet;
                console.log(data.RecordSet);
            }); */
            data.$promise.then(function() {

                return data;
                //$scope.data = data;
                //console.log($scope.records);
            })

        });
    }

    var printRecord = function(subjectID) {
        //console.log(subjectID);
        USUBJID.get({USUBJID:subjectID}, function(data) {
            console.log("Number of Records Found:"+data.RecordSet.length);
            angular.forEach(data.RecordSet, function(recordSet) {
                angular.forEach(recordSet, function(items) {
                    console.log("Number of FieldName/Values Found:"+items.length);
                    //console.log(items);
                    //printItems(items);
                })
            })
        });
    }

    var printItems = function(items) {
        angular.forEach(items, function(item) {
            console.log(item);
        });
    }

    /*
    var getYear = function(aDateString) {
        //console.log(aDateString.substr(0,4));
        return (aDateString.substr(0,4));
    }

    var getMonth = function(aDateString) {
        //console.log(aDateString.substr(5,7));
        return (aDateString.substr(5,2)-1);
    }

    var getDay = function(aDateString) {
        //console.log(aDateString.substr(8,10));
        return (aDateString.substr(8,2));
    }
    */

    var formatStringToDate = function (aDate) {

        //var newDate = new Date(getYear(aDate),getMonth(aDate),getDay(aDate));
        //return newDate;
        //console.log(aDate);

        if (aDate != '')
        {
            var date = new Date(aDate);
            return date;
        }
        else
            return '';

    }



    return {
        formatForPostSave: formatForPostSave,
        formatForPostEdit: formatForPostEdit,
        saveRecord: saveRecord,
        editRecord: editRecord,
        printAll: printAll,
        printRecord: printRecord,
        getRecordSet: getRecordSet,
        deleteRecord:deleteRecord,
        formatForDeleteGivenDomain:formatForDeleteGivenDomain,
        deleteRecordGivenJSON: deleteRecordGivenJSON,
        formatStringToDate:formatStringToDate,
        getEventID: getEventID
    };
}]);
