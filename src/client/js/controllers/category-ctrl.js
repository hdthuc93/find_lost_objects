var app = angular.module("findLostObject");

app.controller("categoryCtrl", ['$scope', '$rootScope', 'helper', '$http', categoryCtrl]);
function categoryCtrl($scope, $rootScope, helper, $http) {

    function init() {
        getCategoryList();
        $scope.isCreate = true;
        $scope.isEdit = false;
        $scope.isView = false;

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

    $scope.viewCategory = function (id) {
        $scope.isCreate = false;
        $scope.isEdit = false;
        $scope.isView = true;

        $http.get("/api/categories/" + id)
            .then(function (response) {
                $scope.category = {
                    name: response.data.data[0].categoryName,
                    fieldDefinePool: response.data.data[0].fieldDefinesPool
                }
            });
    }

    $scope.editCategory = function (id) {
        $scope.isCreate = false;
        $scope.isEdit = true;
        $scope.isView = false;

        $http.get("/api/categories/" + id)
            .then(function (response) {
                console.log(response);
                $scope.category = {
                    name: response.data.data[0].categoryName,
                    id: response.data.data[0].categoryId,
                    fieldDefinePool: response.data.data[0].fieldDefinesPool
                }
            });
    }

    $scope.createNew = function (id) {
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
        $scope.isCreate = true;
        $scope.isEdit = false;
        $scope.isView = false;
    }

    function getCategoryList() {
        $http.get("/api/categories")
            .then(function (response) {
                if (response.data.success) {
                    $scope.categoryList.data = response.data.data;
                } else {
                    $scope.categoryList.data = [];
                }
            });
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

    $scope.save = function () {
        if ($scope.formAddCat.$error.required && $scope.formAddCat.$error.required.length > 0) {
            $scope.formAddCat[$scope.formAddCat.$error.required[0].$name].$touched = true;
            return false;
        }
        if ($scope.category.id) {
            //is Edit
            var id = $scope.category.id;
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

            $http.put("/api/categories/" + id, data)
                .then(function (response) {
                    if (response.data.success) {
                        helper.popup.info({ title: "Thông báo", message: "Cập nhật thể loại thành công", close: function () { return; } });
                        init();
                        $scope.formAddCat.$setPristine();
                        $scope.formAddCat.$setUntouched();
                    } else {
                        helper.popup.info({ title: "Lỗi", message: "Cập nhật thể loại thất bại, vui lòng kiểm tra lại", close: function () { return; } });
                    }
                });
        } else {
            //is Create
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
    }


    $scope.categoryList = {
        minRowsToShow: 15,
        enableSorting: false,
        enableRowSelection: true,
        multiSelect: false,
        enableColumnResizing: true,
        selectionRowHeaderWidth: 35,
        columnDefs: [
            { field: 'categoryId', displayName: 'Mã loại', width: 100 },
            { field: 'categoryName', displayName: 'Tên loại', minWidth: 200 },
            {
                field: 'action', displayName: 'Chức năng', minWidth: 100,
                cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.viewCategory(row.entity.categoryId)"><i class="fa fa-eye"></i></button> <button type="button" style="padding: 0px 5px;" class="btn btn-default" ng-click="grid.appScope.editCategory(row.entity.categoryId)"><i class="fa fa-pencil"></i></button></div>'
            }
        ],
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