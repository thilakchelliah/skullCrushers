/*global tRDashboardApp*/
/*jshint -W030 */
tRDashboardApp.service('tutorialManagerService', ['$http', function($http) {
    var blogManagerService = {};

    var _uploadTutorialFile = function(fd) {
        debugger;
        return $http.post('apiS/Tutorial/FileUpload', fd, {
            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        });

    };

    var _AddOrUpdateTutorial = function(data, addOrUpdate) {
        debugger;
        var url = 'apiS/Tutorial/Create';
        if (addOrUpdate == false)
            url = 'apiS/Tutorial/Update';

        return $http.post(url, data);
    };


    var _deleteTutorialRow = function(id) {
        return $http.post('/apiS/Tutorial/Delete', id);

    };
    var _FetchAllTutorial = function(fd) {
        debugger;
        return $http.post('apiS/Tutorial/Fetchs', fd, {
            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        });

    };

    blogManagerService.DeleteTutorialRow = _deleteTutorialRow;
    blogManagerService.UploadTutorialFile = _uploadTutorialFile;
    blogManagerService.AddOrUpdateTutorial = _AddOrUpdateTutorial;

    return blogManagerService;
}]);
