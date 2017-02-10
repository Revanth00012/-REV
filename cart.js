angular.module('app')
    .controller('CartCtrl', function ($scope, $state, $auth,ngCart,CartService) {
        $scope.httpSettings = { url: appSettings.serviceURL+'/api/checkout'};

        $scope.checkout = function(){
            CartService.checkout()
                .then(function(){
                    ngCart.empty();
                },function(){

                });
        };

        $scope.getTotalItems = function(){
            return ngCart.getTotalItems();
        }

    });
