
DMApp.directive('mailDirective', ['$localStorage', function($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/MailManager/Mail.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function($scope, $http,DMService, sharedService, $stateParams, $sce) {
            $scope.loaded=false;
            $scope.message=[];
            var init = function() {
                debugger;
                DMService.GetMailList().then(
                    function(response) {
                        debugger;
                        $scope.message=response.data.messages;
                        $scope.loaded=true;
                        $scope.mailcontent = $scope.message[0].body.content;
                        console.log($scope.message)
                    },
                    function(err) {

                    });
            }
            $scope.body_click = function(a){
                $scope.$broadcast('BOOM!', a)
            }
            $scope.$on('BOOM!', function(events, args){
                console.log(args);
                $scope.mailcontent = args; //now we've registered!
              })
            init();
            $scope.openTutorial=function (id) {
                debugger;
            }

        }]
    };
}]);
