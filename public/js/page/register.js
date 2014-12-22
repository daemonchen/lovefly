lovefly.controller('RegisterController', function($scope, $http, $log, _, $cookieStore) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.refer = document.referrer;
    $scope.register = function() {
        $log.log($scope.username);
        return $http.post('/register/register', {
            username: $scope.username,
            password: $scope.password
        }).
        success(function() {
            $cookieStore.put("username", $scope.username);
            alert("register success");
            // window.location.href = $scope.refer;
            window.location.href = '/';
        }).
        error($scope.logError);
    }
})