/*global tRDashboardApp*/
/*jshint -W030 */
tRDashboardApp.service('loginService', ['$http', function ($http) {
    var loginService = {};
    var _createUser = function (data) {
        return $http.post('api/User/Create', data);
    };
    var _checkValidUserName = function (data) {
        return $http.get('api/User/checkUser?userName=' + data);
    };
    var _checkValidEmail = function (data) {
        return $http.get('api/User/CheckEmail?email=' + data);
    };
    var _validateAndLogin = function (userName, password) {
        return $http.get('api/User/CheckSignUpCred?username=' + userName + '&password=' + password);
    };
    loginService.CreateUser = _createUser;
    loginService.checkValidUserName = _checkValidUserName;
    loginService.checkValidEmail = _checkValidEmail;
    loginService.ValidateAndLogin = _validateAndLogin;
    return loginService;
}]);
