var app = angular.module("findLostObject");

app.controller("itemMatchedListCtrl", ['$scope', '$rootScope', '$http', 'helper', '$location', itemMatchedListCtrl]);
function itemMatchedListCtrl($scope, $rootScope, $http, helper, $location) {
    function init() {
        $scope.search = {
            category: "",
            location: ""
        }
        getCategoryList();
        getLocationList();
    }
    init();

    function getCategoryList() {
        $http.get("/api/categories")
            .then(function (response) {
                $scope.categoryList = response.data.data;
            });
    }

    function getLocationList() {
        $http.get("/api/locations")
            .then(function (response) {
                $scope.locationList = response.data.data;
            });
    }

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
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.category_name}} - <b>Mã: {{row.entity.itemId}}</b></div>'
            },
            {
                field: 'match_item_id', displayName: 'Vật phẩm khớp', minWidth: 140,
                cellTemplate: '<div class="ui-grid-cell-contents"><b>Mã: {{row.entity.match_item_id}}</b>&nbsp;&nbsp;&nbsp;<button type="button" style="padding: 0px 5px;" class="btn btn-default pull-right" ng-click="grid.appScope.viewItem(row.entity.match_item_id)"><i class="fa fa-eye"></i></button></div>'
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
                cellTemplate: '<div class="ui-grid-cell-contents"><button title="Xem thông tin" type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.viewItem(row.entity.itemId)"><i class="fa fa-eye"></i></button>&nbsp;&nbsp;<button title="Chỉnh sửa" type="button" style="padding: 0px 5px;" class="btn btn-success" ng-click="grid.appScope.editItem(row.entity.itemId, row.entity.type)"><i class="fa fa-pencil"></i></button></div>'
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

    
    $scope.getList = function(){
        $http.get("/api/items/lost?matched=true&localId="+$scope.search.location+"&catId="+$scope.search.category)
        .then(function (response) {
            if (response.data.success) {
                var data = response.data.data;
                data.forEach(function (e, i) {
                    data[i] = e;
                    data[i].no = i + 1;
                });
                $scope.itemList.data = data;
            } else {
                $scope.itemList.data = [];
            }
        });
    }
    $scope.getList();

    $scope.viewItem = function (id) {
        if (id) {
            location.href = "#/track?item=" + id;
        } else {
            helper.popup.info({ title: "Thông báo", message: "Vật phẩm này không tồn tại", close: function () { return; } })
        }
    }
    
    $scope.editItem = function (itemId, itemType) {
        if (itemId) {
            if (itemType == 0) {
                $location.path('/lost/edit/' + itemId)
            }
            if (itemType == 1) {
                $location.path('/found/edit/' + itemId)
            }
        } else {
            helper.popup.info({ title: "Thông báo", message: "Vật phẩm này không tồn tại", close: function () { return; } })
        }
    }
}