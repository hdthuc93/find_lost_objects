var app = angular.module("findLostObject");

app.controller("lostItemCtrl", ['$scope', '$rootScope', '$http', lostItemCtrl]);
function lostItemCtrl($scope, $rootScope, $http) {

    function initData() {
        $scope.categoryList = [];
        $scope.category = [];
        $scope.Item = {
            
        };
    }
    initData();

    $scope.changeCategory = function () {

    }
    $scope.category = [
        { fieldLabel: "test", helpText: "testt", isRequired: true },
        { fieldLabel: "test1", helpText: "testt1", isRequired: true },
        { fieldLabel: "test2", helpText: "testt2", isRequired: true },
    ]

}