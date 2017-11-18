var app = angular.module("findLostObject");

app.controller("itemLostListCtrl", ['$scope', '$rootScope', '$http', 'helper', itemLostListCtrl]);
function itemLostListCtrl($scope, $rootScope, $http, helper) {
    function init() {
        $scope.itemLostList = [];
    }
    init();



}