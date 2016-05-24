"use strict"
whModule.controller('navigationController',function($scope,viewService){
    $scope.viewService=viewService;

});

whModule.service('viewService', function(){
    var setView;
    var view = {"Section":"", "DisableInputFields":true}
    var offlineWork = true;
    var viewConfig;

    var setConfiguration = function(data) {
        viewConfig = data;
    }

    var getConfiguration = function() {
        return viewConfig;
    }

    var getConfigurationSetting = function(term) {
        return false;
    }

    var setOffline = function (offline) {
        offlineWork = offline;
    }

    var workOffline = function () {
        return offlineWork;
    }

    setView = function (viewName, disable) {
        view.Section = viewName;
        view.DisableInputFields = disable;
    };

    var getView = function() {
        return view;
    }

    return {
        setView: setView,
        getView: getView,
        setOffline: setOffline,
        workOffline: workOffline,
        setConfiguration: setConfiguration,
        getConfiguration: getConfiguration,
        getConfigurationSetting: getConfigurationSetting
    };
})