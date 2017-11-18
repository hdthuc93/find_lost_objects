var app = angular.module("findLostObject");

app.controller("itemListCtrl", ['$scope', '$rootScope', '$http', 'helper', itemListCtrl]);
function itemListCtrl($scope, $rootScope, $http, helper) {
    function init() {
        $scope.itemList = [];
    }
    init();



}