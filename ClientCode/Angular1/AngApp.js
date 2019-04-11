/*global angular*/
/*jshint -W030 */


var sharedModule = angular.module("shared", []);
var DMApp = angular.module("trApp.Main", ['ui.router', 'ngStorage', 'shared','ngSanitize']);
var tRDashboardApp = angular.module("trApp.Dashboard", ['ui.router', 'ngStorage', 'ui.router.state.events', 'shared','ngSanitize']);


DMApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider,
    $httpProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            url: '/dashboard',
            template: '<dash-directive></dash-directive>'
        })
        .state('Mail', {
            url: '/Mail',
            template: '<mail-directive></mail-directive>'
        })
        .state('BlogPost', {
            url: '/BlogPost/:urlId',
            templateUrl: 'App/ContentMaster/BlogPostContent.html',
            controller: ['$rootScope', '$stateParams',
                function($scope, $statesParams) {
                    $scope.urlId = $statesParams.urlId;
                }
            ]
        })
        .state('TechNews', {
            url: '/TechNews',
            templateUrl: 'Angular1/Directives/tech_news.html'
        })
        .state('FinancialNews', {
            url: '/FinNews',
            templateUrl: 'Angular1/Directives/fin_news.html'
        });

}]);


