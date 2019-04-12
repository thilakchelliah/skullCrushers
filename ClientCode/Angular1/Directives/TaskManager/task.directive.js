
DMApp.directive('taskDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/TaskManager/task.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, $stateParams, $sce) {
            $scope.loaded = false;
            $scope.TaskList = [];
            $scope.selfc = false;
            var init = function () {
                $scope.create = false;
                DMService.GetTaskList().then(
                    function (response) {
                        $scope.loaded = true;
                        $scope.TaskList = response.data;
                        console.log($scope.TaskList);
                    },
                    function () {

                    });
            }
            $scope.chec= function(a){
                return $.grep($scope.TaskList, function (v) {
                    return v.Description === a;
                }).length
            }

            init();
            $scope.as_self = function(){
                if($scope.selfc == false){
                    $scope.selfc = true;
                    $scope.AssignedTo = "skullkrushers07@outlook.com";
                }else{
                    $scope.selfc = false;
                    $scope.AssignedTo = "";
                }
            }
            $scope.adClick = function(){
                $scope.Status = "Pending";
                $scope.AllottedTime = "Low";
                $scope.Group = "DataHub";
                $scope.Name = "";
                $scope.Description = "";
                $scope.AssignedTo = "";
                $scope.selfc = false
                $scope.isupdate = false;
            } 
            $scope.addTask = function () {
                console.log($scope.AssignedTo)
                var taskObj = {
                    Name: $scope.Name,
                    Description: $scope.Description,
                    AllottedTime: $scope.AllottedTime,
                    AssignedTo:$scope.AssignedTo,
                    Group:$scope.Group,
                    Status:$scope.Status
                }
                var isthere = $scope.chec($scope.Description);
                if(isthere > 0){
                    alert("The Task has been already assigned");
                }else{
                    DMService.AddTask(taskObj).then(
                    function (response) {
                        init();
                        $('#exampleModalLong').modal('hide')
                        
                    },
                    function () {
                        $('#exampleModalLong').modal('hide')
                    });
                } 
            }
            $scope.update = function(task){
                $scope.isupdate = true;
                $scope.Name = task.Name;
                $scope.Description = task.Description;
                $scope.AllottedTime = task.AllottedTime;
                $scope.Status = task.Status;
                $scope.AssignedBy = task.AssignedBy;
                $scope.AssignedTo = task.AssignedTo;
                $scope.Group = task.Group
            }


        }]
    };
}]);

