var app = angular.module("findLostObject");

app.controller("lostItemCtrl", ['$scope', '$rootScope', '$http', 'helper', lostItemCtrl]);
function lostItemCtrl($scope, $rootScope, $http, helper) {
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
            otherDetails: ""
        };
        getCategoryList();
        getLocationList();
    }
    init();

    function getCategoryList() {
        $http.get("/api/category")
            .then(function (response) {
                $scope.categoryList = response.data.data;
            });
    }

    function getLocationList() {
        $http.get("/api/location")
            .then(function (response) {
                $scope.locationList = response.data.data;
            });
    }

    function getCategory(id) {
        $http.get("/api/field_define/catid/" + id)
            .then(function (response) {
                $scope.category = response.data.data;
            });
    }

    $scope.changeCategory = function () {
        if ($scope.item.categoryId) {
            getCategory($scope.item.categoryId);
        } else {
            helper.popup.info({ title: "Lỗi", message: "Dữ liệu này không tồn tại.", close: function () { return; } })
        }
    }

    $scope.save = function () {
        if ($scope.lostItemForm.$invalid) {
            helper.popup.info({ title: "Lỗi", message: "Vui lòng điền thông tin đầy đủ và chính xác.", close: function () { return; } })
            return;
        }
        var param = $scope.item;
        $http.post("/api/item", param)
            .then(function (response) {
                console.log(21211,response);
                var msg = response.data.success ? "Thêm vật thất lạc thành công." : "Thêm vật thất lạc thất bại, vui lòng kiểm tra lại";
                helper.popup.info({ title: "Thông báo", message: msg, close: function () { return; } })
            });

        console.log($scope.item)
    }

}