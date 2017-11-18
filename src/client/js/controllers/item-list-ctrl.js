var app = angular.module("findLostObject");

app.controller("itemListCtrl", ['$scope', '$rootScope', '$http', 'helper', itemListCtrl]);
function itemListCtrl($scope, $rootScope, $http, helper) {
    function init() {
    }
    init();

    $scope.itemList = {
        minRowsToShow: 50,
        enableSorting: false,
        enableRowSelection: true,
        multiSelect: false,
        enableColumnResizing: true,
        selectionRowHeaderWidth: 35,
        columnDefs: [
            { field: 'no', displayName: 'STT', minWidth: 50, maxWidth: 70 },
            { field: 'className', displayName: 'Lớp', minWidth: 50, maxWidth: 70 }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            // gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            //     $scope.showHandleArea = false;
            //     $scope.action = "";
            //     if (row.isSelected) {
            //         $scope.selectedRow = row.entity;
            //     } else {
            //         $scope.selectedRow = null;
            //     }
            // });
        }
    };

    $http.get("/api/items")
    .then(function (response) {
        console.log("Item list", response);
        if(response.data.success){
            $scope.itemList = response.data.data;
        }
        // var msg = response.data.success ? "Thêm vật thất lạc thành công." : "Thêm vật thất lạc thất bại, vui lòng kiểm tra lại";
        // helper.popup.info({ title: "Thông báo", message: msg, close: function () { return; } })
    });


}