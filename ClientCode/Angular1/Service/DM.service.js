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
        return $http.post('api/mail/toneAnalyse', val);
    };
    var _listEvents = function () {
        return $http.get('api/mail/listMeetings');
    }
    var _getTaskList = function () {
        return $http.get('api/task/GetAllTask');
    }
    
    

    DMService.GetMailList = _getMailList;
    DMService.GetMailListPlain = _getMailListPlain;
    DMService.ToneAnalyse = _toneAnalyse;
    DMService.ListEvents = _listEvents
    DMService.GetTaskList = _getTaskList

    return DMService;
}]);
