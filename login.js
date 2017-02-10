angular.module('app')
    .controller('LoginCtrl', function ($scope, $state, $auth) {
        $scope.login = function () {
            $scope.user.locationInfo = appSettings.locationInfo;
            $auth.login($scope.user)
                .then(function () {
                    //window.alert('You have successfully signed in!');
                    $state.go('main');
                });
        };
        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function () {
                    //window.alert('You have successfully signed in with ' + provider + '!');
                    $state.go('main');
                });
        };

        if ($auth.isAuthenticated()) {
            $state.go('main');
        }

        $scope.facebook = function(){
            $auth.authenticate('facebook',{locationInfo:appSettings.locationInfo})
                .then(function(res){
                    if(res){
                        $state.go('main');
                    }
                });
        };


    });
