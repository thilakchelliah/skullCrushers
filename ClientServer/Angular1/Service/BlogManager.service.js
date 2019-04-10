/*global tRDashboardApp*/
/*jshint -W030 */
tRDashboardApp.service('blogManagerService', ['$http', function ($http) {
    var blogManagerService = {};
    var _createBlogPost = function (data) {
        return $http.post('apiS/Blog/Create', data);
    };
    var _deleteBlogRow = function (id) {
        return $http.post('/apiS/Blog/Delete', id);

    };

    blogManagerService.DeleteBlogRow = _deleteBlogRow;

    blogManagerService.CreateBlogPost = _createBlogPost;

    return blogManagerService;
}]);
