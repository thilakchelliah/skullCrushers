/*global sharedModule,$localStorage*/
/*jshint -W030 */
sharedModule.factory('AuthInterceptor', ['$rootScope', '$q', '$localStorage', '$location', function($rootScope, $q, $localStorage, $location) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($localStorage.currentUser) {
                config.headers.Authorization = 'Token ' + $localStorage.currentUser.token;
            }
            return config;
        },

        responseError: function(response) {
            
            if (!$localStorage.currentUser) {
                $location.path('/login');
                return false;
            }
            if (response.status === 401 || response.status === 403) {

                $localStorage.currentUser.token = null;
                $location.path('/login');
                return false;
            }
            return $q.reject(response);
        }
    };
}]);
