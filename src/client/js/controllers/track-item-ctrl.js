var app = angular.module("findLostObject");

app.controller("trackItemCtrl", ['$scope', '$rootScope', '$http', 'helper', 'fileReader', '$location', trackItemCtrl]);
function trackItemCtrl($scope, $rootScope, $http, helper, fileReader, $location) {
	var itemId = "";
	function init() {
		$scope.itemOwn = [];
		$scope.timeLine = [];
		$scope.itemMatching = [];
		$scope.fieldAnswer = [];

		var params = new URL(window.location.href.replace('/#', '')).searchParams;
		itemId = params.get('item');

		$scope.item = {
			text: '',
			user_id: $rootScope.user_id,
			item_id: itemId,
			action: 0,
		};

		getTrackByItemId(itemId);
		getRecommendMatch(itemId);
		getFieldAnswer(itemId);
		$scope.itemOwn = getItemById(itemId);

	}

	init();

	function getTrackByItemId(id) {
		$http.get('/api/track/itemid/' + id).then(function (response) {
			$scope.timeLine = response.data.data;

			for (i in $scope.timeLine) {
				$scope.timeLine[i].note = getNoteById($scope.timeLine[i].note_id);
			}
		});
	}

	function getNoteById(id) {
		var res = $http.get('/api/note/' + id).then(function (response) {
			if (response.data && response.data.data && response.data.data[0]) {
				res.$$state.user = getUserById(response.data.data[0].user_id);
				res.$$state.item = getUserById(response.data.data[0].item_id);
				return response.data.data;
			}
		});

		return res.$$state;
	}

	function getUserById(id) {
		var res = $http.get('/api/user/' + id).then(function (response) {
			return response.data.data;
		});

		return res.$$state;
	}

	function getItemById(id) {
		var res = $http.get('/api/items/id/' + id).then(function (response) {
			if (response.data.data[0].match_item_id != null) {
				res.$$state.item_matched = _getItemMathed(response.data.data[0].match_item_id);
			}
			res.$$state.category = getCategoryById(response.data.data[0].category_id);
			res.$$state.location = getLocationById(response.data.data[0].location_id);

			return response.data.data;
		});

		return res.$$state;
	}

	function _getItemMathed(id) {
		var res = $http.get('/api/items/id/' + id).then(function (response) {
			res.$$state.category = getCategoryById(response.data.data[0].category_id);
			res.$$state.location = getLocationById(response.data.data[0].location_id);

			return response.data.data;
		});

		return res.$$state;
	}

	function getCategoryById(id) {
		var res = $http.get('/api/categories/' + id).then(function (response) {
			return response.data.data;
		});

		return res.$$state;
	}

	function getLocationById(id) {
		var res = $http.get('/api/locations/' + id).then(function (response) {
			return response.data.data;
		});

		return res.$$state;
	}


	function getRecommendMatch(id) {
		$http.get('/api/items/matching/' + id).then(function (response) {
			$scope.itemMatching = response.data.data;

			for (i in $scope.itemMatching) {
				$scope.itemMatching[i].item = getItemById($scope.itemMatching[i].itemId);
				$scope.itemMatching[i].item.category = getCategoryById($scope.itemMatching[i].categoryId);
				$scope.itemMatching[i].item.location = getLocationById($scope.itemMatching[i].locationId);
			}
		});
	}

	function getFieldAnswer(id) {
		$http.get('/api/field_answers/itemid/' + id).then(function (response) {
			$scope.fieldAnswer = response.data.data;
		});
	}

	$scope.save = function () {
		if ($scope.noteItemForm.$error.required && $scope.noteItemForm.$error.required.length > 0) {
			$scope.noteItemForm[$scope.noteItemForm.$error.required[0].$name].$touched = true;
			return false;
		}
		if ($scope.noteItemForm.$invalid) {
			helper.popup.info({ title: "Lỗi", message: "Vui lòng điền thông tin đầy đủ và chính xác.", close: function () { return; } })
			return;
		}
		var param = $scope.item;
		$http.post("/api/note", param).then(function (response) {
        	/*
            var msg = response.data.success ? "Add Note Success." : "Add Note Fail";
            helper.popup.info({ title: "Thông báo", message: msg, close: function () { 
            		if (response.data.success) window.location.reload();
            		return;
            	} 
            })
            */
			if (response.data.success) window.location.reload();
		});
	}

	$scope.$watch('fileImg', function () {
		if ($scope.fileImg) {
			if ($scope.fileImg.size > 1024 * 1024 * 5) {
				helper.popup.info({ title: "Lỗi", message: "Kích thước ảnh tối đa là 5MB", close: function () { return; } });
				$scope.fileImg = null;
				return;
			}
			fileReader.readAsDataUrl($scope.fileImg, $scope)
				.then(function (result) {
					$http.put("/api/items", {
						itemId: itemId,
						image: result
					})
						.then(function (response) {
							if (response.data.success) {
								helper.popup.info({ title: "Thông báo", message: "Cập nhật hình ảnh thành công", close: function () { return; } });

								$scope.itemOwn.value[0].image = result;
							} else {
								helper.popup.info({ title: "Lỗi", message: "Thêm hình ảnh thất bại. Vui lòng kiểm tra lại", close: function () { return; } });
							}
						});
				});
		}
	});

	$scope.editItem = function () {
		if ($scope.itemOwn.value[0].type == 0) {
			$location.path('/lost/edit/' + itemId)
		}
		if ($scope.itemOwn.value[0].type == 1) {
			$location.path('/found/edit/' + itemId)
		}
	}
};