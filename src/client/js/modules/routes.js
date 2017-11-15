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
            .state('category', {
                url: '/config/category',
                templateUrl: 'templates/category.html'
            })
            .state('lost', {
                url: '/lost',
                templateUrl: 'templates/lost.html'
            })
            .state('found', {
                url: '/found',
                templateUrl: 'templates/found.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })
    }
]);
