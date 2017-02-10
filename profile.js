angular.module('app')
    .controller('ProfileCtrl', function ($scope, $auth,  Account) {
        $scope.getProfile = function () {
            Account.getProfile()
                .then(function (response) {
                    $scope.user = response.data;
                });
        };
        $scope.updateProfile = function () {
            Account.updateProfile($scope.user)
                .then(function () {
                    window.alert('Profile has been updated');
                });
        };
        $scope.getProfile();
    });
