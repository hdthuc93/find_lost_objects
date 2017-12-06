var app = angular.module("findLostObject");

app.controller("itemReportCtrl", ['$scope', '$q' ,'$rootScope', '$http', 'helper', itemReportCtrl]);
function itemReportCtrl($scope, $q, $rootScope, $http, helper) {
	$scope.getScope = function() {
		return $scope;
	}

	$scope.getreport = function(day, month, year) {
		let arr = [];

		for (let i = 1; i <= day; i++) {
			let param = {
				day: i,
				month: month,
				year: year,
			}

			$http.post("/api/items/report", param).then(function (response) {
				arr.push(response.data.data);
		    });
		}

		return arr;
	}
}