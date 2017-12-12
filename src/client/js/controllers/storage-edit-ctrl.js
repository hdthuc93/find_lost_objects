var app = angular.module("findLostObject");

app.controller("storageEditCtrl", ['$scope', '$rootScope', '$http', 'helper', storageEditCtrl]);
function storageEditCtrl($scope, $rootScope, $http, helper) {
	function init() {
		var params = new URL(window.location.href.replace('/#', '')).searchParams;
		var storageId = params.get('loc');
    console.log(storageId);
		$scope.item = {
			storageId: storageId,
      name: '',
      description: '',
		};
    getStorageById(storageId);
	}

	init();

	function getStorageById(id) {
		var res = $http.get('/api/storages/' + id).then(function(response) {
			let param = response.data.data[0];
			$scope.item.name = param.name;
			$scope.item.description = param.description;
		});
  }

	$scope.save = function() {
		let param = $scope.item;
		$http.put("/api/storages", param).then(function (response) {
			helper.popup.info({ title: "Thông báo", message: response.data.message, close: function () { return; } });
	    });
	}
}
