angular.module('app')
    .controller('UserCtrl', function($scope, $auth,Account,$timeout,CartService,ngCart) {
        $scope.title = " Post a request";
        $scope.disabled = false;

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        var promise = Account.lastLoginInfo();
        promise.then(function (res) {
            $scope.lastLoginInfo = res.data;
            if(!$.isEmptyObject($scope.lastLoginInfo))
                $scope.loginTemplate="" +
                    "Last Logged Info: "+$scope.lastLoginInfo.lastLocation.city+", "+$scope.lastLoginInfo.lastLocation.region +
                    " - "+$scope.lastLoginInfo.lastLoggedTime;
            else{
                $scope.loginTemplate="This is your first login";
            }
        });

        $scope.openPopover = function(){
            $('.popovers').popover('show');
        };

        $scope.closePopover = function(){
            $('.popovers').popover('hide');
        };

        CartService.getCart()
            .then(function(response){
                var cart = response.data.cart;
                for(var i=0;i<cart.length;i++){
                    item = cart[i];
                    ngCart.addItem(id=item._id,name=item._name,price=item._price,quantity=item._quantity,maxquantity=item._maxquantity,data=item._data);
                }
            });
    });
