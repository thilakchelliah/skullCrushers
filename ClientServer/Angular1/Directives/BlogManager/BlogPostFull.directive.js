/*global sharedModule,$,bootbox*/
sharedModule.directive('blogPostFull', ['$localStorage', function($localStorage) {
    return {
        restrict: 'E',
        scope: {
            functionType: "@",
            urlId: "@"
        },
        templateUrl: 'Angular1/Directives/BlogManager/BlogPostFull.html',
       
        controller: ['$scope', '$http', 'sharedService', '$stateParams', '$sce', function($scope, $http, sharedService, $stateParams, $sce) {
            
            $scope.tagArray = [];
            $scope.init = function() {
                sharedService.FetchBlogDetails($scope.urlId).then(
                    function(response) {
                        
                        $scope.title = response.data.title;
                        $scope.previewText = response.data.previewText;
                        $scope.user = (response.data.user)[0].username;
                        $scope.createdDate = response.data.createdDate;
                        $scope.urlId = response.data.urlId;
                        $scope.tagData = response.data.tagData;
                        $scope.htmlString = $sce.trustAsHtml(response.data.htmlString);
                    },

                    function(err) {

                    });
            };



            $scope.init();

        }]
    };
}]);
