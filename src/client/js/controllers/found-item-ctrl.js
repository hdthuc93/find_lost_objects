var app = angular.module("findLostObject");

app.controller("foundItemCtrl", ['$scope', '$rootScope', '$http', 'helper', 'fileReader', '$stateParams', foundItemCtrl]);
function foundItemCtrl($scope, $rootScope, $http, helper, fileReader, $stateParams) {
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
            lostAt: new Date(),
            otherDetails: "",
            type: 1,
            storageId: "",
            fieldAnswersPool: []
        };
        getCategoryList();
        getLocationList();
        getStorageList();
        $scope.openDatePicker = false;
        $scope.dateOptions = {
            startingDay: 1,
            maxDate: new Date()
        }
    }
    init();

    var itemId = $stateParams.id || null;
    if (itemId) {//EDIT ITEM
        $http.get('/api/items/id/' + itemId).then(function (response) {
            if (response.data.data.length > 0) {
                console.log(response.data.data);
                var _data = response.data.data[0];
                $scope.item = {
                    itemId: itemId,
                    categoryId: _data['category_id'].toString(),
                    contactPhoneNo: _data['contact_phone_no'],
                    emailAddress: _data['email_address'],
                    firstName: _data['first_name'],
                    lastName: _data['last_name'],
                    locationId: _data['location_id'].toString(),
                    lostAt: new Date(_data['lost_at']),
                    otherDetails: _data['other_details'],
                    storageId: _data['storege_location_id'].toString(),
                    type: 0,
                    fieldAnswersPool: []
                };
                getCategory(_data['category_id']);
                $scope.$on('get_cat_done', function () {
                    $http.get('/api/field_answers/itemid/' + itemId).then(function (response) {
                        for (var i in response.data.data) {
                            for (var j in $scope.category) {
                                if (response.data.data[i]['field_define_id'] == $scope.category[j]['fieldDefineId']) {
                                    $scope.category[j]['answer'] = response.data.data[i]['field_answer_text'];
                                    $scope.category[j]['field_answer_id'] = response.data.data[i]['field_answer_id'];
                                    break;
                                }
                            }
                        }
                    });
                });
            } else {
                $location.url($location.path('/404'));
            }
        });
    }


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
                $scope.$emit('get_cat_done');
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
        $scope.item.fieldAnswersPool = angular.copy($scope.category);
        for (var i in $scope.item.fieldAnswersPool) {
            $scope.item.fieldAnswersPool[i]['helpText'] = $scope.item.fieldAnswersPool[i]['answer'];
        }
        var param = angular.copy($scope.item);
        param.lostAt = helper.convertDate($scope.item.lostAt);
        if (param.itemId) {
            //EDIT
            $http.put("/api/items", param)
                .then(function (response) {
                    for (var i in param.fieldAnswersPool) {
                        $http.put("/api/field_answers/" + param.fieldAnswersPool[i]['field_answer_id'], {
                            answer_text: param.fieldAnswersPool[i]['answer']
                        }).then(function (response) {
                        });
                    }
                    var msg = response.data.success ? "Cập nhật vật nhặt được thành công." : "Cập nhật vật nhặt được thất bại, vui lòng kiểm tra lại";
                    helper.popup.info({ title: "Thông báo", message: msg, close: function () { return; } })
                });
        } else {
            //CREATE
            $http.post("/api/items", param)
                .then(function (response) {
                    var msg = response.data.success ? "Thêm vật nhặt được thành công." : "Thêm vật nhặt được thất bại, vui lòng kiểm tra lại";
                    helper.popup.info({ title: "Thông báo", message: msg, close: function () { return; } });
                });
        }

    }

    $scope.openDP = function () {
        $scope.openDatePicker = true;
    }

    $scope.$watch('fileImg', function (data) {
        console.log(22222222, data)
        if ($scope.fileImg) {
            if ($scope.fileImg.size > 1024 * 1024 * 5) {
                helper.popup.info({ title: "Lỗi", message: "Kích thước ảnh tối đa là 5MB", close: function () { return; } });
                $scope.fileImg = null;
                return;
            }
            fileReader.readAsDataUrl($scope.fileImg, $scope)
                .then(function (result) {
                    $scope.item.image = result;
                });
        }
    });
}