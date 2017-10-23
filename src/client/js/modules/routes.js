'use strict';
angular.module('myMatrix').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');/*remove new hash prefix from angular 1.6*/
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/demo.html'
            })
            .state('config', {
                url: '/config',
                templateUrl: 'templates/config.html'
            })
            .state('statistic', {
                url: '/statistic',
                templateUrl: 'templates/demo.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.html'
            })
    }
]);