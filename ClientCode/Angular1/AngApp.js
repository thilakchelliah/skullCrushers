/*global angular*/
/*jshint -W030 */


var sharedModule = angular.module("shared", []);
var DMApp = angular.module("trApp.Main", ['ui.router', 'ngStorage', 'shared']);
var tRDashboardApp = angular.module("trApp.Dashboard", ['ui.router', 'ngStorage', 'ui.router.state.events', 'shared']);


DMApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider,
    $httpProvider) {

    $urlRouterProvider.otherwise('/main');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('main', {
            url: '/main',
            templateUrl: 'App/ContentMaster/Content.html'
        })
        .state('Mail', {
            url: '/Mail',
            template: '<mail-Directive></mail-directive>'
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


