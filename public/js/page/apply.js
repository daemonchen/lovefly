lovefly.controller('ApplyController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.doSubmit = function() {
        $log.log($scope.username);
        return $http.post('/apply/save', {
            username: $scope.username,
            password: $scope.password
        }).
        success(function() {
            alert("register success");
            // window.location.href = $scope.refer;
            window.location.href = 'edit/index';
        }).
        error($scope.logError);
    }
});