'use strict';
angular.module('findLostObject').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');/*remove new hash prefix from angular 1.6*/
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('lost', {
                url: '/lost',
                templateUrl: 'templates/add-item-lost.html'
            })
            .state('found', {
                url: '/found',
                templateUrl: 'templates/add-item-found.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                data: {
                    preventLoggedIn: true
                }
            })
            .state('items', {
                url: '/items',
                templateUrl: 'templates/item-all-list.html'
            })
            .state('itemslost', {
                url: '/itemslost',
                templateUrl: 'templates/item-lost-list.html'
            })
            .state('listlost', {
                url: '/listlost',
                templateUrl: 'templates/listlost.html'
            })
            .state('itemsfound', {
                url: '/itemsfound',
                templateUrl: 'templates/item-found-list.html'
            })
            .state('itemsmatched', {
                url: '/itemsmatched',
                templateUrl: 'templates/item-matched-list.html'
            })
            .state('location', {
                url: '/location',
                templateUrl: 'templates/config-location.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('locationEdit', {
                url: '/location/edit',
                templateUrl: 'templates/config-location-edit.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('storage', {
                url: '/storage',
                templateUrl: 'templates/config-storage.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('storageEdit', {
                url: '/storage/edit',
                templateUrl: 'templates/config-storage-edit.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('category', {
                url: '/category',
                templateUrl: 'templates/config-category.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('listuser', {
                url: '/listuser',
                templateUrl: 'templates/list-user.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('user', {
                url: '/user',
                templateUrl: 'templates/config-user.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('track', {
                url: '/track',
                templateUrl: 'templates/track.html'
            })
            .state('matched', {
                url: '/matched',
                templateUrl: 'templates/matched.html'
            })
            .state('report', {
                url: '/report',
                templateUrl: 'templates/item-report.html',
                data: {
                    requiresRoleAdmin: true
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html'
            });
    }
]).factory('User', [function () {
    return {
        isAuthenticated: false
    };
}]).factory('RouteValidator', ['$rootScope', 'Auth', '$state', function ($rootScope, Auth, $state) {

    return {
        init: init
    };

    function init() {
        $rootScope.$on('$stateChangeStart', _onStateChangeStart);
    }

    function _onStateChangeStart(event, toState, toParams, fromState, fromParams) {
        var toStateRequiresRoleAdmin = _requiresRoleAdmin(toState);
        //role = 0: user, role = 1: admin
        if ($rootScope.masterUserRole == 0 && toStateRequiresRoleAdmin) {
            event.preventDefault();
            $state.go('404');
            return;
        }
        //If logged in & direct to '/login'
        if (Auth.isLoggedIn() && toState.data && toState.data.preventLoggedIn) {
            event.preventDefault();
            return;
        }
    }

    function _requiresRoleAdmin(toState) {
        if (angular.isUndefined(toState.data) || !toState.data.requiresRoleAdmin) {
            return false;
        }
        return toState.data.requiresRoleAdmin;
    }

}]).run(['RouteValidator', function (RouteValidator) {
    RouteValidator.init();
}]);
