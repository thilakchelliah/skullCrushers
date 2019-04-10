
DMApp.directive('dashDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/Dashboard/dash.html',
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
                        var totalMailCount=$scope.message.length;
                        var flaggedCount = $.grep($scope.message, function(v) {
                            return v.flag.flagStatus === "flagged";
                        }).length;
                        var focussedCount= $.grep($scope.message, function(v) {
                            return v.flag.flagStatus === "focussed";
                        }).length;
                        var assignedtoMe= $.grep($scope.message, function(v) {
                            return v.flag.flagStatus === "focussed";
                        }).length;
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
            init();
            new Chart(document.getElementById("chartjs-1"), {
                "type": "bar",
                "data": {
                    "labels": ["Assigned to me","Focused", "Flagged", "All"],
                    "datasets": [{
                        "label": "Category wise Mails",
                        "data": [65, focussedCount, flaggedCount, totalMailCount],
                        "fill": false,
                        "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
                        "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)"],
                        "borderWidth": 1
                    }]
                },
                "options": {
                    "scales": {
                        "yAxes": [{
                            "ticks": {
                                "beginAtZero": true
                            }
                        }]
                    }
                }
            });
            $scope.openTutorial = function (id) {
                debugger;
            }

        }]
    };
}]);
