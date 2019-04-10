/*global tRDashboardApp*/
/*jshint -W030 */
DMApp.service('DMService', ['$http', function ($http) {
    var DMService = {};
    var _getMailList = function () {
        return $http.get('api/mail/list');
    };
   

    DMService.GetMailList = _getMailList;
    return DMService;
}]);
