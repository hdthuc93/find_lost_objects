'use-strict'
var app = angular.module("findLostObject");

app.controller("mainCtrl", ['$scope', '$rootScope', 'helper', '$location', '$http', mainCtrl]);
function mainCtrl($scope, $rootScope, helper, $location, $http) {
    function init() {
        $scope.data = null;
    }
    init();

    $http.get("/api/items/statistic")
        .then(function (response) {
            var data = response.data.data;
            for (var i in data.threeLost) {
                data.threeLost[i].fieldAnswerPool = getFieldAnswer(data.threeLost[i].itemId);
            }
            for (var i in data.threeFound) {
                data.threeFound[i].fieldAnswerPool = getFieldAnswer(data.threeLost[i].itemId);
            }
            $scope.data = data;
            console.log($scope.data)
        });

    function getFieldAnswer(itemId) {
        var res = $http.get("/api/field_answers/itemid/" + itemId).then(function (response) {
            return response.data.data;
        });

        return res.$$state;
    }

    $scope.goListItem = function (type) {
        $location.path('/items' + type);
    }

    $scope.viewItem = function (id) {
        location.href = "#/track?item=" + id;
    }


}