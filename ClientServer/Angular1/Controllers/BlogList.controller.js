/*global techRegistryApp,$*/
techRegistryApp.controller('blogListController', ['$scope', 'sharedService', '$sce', '$state',

    function blogListController($scope, sharedService, $sce, $state) {
        $scope.blogList = [];

        $scope.openBlogPost = function(urlId) {
            $state.go('BlogPost', { 'urlId': urlId });
        };

        var blogObject = function(title, previewText, User, createdDate, urlId, tagData) {
            return {
                title: title,
                previewText: $sce.trustAsHtml(previewText),
                user: User[0].username,
                date: createdDate,
                urlId: urlId,
                tagData: tagData.split(",")
            };
        };
        var init = function() {
            sharedService.FetchAllBlog().then(
                function(response) {

                    $(response.data).each(function() {
                        $scope.blogList.push(blogObject(
                            this.title,
                            this.previewText,
                            this.user,
                            this.createdDate,
                            this.urlId,
                            this.tagData));
                    });

                },
                function(err) {

                });


        };
        init();
    }
]);
