var app = angular.module("findLostObject");

app.controller("itemFoundListCtrl", ['$scope', '$rootScope', '$http', 'helper', itemFoundListCtrl]);
function itemFoundListCtrl($scope, $rootScope, $http, helper) {
    function init() {
        $scope.itemFoundList = [];
    }
    init();



}