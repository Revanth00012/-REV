angular.module('app')
    .controller('LogoutCtrl', function ($location, $auth, ngCart) {
        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function () {
                //window.alert('You have been logged out');
                $location.path('/start/login');
                ngCart.empty();
            });
    });