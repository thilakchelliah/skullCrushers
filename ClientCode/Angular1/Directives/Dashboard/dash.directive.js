
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
                        console.log($scope.message);
                        var messLength = 0
                        $.each($scope.message, function (key, value) {
                            let toneParams = {
                                tone_input: value.body.content,
                                content_type: 'text/plain'
                            };
                            DMService.ToneAnalyse(toneParams).then(
                                function (tonResp) {
                                    $scope.indMessaArray.push({ emailId: value.id, result: tonResp.data });
                                    messLength = messLength + 1;
                                    if (messLength == $scope.message.length) {
                                        $scope.pieChartGenerator();
                                    }
                                    console.log(tonResp)
                                },
                                function (err) {

                                });
                        });
                        console.log($scope.indMessaArray)
                        $scope.barChartGenerator();






                    },
                    function (err) {

                    });
            }
            init();

            $scope.barChartGenerator = function () {
                var totalMailCount = $scope.message.length;
                var flaggedCount = $.grep($scope.message, function (v) {
                    return v.flag.flagStatus === "flagged";
                }).length;
                var focussedCount = $.grep($scope.message, function (v) {
                    return v.inferenceClassification === "focussed";
                }).length;
                var importantMessCount = $.grep($scope.message, function (v) {
                    return v.importance === "high";
                }).length;
                var assValLenght = 0;
                $.each($scope.message, function (k, val) {
                    var temp = $.grep(val.toRecipients, function (v) {
                        return v.emailAddress.address === "SkullKrushers07@outlook.com";
                    }).length
                    assValLenght = assValLenght + temp;
                });
                var assignedtoMe = assValLenght;
                new Chart(document.getElementById("chartjs-1"), {
                    "type": "bar",
                    "data": {
                        "labels": ["Assigned to me", "Focused", "Flagged", "Important", "All"],
                        "datasets": [{
                            "label": "Category wise Mails",
                            "data": [assignedtoMe, focussedCount, flaggedCount, importantMessCount, totalMailCount],
                            "fill": false,
                            "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
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
            }

            $scope.pieChartGenerator = function () {
                var AngerCnt=0, FearCnt=0, JoyCnt=0, SadnessCnt=0, AnalyticalCnt=0, ConfidentCnt=0, TentativeCnt=0, otherCnt = 0;

                $.each($scope.indMessaArray, function (k, val123) {
                    val = val123.result;
                    AngerCnt = AngerCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Anger";
                    }).length
                    FearCnt = FearCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Fear";
                    }).length
                    JoyCnt = JoyCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Joy";
                    }).length
                    SadnessCnt = SadnessCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Sadness";
                    }).length
                    AnalyticalCnt = AnalyticalCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Analytical";
                    }).length
                    ConfidentCnt = ConfidentCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Confident";
                    }).length
                    TentativeCnt = TentativeCnt + $.grep(val.document_tone.tones, function (v) {
                        return v.tone_name === "Tentative";
                    }).length
                    if (val.document_tone.tones.length == 0) {
                        otherCnt = otherCnt + 1;
                    }
                });
                debugger;
                new Chart(document.getElementById("chartjs-4"), {
                    "type": "doughnut",
                    "data": {
                        "labels": ["Anger", "Fear", "Joy", "Sadness", "Analytical", "Confident", "Tentative", "other"],
                        "datasets": [{
                            "label": "Tone Analyser",
                            "data": [AngerCnt, FearCnt, JoyCnt, SadnessCnt, AnalyticalCnt, ConfidentCnt, TentativeCnt, otherCnt],
                            "backgroundColor": [
                                "#f38b4a",
                                "#56d798",
                                "#ff8397",
                                "#6970d5",
                                "#00FF7F",
                                "#48D1CC",
                                "#FF1493",
                                "#FF1496"
                            ],
                        }]
                    },
                    options: {
                        legend: {
                            position: 'right'
                        }
                    }
                });
            }


        }]
    };
}]);
