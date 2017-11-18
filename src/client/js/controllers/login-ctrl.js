var app = angular.module('findLostObject')
app.controller('loginCtrl', ['$scope', '$cookieStore', '$http', '$rootScope', '$timeout', '$location', 'helper', loginCtrl]);

function loginCtrl($scope, $cookieStore, $http, $rootScope, $timeout, $location, helper) {
  function init() {
    $scope.email = "";
    $scope.password = "";

  }
  init();

  $scope.login = function () {
    if ($scope.loginForm.$invalid) {
      return;
    }
    var body = {
      "Email": $scope.email || null,
      "Pass": $scope.password || null
    }
    $http.post('/api/logins', body).then(function successCallBack(res) {
      if (res.data.success) {
        var data = res.data;
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 732);
        // Setting a cookie
        $rootScope.masterToken = data.token;
        $cookieStore.put(
          'userdata',
          {
            loggedIn: true,
            name: data.name,
            token: data.token
          },
          {
            'expires': expireDate
          });
        $location.path('/');
      } else {
        helper.popup.info({
          title: "Đăng nhập thất bại",
          message: "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại.",
          close: () => {
            return;
          }
        })
      }
    }, function errorCallback() {
      helper.popup.info({ title: "Lỗi", message: "Xảy ra lỗi trong quá trình thực hiện, vui lòng thử lại.", close: function () { location.reload(); return; } })
    });
  }
  $scope.logout = function () {
    $cookieStore.put('userdata', {});
    $location.path('/login');
  }
}



