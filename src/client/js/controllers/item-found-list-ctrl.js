var app = angular.module("findLostObject");

app.controller("itemFoundListCtrl", ['$scope', '$rootScope', '$http', 'helper', itemFoundListCtrl]);
function itemFoundListCtrl($scope, $rootScope, $http, helper) {
    function init() {
    }
    init();

    $scope.itemList = {
        minRowsToShow: 15,
        enableSorting: false,
        enableRowSelection: true,
        multiSelect: false,
        enableColumnResizing: true,
        selectionRowHeaderWidth: 35,
        columnDefs: [
            { field: 'no', displayName: 'STT', minWidth: 40 },
            { field: 'category_name', displayName: 'Tên vật phẩm', minWidth: 120 },
            { field: 'type', displayName: 'Loại', minWidth: 70,
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.type==1?"Tìm thấy":"Thất lạc"}}</div>'},
            { field: 'lost_or_found_at', displayName: 'Tìm thấy lúc', minWidth: 120 },
            { field: 'location_name', displayName: 'Địa điểm', minWidth: 150 },
            { field: 'fullName', displayName: 'Người liên quan', minWidth: 150 }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $scope.selectedRow = row.entity;
                } else {
                    $scope.selectedRow = null;
                }
            });
        }
    };

    $http.get("/api/items/found")
    .then(function (response) {
        if(response.data.success){
            var data = response.data.data;
            data.forEach(function (e, i) {
                data[i] = e;
                data[i].no = i + 1;
            });
            $scope.itemList.data = data;
        }else{
            $scope.itemList.data = [];
        }
    });

    $scope.viewItem = function(){
        if($scope.selectedRow && $scope.selectedRow.itemId){
            location.href = "#/track?item="+$scope.selectedRow.itemId;
        }else{
            helper.popup.info({ title: "Thông báo", message: "Vật phẩm này không tồn tại", close: function () { return; } })
        }
    }
}