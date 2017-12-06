var app = angular.module("findLostObject");

app.controller("matchItemCtrl", ['$scope', '$rootScope', '$http', 'helper', matchItemCtrl]);
function matchItemCtrl($scope, $rootScope, $http, helper) {
	function init() {
		$scope.itemSrc = [];
		$scope.itemDes = [];
		
		var params = new URL(window.location.href.replace('/#', '')).searchParams;
		itemScrId = params.get('itemsrc');
		var itemDesId = params.get('itemdes');

		$scope.item = {
			item_src: itemScrId,
			item_des: itemDesId,
		};

		//mặc định src là mất, des là tìm thấy
		$scope.itemSrc = getItemById(itemScrId);
		$scope.itemDes = getItemById(itemDesId);
	}

	init();

	function getUserById(id) {
		var res = $http.get('/api/user/' + id).then(function(response) {
			return response.data.data;
		});
		
		return res.$$state;
	}

	function getItemById(id) {
		var res = $http.get('/api/items/id/' + id).then(function(response) {
			res.$$state.category = getCategoryById(response.data.data[0].category_id);
			res.$$state.location = getLocationById(response.data.data[0].location_id);

			return response.data.data;
		});
		
		return res.$$state;
	}

	function getCategoryById(id) {
		var res = $http.get('/api/categories/' + id).then(function(response) {
			return response.data.data;
		});
		
		return res.$$state;
	}

	function getLocationById(id) {
		var res = $http.get('/api/locations/' + id).then(function(response) {
			return response.data.data;
		});
		
		return res.$$state;
	}

	$scope.save = function () {
        var param = $scope.item;
        $http.post("/api/items/matched", param).then(function (response) {
            var msg = response.data.message;
            helper.popup.info({ title: "Thông báo", message: msg, close: function () {
            		if (response.data.success) window.location = '#/track?item=' + itemScrId;
            		
            		return;
            	} 
            })
        });
    }
};