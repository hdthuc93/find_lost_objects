var app = angular.module("findLostObject");

app.controller("userCtrl", ['$scope', '$rootScope', '$http', 'helper', userCtrl]);
function userCtrl($scope, $rootScope, $http, helper) {
	function init() {
		$scope.listUser = [];

		getAll();

		var params = new URL(window.location.href.replace('/#', '')).searchParams;
		var userId = params.get('id');

		$scope.item = {
			userId: userId,
			first_name: '',
	        last_name: '',
	        email: '',
	        user_type: '',
	        password: '',
		};

		getUserById(userId);
	}

	init();

	function getAll() {
		$http.get('/api/user').then(function(response) {
			$scope.listUser = response.data.data;
		});
	}

	function getUserById(id) {
		var res = $http.get('/api/user/' + id).then(function(response) {
			let param = response.data.data[0];
			$scope.item.first_name = param.first_name;
			$scope.item.last_name = param.last_name;
			$scope.item.email = param.email;
			$scope.item.user_type = param.user_type;
			$scope.item.password = param.password;
		});
	}

	$scope.band = function(user_id) {		
		$http.get('/api/user/' + user_id).then(function(response) {
			let param = response.data.data[0];
			param.action = 'band';
			
			if (param.user_type == 1) {
				helper.popup.info({ title: "Thông báo", message: "Không thể tiến hành thao tác này với tài khoản Quản Trị.", close: function () { return; } });
				return;
			}

			$http.put("/api/user", param).then(function (response) {
	            if (response.data.success) window.location.reload();
	        });
		});
	}

	$scope.save = function() {
		if ($scope.item.newpassword != undefined && $scope.item.renewpassword != undefined) {
			if ($scope.item.newpassword != $scope.item.renewpassword) {
				helper.popup.info({ title: "Thông báo", message: "Nhập lại mật khẩu không chính xát.", close: function () { return; } });
				return;
			}

			$scope.item.password = $scope.item.newpassword;
			$scope.item.action = 'changepw';
		}

		let param = $scope.item;

		$http.put("/api/user", param).then(function (response) {
			console.log(response);
			helper.popup.info({ title: "Thông báo", message: response.data.message, close: function () { return; } });
	        //if (response.data.success) window.location.reload();
	    });
	}
}