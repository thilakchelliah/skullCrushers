
/*global techRegistryApp,$,bootbox,angular*/
techRegistryApp.directive('tutorialListDirective', ['$localStorage', function($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/TutorialManager/TutorialList.html',
        controller: ['$scope', '$http', 'sharedService', '$stateParams', '$sce', function($scope, $http, sharedService, $stateParams, $sce) {
            $scope.tutObjList = [];
            var init = function() {
                sharedService.FetchAllTutorial().then(
                    function(response) {
                        debugger;
                        $(response.data).each(function() {
                            $scope.tutObjList.push({
                                title: this.title,
                                shortDesc: this.shortDesc,
                                cardImageURL: this.cardImageURL,
                                createdDate: this.createdDate,
                                id: this._id
                            });
                        });

                    },
                    function(err) {

                    });
            }
            init();
            $scope.openTutorial=function (id) {
                debugger;
            }

        }]
    };
}]);
