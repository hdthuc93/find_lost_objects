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
                templateUrl: 'templates/login.html'
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
            .state('location', {
                url: '/location',
                templateUrl: 'templates/config-location.html'
            })
            .state('storage', {
                url: '/storage',
                templateUrl: 'templates/config-storage.html'
            })
            .state('category', {
                url: '/category',
                templateUrl: 'templates/config-category.html'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'templates/config-user.html'
            })
            .state('track', {
                url: '/track',
                templateUrl: 'templates/track.html'
            })
            .state('matched', {
                url: '/matched',
                templateUrl: 'templates/matched.html'
            })
    }
]);
