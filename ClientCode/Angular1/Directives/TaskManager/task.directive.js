
DMApp.directive('taskDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/TaskManager/task.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, $stateParams, $sce) {
            $scope.loaded = false;
            $scope.TaskList = [];
            var init = function () {
                $scope.create = false;
                debugger;
                DMService.GetTaskList().then(
                    function (response) {
                        $scope.loaded = true;
                        $scope.TaskList = response.data;
                        // debugger;
                    },
                    function () {

                    });
            }


            init();
            $scope.addTask = function () {
                var taskObj = {
                    Name: $scope.Name,
                    Description: $scope.Description,
                    AllottedTime: $scope.AllottedTime,
                    Status:"Pending"
                }
                
                DMService.AddTask(taskObj).then(
                    function (response) {
                        $('#exampleModalLong').modal('hide')
                        
                    },
                    function () {
                        $('#exampleModalLong').modal('hide')
                    });
            }


        }]
    };
}]);

