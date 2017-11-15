var app = angular.module("findLostObject", [
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.resizeColumns',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'mod.helper']);
module.factory('Auth',['$cookieStore','$rootScope',function($cookieStore,$rootScope){
    var user;
    return{
        getUser : function(){
            return $cookieStore.get("userdata");
        },
        isLoggedIn : function(){
            if($cookieStore.get('userdata')){
                if($cookieStore.get('userdata')){
                    $rootScope.masterToken = $cookieStore.get('userdata').token;
                    return $cookieStore.get('userdata').loggedIn;
                }
                return false;
            }else{
                return false;
            }
        }
    }
}] )
module.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$locationChangeStart', function (event) {
       if (!Auth.isLoggedIn()) {
           $location.path('/login');
       }
       else {
           $rootScope.masterUserName = Auth.getUser().name;
           //$location.path('/');
       }
   });
}]);

