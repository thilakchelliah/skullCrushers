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
        .state('Tutorial', {
            url: '/tutorial',
            template: '<tutorial-list-directive></tutorial-list-directive>'
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
        .state('TutorialPost', {
            url: '/BlogPost/:urlId',
            templateUrl: 'App/ContentMaster/BlogPostContent.html',
            controller: ['$rootScope', '$stateParams',
                function($scope, $statesParams) {
                    $scope.urlId = $statesParams.urlId;
                }
            ]
        });

}]);


