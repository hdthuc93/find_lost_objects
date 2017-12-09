var app = angular.module("findLostObject");

app.controller("storageCtrl", ['$scope', '$rootScope', '$http', 'helper', storageCtrl]);
function storageCtrl($scope, $rootScope, $http, helper) {
  function init() {
  }
  init();

  $scope.storageList = {
    minRowsToShow: 15,
    enableSorting: false,
    enableRowSelection: true,
    multiSelect: false,
    enableColumnResizing: true,
    selectionRowHeaderWidth: 35,
    columnDefs: [
      { field: 'no', displayName: 'STT', width: 40 },
      {
        field: 'name', displayName: 'Tên kho cất giữ', minWidth: 140,
        cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.name}} - <b>Mã: {{row.entity.storageId}}</b></div>'
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
  $http.get("/api/storages")
    .then(function (response) {
      if (response.data.success) {
        var data = response.data.data;
        data.forEach(function (e, i) {
          data[i] = e;
          data[i].no = i + 1;
        });
        $scope.storageList.data = data;
      } else {
        $scope.storageList.data = [];
      }
    });
}
