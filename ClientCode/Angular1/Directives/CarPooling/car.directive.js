
DMApp.directive('carDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/Dashboard/car.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, sharedService, $stateParams, $sce) {
           
        }]
    };
}]);
