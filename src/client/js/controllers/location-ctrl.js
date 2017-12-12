var app = angular.module("findLostObject");

app.controller("locationCtrl", ['$scope', '$rootScope', '$http', 'helper', locationCtrl]);
function locationCtrl($scope, $rootScope, $http, helper) {
  function init() {
  }
  init();
  $scope.locationList = {
    minRowsToShow: 15,
    enableSorting: false,
    enableRowSelection: true,
    multiSelect: false,
    enableColumnResizing: true,
    selectionRowHeaderWidth: 35,
    columnDefs: [
      { field: 'no', displayName: 'STT', width: 40 },
      {
        field: 'name', displayName: 'Tên địa điểm', minWidth: 140,
        cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.name}} - <b>Mã: {{row.entity.locationId}}</b></div>'
      },
      { field: 'description', displayName: 'Mô tả', minWidth: 120 },
      {
        field: 'action', displayName: 'Chức năng', minWidth: 100,
        cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.editLocation(row.entity.locationId)"><i class="fa fa-eye"></i></button></div>'
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
  $http.get("/api/locations")
    .then(function (response) {
      if (response.data.success) {
        var data = response.data.data;
        data.forEach(function (e, i) {
          data[i] = e;
          data[i].no = i + 1;
        });
        $scope.locationList.data = data;
      } else {
        $scope.locationList.data = [];
      }
    });
    $scope.editLocation = function (id) {
      if (id) {
          location.href = "#/location/edit?loc=" + id;
      } else {
          helper.popup.info({ title: "Thông báo", message: "Địa điểm này không tồn tại", close: function () { return; } })
      }
  }
}
