
DMApp.directive('mailDirective', ['$localStorage', function ($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/MailManager/Mail.html',
        controller: ['$scope', '$http', 'DMService', '$stateParams', '$sce', function ($scope, $http, DMService, $stateParams, $sce) {
            $scope.loaded = false;

            $scope.indMessaArray = [];
            var init = function () {
                $scope.message = [];
                $scope.emarray = [];
                $scope.frm = {};
                $scope.create = false;
                DMService.GetMailList().then(
                    function (response) {
                        // debugger;
                        $scope.message = response.data.messages;

                        $scope.frm.msg = "";
                        $scope.frm.sub = "";
                        $scope.frm.to = "";
                        $scope.loaded = true;
                        // $scope.mailcontent = $sce.trustAsHtml($scope.message[1].body.content);
                        $scope.sub = $scope.message[0].subject;
                        $scope.from = $scope.message[0].from.emailAddress.name;

                        $scope.from_email = $scope.message[0].from.emailAddress.address;
                        $scope.to = $scope.message[0].toRecipients;
                        $scope.mailraw = $scope.message[0].body.content;
                        $scope.mailcontent = $scope.message[0].body.content.replace(new RegExp('\n', 'g'), "<br />")
                        // $scope.mailcontent = $scope.message[1].body.content;

                        console.log($scope.message[0]);
                        $.each($scope.message, function (key1, value1) {
                            let toneParams = {
                                tone_input: value1.body.content + " " + value1.subject,
                                content_type: 'text/plain'
                            };
                            DMService.ToneAnalyse(toneParams).then(
                                function (tonResp) {
                                    var temp_array = [];
                                    $.each(tonResp.data.document_tone.tones, function (key, value) {
                                        if (value.tone_name === "fear") {
                                            temp_array.indexOf("Sadness") === -1 ? temp_array.push("Sadness") : console.log("Sadness already exists");
                                        } else if (value.tone_name === "Joy" || value.tone_name === "Analytical") {
                                            temp_array.indexOf("Good") === -1 ? temp_array.push("Good") : console.log("Good already exists");
                                        } else {
                                            temp_array.indexOf(value.tone_name) === -1 ? temp_array.push(value.tone_name) : console.log(value.tone_name + " already exists");
                                        }
                                    });
                                    $scope.message[key1].result = temp_array;
                                },
                                function (err) {

                                });
                        });
                        console.log("Anand")
                        // console.log($scope.message)
                        $scope.emrel = $scope.message[0].result;
                    },
                    function (err) {

                    });

                DMService.GetTaskList().then(
                    function (response) {
                        $scope.loaded = true;
                        $scope.TaskList = response.data;
                    },
                    function () {

                    });
            }
            $scope.loadTask = function (a, b) {
                $scope.Name = a;
                $scope.Description = b;
                $scope.Status = "Pending";
                $scope.AllottedTime = "Low";
                $scope.Group = "DataHub";
                $scope.AssignedTo = "skullkrushers07@outlook.com";
                $scope.selfc = false;
            }
            $scope.as_self = function () {
                if ($scope.selfc == false) {
                    $scope.AssignedTo = "skullkrushers07@outlook.com";
                    $scope.selfc = true;
                } else {
                    $scope.selfc = false;
                    $scope.AssignedTo = "";
                }
            }
            $scope.chec= function(a){
                return $.grep($scope.TaskList, function (v) {
                    return v.Description === a;
                }).length
            }
            $scope.addTask = function () {
                alert($scope.AssignedTo);
                var taskObj = {
                    Name: $scope.Name,
                    Description: $scope.Description,
                    AllottedTime: $scope.AllottedTime,
                    AssignedTo: $scope.AssignedTo,
                    Group:$scope.Group,
                    Status: $scope.Status
                }
                var isthere = $scope.chec($scope.Description);
                if(isthere > 0){
                    alert("The Task has been already assigned");
                }else{
                DMService.AddTask(taskObj).then(
                    function (response) {
                        $scope.TaskList.push({Name:$scope.Name,Description: $scope.Description})
                        $('#exampleModalLong').modal('hide')

                    },
                    function (err) {
                        alert("This task has beed assigned already");
                        $('#exampleModalLong').modal('hide')
                    });
                }
            }
            $scope.create_click = function () {
                $scope.create = true;
            }
            $scope.body_click = function (a) {
                $scope.create = false;
                $scope.$broadcast('BOOM!', a)
            }
            $scope.discard = function () {
                $scope.create = false;
                init();
            }
            $scope.check_stat = function () {
                console.log($scope.emarray);
                if ($scope.emarray.indexOf("Anger") != -1) {
                    $scope.mal_stat = "alert-danger"
                } else if ($scope.emarray.indexOf("Sadness") != -1 || $scope.emarray.indexOf("Tentative") != -1) {
                    $scope.mal_stat = "alert-warning"
                } else if ($scope.emarray.indexOf("Joy") != -1 || $scope.emarray.indexOf("Confident") != -1) {
                    $scope.mal_stat = "alert-success"
                } else {
                    $scope.mal_stat = "alert-info"
                }
            }
            $scope.sen = function (a) {
                if ($scope.emarray.length > 0) {
                    // $scope.emarray = [];
                    init();
                    alert("Mail Sent Successfully")
                } else {
                    $scope.send(a);
                }
            }
            $scope.send = function (a) {
                if (a.msg == "" || a.sub == "" || a.to == "") {
                    alert("Please fill the mandatory fields")
                }
                else {
                    $scope.emarray = [];
                    let toneParams1 = {
                        tone_input: a.msg + " " + a.sub,
                        content_type: 'text/plain'
                    };
                    DMService.ToneAnalyse(toneParams1).then(
                        function (tonResp) {
                            console.log(tonResp)
                            $scope.contentEmotions = tonResp.data.document_tone.tones;
                            $.each($scope.contentEmotions, function (key, value) {
                                if (value.tone_name === "fear") {
                                    $scope.emarray.indexOf("Sadness") === -1 ? $scope.emarray.push("Sadness") : console.log("Sadness already exists");
                                } else if (value.tone_name === "Joy" || value.tone_name === "Analytical") {
                                    $scope.emarray.indexOf("Good") === -1 ? $scope.emarray.push("Good") : console.log("Good already exists");
                                } else {
                                    $scope.emarray.indexOf(value.tone_name) === -1 ? $scope.emarray.push(value.tone_name) : console.log(value.tone_name + " already exists");
                                }
                            });
                            $scope.check_stat();
                        },
                        function (err) {

                        });
                }
            }
            $scope.$on('BOOM!', function (events, args) {
                // console.log("BOOM")
                console.log(args);
                $scope.sub = args.subject;
                $scope.from = args.from.emailAddress.name;
                $scope.emrel = args.result;
                $scope.from_email = args.from.emailAddress.address;
                $scope.to = args.toRecipients;
                // $scope.to.email = args.toRecipients[0].emailAddress.address;

                $scope.mailraw = args.body.content;
                $scope.mailcontent = args.body.content.replace(new RegExp('\n', 'g'), "<br />");
            })
            init();
            $scope.openTutorial = function (id) {
                debugger;
            }

        }]
    };
}]);

