/*global tRDashboardApp*/
/*jshint -W030 */
DMApp.service('DMService', ['$http', function ($http) {
    var DMService = {};
    var _getMailList = function () {
        return $http.get('api/mail/list');
    };
    var _getMailListPlain = function () {
        return $http.get('api/mail/listPlain');
    };
    var _toneAnalyse = function (val) {
        console.log(val)
        return $http.post('api/mail/toneAnalyse',val);
    };
   

    DMService.GetMailList = _getMailList;
    DMService.GetMailListPlain = _getMailListPlain;
    DMService.ToneAnalyse = _toneAnalyse;
    
    return DMService;
}]);
