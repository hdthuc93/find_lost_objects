var app = angular.module("findLostObject");

app.controller("locationEditCtrl", ['$scope', '$rootScope', '$http', 'helper', locationEditCtrl]);
function locationEditCtrl($scope, $rootScope, $http, helper) {
	function init() {
		var params = new URL(window.location.href.replace('/#', '')).searchParams;
		var locationId = params.get('loc');

		$scope.item = {
			locationId: locationId,
      name: '',
      description: '',
		};
    getLocationById(locationId);
	}

	init();

	function getLocationById(id) {
		var res = $http.get('/api/locations/' + id).then(function(response) {
			let param = response.data.data[0];
			$scope.item.name = param.name;
			$scope.item.description = param.description;
		});
  }

	$scope.save = function() {
		let param = $scope.item;
		$http.put("/api/locations", param).then(function (response) {
			helper.popup.info({ title: "Thông báo", message: response.data.message, close: function () { return; } });
	    });
	}
}
