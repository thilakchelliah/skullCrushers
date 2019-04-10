/*global sharedModule,$*/
/*jshint -W030 */
sharedModule.service('sharedService', ['$http', function($http) {
    var sharedService = {};
    var _callGetUrlTofetch = function(url) {
        return $http.get(url);
    };


    //method to handle loader
    var _toggleLoader = function(showOrHide) {
        if (showOrHide === true)
            $(".loading").show();
        else
            $(".loading").hide();
    };
    var _generateUniqueId = function() {
        return Math.floor(new Date().getTime() / 1000);
    };

    var _fetchAllBlog = function() {
        return $http.get('/api/Blog/FetchAll');
    };

    var _fetchBlogDetails = function(urlId) {

        var config = {
            params: {
                urlId: urlId
            }
        };
        return $http.get('/api/Blog/FetchOne', config);
    };


    var _fetchAllTutorials = function() {
        return $http.get('/api/Tutorial/FetchAll');
    };

    var _fetchTutorialDetail = function(urlId) {

        var config = {
            params: {
                urlId: urlId
            }
        };
        return $http.get('/api/Tutorial/FetchOne', config);
    };

    sharedService.FetchAllBlog = _fetchAllBlog;
    sharedService.FetchBlogDetails = _fetchBlogDetails;
    sharedService.FetchAllTutorial = _fetchAllTutorials;
    sharedService.FetchTutorialDetails = _fetchTutorialDetail;
    sharedService.callGetUrlTofetch = _callGetUrlTofetch;
    sharedService.toggleLoader = _toggleLoader;
    sharedService.generateUniqueId = _generateUniqueId;
    return sharedService;
}]);
