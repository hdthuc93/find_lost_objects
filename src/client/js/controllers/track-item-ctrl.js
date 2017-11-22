var app = angular.module("findLostObject");

app.controller("trackItemCtrl", ['$scope', '$rootScope', '$http', 'helper', trackItemCtrl]);
function trackItemCtrl($scope, $rootScope, $http, helper) {
	function init() {
		$scope.itemOwn = [];
		$scope.trackList = [];
		
		var params = new URL(window.location.href.replace('/#', '')).searchParams;
		var itemId = params.get('item');

		$scope.item = {
			text: '',
			user_id: 1, //chưa có tính năng login nên gán cứng
			item_id: itemId,
			action: 0,
		};

		getTrackByItemId(itemId);
		$scope.itemOwn = getItemById(itemId);
	}

	init();

	function getTrackByItemId(id) {
		$http.get('/api/track/itemid/' + id).then(function(response) {
			$scope.trackList = response.data.data;

			for(i in $scope.trackList) {
			 	$scope.trackList[i].note = getNoteById($scope.trackList[i].note_id);
			}
		});
	}

	function getNoteById(id) {
		var res = $http.get('/api/note/' + id).then(function(response) {
			res.$$state.user = getUserById(response.data.data[0].user_id);
			res.$$state.item = getUserById(response.data.data[0].item_id);

			return response.data.data;
		});

		return res.$$state;
	}

	function getUserById(id) {
		var res = $http.get('/api/user/' + id).then(function(response) {
			return response.data.data;
		});
		
		return res.$$state;
	}

	function getItemById(id) {
		var res = $http.get('/api/item/' + id).then(function(response) {
			return response.data.data;
		});
		
		return res.$$state;
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

        console.log($scope.item)
    }
};