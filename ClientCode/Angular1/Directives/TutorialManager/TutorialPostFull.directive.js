/*global techRegistryApp,$,bootbox,angular*/
techRegistryApp.directive('tutorialPostFullDirective', ['$localStorage', function($localStorage) {
    return {
        restrict: 'E',
        scope: {
            functionType: "@",
            Id: "@"
        },
        templateUrl: 'Angular1/Directives/TutorialManager/TutorialList.html',
        controller: ['$scope', '$http', 'sharedService', '$stateParams', '$sce', function($scope, $http, sharedService, $stateParams, $sce) {
            $scope.tagArray = [];
            $scope.init = function() {
                sharedService.FetchTutorialsDetails($scope.urlId).then(
                    function(response) {

                        $scope.title = response.data.title;
                        $scope.previewText = response.data.previewText;
                        $scope.user = (response.data.user)[0].username;
                        $scope.createdDate = response.data.createdDate;
                        $scope.urlId = response.data.urlId;
                        $scope.tagData = response.data.tagData;
                        $scope.htmlString = $sce.trustAsHtml(response.data.htmlString);
                    },

                    function(err) {

                    });
            };



            $scope.init();


        }]
    };
}]);
