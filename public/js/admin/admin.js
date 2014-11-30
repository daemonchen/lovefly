lovefly.controller('AdminController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.refer = document.referrer;
    $scope.username = $scope.userInfo;
    // $scope.userInfo = 11;
    if (!!$scope.username) {
        $scope.isLogin = true;
    };
})