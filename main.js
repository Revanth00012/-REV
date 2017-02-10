angular.module('app')
    .controller('MainCtrl', function ($scope, BidService) {
        $scope.title = " Post a request";
        $scope.disabled = false;
        $scope.btnName = "Create Post";
        $scope.btndisable = false;
        $scope.isMine = true;
        $scope.isActive = true;

        $scope.submit = function () {
            BidService.savePost($scope.post)
                .then(function () {
                    window.alert("The post has been successfully saved");
                    $scope.reset();
                });
        };

        $scope.reset = function () {
            if ($scope.post === undefined) {
                $scope.post = {};
            }
            $scope.post.title = "";
            $scope.post.description = "";
            $scope.post.price = 0;
            $scope.post.quantity = 1;
        };

        $scope.reset();

    });
