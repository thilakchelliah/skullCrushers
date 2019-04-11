
DMApp.directive('taskDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/TaskManager/task.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, $stateParams, $sce) {
            $scope.loaded = false;
            $scope.TaskList = [];
            var init = function () {
                $scope.create = false;
                DMService.GetTaskList().then(
                    function (response) {
                        $scope.loaded = true;
                        $scope.TaskList = response.result;
                        // debugger;
                    },
                    function () {

                    });
            }


            init();
            $scope.openTutorial = function (id) {
                debugger;
            }

        }]
    };
}]);

