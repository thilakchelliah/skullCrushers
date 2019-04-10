/*global tRDashboardApp*/
/*jshint -W030 */
DMApp.service('DMService', ['$http', function ($http) {
    var DMService = {};
    var _getMailList = function () {
        return $http.get('api/mail/list');
    };
    var _toneAnalyse = function (val) {
        console.log(val)
        return $http.post('api/mail/toneAnalyse',val);
    };
   

    DMService.GetMailList = _getMailList;
    DMService.ToneAnalyse = _toneAnalyse;
    
    return DMService;
}]);
