
DMApp.directive('mailDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/MailManager/Mail.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, $stateParams, $sce) {
            $scope.loaded = false;
            $scope.message = [];
            $scope.indMessaArray = [];
            var init = function () {
                // debugger;
                DMService.GetMailList().then(
                    function (response) {
                        // debugger;
                        $scope.message=response.data.messages;
                        $scope.loaded=true;
                        console.log(response)
                        // $scope.mailcontent = $sce.trustAsHtml($scope.message[1].body.content);
                        $scope.sub = $scope.message[0].subject;
                        $scope.from = $scope.message[0].from.emailAddress.name;
                        // $scope.firs = $scope.from.charAt(0);
                        $scope.from_email = $scope.message[0].from.emailAddress.address;
                        $scope.to = $scope.message[0].toRecipients;
                        console.log($scope.to[0].emailAddress)
                        $scope.mailcontent = $scope.message[0].body.content.replace(new RegExp('\n', 'g'), "<br />")
                        // $scope.mailcontent = $scope.message[1].body.content;
                        

                        // $.each($scope.message, function (key, value) {
                        //         let toneParams = {
                        //             tone_input: value.body.content,
                        //             content_type: 'text/plain'
                        //         };
                        //     DMService.ToneAnalyse(toneParams).then(
                        //         function (tonResp) {                                    
                        //             $scope.indMessaArray.push({ emailId: value.id, result: tonResp });
                                    
                        //             console.log(tonResp)
                        //         },
                        //         function (err) {

                        //         });
                        // });
                        // console.log($scope.indMessaArray)


                    },
                    function (err) {

                    });
            }
            $scope.body_click = function(a){
                $scope.$broadcast('BOOM!', a)
            }
            $scope.$on('BOOM!', function(events, args){
                console.log(args);
                $scope.sub = args.subject;
                $scope.from = args.from.emailAddress.name;
                // $scope.firs = $scope.from.charAt(0);
                $scope.from_email = args.from.emailAddress.address;
                $scope.to = args.toRecipients;
                // $scope.to.email = args.toRecipients[0].emailAddress.address;
                

                $scope.mailcontent = args.body.content.replace(new RegExp('\n', 'g'), "<br />");
              })
            init();
            $scope.openTutorial = function (id) {
                debugger;
            }

        }]
    };
}]);

