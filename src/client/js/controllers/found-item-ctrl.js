var app = angular.module("findLostObject");

app.controller("foundItemCtrl", ['$scope', '$rootScope', '$http', 'helper', foundItemCtrl]);
function foundItemCtrl($scope, $rootScope, $http, helper) {
    $scope.emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    function init() {
        $scope.categoryList = [];
        $scope.locatonList = [];
        $scope.categoryId = [];
        $scope.category = [];
        $scope.item = {
            categoryId: "",
            contactPhoneNo: "",
            emailAddress: "",
            firstName: "",
            lastName: "",
            locationId: "",
            lostAt: "",
            otherDetails: "",
            type: 1,
            storageId: "",
            fieldAnswersPool:[]
        };
        getCategoryList();
        getLocationList();
        getStorageList();
    }
    init();

    function getCategoryList() {
        $http.get("/api/categories")
            .then(function (response) {
                $scope.categoryList = response.data.data;
            });
    }

    function getLocationList() {
        $http.get("/api/locations")
            .then(function (response) {
                $scope.locationList = response.data.data;
            });
    }

    function getStorageList() {
        $http.get("/api/storages")
            .then(function (response) {
                $scope.storageList = response.data.data;
            });
    }

    function getCategory(id) {
        $http.get("/api/field_defines/catid/" + id)
            .then(function (response) {
                $scope.category = response.data.data;
            });
    }

    $scope.changeCategory = function () {
        if ($scope.item.categoryId) {
            getCategory($scope.item.categoryId);
        } else {
            $scope.category = [];
            //helper.popup.info({ title: "Lỗi", message: "Dữ liệu này không tồn tại.", close: function () { return; } })
        }
    }

    $scope.save = function () {
        if ($scope.foundItemForm.$error.required && $scope.foundItemForm.$error.required.length > 0) {
            $scope.foundItemForm[$scope.foundItemForm.$error.required[0].$name].$touched = true;
            return false;
        }
        if (typeof $scope.foundItemForm.$error.email !== 'undefined' && $scope.foundItemForm.$error.email.length > 0) {
            $scope.foundItemForm[$scope.foundItemForm.$error.email[0].$name].$touched = true;
            return false;
        }
        if ($scope.foundItemForm.$invalid) {
            helper.popup.info({ title: "Lỗi", message: "Vui lòng điền thông tin đầy đủ và chính xác.", close: function () { return; } })
            return;
        }
        $scope.item.fieldAnswersPool = $scope.category;
        console.log(212121,$scope.item);
        var param = $scope.item;
        $http.post("/api/items", param)
            .then(function (response) {
                console.log(21211, response);
                var msg = response.data.success ? "Thêm vật nhặt được thành công." : "Thêm vật nhặt được thất bại, vui lòng kiểm tra lại";
                helper.popup.info({ title: "Thông báo", message: msg, close: function () { return; } })
            });

        
    }

}