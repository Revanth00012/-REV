angular.module('app')
    .controller('BidCtrl', function ($scope, $stateParams,BidService,$timeout,NgTableParams) {
        $scope.title = " Bid for this post";
        $scope.disabled = true;
        $scope.btnName = "Bid Now";
        $scope.btndisable = true;
        $scope.isMine = false;
        $scope.tableDisplay = false;
        $scope.isActive = false;

        var init = function(){
            BidService.getIsMyPost($stateParams.postId)
                .then(function(response){
                    $scope.isMine = !(response.data.isMyPost);
                });
            BidService.getPostbyId($stateParams.postId)
                .then(function(res){
                    $scope.isActive = res.data._id.isActive;
                    BidService.getBidsbyPostId(res.data._id)
                        .then(function(response){
                            $scope.dataSet = response.data;
                            $scope.tableDisplay = ($scope.dataSet.length!==0);
                            $timeout(function(){
                                $scope.tableParams = new NgTableParams({
                                    // initial sort order
                                    sorting: { createdAt: "desc" }
                                }, {
                                    dataset: $scope.dataSet
                                });
                            });
                        });
                    $scope.post = res.data;
                    $scope.title = $scope.post.title;
                    $scope.btndisable = false;

                });
        };

        $scope.convert= function(date){
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        };

        $scope.submit=function(){
            $('#squarespaceModal').modal({backdrop: 'static', keyboard: false});
        };

        $scope.saveBid = function(){
            BidService.saveBid($scope.post._id,$scope.bidInfo)
                .then(function(response){
                    $scope.reset();
                    $('#squarespaceModal').modal('hide');
                    init();
                });
        };



        $scope.reset = function() {
            if ($scope.bidInfo === undefined)
                $scope.bidInfo = {};
            $scope.bidInfo.bidPrice = 0;
            $scope.bidInfo.additionalDesc = "";
            $scope.bidInfo.quantity = 1;
        };

        $scope.reset();
        init();
    });
