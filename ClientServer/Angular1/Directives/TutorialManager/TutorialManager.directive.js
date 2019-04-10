/*global tRDashboardApp,$,bootbox,angular*/
tRDashboardApp.directive('tutorialManagerDirective', ['$localStorage', function($localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/TutorialManager/TutorialManager.html',
        controller: ['$scope', '$http', 'tutorialManagerService', 'sharedService', '$stateParams', '$sce', function($scope, $http, tutorialManagerService, sharedService, $stateParams, $sce) {

            $scope.tagArray = [];
            $scope.UploadSuccess = false;
            $scope.UploadFailed = false;
            $scope.showUpload = false;
            $scope.fileName = "";


            $scope.showLoader = function() {
                sharedService.toggleLoader(true);
            }
            $scope.hideLoader = function() {
                sharedService.toggleLoader(false);
            }
            $scope.fileSelected = function(curObj) {

                sharedService.toggleLoader(false);
                $scope.files = curObj.files[0];
                $scope.files.filename = $scope.title.replace(/ /g, '') + ".html";
                $scope.showUpload = true;
                $scope.UploadSuccess = false;
                $scope.$apply();

            }
            $scope.uploadFile = function() {

                sharedService.toggleLoader(true);
                var fd = new FormData();
                //Take the first selected file
                fd.append("file", $scope.files);
                tutorialManagerService.UploadTutorialFile(fd).then(
                    function(res) {

                        $scope.fileName = res.data.fileName;
                        $scope.UploadSuccess = true;
                        sharedService.toggleLoader(false);
                    },
                    function(error) {

                        $scope.UploadFailed = true;
                        sharedService.toggleLoader(false);
                    })

            };

            $scope.addOrUpdateTutorial = function() {
                debugger;
                var tokenObj = $localStorage.currentUser;
                var data = {
                    title: $scope.title,
                    tags: $scope.tagArray.join(','),
                    tutorialLink: $scope.fileName,
                    cardImageURL: $scope.crdImgUrl,
                    shortDesc: $scope.previewText,
                    userId: tokenObj.userId
                }
                var saveDialog = bootbox.dialog({
                    title: 'Please Wait!',
                    message: '<p><i class="fa fa-spin fa-spinner"></i> processing...</p>',
                    closeButton: false,
                    buttons: {
                        ok: {
                            label: "Ok",
                            className: 'btn-info',
                            callback: function() {

                            }
                        }
                    }
                });
                tutorialManagerService.AddOrUpdateTutorial(data, true).then(
                    function(res) {
                        $scope.title = "";
                        saveDialog.find('.bootbox-body').html('Tutorial  Successfully Created/Updated');
                        $scope.$broadcast('deleteAllTags');
                        $scope.previewText = "";
                        $scope.crdImgUrl = "";s
                        var dtable = $("#tutorialGrid").DataTable();
                        sharedService.callGetUrlTofetch('/apiS/Tutorial/FetchAll').then(function(resp) {
                            dtable.clear();
                            dtable.rows.add(resp.data);
                            dtable.draw();
                        });
                        $scope.UploadSuccess = false;
                    },
                    function(error) {
                        console.log(error);
                        saveDialog.find('.bootbox-body').html('Failed' + error.data.message);
                    })


            };

            $scope.$on('sendTagData', function(event, data) {
                $scope.tagArray = data;
            });
        }]
    };
}]);
