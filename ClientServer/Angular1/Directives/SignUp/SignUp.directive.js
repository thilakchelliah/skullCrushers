/*global tRDashboardApp,bootbox */
tRDashboardApp.directive('signUpDirective', ['loginService', function (loginService) {
    return {
        restrict: 'E',
        templateUrl: 'Angular1/Directives/SignUp/signup.html',
        controller: ['$scope', '$state', function ($scope, $state) {
            $scope.CreateUser = function () {
                var procDialog = bootbox.dialog({
                    title: 'Please Wait!',
                    message: '<p><i class="fa fa-spin fa-spinner"></i> processing...</p>',
                    closeButton: false,
                    buttons: {
                        ok: {
                            label: "Ok",
                            className: 'btn-info',
                            callback: function () {
                                $state.go('login');
                            }
                        }
                    }
                });

                var userCurrent = {
                    email: $scope.email,
                    username: $scope.UserName,
                    password: $scope.password
                };
                loginService.CreateUser(userCurrent).then(function (res) {
                    procDialog.find('.bootbox-body').html('User Created Successfully');
                }, function (error) {

                });
            };

            $scope.chkValidUsNme = function () {

                var userName = $scope.UserName;
                loginService.checkValidUserName(userName).then(function (res) {

                    if (res.data.length !== 0) {
                        $scope.isUserNameError = true;
                        $scope.userNameError = res.data;
                    }
                }, function (error) {

                });
            };
            $scope.chkValidEmail = function () {
                var email = $scope.email;
                loginService.checkValidEmail(email).then(function (res) {
                    if (res.data.length !== 0) {
                        $scope.isEmailError = true;
                        $scope.emailError = res.data;
                    }

                }, function (error) {

                });
            };

            $scope.redirectToHome=function(){
                $state.go('login');
            };
        }]
    };
}]);
