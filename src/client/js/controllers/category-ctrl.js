var app = angular.module("findLostObject");

app.controller("categoryCtrl", ['$scope', '$rootScope', 'helper', categoryCtrl]);
function categoryCtrl($scope, $rootScope, helper) {

    $scope.categoryList = {
        minRowsToShow: 50,
        enableSorting: false,
        enableRowSelection: true,
        multiSelect: false,
        enableColumnResizing: true,
        selectionRowHeaderWidth: 35,
        columnDefs: [
            { field: 'name', displayName: 'Tên loại', minWidth: 200},
        ],
        data:[{name:"demo"},{name:"demo 2"}],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.showHandleArea = false;
                $scope.action = "";
                if (row.isSelected) {
                    $scope.selectedRow = row.entity;
                } else {
                    $scope.selectedRow = null;
                }
            });
        }
    };
    console.log($scope.categoryList,9998);
}