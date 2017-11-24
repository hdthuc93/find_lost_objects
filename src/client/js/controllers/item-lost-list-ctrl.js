var app = angular.module("findLostObject");

app.controller("itemLostListCtrl", ['$scope', '$rootScope', '$http', 'helper', itemLostListCtrl]);
function itemLostListCtrl($scope, $rootScope, $http, helper) {
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
            { field: 'no', displayName: 'STT', width: 40 },
            {
                field: 'category_name', displayName: 'Tên vật phẩm', minWidth: 140,
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.category_name}} - <b>Ref: {{row.entity.itemId}}</b></div>'
            },
            {
                field: 'type', displayName: 'Loại', minWidth: 70,
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.type==1?"Tìm thấy":"Thất lạc"}}</div>'
            },
            {
                field: 'status', displayName: 'Trạng thái', minWidth: 80,
                cellTemplate: '<div class="ui-grid-cell-contents" ng-style="{ \'color\' : (row.entity.status == \'0\') ? \'green\' : (row.entity.status == \'1\') ? \'orange\' : \'gray\' }"><b>{{row.entity.status==0?"Mới":(row.entity.status==1?"Tìm thấy":"Đã đóng")}}</b></div>'
            },
            { field: 'lost_or_found_at', displayName: 'Mất lúc', minWidth: 120 },
            { field: 'location_name', displayName: 'Địa điểm', minWidth: 150 },
            { field: 'fullName', displayName: 'Người liên quan', minWidth: 150 },
            {
                field: 'action', displayName: 'Chức năng', minWidth: 100,
                cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.viewItem(row.entity.itemId)"><i class="fa fa-eye"></i></button></div>'
            }
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

    $http.get("/api/items/lost")
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

    $scope.viewItem = function (id) {
        if (id) {
            location.href = "#/track?item=" + id;
        } else {
            helper.popup.info({ title: "Thông báo", message: "Vật phẩm này không tồn tại", close: function () { return; } })
        }
    }
}