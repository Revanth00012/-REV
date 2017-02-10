angular.module('app')
    .controller('MyPostsCtrl', function ($scope, $auth,$timeout, BidService, NgTableParams,$location) {
        BidService.getMyPosts().then(function(data) {
            // params.total(data); // recal. page nav controls
            $scope.dataSet = data.data;
            $timeout(function(){
                $scope.tableParams = new NgTableParams({
                    // initial sort order
                    sorting: { createdAt: "desc" }
                }, {
                    dataset: $scope.dataSet
                });
            });
            var a=data.data;
            // console.log(data.data);
        });

        $scope.convert= function(date){
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        };

        $scope.view= function(data){
            $location.path('/user/bid/'+data._id);
        }
    });


