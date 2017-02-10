angular.module('app')
    .controller('SignupCtrl', function ($scope, $location, $auth) {
        $scope.signup = function () {
            $scope.user.locationInfo = appSettings.locationInfo;
            $auth.signup($scope.user)
                .then(function (response) {
                    $auth.setToken(response);
                    $location.path('/');
                    window.alert('','You have successfully created a new account and have been signed-in');
                });
        };

        if ($auth.isAuthenticated()) {
            $location.path('#/user/main');
        }

    });