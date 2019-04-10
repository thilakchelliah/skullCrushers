/*global techRegistryApp*/
techRegistryApp.controller('loginController', ['$scope', '$localStorage', '$location',
    function loginController($scope, $localStorage, $location) {
        $scope.logout = function() {
            $localStorage.currentUser.token = null;
            $location.path('/login');
        };
    }
]);
