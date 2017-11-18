var app = angular.module("findLostObject");

app.controller("lostItemCtrl", ['$scope', '$rootScope', '$http', 'helper', lostItemCtrl]);
function lostItemCtrl($scope, $rootScope, $http, helper) {
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
            fieldAnswersPool:[]
        };
        getCategoryList();
        getLocationList();
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
        if ($scope.lostItemForm.$error.required && $scope.lostItemForm.$error.required.length > 0) {
            $scope.lostItemForm[$scope.lostItemForm.$error.required[0].$name].$touched = true;
            return false;
        }
        if (typeof $scope.lostItemForm.$error.email !== 'undefined' && $scope.lostItemForm.$error.email.length > 0) {
            $scope.lostItemForm[$scope.lostItemForm.$error.email[0].$name].$touched = true;
            return false;
        }
        if ($scope.lostItemForm.$invalid) {
            helper.popup.info({ title: "Lỗi", message: "Vui lòng điền thông tin đầy đủ và chính xác.", close: function () { return; } })
            return;
        }
        $scope.item.fieldAnswersPool = $scope.category;
        var param = $scope.item;
        $http.post("/api/items", param)
            .then(function (response) {
                var msg = response.data.success ? "Thêm vật thất lạc thành công." : "Thêm vật thất lạc thất bại, vui lòng kiểm tra lại";
                helper.popup.info({ title: "Thông báo", message: msg, close: function () { return; } })
            });

        
    }

}