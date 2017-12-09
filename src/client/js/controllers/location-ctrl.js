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
}
