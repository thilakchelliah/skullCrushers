/*global tRDashboardApp*/
tRDashboardApp.directive('loginDirective', ['loginService', '$localStorage', '$state', function(loginService, $localStorage, $state) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/Login/Login.html',

        controller: ['$scope', '$http', 'sharedService', '$rootScope', function($scope, $http, sharedService, $rootScope) {

            $scope.invalidUser = false;
            $scope.ValidateAndLogin = function() {
                sharedService.toggleLoader(true);
                var username = $scope.username;
                var password = $scope.password;
                loginService.ValidateAndLogin(username, password).then(
                    function(response) {
                        
                        if (response.data.token) {
                            // store username and token in local storage to keep user logged in between page refreshes
                            $localStorage.currentUser = {
                                username: username,
                                token: response.data.token,
                                expiryTime: response.data.expirytime,
                                userId: response.data.userDataId
                            };
                            // add jwt token to auth header for all requests made by the $http service
                            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                            sharedService.toggleLoader(false);
                            $state.go('home.admin');

                        }
                        else {
                            sharedService.toggleLoader(false);
                            $scope.invalidUser = true;
                        }

                    },
                    function(err) {
                        $scope.invalidUser = true;
                    });
            };


        }]
    };
}]);
