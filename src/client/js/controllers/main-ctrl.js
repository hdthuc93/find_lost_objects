var app = angular.module("findLostObject");

app.controller("mainCtrl", ['$scope', '$rootScope', 'helper', 'Auth', '$http', mainCtrl]);
function mainCtrl($scope, $rootScope, helper, Auth, $http) {
    $http.get("/api/items/statistic")
        .then(function (response) {
            console.log(response);
        });


}