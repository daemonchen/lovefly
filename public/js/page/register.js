lovefly.controller('RegisterController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.refer = document.referrer;
    $scope.register = function() {
        $log.log($scope.username);
        return $http.post('/admin/register', {
            username: $scope.username,
            password: $scope.password
        }).
        success(function() {
            alert("register success");
            window.location.href = $scope.refer;
        }).
        error($scope.logError);
    }
})