
DMApp.directive('mailDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/MailManager/Mail.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, sharedService, $stateParams, $sce) {
            $scope.loaded = false;
            $scope.message = [];
            $scope.indMessaArray = [];
            var init = function () {
                debugger;
                DMService.GetMailList().then(
                    function (response) {
                        debugger;
                        $scope.message = response.data.messages;
                        $scope.loaded = true;
                        console.log($scope.message)

                        $.each($scope.message, function (key, value) {
                                let toneParams = {
                                    tone_input: value.body.content,
                                    content_type: 'text/plain'
                                };
                            DMService.ToneAnalyse(toneParams).then(
                                function (tonResp) {                                    
                                    $scope.indMessaArray.push({ emailId: value.id, result: tonResp });
                                    
                                    console.log(tonResp)
                                },
                                function (err) {

                                });
                        });
                        console.log($scope.indMessaArray)


                    },
                    function (err) {

                    });
            }
            init();
            $scope.openTutorial = function (id) {
                debugger;
            }

        }]
    };
}]);
