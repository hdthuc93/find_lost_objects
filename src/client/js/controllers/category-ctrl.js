var app = angular.module("findLostObject");

app.controller("categoryCtrl", ['$scope', '$rootScope', 'helper', '$http', categoryCtrl]);
function categoryCtrl($scope, $rootScope, helper, $http) {

    function init() {
        getCategoryList();
        $scope.category = {
            name: "",
            fieldDefinePool: [
                {
                    fieldLabel: "",
                    helpText: "",
                    isRequired: "",
                    displayOrder: ""
                }
            ]
        }
    }
    init();

    function getCategoryList() {

    }

    $scope.addFielDefine = function () {
        $scope.category.fieldDefinePool.push({
            fieldLabel: "",
            helpText: "",
            isRequired: "",
            displayOrder: ""
        })
    }

    $scope.removeFielDefine = function (index) {
        $scope.category.fieldDefinePool.splice(index, 1);
    }

    $scope.moveUp = function (index) {
        if (index > 0) {//second element
            var temp = $scope.category.fieldDefinePool[index];
            $scope.category.fieldDefinePool[index] = $scope.category.fieldDefinePool[index - 1];
            $scope.category.fieldDefinePool[index - 1] = temp;
        }
    }

    $scope.moveDown = function (index) {//penultimate element
        if (index < $scope.category.fieldDefinePool.length) {
            var temp = $scope.category.fieldDefinePool[index];
            $scope.category.fieldDefinePool[index] = $scope.category.fieldDefinePool[index + 1];
            $scope.category.fieldDefinePool[index + 1] = temp;
        }
    }

    $scope.addCategory = function () {
        if ($scope.formAddCat.$error.required && $scope.formAddCat.$error.required.length > 0) {
            $scope.formAddCat[$scope.formAddCat.$error.required[0].$name].$touched = true;
            return false;
        }
        var data = {
            name: angular.copy($scope.category.name),
            fieldDefinePool: angular.copy($scope.category.fieldDefinePool)
        };

        for (var i in $scope.category.fieldDefinePool) {
            data.fieldDefinePool[i]['displayOrder'] = parseInt(i);
            data.fieldDefinePool[i]['fieldLabel'] = $scope.category.fieldDefinePool[i]['fieldLabel'];
            data.fieldDefinePool[i]['helpText'] = $scope.category.fieldDefinePool[i]['helpText'];
            data.fieldDefinePool[i]['isRequired'] = $scope.category.fieldDefinePool[i]['isRequired'] == true ? 1 : 0;
        }

        $http.put("/api/categories", data)
            .then(function (response) {
                if (response.data.success) {
                    helper.popup.info({ title: "Thông báo", message: "Thêm thể loại thành công", close: function () { return; } });
                    init();
                    $scope.formAddCat.$setPristine();
                    $scope.formAddCat.$setUntouched();
                } else {
                    helper.popup.info({ title: "Lỗi", message: "Thêm thể loại thất bại, vui lòng kiểm tra lại", close: function () { return; } });
                }
            });
    }


    $scope.categoryList = {
        minRowsToShow: 50,
        enableSorting: false,
        enableRowSelection: true,
        multiSelect: false,
        enableColumnResizing: true,
        selectionRowHeaderWidth: 35,
        columnDefs: [
            { field: 'name', displayName: 'Tên loại', minWidth: 200 },
        ],
        data: [{ name: "demo" }, { name: "demo 2" }],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.showHandleArea = false;
                $scope.action = "";
                if (row.isSelected) {
                    $scope.selectedRow = row.entity;
                } else {
                    $scope.selectedRow = null;
                }
            });
        }
    };


}