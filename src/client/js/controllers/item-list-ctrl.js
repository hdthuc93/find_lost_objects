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
            { field: 'category_name', displayName: 'Tên vật phẩm', minWidth: 150 },
            { field: 'type', displayName: 'Loại', minWidth: 80,
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.type==1?"Tìm thấy":"Thất lạc"}}</div>'},
            { field: 'lost_or_found_at', displayName: 'Mất/Tìm thấy lúc', minWidth: 120 },
            { field: 'location_name', displayName: 'Địa điểm', minWidth: 150 },
            { field: 'fullName', displayName: 'Người liên quan', minWidth: 150 }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            // gridApi.selection.on.rowSelectionChanged($scope, function (row) {
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
        if(response.data.success){
            $scope.itemList.data = response.data.data;
        }else{
            $scope.itemList.data = response.data.data;
        }
    });
}